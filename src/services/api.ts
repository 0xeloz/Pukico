import { SUPABASE_URL, SUPABASE_ANON_KEY, isLiveBackendConfigured } from '../config';

// In-memory mock store for AI Studio runtime when Supabase is not configured or unreachable
const mockReservedUsernames = new Set<string>(['admin', 'pukico', 'official', 'support', 'help', 'root']);
const mockTakenUsernames = new Set<string>(['satria', 'budi', 'alex', 'crypto']);
const mockWaitlistEmails = new Set<string>();

export const USERNAME_REGEX = /^[a-z0-9_]{3,20}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function sanitizeUsername(input: string): string {
  return input
    .trim()
    .replace(/^@+/, '')
    .toLowerCase();
}

export type UsernameValidationReason = 'empty' | 'too_short' | 'too_long' | 'invalid_format';

export function validateUsernameLocally(username: string): { valid: boolean; reason?: UsernameValidationReason } {
  const clean = sanitizeUsername(username);
  if (!clean) {
    return { valid: false, reason: 'empty' };
  }
  if (clean.length < 3) {
    return { valid: false, reason: 'too_short' };
  }
  if (clean.length > 20) {
    return { valid: false, reason: 'too_long' };
  }
  if (!USERNAME_REGEX.test(clean)) {
    return { valid: false, reason: 'invalid_format' };
  }
  return { valid: true };
}

export type UsernameCheckReason = 'format' | 'reserved' | 'taken' | 'server';

export interface CheckUsernameResult {
  available: boolean;
  reason?: UsernameCheckReason;
  cleanUsername: string;
}

function mockCheckUsername(cleanUsername: string): CheckUsernameResult {
  if (mockReservedUsernames.has(cleanUsername)) {
    return {
      available: false,
      reason: 'reserved',
      cleanUsername,
    };
  }
  if (mockTakenUsernames.has(cleanUsername)) {
    return {
      available: false,
      reason: 'taken',
      cleanUsername,
    };
  }
  return {
    available: true,
    cleanUsername,
  };
}

export async function checkUsernameApi(rawUsername: string): Promise<CheckUsernameResult> {
  const cleanUsername = sanitizeUsername(rawUsername);
  const localVal = validateUsernameLocally(cleanUsername);
  if (!localVal.valid) {
    return {
      available: false,
      reason: 'format',
      cleanUsername,
    };
  }

  if (!isLiveBackendConfigured()) {
    if (import.meta.env.DEV) {
      // In-memory mock response with realistic slight delay
      await new Promise((r) => setTimeout(r, 150));
      return mockCheckUsername(cleanUsername);
    }
    return {
      available: false,
      reason: 'server',
      cleanUsername,
    };
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/check-username`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ username: cleanUsername }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        available: false,
        reason: data.reason || 'server',
        cleanUsername,
      };
    }

    const data: { available: boolean; reason?: UsernameCheckReason } = await res.json();
    return {
      available: Boolean(data.available),
      reason: data.reason,
      cleanUsername,
    };
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn('[Pukico] Live backend unreachable, falling back to mock:', err);
      return mockCheckUsername(cleanUsername);
    }
    console.error('[Pukico] Check username failed:', err);
    return {
      available: false,
      reason: 'server',
      cleanUsername,
    };
  }
}

export interface JoinWaitlistPayload {
  email: string;
  desired_id?: string;
  website?: string; // honeypot
}

export type JoinWaitlistErrorType =
  | 'email_exists'
  | 'id_taken'
  | 'invalid_email'
  | 'invalid_id'
  | 'reserved'
  | 'server'
  | 'config_missing';

export interface JoinWaitlistResult {
  ok: boolean;
  error?: JoinWaitlistErrorType;
}

function mockJoinWaitlist(cleanEmail: string, cleanId?: string): JoinWaitlistResult {
  const lowerEmail = cleanEmail.toLowerCase();
  if (mockWaitlistEmails.has(lowerEmail)) {
    return {
      ok: false,
      error: 'email_exists',
    };
  }
  if (cleanId) {
    if (mockReservedUsernames.has(cleanId)) {
      return {
        ok: false,
        error: 'reserved',
      };
    }
    if (mockTakenUsernames.has(cleanId)) {
      return {
        ok: false,
        error: 'id_taken',
      };
    }
    mockTakenUsernames.add(cleanId);
  }
  mockWaitlistEmails.add(lowerEmail);
  return { ok: true };
}

export async function joinWaitlistApi(payload: JoinWaitlistPayload): Promise<JoinWaitlistResult> {
  // Honeypot check: if filled, return pseudo-success
  if (payload.website && payload.website.trim().length > 0) {
    return {
      ok: true,
    };
  }

  const cleanEmail = payload.email.trim();
  if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
    return {
      ok: false,
      error: 'invalid_email',
    };
  }

  let cleanId: string | undefined = undefined;
  if (payload.desired_id && payload.desired_id.trim().length > 0) {
    cleanId = sanitizeUsername(payload.desired_id);
    const idCheck = validateUsernameLocally(cleanId);
    if (!idCheck.valid) {
      return {
        ok: false,
        error: 'invalid_id',
      };
    }
  }

  if (!isLiveBackendConfigured()) {
    if (import.meta.env.DEV) {
      // In-memory mock submission
      await new Promise((r) => setTimeout(r, 200));
      return mockJoinWaitlist(cleanEmail, cleanId);
    }
    return {
      ok: false,
      error: 'config_missing',
    };
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/join-waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({
        email: cleanEmail,
        desired_id: cleanId,
        website: payload.website || '',
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.ok) {
      return { ok: true };
    }

    const errCode = (data.error || 'server') as JoinWaitlistErrorType;
    return {
      ok: false,
      error: errCode,
    };
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn('[Pukico] Live backend unreachable, falling back to mock:', err);
      return mockJoinWaitlist(cleanEmail, cleanId);
    }
    console.error('[Pukico] Join waitlist failed:', err);
    return {
      ok: false,
      error: 'server',
    };
  }
}
