/**
 * Pukico Configuration
 * Reads environment variables with safe defaults.
 */

export const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').trim().replace(/\/+$/, '');
export const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();
export const DISCORD_INVITE_URL = (import.meta.env.VITE_DISCORD_INVITE_URL || '').trim();
export const X_URL = (import.meta.env.VITE_X_URL || '').trim();
export const SITE_URL = (import.meta.env.VITE_SITE_URL || '').trim();

export const isBackendConfigured = (): boolean => {
  const configured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
  if (!configured) {
    // Only warn once in console
    if (typeof window !== 'undefined' && !(window as unknown as { __pukico_warned?: boolean }).__pukico_warned) {
      console.warn(
        '[Pukico Config] SUPABASE_URL atau SUPABASE_ANON_KEY belum diset di environment variables. Fitur pengecekan ID dan form waitlist dinonaktifkan (tidak melakukan mock submission).'
      );
      (window as unknown as { __pukico_warned?: boolean }).__pukico_warned = true;
    }
  }
  return configured;
};
