# Design System Pukico Landing

**Status:** Token dan pola diambil dari `src/index.css` serta komponen pada commit `f582ae8`. Halaman ini harus terasa satu keluarga dengan dashboard: warna, font, dan bahasa yang sama, tetapi dengan ritme dan skala tipografi khas halaman pemasaran.

## 1. Arah desain

Tenang, langsung, tidak menjual berlebihan. Karena produknya sendiri menekankan kejelasan, halaman ini tidak boleh memakai klaim besar atau visual yang menutupi keterbatasan testnet. `HonestSection` ada justru untuk menyatakan apa yang belum tersedia.

## 2. Warna

Token utama (nilai literal di komponen, bukan CSS variable):

| Nilai | Kegunaan |
| --- | --- |
| `#0052FF` | Warna brand, CTA utama, tautan, fokus |
| `#0042D6` | Hover CTA dan tautan |
| `#0036B0` | Tekanan lebih dalam pada elemen brand |
| `#0A0B0D` | Judul |
| `#3B4455` | Teks isi |
| `#5B6577` | Teks sekunder, label, keterangan |
| `#E5E7EB`, `#E2E8F0` | Border dan pemisah |
| `#DBE6FF`, `#EEF4FF` | Latar aksen lembut, chip, highlight |
| `#F8FAFC` | Latar bagian alternatif |
| `#047857`, `#10B981`, `#ECFDF5`, `#A7F3D0` | Status positif |
| `#B45309`, `#FFFBEB` | Peringatan |
| `#B91C1C` | Error |

Latar utama putih. Bagian alternatif memakai `#F8FAFC`, bukan abu gelap, agar tetap ringan.

## 3. Tipografi

Font: **Plus Jakarta Sans** (400, 500, 600, 700), dimuat dari Google Fonts di `index.html`.

| Peran | Ukuran | Weight |
| --- | --- | --- |
| Eyebrow/label kecil | `text-xs` | `font-semibold`, sering uppercase + tracking |
| Teks isi | `text-sm` / `text-base` | 400–500 |
| Subjudul | `text-lg` / `text-xl` / `text-2xl` | 600 |
| Judul bagian | `text-2xl`–`text-4xl` | 700 |
| Judul hero | `text-3xl`–`text-4xl` ke atas, responsif | 700 |

Paragraf panjang dibatasi `max-w-[65ch]` agar tetap nyaman dibaca.

## 4. Layout

- Kontainer utama `max-w-6xl` (beberapa bagian `max-w-3xl`/`max-w-2xl` untuk teks).
- Padding vertikal bagian: `py-16` (mobile) hingga `py-24` (desktop).
- Grid dua kolom pada `md`/`lg` untuk bagian penjelasan; satu kolom di mobile.
- Jarak antar elemen dominan `gap-2`, `gap-3`, `gap-6`, `gap-10`.
- Mobile-first: tidak ada elemen yang hanya berfungsi di desktop.

## 5. Radius dan bentuk

`rounded-xl` dan `rounded-md` untuk kartu dan input, `rounded-2xl`/`rounded-3xl` untuk panel besar, `rounded-full` untuk pil dan avatar. Nilai custom yang muncul: `10px`, `12px`.

## 6. Tombol dan target sentuh

- CTA utama: tinggi `h-[48px]` atau `h-[52px]`, `rounded-xl`, latar `#0052FF`, teks putih `font-semibold`, hover `#0042D6`, `active:scale-[0.98]`.
- Tombol sekunder: garis `#E5E7EB`, teks `#0A0B0D`, latar putih.
- Tombol kecil (navigasi, bahasa): `h-[38px]`–`h-[44px]`.
- Semua tombol punya `focus-visible:ring-2 ring-[#0052FF]` dengan offset, karena outline global tidak dipakai di sini.
- Keadaan nonaktif: opasitas `40%` + `cursor-not-allowed`, bukan warna berbeda.

## 7. Motion

Token: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`, `--dur-fast: 150ms`, `--dur-base: 300ms`, `--dur-reveal: 600ms`.

- `.animate-fade-up` — 350 ms, elemen masuk dari 8 px.
- `.animate-scale-in` — 300 ms, untuk badge atau ikon.
- `Reveal` + `useInView` — memicu animasi sekali saat elemen masuk viewport.
- Transisi bahasa: keluar 140 ms (opacity + translate −4 px), masuk 320 ms.
- `.btn:active` memberi `scale(0.98)` pada semua tombol.
- `prefers-reduced-motion: reduce` mematikan animasi, transisi, dan smooth scroll.

Aturan: animasi hanya untuk masuk dan umpan balik tekan. Tidak ada parallax, tidak ada animasi yang berjalan terus.

## 8. Pola halaman

- **Hero:** satu janji, satu aksi. Input klaim ID bersifat opsional dan tidak menghalangi CTA utama.
- **Penjelasan:** satu ide per bagian, judul pendek, maksimal satu paragraf pendukung.
- **Waitlist:** formulir pendek (email + ID opsional), pesan validasi tepat di bawah field, status jelas (memeriksa, tersedia, terpakai, format salah), lalu keadaan sukses yang tidak menghilangkan konteks.
- **Legal:** halaman terpisah, teks panjang dengan `max-w` sempit, tanpa animasi masuk.
- **Footer:** tautan legal dan sosial; tautan ke aplikasi selalu jelas mana yang membuka `app.pukico.xyz`.

## 9. State dan umpan balik

Setiap aksi asinkron punya empat keadaan: idle, memuat (tombol nonaktif + label berubah), sukses, dan error. Pesan error menyebut penyebab yang bisa ditindaklanjuti (`ID sudah dipakai`, `Email sudah terdaftar`), bukan "terjadi kesalahan". Status tidak dibedakan hanya dengan warna; selalu ada teks.

Jangan menampilkan keberhasilan yang belum dikonfirmasi server — lihat catatan fallback mock di [security.md](security.md).

## 10. Bahasa dan copy

Dua bahasa penuh dengan kunci yang sama: `src/i18n/en.ts` dan `src/i18n/id.ts`. `en` di-merge di atas `id` (`deepMergeTranslations`), jadi kunci yang hanya ada di `id` tetap tersedia sebagai cadangan — jangan mengandalkan perilaku itu untuk teks Inggris yang hilang.

- Bahasa ditentukan oleh path (`/` = en, `/id` = id). Jangan menyimpan preferensi bahasa di localStorage.
- Nada Indonesia: kalimat pendek, kata kerja aktif, tanpa jargon crypto yang tidak perlu. Istilah teknis yang dipertahankan: USDC, wallet, testnet, gas.
- Jangan menjanjikan hal yang belum ada. Request Money belum dirilis; jangan tampilkan seolah bisa dipakai.
- Klaim tentang testnet harus eksplisit: token tidak bernilai uang.

## 11. Aksesibilitas

- Kontras teks minimal mengikuti `#5B6577` di atas putih; jangan memakai abu lebih terang untuk teks isi.
- `aria-label` pada tombol ikon (menu, bahasa) dan `aria-hidden="true"` pada dekorasi.
- Formulir: `label` terlihat atau `aria-label`, `aria-invalid` dan `aria-describedby` untuk pesan error.
- Honeypot `website` disembunyikan secara visual dan dari assistive tech, tetapi tetap ada di DOM.
- Navigasi keyboard penuh; tautan memakai `href` nyata sehingga bisa dibuka di tab baru.

## 12. Yang tidak boleh dilakukan

- Menambah library UI atau animasi baru untuk satu bagian.
- Menyalin komponen dashboard ke sini; bangun pola halaman, bukan menyalin aplikasi.
- Memakai warna status untuk dekorasi.
- Menyembunyikan keterbatasan testnet di bagian bawah halaman.
- Menulis string bahasa langsung di komponen.
