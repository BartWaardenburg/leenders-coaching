import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactNotification, ContactConfirmation } from '@/emails';
import type { ContactFormData } from '@/components/sections/SectionForm/SectionForm';

/* Initialize Resend with API key from environment variables */
const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}
const resend = new Resend(resendApiKey);

/**
 * API handler for contact form submissions
 * POST /api/contact
 */
export async function POST(request: Request) {
  try {
    console.log('Contact API endpoint called');

    const data = (await request.json()) as ContactFormData;
    console.log('Received form data:', data);

    const { name, email, subject, message } = data;

    // Validate the request data
    if (!name || !email || !subject || !message) {
      console.log('Missing required fields:', {
        name,
        email,
        subject,
        message,
      });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    // Send notification email to Leenders Coaching
    const notificationResult = await resend.emails.send({
      from: 'noreply@contact.leenders-coaching.nl',
      to: 'info@leenders-coaching.nl',
      subject: `Contact formulier: ${subject}`,
      react: ContactNotification({ name, email, subject, message }),
      replyTo: email,
    });

    if (notificationResult.error) {
      console.error(
        'Failed to send notification email:',
        notificationResult.error,
      );
      return NextResponse.json(
        { error: 'Failed to send notification email' },
        { status: 500 },
      );
    }

    // Send confirmation email to the sender
    const confirmationResult = await resend.emails.send({
      from: 'noreply@contact.leenders-coaching.nl',
      to: email,
      subject: 'Bedankt voor je bericht aan Leenders Coaching',
      react: ContactConfirmation({ name, subject }),
      replyTo: 'info@leenders-coaching.nl',
    });

    if (confirmationResult.error) {
      console.error(
        'Failed to send confirmation email:',
        confirmationResult.error,
      );
      // We still return success since the primary notification was sent
    }

    return NextResponse.json({
      success: true,
      notificationId: notificationResult.data?.id,
      confirmationId: confirmationResult.data?.id,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 },
    );
  }
}
