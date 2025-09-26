/**
 * Get client IP address from request headers
 * @param req - The incoming request
 * @returns The client IP address
 */
/**
 * Best-effort client IP extractor
 */
export function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) {
    const first = xff
      .split(',')
      .map((s) => s.trim())
      .find(Boolean);
    if (first) return first;
  }

  return (
    req.headers.get('x-real-ip') || req.headers.get('cf-connecting-ip') || ''
  );
}

/**
 * Validate Turnstile token with Cloudflare
 * @param token - The Turnstile token to validate
 * @param ip - Optional client IP address
 * @returns Promise resolving to validation response
 */
export async function validateTurnstile(
  token: string,
  ip?: string
): Promise<{
  success: boolean;
  hostname?: string;
  cdata?: string;
  'error-codes'?: string[];
}> {
  const body = new URLSearchParams({
    secret:
      process.env.NODE_ENV === 'development'
        ? '2x0000000000000000000000000000000AA'
        : process.env.TURNSTILE_SECRET_KEY!,
    response: token,
  });

  if (ip) body.append('remoteip', ip);

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    }
  );

  return response.json();
}
