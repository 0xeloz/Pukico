import { SUPABASE_URL, SUPABASE_ANON_KEY, isBackendConfigured } from '../config';

export const USERNAME_REGEX = /^[a-z0-9_]{3,20}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function sanitizeUsername(input: string): string {
  return input
    .trim()
    .replace(/^@+/, '')
    .toLowerCase();
}

export function validateUsernameLocally(username: string): { valid: boolean; error?: string } {
  const clean = sanitizeUsername(username);
  if (!clean) {
    return { valid: false, error: 'Masukkan ID kamu.' };
  }
  if (clean.length < 3) {
    return { valid: false, error: 'Pukico ID minimal 3 karakter.' };
  }
  if (clean.length > 20) {
    return { valid: false, error: 'Pukico ID maksimal 20 karakter.' };
  }
  if (!USERNAME_REGEX.test(clean)) {
    return {
      valid: false,
      error: 'Format salah. Hanya boleh huruf kecil (a-z), angka (0-9), dan garis bawah (_).',
    };
  }
  return { valid: true };
}

export interface CheckUsernameResult {
  available: boolean;
  reason?: 'format' | 'reserved' | 'taken';
  cleanUsername: string;
  errorMessage?: string;
}

export async function checkUsernameApi(rawUsername: string): Promise<CheckUsernameResult> {
  const cleanUsername = sanitizeUsername(rawUsername);
  const localVal = validateUsernameLocally(cleanUsername);
  if (!localVal.valid) {
    return {
      available: false,
      reason: 'format',
      cleanUsername,
      errorMessage: localVal.error,
    };
  }

  if (!isBackendConfigured()) {
    return {
      available: false,
      cleanUsername,
      errorMessage: 'Layanan belum terkonfigurasi (SUPABASE_URL belum diatur).',
    };
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/check-username`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ username: cleanUsername }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        available: false,
        reason: data.reason || 'taken',
        cleanUsername,
        errorMessage: 'Gagal mengecek ketersediaan ke server.',
      };
    }

    const data: { available: boolean; reason?: 'format' | 'reserved' | 'taken' } = await res.json();
    return {
      available: Boolean(data.available),
      reason: data.reason,
      cleanUsername,
    };
  } catch (err) {
    console.error('Error checkUsernameApi:', err);
    return {
      available: false,
      cleanUsername,
      errorMessage: 'Lagi ada masalah di sisi kami. Coba lagi bentar ya.',
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
  | 'config_missing'
  | 'bot_detected';

export interface JoinWaitlistResult {
  ok: boolean;
  error?: JoinWaitlistErrorType;
  message?: string;
}

export async function joinWaitlistApi(payload: JoinWaitlistPayload): Promise<JoinWaitlistResult> {
  // Honeypot check
  if (payload.website && payload.website.trim().length > 0) {
    return {
      ok: false,
      error: 'bot_detected',
      message: 'Deteksi pengiriman otomatis.',
    };
  }

  const cleanEmail = payload.email.trim();
  if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
    return {
      ok: false,
      error: 'invalid_email',
      message: 'Format email tidak valid.',
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
        message: idCheck.error,
      };
    }
  }

  if (!isBackendConfigured()) {
    return {
      ok: false,
      error: 'config_missing',
      message: 'Konfigurasi backend belum diset. Form tidak dapat mengirim data.',
    };
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/join-waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
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
    let message = 'Lagi ada masalah di sisi kami. Coba lagi bentar ya.';

    if (errCode === 'email_exists') {
      message = 'Email ini udah masuk waitlist, aman.';
    } else if (errCode === 'id_taken' || errCode === 'reserved') {
      message = cleanId ? `@${cleanId} udah diambil orang lain, coba yang lain.` : 'ID udah diambil orang lain.';
    } else if (errCode === 'invalid_email') {
      message = 'Format email tidak valid.';
    } else if (errCode === 'invalid_id') {
      message = 'Format Pukico ID tidak valid.';
    }

    return {
      ok: false,
      error: errCode,
      message,
    };
  } catch (err) {
    console.error('Error joinWaitlistApi:', err);
    return {
      ok: false,
      error: 'server',
      message: 'Lagi ada masalah di sisi kami. Coba lagi bentar ya.',
    };
  }
}
