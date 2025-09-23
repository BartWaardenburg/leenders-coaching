import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactNotification, ContactConfirmation } from '@/emails';
import type { ContactFormData } from '@/components/sections/SectionForm/SectionForm';
import type { FormConfiguration } from '@/types/sanity/schema';

/* Initialize Resend with API key from environment variables */
const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}
const resend = new Resend(resendApiKey);

type ContactFormRequest = ContactFormData & {
  formConfig?: FormConfiguration;
};

/**
 * API handler for contact form submissions
 * POST /api/contact
 */
export async function POST(request: Request) {
  try {
    const data = (await request.json()) as ContactFormRequest;
    const { name, email, subject, message, formConfig } = data;

    /* Validate the request data */
    if (!name || !email || !subject || !message) {
      console.log('Missing required fields:', {
        name,
        email,
        subject,
        message,
      });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    /* Get configuration from form config or use defaults */
    const emailTo = formConfig?.emailTo || 'info@leenders-coaching.nl';
    const emailSubject =
      formConfig?.emailSubject || `Contact formulier: {subject}`;
    const finalSubject = emailSubject.replace('{subject}', subject);

    /* Send notification email to configured recipient */
    const notificationResult = await resend.emails.send({
      from: 'noreply@informatie.leenders-coaching.nl',
      to: emailTo,
      subject: finalSubject,
      react: ContactNotification({ name, email, subject, message }),
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

    /* Send confirmation email to the sender */
    const confirmationResult = await resend.emails.send({
      from: 'noreply@informatie.leenders-coaching.nl',
      to: email,
      subject: 'Bedankt voor je bericht aan Leenders Coaching',
      react: ContactConfirmation({ name, subject }),
      replyTo: emailTo,
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
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
