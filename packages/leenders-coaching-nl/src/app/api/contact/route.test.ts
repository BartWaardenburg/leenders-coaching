import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

/* Set environment variables before importing the module */
process.env.RESEND_API_KEY = 'test-api-key';

import { POST } from './route';

/*
 * Mock the contact utility.
 * submitContactForm is mocked but not used directly in these tests.
 */
vi.mock('@/utilities/contact', () => ({
  submitContactForm: vi.fn(),
}));

/*
 * Mock the email templates for confirmation and notification.
 */
vi.mock('@/emails', () => ({
  ContactConfirmation: vi.fn(() => 'confirmation-email'),
  ContactNotification: vi.fn(() => 'notification-email'),
}));

/*
 * Mock the Resend email service.
 */
vi.mock('resend', () => {
  const mockSend = vi.fn().mockResolvedValue({
    data: { id: 'test-email-id' },
    error: null,
  });

  return {
    Resend: class MockResend {
      emails = { send: mockSend };
    },
  };
});

/*
 * Mock the Turnstile utility.
 */
vi.mock('@/utilities/turnstile', () => ({
  validateTurnstile: vi.fn().mockResolvedValue({
    success: true,
    hostname: 'localhost',
    cdata: 'contact',
  }),
  clientIp: vi.fn().mockReturnValue('127.0.0.1'),
}));

/**
 * Test suite for the contact API route.
 * Mailing is currently disabled (MAILING_DISABLED = true), so all requests return 503.
 */
describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  /**
   * All requests should return 503 while mailing is disabled.
   */
  it('should return 503 when mailing is disabled', async () => {
    const mockData = {
      name: 'Jan van der Berg',
      email: 'jan.vandenberg@example.nl',
      phone: '+31 6 12345678',
      message: 'Hallo, ik ben geïnteresseerd in jullie coaching diensten.',
      subject: 'Vraag over coaching sessies',
      turnstileToken: 'test-turnstile-token',
      startedAt: Date.now() - 2000,
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(mockData),
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(503);
    expect(result).toEqual({
      error: 'Contact form is temporarily disabled',
    });
  });

  it('should return 503 for missing fields when mailing is disabled', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test' }),
    });

    const response = await POST(request);

    expect(response.status).toBe(503);
  });

  it('should return 503 for invalid JSON when mailing is disabled', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: 'invalid-json',
    });

    const response = await POST(request);

    expect(response.status).toBe(503);
  });
});
