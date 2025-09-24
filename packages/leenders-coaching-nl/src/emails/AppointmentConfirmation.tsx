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
  Button,
  Link,
} from '@react-email/components';

type AppointmentConfirmationProps = {
  /** Client's name */
  name: string;
  /** Selected date for the appointment */
  selectedDate: string;
  /** Selected time slot */
  selectedTimeSlot: {
    startTime?: string;
    duration?: number;
  };
};

/**
 * Utility function to format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} A localized, human-friendly date in Dutch
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
 * @param {string | undefined} timeString - HH:MM time string
 * @returns {string} A localized 24h time in Dutch or empty string
 */
const formatTime = (timeString?: string): string => {
  if (!timeString) return '';

  // Time is already in HH:MM format, just return it
  return timeString;
};

/**
 * Calculate and format end time from start time and duration
 * @param {string | undefined} startTime - Start time in HH:MM format
 * @param {number | undefined} duration - Duration in minutes
 * @returns {string} End time in HH:MM format
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
 * Email template for confirming appointment requests to clients
 * (Structure preserved; copy tuned to brand voice: warm, nuchter, duidelijk)
 *
 * @param {AppointmentConfirmationProps} props - Component props
 * @returns {JSX.Element} The appointment confirmation email
 */
export const AppointmentConfirmation = ({
  name,
  selectedDate,
  selectedTimeSlot,
}: AppointmentConfirmationProps) => {
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
      <Preview>
        Bedankt voor je aanvraag—binnen 24 uur ontvang je onze bevestiging.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Row>
              <Column style={{ verticalAlign: 'middle' }}>
                <div style={{ textAlign: 'center', margin: '0 auto' }}>
                  <Img
                    src="/images/logo-color.png"
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

          <Heading style={heading}>Afspraakaanvraag ontvangen</Heading>

          <Section style={contentSection}>
            <Text style={text}>Beste {name},</Text>

            <Text style={text}>
              Bedankt voor je aanvraag—fijn dat je deze stap zet. Ik heb je
              (kennismakings)gesprek ontvangen. Binnen 24 uur hoor je van mij om
              de afspraak te bevestigen of een passend alternatief voor te
              stellen.
            </Text>

            <Section style={appointmentBox}>
              <Text style={appointmentTitle}>Je aanvraag in het kort</Text>
              <Text style={label}>
                <strong>Datum:</strong> {formatDate(selectedDate)}
              </Text>
              <Text style={label}>
                <strong>Starttijd:</strong>{' '}
                {formatTime(selectedTimeSlot.startTime)}
              </Text>
              {selectedTimeSlot.duration && (
                <Text style={label}>
                  <strong>Eindtijd:</strong>{' '}
                  {formatEndTime(
                    selectedTimeSlot.startTime,
                    selectedTimeSlot.duration
                  )}
                </Text>
              )}
            </Section>

            <Text style={text}>
              <strong>Wat kun je verwachten?</strong>
            </Text>

            <Text style={text}>
              • Ik check de agenda en reageer binnen 24 uur
              <br />
              • Ik bevestig je afspraak of doe een alternatief voorstel
              <br />• Je ontvangt een bevestiging met alle details
            </Text>

            <Section style={buttonContainer}>
              <Button href="https://leenders-coaching.nl/" style={button}>
                Bezoek mijn website
              </Button>
            </Section>
          </Section>

          <Hr style={divider} />

          <Section style={footerSection}>
            <Text style={text}>
              Vragen of wil je je aanvraag wijzigen? Mail mij via{' '}
              <Link
                href="mailto:simone@leenders-coaching.nl"
                style={footerLink}
              >
                simone@leenders-coaching.nl
              </Link>{' '}
              of bel{' '}
              <Link href="tel:+31612345678" style={footerLink}>
                06-12345678
              </Link>
              .
            </Text>

            <Text style={text}>Ik kijk ernaar uit om je te ontmoeten!</Text>

            <Text style={signature}>
              Tot snel,
              <br />
              Simone Leenders
            </Text>

            <Text style={footer}>
              © {new Date().getFullYear()} Leenders Coaching. Alle rechten
              voorbehouden.
              <br />
              <Link
                style={footerLink}
                href="https://leenders-coaching.nl/privacy"
              >
                Privacy Beleid
              </Link>{' '}
              •{' '}
              <Link
                style={footerLink}
                href="https://leenders-coaching.nl/voorwaarden"
              >
                Algemene Voorwaarden
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

/* Email styles */
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
  marginBottom: '24px',
  textAlign: 'center' as const,
  borderBottom: '1px solid rgba(31, 41, 55, 0.1)',
  maxWidth: '100%',
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

const contentSection = {
  padding: '32px 40px 0',
  marginBottom: '0',
  position: 'relative' as const,
  maxWidth: '100%',
  overflowWrap: 'break-word' as const,
  overflow: 'hidden' as const,
};

const text = {
  fontFamily:
    'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
  fontSize: '16px',
  fontWeight: '400',
  color: '#4B5563',
  lineHeight: '1.75',
  marginBottom: '24px',
  maxWidth: '100%',
  overflowWrap: 'break-word' as const,
  wordBreak: 'break-word' as const,
};

const buttonContainer = {
  marginTop: '40px',
  marginBottom: '40px',
  textAlign: 'center' as const,
  maxWidth: '100%',
  overflowWrap: 'break-word' as const,
};

const button = {
  backgroundColor: 'transparent',
  color: '#1F2937',
  padding: '16px 32px',
  fontFamily:
    'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
  fontWeight: '500',
  fontSize: '13px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  border: '1px solid #1F2937',
  maxWidth: '90%',
  overflowWrap: 'break-word' as const,
  transition: 'all 0.2s ease-in-out',
};

const divider = {
  borderColor: 'rgba(31, 41, 55, 0.1)',
  margin: '32px 40px',
  maxWidth: '90%',
};

const footerSection = {
  padding: '0 40px',
  maxWidth: '100%',
  overflow: 'hidden' as const,
};

const footerLink = {
  color: '#1F2937',
  textDecoration: 'none',
  fontWeight: '500',
  fontFamily:
    'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
  fontSize: '13px',
  letterSpacing: '0.1em',
  transition: 'color 0.2s ease-in-out',
};

const appointmentBox = {
  backgroundColor: '#f8f9fa',
  border: '1px solid #e9ecef',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
};

const appointmentTitle = {
  color: '#2d5a2d',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const label = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '8px 0',
};

const signature = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '24px 0',
  fontStyle: 'italic',
};

const footer = {
  fontFamily:
    'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
  fontWeight: '400',
  fontSize: '13px',
  color: '#6B7280',
  textAlign: 'center' as const,
  marginTop: '32px',
  padding: '0',
  lineHeight: '1.75',
  letterSpacing: '0.1em',
};

export default AppointmentConfirmation;
