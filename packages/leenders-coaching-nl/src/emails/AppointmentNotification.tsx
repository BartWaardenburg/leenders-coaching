import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Hr,
  Preview,
  Row,
  Column,
  Img,
  Link,
} from '@react-email/components';

type AppointmentNotificationProps = {
  /** Client's name */
  name: string;
  /** Client's email address */
  email: string;
  /** Client's phone number (optional) */
  phone?: string;
  /** Selected date for the appointment */
  selectedDate: string;
  /** Selected time slot */
  selectedTimeSlot: {
    startTime?: string;
    duration?: number;
  };
  /** Client's message (optional) */
  message?: string;
};

/**
 * Utility function to format date for display
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('nl-NL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Utility function to format time for display
 */
const formatTime = (timeString?: string): string => {
  if (!timeString) return '';

  // Time is already in HH:MM format, just return it
  return timeString;
};

/**
 * Calculate and format end time from start time and duration
 */
const formatEndTime = (startTime?: string, duration?: number): string => {
  if (!startTime || !duration) return '';

  const timeParts = startTime.split(':').map(Number);
  const hours = timeParts[0];
  const minutes = timeParts[1];

  if (hours === undefined || minutes === undefined) return '';

  const startMinutes = hours * 60 + minutes;
  const endMinutes = startMinutes + duration;

  const endHours = Math.floor(endMinutes / 60);
  const endMins = endMinutes % 60;

  return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
};

/**
 * Email template for notifying the coach about new appointment requests
 */
export const AppointmentNotification = ({
  name,
  email,
  phone,
  selectedDate,
  selectedTimeSlot,
  message,
}: AppointmentNotificationProps) => {
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
      <Preview>Nieuwe afspraakaanvraag van {name}</Preview>
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

          <Heading style={heading}>Nieuwe afspraakaanvraag ontvangen</Heading>

          <Section style={gradientBorder}>
            <Section style={section}>
              <Text style={infoLabel}>Naam</Text>
              <Text style={infoValue}>{name}</Text>

              <Text style={infoLabel}>Email</Text>
              <Text style={infoValue}>
                <Link href={`mailto:${email}`} style={link}>
                  {email}
                </Link>
              </Text>

              {phone && (
                <>
                  <Text style={infoLabel}>Telefoon</Text>
                  <Text style={infoValue}>
                    <Link href={`tel:${phone}`} style={link}>
                      {phone}
                    </Link>
                  </Text>
                </>
              )}

              <Text style={infoLabel}>Datum</Text>
              <Text style={infoValue}>{formatDate(selectedDate)}</Text>

              <Text style={infoLabel}>Starttijd</Text>
              <Text style={infoValue}>
                {formatTime(selectedTimeSlot.startTime)}
              </Text>

              {selectedTimeSlot.duration && (
                <>
                  <Text style={infoLabel}>Eindtijd</Text>
                  <Text style={infoValue}>
                    {formatEndTime(
                      selectedTimeSlot.startTime,
                      selectedTimeSlot.duration
                    )}
                  </Text>
                </>
              )}

              {message && (
                <>
                  <Hr style={divider} />
                  <Text style={infoLabel}>Bericht van de klant</Text>
                  <Text style={messageStyle}>{message}</Text>
                </>
              )}
            </Section>
          </Section>

          <Hr style={divider} />

          <Section style={footerSection}>
            <Text style={footer}>
              Deze aanvraag is verzonden via het afspraakformulier op de
              website. Neem contact op met de klant om de afspraak te
              bevestigen.
            </Text>
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

// Email styles
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

export default AppointmentNotification;
