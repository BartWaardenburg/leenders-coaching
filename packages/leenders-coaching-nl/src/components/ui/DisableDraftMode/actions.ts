'use server';

import { draftMode } from 'next/headers';

/**
 * Server action to disable draft mode
 * Used by the DisableDraftMode component
 */
export async function disableDraftMode() {
  await (await draftMode()).disable();
}

/**
 * Server action to enable draft mode
 * Used by the DisableDraftMode component to toggle back to draft mode
 */
export async function enableDraftMode() {
  await (await draftMode()).enable();
}
