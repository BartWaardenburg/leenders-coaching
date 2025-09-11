import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitContactForm } from './contact';
import type { ContactFormData } from '@/components/sections/SectionForm/SectionForm';

// Mock fetch globally
global.fetch = vi.fn();

describe('contact API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('submitContactForm', () => {
    it('should submit contact form data successfully', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as Response);

      const formData: ContactFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message',
      };

      await expect(submitContactForm(formData)).resolves.toBeUndefined();

      expect(fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    });

    it('should throw error when API request fails', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as Response);

      const formData: ContactFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message',
      };

      await expect(submitContactForm(formData)).rejects.toThrow(
        'Failed to submit contact form'
      );

      expect(fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    });

    it('should handle network errors', async () => {
      vi.mocked(fetch).mockRejectedValue(new Error('Network error'));

      const formData: ContactFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message',
      };

      await expect(submitContactForm(formData)).rejects.toThrow(
        'Network error'
      );
    });

    it('should handle special characters in form data', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as Response);

      const formData: ContactFormData = {
        name: "José María O'Connor-Smith",
        email: 'john+test@example-domain.co.uk',
        subject: 'Test Subject with Special Chars: !@#$%^&*()',
        message:
          'Test message with special chars: !@#$%^&*() and newlines:\nLine 2\nLine 3',
      };

      await expect(submitContactForm(formData)).resolves.toBeUndefined();

      expect(fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    });

    it('should handle empty form data', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as Response);

      const formData: ContactFormData = {
        name: '',
        email: '',
        subject: '',
        message: '',
      };

      await expect(submitContactForm(formData)).resolves.toBeUndefined();

      expect(fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    });

    it('should handle very long form data', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as Response);

      const longMessage = 'A'.repeat(10000);
      const formData: ContactFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: longMessage,
      };

      await expect(submitContactForm(formData)).resolves.toBeUndefined();

      expect(fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    });
  });
});
