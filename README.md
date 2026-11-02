# Pukico Landing

Landing page dan halaman waitlist Pukico. Repo ini **hanya** berisi situs publik; aplikasi produk ada di repo `Dashboard-Pukico` dan dijalankan di `https://app.pukico.xyz`.

> **Status:** open beta testnet. Yang dijanjikan halaman ini adalah akses ke dashboard testnet, bukan produk dengan dana nyata.

Dokumen ini menggambarkan kode pada commit `f582ae8` (2 November 2026).

## Isi repo

| Bagian | Komponen |
| --- | --- |
| Navigasi | `Navbar` — tautan bagian, pemilih bahasa, CTA waitlist |
| Hero | `HeroSection` — klaim Pukico ID, CTA ke waitlist |
| Penjelasan produk | `WhySection`, `HowItWorksSection`, `DifferentiatorSection`, `HonestSection` |
| Waitlist | `WaitlistSection` — email, Pukico ID opsional, honeypot |
| FAQ | `FaqSection` |
| Footer | `Footer` |
| Halaman legal | `PrivacyPage`, `TermsPage` |

Seluruh halaman tersedia dalam bahasa Inggris dan Indonesia.

## Alur waitlist

1. Pengguna memasukkan email dan, opsional, Pukico ID yang diinginkan.
2. ID dinormalisasi (`sanitizeUsername`: trim, buang `@`, lowercase) dan divalidasi lokal dengan pola `^[a-z0-9_]{3,20}$`.
3. Ketersediaan ID diperiksa ke `POST /functions/v1/check-username`.
4. Submit mengirim `{ email, desired_id, website }` ke `POST /functions/v1/join-waitlist`.
5. Field `website` adalah honeypot: bila terisi, permintaan dijawab sukses tanpa disimpan.
6. Hasil yang mungkin: `email_exists`, `id_taken`, `invalid_email`, `invalid_id`, `reserved`, `server`, `config_missing`.

Bila ID sudah diketik di hero, nilainya dibawa ke formulir waitlist lewat state `claimedId` di `App.tsx`.

> **Penting:** saat ini kedua panggilan API jatuh ke penyimpanan localStorage dan melaporkan sukses bila jaringan gagal, termasuk di build produksi. Artinya pengguna bisa melihat "berhasil" padahal tidak ada data tersimpan. Lihat [security.md](security.md) bagian L-01 sebelum merilis.

## Stack

React 19.0.1, TypeScript 7.0.2, Vite 8.3.0, Tailwind CSS 4.3.3. Tanpa router library dan tanpa `supabase-js` — semua panggilan memakai `fetch` ke Edge Functions.

```bash
npm run dev      # vite --port=3000 --host=0.0.0.0
npm run build    # vite build
npm run lint     # tsc --noEmit
npm run preview
```

> Belum ada `package-lock.json`. Build belum reproducible; tambahkan lockfile sebelum rilis.

## Environment

| Variabel | Fungsi |
| --- | --- |
| `VITE_SUPABASE_URL` | Base URL Supabase untuk Edge Functions |
| `VITE_SUPABASE_ANON_KEY` | Anon key untuk header `apikey` |
| `VITE_SITE_URL` | URL kanonik situs, default `https://pukico.xyz` |
| `VITE_X_URL` | Tautan profil X |
| `VITE_DISCORD_INVITE_URL` | Tautan Discord, juga dipakai untuk klaim kode akses |

Bila `VITE_SUPABASE_URL` atau anon key kosong, atau masih bernilai placeholder, `isLiveBackendConfigured()` mengembalikan false dan aplikasi memakai mock lokal. Jangan biarkan kondisi itu terjadi di produksi.

## Routing

Tidak ada router library; `LangProvider` membaca `window.location.pathname` dan menangani `popstate`.

| Path | Isi |
| --- | --- |
| `/` | Landing bahasa Inggris |
| `/id` | Landing bahasa Indonesia |
| `/privacy`, `/id/privacy` | Halaman privasi |
| `/terms`, `/id/terms` | Halaman ketentuan |
| `/p/<kode>` | Redirect ke `https://app.pukico.xyz/#pay=<kode>` (skrip inline di `index.html`) |

Prefix `/id` menentukan bahasa, bukan query atau localStorage. Rewrite untuk semua path di atas ada di `vercel.json`.

> `robots.txt` melarang crawl `/p/`, dan dashboard belum menangani hash `#pay=`. Tautan pembayaran saat ini berakhir di halaman utama aplikasi.

## Yang tidak ada di repo ini

- Aplikasi dashboard, wallet, dan seluruh alur transaksi.
- Request Money — belum ada di dashboard maupun di sini.
- Definisi Edge Function `check-username` dan `join-waitlist`; keduanya hanya dipanggil dari sini.

## Dokumentasi

- [arsitektur.md](arsitektur.md) — komponen, routing, dan kontrak API
- [designsystem.md](designsystem.md) — token visual dan pola halaman
- [security.md](security.md) — permukaan serangan situs publik dan risiko terbuka
- PRD produk ada di repo dashboard: `Dashboard-Pukico/PRD.md`
