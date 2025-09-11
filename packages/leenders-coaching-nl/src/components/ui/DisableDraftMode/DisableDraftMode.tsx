'use client';

import { useTransition, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'motion/react';

import { IconToggleButton } from '@/components/ui/IconToggleButton';
import { Icon } from '@/components/ui/Icon';
import { Box } from '@/components/ui/Box';
import { modalStyles, type ModalVariant } from '@/components/ui/Modal/Modal';
import { disableDraftMode } from './actions';
import { iconPaths } from '@/config/icons.config';

type DisableDraftModeProps = {
  variant?: ModalVariant;
  className?: string;
};

/**
 * Component to disable draft mode when viewing draft content outside of Presentation tool
 * Shows a floating toast-like button in the bottom-right corner when not in an iframe
 * Uses IconToggleButton with edit icon, loading state, and Toast styling variants
 */
export const DisableDraftMode = ({
  variant = 'blue',
  className,
}: DisableDraftModeProps) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [isInIframe, setIsInIframe] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    /* Check if we're in an iframe (Presentation tool) */
    setIsInIframe(window !== window.parent || !!window.opener);
  }, []);

  /* Don't render anything until mounted on client */
  if (!isMounted) {
    return null;
  }

  /* Don't show the button if we're in an iframe (Presentation tool) */
  if (isInIframe) {
    return null;
  }

  const handleDisable = () =>
    startTransition(async () => {
      await disableDraftMode();
      router.refresh();
    });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={twMerge('fixed bottom-6 right-6 z-50', className)}
      >
        <Box
          className={twMerge(
            'relative border p-2 shadow-lg overflow-hidden',
            modalStyles[variant],
            'transition-all duration-300',
            'hover:shadow-xl',
            'hover:scale-105',
            'group'
          )}
        >
          {pending ? (
            <Box className="p-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-6 h-6"
              >
                <Icon
                  path={iconPaths.draft.loading}
                  className="w-6 h-6 text-muted-foreground"
                />
              </motion.div>
            </Box>
          ) : (
            <IconToggleButton
              isToggled={false}
              defaultIcon={iconPaths.draft.edit}
              toggledIcon={iconPaths.draft.edit}
              label="Disable draft mode"
              onClick={handleDisable}
              speed="quick"
              className={twMerge(
                'w-10 h-10',
                'bg-transparent hover:bg-current/10',
                'border-0',
                'transition-all duration-200',
                'text-inherit'
              )}
            />
          )}
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};
