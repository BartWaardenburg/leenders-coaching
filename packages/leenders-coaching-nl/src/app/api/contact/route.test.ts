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
 * Covers valid submissions, missing fields, invalid JSON, and error handling.
 */
describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    /*
     * If you need to mock sendContactEmail's resolved value, do it here.
     * Example:
     * vi.mocked(sendContactEmail).mockResolvedValue({ success: true });
     */
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Should handle valid contact form submission.
   */
  it('should handle valid contact form submission', async () => {
    const mockData = {
      name: 'Jan van der Berg',
      email: 'jan.vandenberg@example.nl',
      phone: '+31 6 12345678',
      message: 'Hallo, ik ben geïnteresseerd in jullie coaching diensten.',
      subject: 'Vraag over coaching sessies',
      turnstileToken: 'test-turnstile-token',
      startedAt: Date.now() - 2000, // 2 seconds ago, meets minimum 1.2s requirement
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(mockData),
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result).toEqual({
      success: true,
      notificationId: 'test-email-id',
      confirmationId: 'test-email-id',
    });
  });

  /**
   * Should handle missing required fields (email, subject).
   */
  it('should handle missing required fields', async () => {
    const mockData = {
      name: 'Jan van der Berg',
      /* Missing email, subject */
      message: 'Hallo, ik ben geïnteresseerd in jullie coaching diensten.',
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(mockData),
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result).toEqual({
      error: 'Missing required fields',
    });
  });

  /**
   * Should handle missing subject field.
   */
  it('should handle missing subject field', async () => {
    const mockData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message',
      /* Missing subject */
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(mockData),
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result).toEqual({
      error: 'Missing required fields',
    });
  });

  /**
   * Should handle missing name field.
   */
  it('should handle missing name field', async () => {
    const mockData = {
      email: 'john@example.com',
      subject: 'Test subject',
      message: 'Test message',
      /* Missing name */
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(mockData),
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result).toEqual({
      error: 'Missing required fields',
    });
  });

  /**
   * Should handle missing email field.
   */
  it('should handle missing email field', async () => {
    const mockData = {
      name: 'John Doe',
      subject: 'Test subject',
      message: 'Test message',
      /* Missing email */
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(mockData),
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result).toEqual({
      error: 'Missing required fields',
    });
  });

  /**
   * Should handle missing message field.
   */
  it('should handle missing message field', async () => {
    const mockData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test subject',
      /* Missing message */
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(mockData),
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result).toEqual({
      error: 'Missing required fields',
    });
  });

  /**
   * Should handle invalid JSON in request body.
   */
  it('should handle invalid JSON in request body', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: 'invalid-json',
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(500);
    expect(result).toEqual({
      error: 'Failed to send message',
    });
  });
});
