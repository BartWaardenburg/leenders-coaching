import type { Meta, StoryObj } from '@storybook/nextjs';
import { useEffect, useRef, useState } from 'react';
import { render } from '@react-email/render';
import { Box } from '@/components/ui/Box';
import { Text } from '@/components/ui/Text';

// Email template components
import { ContactNotification } from './ContactNotification';
import { ContactConfirmation } from './ContactConfirmation';

/**
 * Email templates used for contact form submissions
 */
const meta: Meta = {
  title: 'Emails/Templates',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj;

const sampleData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  subject: 'Vraag over coaching',
  message: 'Beste Leenders Coaching,\n\nIk zou graag meer informatie willen over jullie coaching diensten en hoe deze mij kunnen helpen. Kunnen jullie wat meer informatie verstrekken?\n\nBij voorbaat dank,\nJohn'
};

/**
 * EmailFrame component to safely render email templates in an iframe
 */
interface EmailFrameProps {
  title: string;
  description: string;
  html: string;
}

const EmailFrame = ({ title, description, html }: EmailFrameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;

      if (iframeDocument) {
        // Add default styling to the iframe document
        iframeDocument.open();
        iframeDocument.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>${title}</title>
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                }
              </style>
            </head>
            <body>
              ${html}
            </body>
          </html>
        `);
        iframeDocument.close();

        // Adjust iframe height to match content
        const setHeight = () => {
          const body = iframeDocument.body;
          const html = iframeDocument.documentElement;
          const height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
          );
          iframe.style.height = `${height}px`;
        };

        // Set height after a short delay to ensure content is rendered
        setTimeout(setHeight, 50);
      }
    }
  }, [html, title]);

  return (
    <Box className="w-full max-w-[700px] mx-auto">
      <Text variant="large" weight="bold" className="mb-4">{title}</Text>
      <Text variant="default" className="mb-6">{description}</Text>
      <Box className="border rounded-lg overflow-hidden shadow-md">
        <iframe
          ref={iframeRef}
          title={title}
          className="w-full border-0"
          style={{ minHeight: '600px' }}
        />
      </Box>
    </Box>
  );
};

/**
 * Contact notification email sent to Leenders Coaching
 */
export const NotificationEmail: Story = {
  render: () => {
    const [html, setHtml] = useState('');

    useEffect(() => {
      const renderEmail = async () => {
        try {
          const rendered = await render(<ContactNotification {...sampleData} />);
          setHtml(rendered);
        } catch (error) {
          console.error('Error rendering email:', error);
        }
      };

      renderEmail();
    }, []);

    return (
      <EmailFrame
        title="Contact Notificatie Email"
        description="Deze email wordt verzonden naar Leenders Coaching wanneer iemand het contactformulier invult."
        html={html}
      />
    );
  }
};

/**
 * Confirmation email sent to the user
 */
export const ConfirmationEmail: Story = {
  render: () => {
    const [html, setHtml] = useState('');

    useEffect(() => {
      const renderEmail = async () => {
        try {
          const rendered = await render(<ContactConfirmation name={sampleData.name} subject={sampleData.subject} />);
          setHtml(rendered);
        } catch (error) {
          console.error('Error rendering email:', error);
        }
      };

      renderEmail();
    }, []);

    return (
      <EmailFrame
        title="Contact Bevestiging Email"
        description="Deze email wordt verzonden naar de gebruiker als bevestiging na het invullen van het contactformulier."
        html={html}
      />
    );
  }
}; 