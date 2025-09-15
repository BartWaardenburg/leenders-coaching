/**
 * Mock data for email components and tests
 * Contains Dutch content for realistic testing scenarios
 */

import React from 'react';

export const mockContactFormData = {
  name: 'Jan van der Berg',
  email: 'jan.vandenberg@example.nl',
  phone: '+31 6 12345678',
  subject: 'Vraag over coaching sessies',
  message:
    'Hallo, ik ben geïnteresseerd in jullie coaching diensten. Kunnen we een afspraak maken voor een kennismakingsgesprek?',
};

export const mockContactFormDataSpecialChars = {
  name: "José María O'Connor-Smith",
  email: 'jose.maria@example-domain.co.uk',
  phone: '+31 6 98765432',
  subject: 'Vraag over coaching: !@#$%^&*()',
  message:
    'Hallo, ik ben geïnteresseerd in jullie coaching diensten. Kunnen we een afspraak maken voor een kennismakingsgesprek?\n\nMet vriendelijke groet,\nJosé María',
};

export const mockContactFormDataLong = {
  name: 'Anna de Vries',
  email: 'anna.devries@example.nl',
  phone: '+31 6 55555555',
  subject:
    'Uitgebreide vraag over loopbaancoaching en persoonlijke ontwikkeling',
  message:
    "Beste team, ik schrijf u omdat ik al geruime tijd overweeg om professionele coaching te nemen. Ik werk momenteel als projectmanager bij een middelgrote organisatie, maar voel me niet meer uitgedaagd in mijn huidige rol. Ik zou graag willen verkennen welke mogelijkheden er zijn voor mijn verdere carrièreontwikkeling. Daarnaast merk ik dat ik soms moeite heb met het stellen van grenzen en het managen van stress. Ik ben benieuwd of jullie coaching programma's hebben die hierbij kunnen helpen. Kunnen we een vrijblijvend gesprek plannen om te kijken of we een goede match zijn? Ik hoor graag van u. Met vriendelijke groet, Anna de Vries",
};

export const mockContactFormDataEmpty = {
  name: 'Test Gebruiker',
  email: 'test@example.nl',
  phone: '',
  subject: '',
  message: '',
};

export const mockEmailComponents = {
  Html: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'html' }, children),
  Body: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'body' }, children),
  Container: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'container' }, children),
  Text: ({ children }: { children: React.ReactNode }) =>
    React.createElement('p', {}, children),
  Preview: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'preview' }, children),
  Section: ({ children }: { children: React.ReactNode }) =>
    React.createElement('section', {}, children),
  Hr: () => React.createElement('hr', {}),
  Head: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'head' }, children),
  Row: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'row' }, children),
  Column: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'column' }, children),
  Heading: ({ children }: { children: React.ReactNode }) =>
    React.createElement('h1', {}, children),
  Button: ({ children, href }: { children: React.ReactNode; href: string }) =>
    React.createElement('a', { href, 'data-testid': 'button' }, children),
  Link: ({ children, href }: { children: React.ReactNode; href: string }) =>
    React.createElement('a', { href }, children),
  Img: ({ src, alt }: { src: string; alt: string }) =>
    React.createElement('img', { src, alt, 'data-testid': 'img' }),
};

export const mockEmailResponses = {
  success: {
    success: true,
    notificationId: 'test-email-id',
    confirmationId: 'test-email-id',
  },
  error: {
    error: 'Er is een fout opgetreden bij het versturen van het bericht',
  },
  missingFields: {
    error: 'Ontbrekende verplichte velden',
  },
};

export const mockEmailTemplates = {
  confirmation: {
    name: 'Jan van der Berg',
    subject: 'Vraag over coaching sessies',
  },
  notification: {
    name: 'Jan van der Berg',
    email: 'jan.vandenberg@example.nl',
    subject: 'Vraag over coaching sessies',
    message:
      'Hallo, ik ben geïnteresseerd in jullie coaching diensten. Kunnen we een afspraak maken voor een kennismakingsgesprek?',
  },
};
