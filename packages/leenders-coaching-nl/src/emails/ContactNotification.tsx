import * as React from 'react';
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
  Section,
  Hr,
  Head,
  Row,
  Column,
  Heading,
  Img,
} from '@react-email/components';

interface ContactNotificationProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactNotification = ({
  name,
  email,
  subject,
  message,
}: ContactNotificationProps) => {
  return (
    <Html>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @font-face {
              font-family: 'Playfair Display';
              font-style: normal;
              font-weight: 700;
              src: url(https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeiunDXbtXK-F2qC0s.woff2) format('woff2');
            }
            @font-face {
              font-family: 'Montserrat';
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXp-p7K4GLs.woff2) format('woff2');
            }
            @font-face {
              font-family: 'Montserrat';
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtZ6Hw5aXp-p7K4GLs.woff2) format('woff2');
            }

            * {
              font-family: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            }

            h1, h2, h3, h4, h5, h6 {
              font-family: "Playfair Display", serif, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
              font-weight: 700;
              letter-spacing: -1.8px;
              line-height: 1.25;
              color: rgb(48, 36, 29);
            }
          `,
          }}
        />
      </Head>
      <Preview>Nieuw contactformulier bericht van {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Row>
              <Column style={{ verticalAlign: 'middle' }}>
                <div style={{ textAlign: 'center', margin: '0 auto' }}>
                  <Img
                    src={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://leenders-coaching.nl'}/images/logo-color.png`}
                    width="200"
                    height="auto"
                    alt="Leenders Coaching"
                    style={{
                      margin: '12px auto',
                      display: 'block',
                      maxHeight: '60px',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                </div>
              </Column>
            </Row>
          </Section>

          <Heading style={heading}>Nieuw contact bericht ontvangen</Heading>

          <Section style={gradientBorder}>
            <Section style={section}>
              <Text style={infoLabel}>Afzender</Text>
              <Text style={infoValue}>{name}</Text>

              <Text style={infoLabel}>Email</Text>
              <Text style={infoValue}>
                <Link href={`mailto:${email}`} style={link}>
                  {email}
                </Link>
              </Text>

              <Text style={infoLabel}>Onderwerp</Text>
              <Text style={infoValue}>{subject}</Text>

              <Hr style={divider} />

              <Text style={infoLabel}>Bericht</Text>
              <Text style={messageStyle}>{message}</Text>
            </Section>
          </Section>

          <Hr style={divider} />

          <Section style={footerSection}>
            <Text style={footer}>
              © {new Date().getFullYear()} Leenders Coaching. Alle rechten
              voorbehouden.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#F5F5F5',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  color: '#1F2937',
  padding: '24px 0',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '48px 0',
  maxWidth: '600px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  wordBreak: 'break-word' as const,
  overflow: 'hidden' as const,
};

const headerSection = {
  padding: '0 40px 24px',
  textAlign: 'center' as const,
  borderBottom: '1px solid rgba(31, 41, 55, 0.1)',
  maxWidth: '100%',
  overflow: 'hidden' as const,
};

const gradientBorder = {
  borderLeft: '1px solid #1F2937',
  margin: '0 40px',
  maxWidth: '90%',
  overflowWrap: 'break-word' as const,
};

const section = {
  backgroundColor: '#ffffff',
  padding: '0 32px',
  maxWidth: '100%',
  overflowWrap: 'break-word' as const,
  overflow: 'hidden' as const,
};

const heading = {
  fontFamily:
    '"Playfair Display", serif, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  fontSize: '38px',
  fontWeight: '700',
  color: 'rgb(48, 36, 29)',
  padding: '0',
  margin: '0 0 24px 0',
  textAlign: 'center' as const,
  maxWidth: '100%',
  overflowWrap: 'break-word' as const,
  wordBreak: 'break-word' as const,
  letterSpacing: '-1.8px',
  lineHeight: '1.25',
  hyphens: 'auto' as const,
  transition: 'color 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
};

const infoLabel = {
  fontSize: '13px',
  fontFamily:
    'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
  fontWeight: '500',
  color: '#6B7280',
  marginBottom: '8px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  maxWidth: '100%',
  overflowWrap: 'break-word' as const,
};

const infoValue = {
  fontFamily:
    'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
  fontWeight: '400',
  fontSize: '16px',
  color: '#1F2937',
  marginTop: '0',
  marginBottom: '24px',
  lineHeight: '1.75',
  maxWidth: '100%',
  overflowWrap: 'break-word' as const,
  wordBreak: 'break-word' as const,
};

const messageStyle = {
  fontFamily:
    'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
  fontWeight: '400',
  fontSize: '16px',
  color: '#1F2937',
  marginTop: '0',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word' as const,
  overflowWrap: 'break-word' as const,
  lineHeight: '1.75',
  padding: '24px',
  backgroundColor: '#F9FAFB',
  border: '1px solid rgba(31, 41, 55, 0.1)',
  maxWidth: '100%',
  overflow: 'hidden' as const,
};

const divider = {
  borderColor: 'rgba(31, 41, 55, 0.1)',
  margin: '32px 0',
};

const link = {
  color: '#1F2937',
  textDecoration: 'none',
  fontWeight: '500',
  fontFamily:
    'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
  fontSize: '13px',
  letterSpacing: '0.1em',
  borderBottom: '1px solid rgba(31, 41, 55, 0.2)',
  transition: 'border-color 0.2s ease-in-out',
};

const footerSection = {
  padding: '0 40px',
  maxWidth: '100%',
  overflow: 'hidden' as const,
};

const footer = {
  fontFamily:
    'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
  fontWeight: '400',
  fontSize: '13px',
  color: '#6B7280',
  textAlign: 'center' as const,
  marginTop: '32px',
  letterSpacing: '0.1em',
  lineHeight: '1.75',
};

export default ContactNotification;
