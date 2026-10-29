# Pukico Design System

**Status:** Panduan konsistensi UI, bukan spesifikasi visual final.

## Tujuan
Fitur baru harus terasa sebagai bagian dari dashboard Pukico. Gunakan komponen, token, dan pola yang sudah ada sebelum menambah gaya baru.

## Aturan utama
- Periksa komponen dan stylesheet yang ada sebelum membuat komponen baru.
- Gunakan kembali tombol, input, modal/sheet, avatar, badge status, dan pola notifikasi.
- Jangan menambahkan library UI baru hanya untuk satu layar.
- Jangan mengubah desain global untuk kebutuhan fitur tunggal.
- Pastikan alur dapat digunakan di layar ponsel.

## Hierarki tindakan
Di Quick Actions, `Send` dan `Request` adalah tindakan berbeda. Request membuka alur permintaan; tombol tersebut tidak mengirim transaksi.

## Formulir Request
Urutan yang disarankan:
1. Penerima.
2. Nominal USDC.
3. Catatan opsional.
4. Ringkasan.
5. Tombol membuat permintaan.

Jangan meminta informasi yang tidak dibutuhkan MVP.

## Detail permintaan
Tampilkan:
- Status.
- Nominal USDC.
- Pembuat dan penerima.
- Jaringan.
- Catatan.
- Waktu dibuat.
- Tindakan yang tersedia.

Tindakan pembayaran hanya tersedia jika status dan hak akses memungkinkan.

## Bahasa antarmuka
Gunakan bahasa Indonesia yang singkat dan langsung. Hindari istilah internal jika ada label yang lebih jelas.

Contoh:
- `Request` — label tombol jika konsisten dengan dashboard; judul dapat memakai “Minta Pembayaran”.
- `Pay Request` — “Bayar Permintaan”.
- `Pending` — “Menunggu pembayaran”.
- `Paid` — “Lunas”.
- `Cancelled` — “Dibatalkan”.
- `Network fee` — “Biaya jaringan”.
- `Estimated` — “Estimasi”.

Jangan menampilkan “Lunas” sebelum verifikasi pembayaran selesai.

## Nominal dan biaya
- Tampilkan aset bersama nominal, misalnya `5.00 USDC`.
- Gunakan presisi sesuai token dan kebutuhan produk.
- Jangan gunakan floating-point untuk menghitung nilai token.
- Pisahkan total USDC dari gas dalam ETH.
- Tandai network fee sebagai estimasi sampai biaya final tersedia.
- Jangan tampilkan service fee jika tidak dikenakan.

## Status dan umpan balik
Setiap operasi asinkron perlu loading state, error yang berguna, empty state, dan konfirmasi yang sesuai. Status tidak boleh dibedakan hanya dengan warna; sertakan teks.

## Aksesibilitas dan mobile
- Tombol memiliki label jelas.
- Input memiliki label dan pesan validasi.
- Fokus keyboard terlihat.
- Area sentuh memadai.
- Teks, nominal, dan status tidak terpotong di layar sempit.
- QR code disertai tautan atau cara lain untuk membuka permintaan.

## Token visual
Jangan menetapkan warna, radius, shadow, atau ukuran baru secara spekulatif. Temukan token yang sudah digunakan pada repository. Jika belum tersedia, tambahkan hanya setelah memeriksa pola visual aplikasi secara menyeluruh.
