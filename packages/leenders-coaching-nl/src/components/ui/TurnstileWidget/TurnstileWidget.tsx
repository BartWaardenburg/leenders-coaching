'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

type Appearance = 'always' | 'execute' | 'interaction-only';
type Execution = 'render' | 'execute';

interface TurnstileOptions {
  sitekey: string;
  cData?: string;
  callback?: (token: string) => void;
  'error-callback'?: () => void;
  'expired-callback'?: () => void;
  'timeout-callback'?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact' | 'flexible';
  appearance?: Appearance;
  execution?: Execution;
  'feedback-enabled'?: boolean;
}

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement | string, opts: TurnstileOptions) => string;
      execute: (id: string) => void;
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
 * Turnstile CAPTCHA widget component - optimized for minimal visual impact
 *
 * Features:
 * - appearance: 'interaction-only' - only shows when interaction is needed
 * - execution: 'render' - prepares token in background
 * - size: 'flexible' - responsive sizing
 * - theme: 'auto' - adapts to site theme
 * - feedback-enabled: false - removes feedback link
 *
 * Alternative: For multi-step forms, use execution: 'execute' and call
 * window.turnstile?.execute(widgetId.current) in submit handler
 *
 * For completely invisible operation: Create an "Invisible" sitekey in Cloudflare
 * dashboard and use that instead of the current "Managed" sitekey
 *
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
              theme: 'auto',
              size: 'flexible',
              appearance: 'interaction-only',
              execution: 'render',
              'feedback-enabled': false,
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
