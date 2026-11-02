# Arsitektur Pukico Landing

**Status:** Diverifikasi terhadap kode commit `f582ae8` (2 November 2026).

## 1. Ruang lingkup

Repo ini adalah situs pemasaran publik: penjelasan produk, halaman waitlist, dan dua halaman legal. Tidak ada wallet, autentikasi, atau transaksi di sini. Aplikasi produk berada di repo `Dashboard-Pukico` pada `app.pukico.xyz`.

```mermaid
flowchart LR
    U[Pengunjung] --> SPA[React + Vite SPA]
    SPA --> I18N[LangProvider: path /id]
    SPA --> WL[WaitlistSection]
    WL --> API[services/api.ts]
    API -->|fetch + apikey| EF[Supabase Edge Functions: check-username, join-waitlist]
    EF --> DB[(Postgres)]
    SPA -->|klik "Buka aplikasi"| APP[app.pukico.xyz]
    LINK[/p/kode] -->|redirect| APP
```

## 2. Komponen

| Berkas | Peran |
| --- | --- |
| `src/main.tsx` | Mount React |
| `src/App.tsx` | Memilih halaman berdasarkan pathname, menyusun section, menyimpan `claimedId` |
| `src/i18n/index.tsx` | Bahasa dari prefix path, transisi bahasa, `navigate()` berbasis History API |
| `src/components/Navbar.tsx` | Navigasi bagian, pemilih bahasa, CTA waitlist |
| `src/components/HeroSection.tsx` | Pesan utama dan input klaim ID |
| `src/components/WhySection.tsx`, `HowItWorksSection.tsx`, `DifferentiatorSection.tsx`, `HonestSection.tsx` | Argumen produk dan batasan yang diakui |
| `src/components/WaitlistSection.tsx` | Formulir waitlist, validasi ID, honeypot |
| `src/components/FaqSection.tsx`, `Footer.tsx` | FAQ dan footer |
| `src/pages/PrivacyPage.tsx`, `TermsPage.tsx` | Halaman legal statis |
| `src/components/Reveal.tsx`, `src/hooks/useInView.ts` | Animasi masuk saat elemen terlihat |
| `src/services/api.ts` | Validasi, panggilan API, mock lokal |
| `src/config.ts` | Pembacaan env, deteksi backend live |

Tidak ada state global selain bahasa dan `claimedId`. Tidak ada penyimpanan sesi.

## 3. Routing

Routing ditangani `LangProvider` tanpa library: nilai awal dari `window.location.pathname`, perubahan lewat `history.pushState` + event `popstate`. `AppContent` memilih halaman dengan pencocokan substring:

- path mengandung `/privacy` → `PrivacyPage`
- path mengandung `/terms` → `TermsPage`
- selain itu → landing lengkap

Bahasa ditentukan `getLangFromPathname`: `/id`, `/id/`, atau `/id/...` → `id`; sisanya `en`. Karena itu setiap navigasi bahasa harus mengubah path, bukan hanya state.

Rewrite path di `vercel.json` mengarahkan `/id`, `/id/privacy`, `/id/terms`, `/privacy`, `/terms`, dan `/p/:code` ke `index.html` agar refresh tidak 404.

### Redirect tautan pembayaran

Skrip inline di `index.html` membaca `/p/<kode>` (6–16 karakter alfanumerik) atau hash `#pay=<kode>`, lalu melakukan `location.replace('https://app.pukico.xyz/#pay=<kode>')`.

Dashboard belum mem-parse `#pay=` — tautan ini saat ini hanya membuka halaman utama aplikasi. Fitur Request Money belum diimplementasikan di kedua repo.

## 4. Kontrak API

Dua endpoint publik, keduanya `POST` dengan header `Content-Type: application/json` dan `apikey: <anon key>`.

### `POST /functions/v1/check-username`

```json
{ "username": "satria" }
```

Balasan: `{ "available": boolean, "reason"?: "format" | "reserved" | "taken" | "server" }`.

### `POST /functions/v1/join-waitlist`

```json
{ "email": "a@b.com", "desired_id": "satria", "website": "" }
```

Balasan: `{ "ok": true }` atau `{ "ok": false, "error": "email_exists" | "id_taken" | "invalid_email" | "invalid_id" | "reserved" | "server" }`.

Field `website` adalah honeypot; server diharapkan menjawab sukses tanpa menyimpan bila terisi.

Definisi kedua function tidak ada di repo ini, sehingga validasi server tidak dapat diperiksa dari sini. Yang bisa diverifikasi hanya validasi klien: regex email, regex username, penolakan nilai kosong, dan normalisasi input.

## 5. Perilaku saat backend tidak tersedia

`isLiveBackendConfigured()` mengembalikan false bila URL atau anon key kosong atau masih berupa placeholder (`your-project`, `example.com`, `placeholder`, `your-anon`). Dalam kondisi itu `services/api.ts` memakai mock lokal:

- Set ID terlarang: `admin`, `pukico`, `official`, `support`, `help`, `root`.
- Set ID terpakai: `satria`, `budi`, `alex`, `crypto`, ditambah ID dari `localStorage` (`pukico_mock_ids`).
- Email dari `localStorage` (`pukico_mock_emails`).
- Jeda buatan 150 ms (cek ID) dan 200 ms (submit) agar terasa seperti jaringan nyata.

Mock ini juga dipakai **sebagai fallback ketika `fetch` gagal**, bukan hanya ketika konfigurasi kosong. Konsekuensinya dijelaskan di [security.md](security.md) L-01.

## 6. Build dan deploy

- Output `vite build` adalah SPA statis; hosting diasumsikan Vercel sesuai `vercel.json`.
- Header keamanan didefinisikan di `vercel.json` (lihat security.md).
- Aset publik: favicon, apple-touch-icon, logo, OG image, `robots.txt` (melarang crawl `/p/`).
- Tidak ada SSR, tidak ada API route, tidak ada cron.

## 7. Batas yang belum dipastikan

- Implementasi `check-username` dan `join-waitlist` di sisi Supabase, termasuk rate limit dan aturan reserved name.
- Skema tabel waitlist dan apakah klaim ID dicatat terpisah dari email.
- Apakah ID yang berhasil diklaim benar-benar direservasi saat onboarding dashboard, atau hanya dicatat sebagai preferensi.
