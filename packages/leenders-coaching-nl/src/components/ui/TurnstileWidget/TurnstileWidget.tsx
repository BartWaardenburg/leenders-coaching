'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

interface TurnstileOptions {
  sitekey: string;
  cData?: string;
  callback?: (token: string) => void;
  'error-callback'?: () => void;
  'expired-callback'?: () => void;
  'timeout-callback'?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
}

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement | string, opts: TurnstileOptions) => string;
      reset: (id?: string) => void;
      remove: (id: string) => void;
    };
  }
}

type Props = {
  onToken: (t: string) => void;
  cdata: 'contact' | 'booking';
  className?: string;
};

/**
 * Turnstile CAPTCHA widget component
 * @param onToken - Callback function called when token is received or cleared
 * @param cdata - Context data identifier ('contact' or 'booking')
 * @param className - Optional CSS class for styling
 */
export default function TurnstileWidget({ onToken, cdata, className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | undefined>(undefined);

  // Optional cleanup when unmounting:
  useEffect(() => {
    return () => {
      if (widgetId.current && window.turnstile?.remove) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch {}
      }
    };
  }, []);

  return (
    <>
      <Script
        id="cf-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="lazyOnload"
        onReady={() => {
          if (ref.current && window.turnstile && !widgetId.current) {
            widgetId.current = window.turnstile.render(ref.current, {
              sitekey:
                process.env.NODE_ENV === 'development'
                  ? '1x00000000000000000000AA'
                  : process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
              cData: cdata,
              callback: onToken,
              'error-callback': () => onToken(''),
              'expired-callback': () => onToken(''),
              'timeout-callback': () => onToken(''),
            });
          }
        }}
      />
      <div ref={ref} className={className} />
    </>
  );
}
