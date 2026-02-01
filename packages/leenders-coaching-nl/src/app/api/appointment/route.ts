import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { AppointmentNotification, AppointmentConfirmation } from '@/emails';
import { clientIp, validateTurnstile } from '@/utilities/turnstile';

/* Initialize Resend with API key from environment variables */
const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}
const resend = new Resend(resendApiKey);

type AppointmentFormData = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  selectedDate: string;
  selectedTimeSlot: {
    startTime?: string;
    duration?: number;
  };
  turnstileToken?: string;
  startedAt?: number;
  company?: string;
};

// Mailing disabled — set to false to re-enable appointment booking
const MAILING_DISABLED = true;

/**
 * API handler for appointment booking submissions
 * POST /api/appointment
 */
export async function POST(request: Request) {
  if (MAILING_DISABLED) {
    return NextResponse.json(
      { error: 'Appointment booking is temporarily disabled' },
      { status: 503 }
    );
  }

  try {
    const data = (await request.json()) as AppointmentFormData;
    const { name, email, phone, message, selectedDate, selectedTimeSlot } =
      data;

    /* Validate the request data */
    if (!name || !email || !selectedDate || !selectedTimeSlot) {
      console.log('Missing required fields:', {
        name,
        email,
        selectedDate,
        selectedTimeSlot,
      });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    /* Validate email format */
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    /* Security validations */
    if (data.company?.trim()) {
      return NextResponse.json({ error: 'bot' }, { status: 400 });
    }
    if (!data.startedAt || Date.now() - Number(data.startedAt) < 1200) {
      return NextResponse.json({ error: 'too_fast' }, { status: 400 });
    }

    /* Turnstile validation (mandatory) */
    const v = await validateTurnstile(
      data.turnstileToken || '',
      clientIp(request)
    );
    if (!v.success || v.cdata !== 'booking') {
      return NextResponse.json({ error: 'captcha' }, { status: 400 });
    }

    /* Hostname validation */
    const allowed = new Set([
      'leenders-coaching.nl',
      'www.leenders-coaching.nl',
    ]);
    if (process.env.NODE_ENV !== 'production') {
      allowed.add('localhost');
      allowed.add('127.0.0.1');
    }
    if (v.hostname && !allowed.has(v.hostname)) {
      return NextResponse.json({ error: 'captcha' }, { status: 400 });
    }

    /* Send notification email to coach */
    const notificationResult = await resend.emails.send({
      from: 'noreply@informatie.leenders-coaching.nl',
      to: 'simone@leenders-coaching.nl',
      subject: `Nieuwe afspraak aanvraag - ${name}`,
      react: AppointmentNotification({
        name,
        email,
        phone,
        selectedDate,
        selectedTimeSlot,
        message,
      }),
      replyTo: email,
    });

    if (notificationResult.error) {
      console.error(
        'Failed to send notification email:',
        notificationResult.error
      );
      return NextResponse.json(
        { error: 'Failed to send notification email' },
        { status: 500 }
      );
    }

    /* Send confirmation email to the client */
    const confirmationResult = await resend.emails.send({
      from: 'noreply@informatie.leenders-coaching.nl',
      to: email,
      subject: 'Afspraak aanvraag ontvangen - Leenders Coaching',
      react: AppointmentConfirmation({
        name,
        selectedDate,
        selectedTimeSlot,
      }),
    });

    if (confirmationResult.error) {
      console.error(
        'Failed to send confirmation email:',
        confirmationResult.error
      );
    }

    return NextResponse.json({
      success: true,
      notificationId: notificationResult.data?.id,
      confirmationId: confirmationResult.data?.id,
    });
  } catch (error) {
    console.error('Appointment booking error:', error);
    return NextResponse.json(
      { error: 'Failed to book appointment' },
      { status: 500 }
    );
  }
}
