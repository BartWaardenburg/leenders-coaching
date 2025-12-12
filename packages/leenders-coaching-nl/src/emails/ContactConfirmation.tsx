import {
  Html,
  Body,
  Container,
  Text,
  Preview,
  Section,
  Hr,
  Head,
  Row,
  Column,
  Heading,
  Button,
  Link,
  Img,
} from '@react-email/components';

interface ContactConfirmationProps {
  name: string;
  subject: string;
}

export const ContactConfirmation = ({
  name,
  subject,
}: ContactConfirmationProps) => {
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
      <Preview>Bedankt voor je bericht aan Leenders Coaching</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Row>
              <Column style={{ verticalAlign: 'middle' }}>
                <div style={{ textAlign: 'center', margin: '0 auto' }}>
                  <Img
                    src={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.leenders-coaching.nl'}/images/logo-color.png`}
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

          <Heading style={heading}>Bedankt voor je bericht!</Heading>

          <Section style={contentSection}>
            <Text style={text}>Beste {name},</Text>
            <Text style={text}>
              Bedankt voor je bericht met het onderwerp &quot;{subject}&quot;.
              Ik heb je bericht goed ontvangen.
            </Text>
            <Text style={text}>
              Ik zal je bericht zo snel mogelijk bekijken en binnen 2 werkdagen
              reageren. Tijdens drukke periodes kan dit iets langer duren, maar
              ik doe mijn best om je zo snel mogelijk te helpen.
            </Text>
            <Text style={text}>
              Als je vragen hebt of aanvullende informatie wilt delen, kun je
              altijd reageren op deze e-mail.
            </Text>

            <Section style={buttonContainer}>
              <Button href="https://www.leenders-coaching.nl" style={button}>
                Bezoek mijn website
              </Button>
            </Section>
          </Section>

          <Hr style={divider} />

          <Section style={footerSection}>
            <Text style={footer}>
              © {new Date().getFullYear()} Leenders Coaching. Alle rechten
              voorbehouden.
              <br />
              <Link
                style={footerLink}
                href="https://www.leenders-coaching.nl/privacy"
              >
                Privacy Beleid
              </Link>{' '}
              •{' '}
              <Link
                style={footerLink}
                href="https://www.leenders-coaching.nl/voorwaarden"
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

export default ContactConfirmation;
