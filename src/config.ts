/**
 * Pukico Configuration
 * Reads environment variables with safe defaults.
 */

export const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').trim().replace(/\/+$/, '');
export const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();
export const DISCORD_INVITE_URL = (import.meta.env.VITE_DISCORD_INVITE_URL || '').trim();
export const X_URL = (import.meta.env.VITE_X_URL || '').trim();
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://pukico.xyz').trim().replace(/\/+$/, '');
export const CONTACT_EMAIL: string = 'hello@pukico.xyz';

export const isLiveBackendConfigured = (): boolean => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return false;
  const url = SUPABASE_URL.toLowerCase();
  const key = SUPABASE_ANON_KEY.toLowerCase();
  // Filter out dummy/placeholder values commonly present in template environments
  if (
    url.includes('your-project') ||
    url.includes('example.com') ||
    url.includes('placeholder') ||
    key.includes('your-anon') ||
    key.includes('placeholder')
  ) {
    return false;
  }
  return true;
};

export const isBackendConfigured = (): boolean => {
  return true;
};

