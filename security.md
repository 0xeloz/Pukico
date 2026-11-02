# Keamanan Pukico Landing

**Status:** Diverifikasi terhadap kode commit `f582ae8` (2 November 2026). Halaman ini adalah situs publik tanpa autentikasi; permukaan serangannya kecil, tetapi kesalahan di sini langsung terlihat oleh calon pengguna.

## 1. Ruang lingkup

Yang perlu dilindungi di repo ini:

- Integritas data waitlist (email dan klaim Pukico ID).
- Kepercayaan pengguna bahwa pendaftaran mereka benar-benar tersimpan.
- Reputasi domain `pukico.xyz` sebagai asal tautan yang diarahkan ke `app.pukico.xyz`.

Yang **tidak** ada di sini: wallet, private key, token akses, atau transaksi. Kontrol transaksi didokumentasikan di repo dashboard (`Dashboard-Pukico/security.md`).

## 2. Permukaan serangan

| Permukaan | Risiko |
| --- | --- |
| `POST /functions/v1/check-username` | Enumerasi ID yang sudah dipakai; perlu rate limit di server |
| `POST /functions/v1/join-waitlist` | Spam email, klaim ID massal |
| Formulir waitlist | Input tidak valid, submit ganda |
| Skrip redirect `/p/<kode>` | Kode dibaca dari URL dan ditempel ke origin lain |
| Dependency frontend | Rantai pasokan tanpa lockfile |

Tidak ada cookie sesi, tidak ada endpoint yang mengembalikan data pengguna lain, dan tidak ada operasi tulis yang bisa dipanggil tanpa melewati formulir.

## 3. Kontrol yang sudah ada

- **Validasi klien** sebelum jaringan: `EMAIL_REGEX` (`^[^\s@]+@[^\s@]+\.[^\s@]+$`), `USERNAME_REGEX` (`^[a-z0-9_]{3,20}$`), penolakan input kosong, normalisasi (`sanitizeUsername`).
- **Honeypot** field `website`: disembunyikan dengan `display: none` + `left: -9999px`, `aria-hidden`, `tabIndex={-1}`, `autoComplete="off"`. Bila terisi, klien langsung menjawab sukses tanpa memanggil server — bot tidak mendapat sinyal bahwa ia tertangkap.
- **Submit ganda dicegah** selama permintaan berjalan (`isSubmitting` menonaktifkan tombol).
- **Tidak ada secret di browser** selain anon key Supabase, yang memang dirancang publik.
- **Header keamanan** di `vercel.json`: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera, microphone, geolocation, payment, usb dimatikan), `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
- **`robots.txt`** melarang crawl `/p/`.
- Pemindaian repo tidak menemukan token, private key, atau service-role key yang ter-commit.

Catatan: validasi di klien hanya untuk UX. Server **wajib** mengulang validasi yang sama; repo ini tidak dapat membuktikan hal itu karena kedua Edge Function tidak ada di sini.

## 4. Risiko terbuka

### L-01 — Sukses palsu saat backend gagal (kritis)

`src/services/api.ts:135` dan `:248` menangkap kegagalan `fetch` lalu memanggil mock lokal, yang mengembalikan `{ ok: true }`. Mock ini dirancang untuk preview tanpa backend, tetapi tidak dibatasi pada mode pengembangan.

Akibatnya, bila Supabase tidak dapat dihubungi — outage, URL salah, anon key kedaluwarsa, atau diblokir jaringan — pengguna melihat konfirmasi pendaftaran padahal tidak ada satu baris pun yang tersimpan. Untuk produk yang sedang mengumpulkan waitlist, ini kehilangan lead secara senyap sekaligus melanggar prinsip "jangan menutupi kegagalan dengan data simulasi".

Perbaikan:

1. Mock hanya aktif bila `import.meta.env.DEV` dan backend tidak dikonfigurasi.
2. Pada build produksi, kegagalan jaringan harus menghasilkan error yang terlihat dengan tombol coba lagi.
3. Idealnya tampilkan status backend di UI admin, bukan di UI pengguna.

### L-02 — `isBackendConfigured()` selalu true (sedang)

`src/config.ts:30` mengembalikan `true` tanpa syarat. Helper ini tidak memeriksa apa pun, sehingga setiap pemanggil yang mengandalkannya mendapat jawaban "backend siap" meski konfigurasi kosong. Hapus atau ganti dengan pemeriksaan `isLiveBackendConfigured()`.

### L-03 — Tidak ada CSP (sedang)

`vercel.json` tidak mengirim `Content-Security-Policy` sama sekali. Situs memuat skrip dari Google Fonts dan memiliki satu skrip inline di `index.html`, yang sebenarnya bisa dicakup policy ketat dengan hash atau nonce. Tanpa CSP, injeksi skrip pihak ketiga tidak dicegah browser.

### L-04 — Tanpa lockfile (sedang)

Tidak ada `package-lock.json`, sehingga dependency yang menentukan render halaman dan formulir bisa berbeda antar build. Tambahkan lockfile dan gunakan `npm ci`.

### L-05 — Tautan `/p/<kode>` berakhir buntu (rendah)

Skrip di `index.html:45` meneruskan `/p/<kode>` ke `https://app.pukico.xyz/#pay=<kode>`, tetapi dashboard belum mem-parse hash tersebut. Tidak ada kebocoran data — kode hanya berpindah origin lewat URL — tetapi tautan yang dibagikan pengguna tidak berfungsi sebagaimana dijanjikan, dan kode pembayaran (bila nanti sensitif) akan terlihat di history browser.

### L-06 — Tidak ada pembatasan laju di sisi klien (info)

Wajar, karena pembatasan laju harus di server. Pastikan `check-username` dan `join-waitlist` memilikinya, karena keduanya dapat dipanggil langsung tanpa melewati halaman.

## 5. Data dan privasi

- Yang dikumpulkan: email, Pukico ID yang diinginkan, waktu pendaftaran (diasumsikan, di server).
- Tidak ada analytics, pixel, atau cookie pihak ketiga di kode.
- Satu-satunya penyimpanan di browser adalah mock localStorage (`pukico_mock_ids`, `pukico_mock_emails`) yang hanya terisi di mode mock — dan itu sendiri masalah pada L-01.
- Halaman privasi dan ketentuan harus konsisten dengan data yang benar-benar dikirim ke `join-waitlist`. Bila nanti ditambah analytics, perbarui keduanya.

## 6. Checklist sebelum rilis

- [ ] Mock fallback dinonaktifkan di build produksi (L-01).
- [ ] Kegagalan jaringan ditampilkan sebagai error, bukan sukses.
- [ ] `isBackendConfigured()` diperbaiki atau dihapus (L-02).
- [ ] CSP ditambahkan dan ditegakkan (L-03).
- [ ] Lockfile ditambahkan, build memakai `npm ci` (L-04).
- [ ] `check-username` dan `join-waitlist` memvalidasi ulang input di server dan punya rate limit.
- [ ] Honeypot diverifikasi menolak submit tanpa menyimpan data.
- [x] Tidak ada secret yang ter-commit.
- [x] Tidak ada data pengguna yang dikirim ke pihak ketiga.
- [x] Header dasar (XFO, nosniff, referrer, permissions, HSTS) aktif.

## 7. Risiko terbuka

| ID | Tingkat | Ringkas |
| --- | --- | --- |
| L-01 | Kritis | Fallback mock melaporkan sukses saat backend gagal, termasuk di produksi |
| L-02 | Sedang | `isBackendConfigured()` hardcoded `true` |
| L-03 | Sedang | Tidak ada CSP |
| L-04 | Sedang | Tanpa lockfile |
| L-05 | Rendah | Tautan `/p/<kode>` tidak ditangani dashboard |
| L-06 | Info | Rate limit hanya bisa ditegakkan di server |

## 8. Pelaporan

Jangan mempublikasikan langkah eksploitasi atau kredensial di issue publik. Gunakan kanal keamanan resmi Pukico; bila belum ada, siapkan sebelum membuka pelaporan publik.

Dokumen ini catatan status, bukan jaminan keamanan.
