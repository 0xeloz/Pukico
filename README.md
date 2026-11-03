# Pukico Landing

Landing page dan halaman waitlist Pukico. Repo ini **hanya** berisi situs publik. Repo ini **tidak** berisi aplikasi dashboard: wallet, autentikasi, dan seluruh alur transaksi ada di repo terpisah `Dashboard-Pukico` yang dijalankan di `https://app.pukico.xyz`.

> **Status:** open beta testnet. Yang dijanjikan halaman ini adalah akses ke dashboard testnet, bukan produk dengan dana nyata.

Dokumen ini menggambarkan kode pada commit `3032589` (2 November 2026).

## Isi repo

| Bagian | Komponen |
| --- | --- |
| Navigasi | `Navbar` — tautan bagian, pemilih bahasa, CTA waitlist, tautan Discord |
| Hero | `HeroSection` — klaim Pukico ID (cek ketersediaan langsung), CTA ke waitlist |
| Pratinjau produk | `ProductPreview` — tangkapan layar aplikasi di dalam hero |
| Penjelasan produk | `WhySection`, `HowItWorksSection`, `DifferentiatorSection`, `HonestSection` |
| Waitlist | `WaitlistSection` — email, Pukico ID opsional, honeypot |
| FAQ | `FaqSection` |
| Footer | `Footer` |
| Halaman legal | `PrivacyPage`, `TermsPage` |
| Animasi | `Reveal`, `hooks/useInView` — animasi masuk saat elemen terlihat |

Seluruh halaman tersedia dalam bahasa Inggris dan Indonesia. Paritas kunci dijaga oleh tipe `Translations` di `src/i18n/id.ts`: `src/i18n/en.ts` bertipe `Translations`, sehingga kunci yang hilang gagal di typecheck. Saat runtime `enMerged` dibangun di atas `id` sebagai fallback.

## Alur waitlist

1. Pengguna memasukkan email dan, opsional, Pukico ID yang diinginkan.
2. ID dinormalisasi (`sanitizeUsername`: trim, buang `@` di depan, lowercase) dan divalidasi lokal oleh `validateUsernameLocally` dengan pola `^[a-z0-9_]{3,20}$`; alasan penolakan: `empty`, `too_short`, `too_long`, `invalid_format`.
3. Ketersediaan ID diperiksa ke `POST /functions/v1/check-username`. Di `WaitlistSection` pemeriksaan di-debounce 400 ms dan hasil permintaan lama dibuang; `HeroSection` memanggil fungsi yang sama saat tombol klaim ditekan.
4. Submit mengirim `{ email, desired_id, website }` ke `POST /functions/v1/join-waitlist`.
5. Field `website` adalah honeypot: bila terisi, klien langsung menampilkan sukses tanpa memanggil server.
6. Hasil yang mungkin dari `joinWaitlistApi`: `email_exists`, `id_taken`, `invalid_email`, `invalid_id`, `reserved`, `server`. Tipe `JoinWaitlistErrorType` juga memuat `config_missing`, tetapi nilai itu tidak pernah dikembalikan oleh kode saat ini.

Bila ID sudah diketik di hero, nilainya dibawa ke formulir waitlist lewat state `claimedId` di `App.tsx`.

> **Penting:** saat ini kedua panggilan API jatuh ke penyimpanan localStorage dan melaporkan sukses bila jaringan gagal, termasuk di build produksi. Artinya pengguna bisa melihat "berhasil" padahal tidak ada data tersimpan. Lihat [security.md](security.md) bagian L-01 sebelum merilis.

## Stack

React 19.0.1, TypeScript 7.0.2, Vite 8.3.0, Tailwind CSS 4.3.3 (semua rentang `^` di `package.json`; tanpa lockfile versi terpasang bisa berbeda). Tanpa router library dan tanpa `supabase-js` — semua panggilan memakai `fetch` ke Edge Functions, hanya dua tempat: `src/services/api.ts`.

```bash
npm run dev      # vite --port=3000 --host=0.0.0.0
npm run build    # vite build
npm run lint     # tsc --noEmit
npm run preview
```

> `npm run lint` memakai TypeScript 7 dari `node_modules`, dan binary TS 7 tidak tersedia untuk Android/Termux arm64. Di mesin pengembangan ini perintah itu gagal karena platform, bukan karena error tipe. Verifikasi tipe di sini dijalankan dengan TypeScript 5.9.3 yang dipanggil langsung:
>
> ```bash
> node ~/.hermes/cache/scratch/ts5/node_modules/typescript/bin/tsc --noEmit -p tsconfig.json
> ```

`tsconfig.json` tidak mengaktifkan `strict` (tidak ada `strict`, `strictNullChecks`, maupun `noUnusedLocals`), jadi "0 error" berarti bersih pada konfigurasi yang berlaku sekarang, bukan pada mode ketat.

## Environment

| Variabel | Fungsi |
| --- | --- |
| `VITE_SUPABASE_URL` | Base URL Supabase untuk Edge Functions |
| `VITE_SUPABASE_ANON_KEY` | Anon key untuk header `apikey` |
| `VITE_SITE_URL` | URL kanonik situs, default `https://pukico.xyz` |
| `VITE_X_URL` | Tautan profil X (hanya dipakai di `Footer`) |
| `VITE_DISCORD_INVITE_URL` | Tautan Discord: navbar, footer, dan tombol "Join Discord" setelah submit waitlist berhasil |

Semua dibaca di `src/config.ts` dan contohnya ada di `.env.example`. Dua nilai tidak berasal dari env: `CONTACT_EMAIL` hardcoded `hello@pukico.xyz`, dan tujuan "Buka aplikasi" hardcoded `https://app.pukico.xyz` (di `WaitlistSection` maupun skrip redirect `index.html`).

Bila `VITE_SUPABASE_URL` atau anon key kosong, atau masih bernilai placeholder (`your-project`, `example.com`, `placeholder`, `your-anon`), `isLiveBackendConfigured()` mengembalikan false dan aplikasi memakai mock lokal. Jangan biarkan kondisi itu terjadi di produksi.

## Routing

Tidak ada router library; `LangProvider` membaca `window.location.pathname` dan menangani `popstate`. `LangProvider` juga memperbarui `<html lang>`, `<link rel="canonical">`, `<title>`, dan meta description sesuai bahasa dan halaman.

| Path | Isi |
| --- | --- |
| `/` | Landing bahasa Inggris |
| `/id` | Landing bahasa Indonesia |
| `/privacy`, `/id/privacy` | Halaman privasi |
| `/terms`, `/id/terms` | Halaman ketentuan |
| `/p/<kode>` | Redirect ke `https://app.pukico.xyz/#pay=<kode>` (skrip inline di `index.html`, kode 6–16 karakter alfanumerik) |

Prefix `/id` menentukan bahasa, bukan query atau localStorage. Rewrite untuk `/id`, `/id/privacy`, `/id/terms`, `/privacy`, `/terms`, dan `/p/:code` ada di `vercel.json`.

> `robots.txt` melarang crawl `/p/`, dan dashboard belum menangani hash `#pay=`. Tautan pembayaran saat ini berakhir di halaman utama aplikasi.

## Status kualitas

Diperiksa langsung di repo ini pada commit `3032589`:

| Pemeriksaan | Hasil |
| --- | --- |
| Typecheck landing (TypeScript 5.9.3, `tsc --noEmit -p tsconfig.json`) | 0 error, exit 0. Konfigurasi tanpa `strict` |
| Typecheck TypeScript 7.0.2 (`npm run lint`) | **Tidak terverifikasi** — binary TS 7 tidak tersedia untuk Android/Termux arm64 |
| `npm run build` (Vite 8.3.5) | Sukses, exit 0: 35 modul, `dist/assets/index-*.js` 290,38 kB (87,19 kB gzip) |
| Test otomatis | **Tidak ada.** Tidak ada vitest/jest/playwright/cypress di `package.json` maupun di `src` |
| Lockfile | **Tidak ada** `package-lock.json`; `vite` terpasang 8.3.5 dari rentang `^8.3.0`, jadi versi antar build bisa bergeser |
| CSP | **Tidak ada.** `vercel.json` mengirim XFO, nosniff, referrer, permissions, dan HSTS, tetapi bukan `Content-Security-Policy` |
| Kesiapan rilis waitlist | **Belum.** L-01 masih terbuka: fallback mock melaporkan sukses saat backend mati, termasuk di build produksi |

"Build hijau" di tabel ini hanya berlaku untuk `vite build`, yang tidak melakukan typecheck. Tidak ada CI yang menjalankan keduanya secara otomatis.

## Tim dan proses

Pembagian kerja, prioritas, dan kriteria selesai dicatat di repo privat [`0xeloz/Pukico-Team`](https://github.com/0xeloz/Pukico-Team), berkas `backlog.md`. Repo itu tidak dapat diakses publik; ringkasannya:

| Peran | Profil | Cakupan |
| --- | --- | --- |
| CTO | `ficu` | Arsitektur, pemecahan tugas, standar, keputusan trade-off, merge |
| Frontend | `cuki` | Komponen UI dan paritas bahasa |
| Software | `petot` | Logika, `lib/`, Edge Function, perbaikan `api.ts` |
| QA | `jojon` | Skenario uji dan bukti hasil |
| Security | `botai` | Review keamanan, temuan, dan pemblokir rilis |

Aturan yang berlaku untuk repo ini:

1. Satu tiket, satu pemilik. Tugas yang menyentuh dua domain dipecah oleh CTO.
2. Temuan baru dari QA atau Security masuk backlog lebih dulu, tidak langsung dieksekusi.
3. Tiap tiket selesai dengan bukti perintah atau rujukan kode, bukan pernyataan "sudah dikerjakan".
4. Dokumen di repo ini diperbarui pada PR yang mengubah perilakunya.

Tiket terbuka yang menyentuh landing: `LP-01` (hapus sukses palsu, L-01), `LP-02` (perbaiki `isBackendConfigured()`), `SEC-07` (CSP), `SEC-08` (rate limit kedua Edge Function), `QA-03` (uji landing tanpa jaringan), `UI-01` (paritas kunci i18n), `REL-01` (lockfile). Status empat Edge Function yang dilaporkan hilang dari repo dashboard masih terbuka sebagai `SEC-03` di backlog dan belum diputuskan; untuk landing, `check-username` dan `join-waitlist` baru terdokumentasi kontraknya di [arsitektur.md](arsitektur.md) bagian 4, bukan definisinya.

## Yang tidak ada di repo ini

- Aplikasi dashboard, wallet, dan seluruh alur transaksi.
- Request Money — belum ada di dashboard maupun di sini.
- Definisi Edge Function `check-username` dan `join-waitlist`; keduanya hanya dipanggil dari sini. Validasi server dan rate limit tidak dapat diperiksa dari repo ini.
- Test otomatis, lockfile, dan pipeline CI.

## Dokumentasi

- [arsitektur.md](arsitektur.md) — komponen, routing, dan kontrak API
- [designsystem.md](designsystem.md) — token visual dan pola halaman
- [security.md](security.md) — permukaan serangan situs publik dan risiko terbuka
- PRD produk ada di repo dashboard: `Dashboard-Pukico/PRD.md`
