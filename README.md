# Pukico

Pukico adalah aplikasi transfer USDC berbasis Pukico ID. Repository ini berisi aplikasi dan dokumentasi pengembangan.

> Status produk: Open Beta Testnet. Konfigurasi jaringan dan fitur yang tersedia harus diperiksa dari environment dan kode aktif.

## Dokumentasi
- [PRD](PRD.md) — kebutuhan dan kriteria penerimaan Request Money.
- [Arsitektur](arsitektur.md) — batas tanggung jawab frontend, backend, dan transaksi.
- [Keamanan](security.md) — kontrol akses, verifikasi pembayaran, dan perlindungan secret.
- [Design System](designsystem.md) — konsistensi UI dan bahasa antarmuka.

## Konteks roadmap
- Transfer USDC berbasis Pukico ID.
- Recent Recipients.
- Transaction Receipts.
- Clear Fee Breakdown.
- Request Money sebagai pengembangan berikutnya.
- Incoming Payment Notifications berada di tahap roadmap berikutnya.

Daftar ini adalah konteks perencanaan. Periksa kode dan hasil tes sebelum menganggap fitur siap produksi.

## Prinsip pengembangan
1. Audit kode aktual sebelum mengubah implementasi.
2. Pertahankan arsitektur yang berjalan.
3. Gunakan kembali alur Send untuk pembayaran.
4. Jangan membuat wallet baru atau menyimpan private key.
5. Status pembayaran harus didukung verifikasi on-chain.
6. Terapkan RLS dan otorisasi backend.
7. Uji di Base Sepolia sebelum rilis produksi.
8. Jangan mengklaim build atau tes berhasil sebelum dijalankan.

## Stack yang diketahui
- React
- TypeScript
- Vite
- Privy
- viem
- Supabase dan Edge Functions

Versi dependency, scripts, environment variables, dan perintah pengembangan harus mengikuti `package.json` serta konfigurasi repository aktif.

## Menjalankan proyek
Periksa `package.json` pada aplikasi yang ingin dijalankan untuk mengetahui scripts yang tersedia. Jika scripts mendukungnya, alur umum:

```bash
npm install
npm run dev
npm run lint
npm run build
```

Jangan memasukkan secret produksi ke repository.

## Request Money MVP
MVP memungkinkan pengguna membuat permintaan USDC, membagikan tautan atau QR, lalu menerima pembayaran melalui alur Send yang ada.

Membuat atau membuka permintaan tidak memindahkan dana. Status lunas hanya muncul setelah transaksi yang sesuai diverifikasi.

Lihat [PRD.md](PRD.md).

## Catatan dokumentasi
Dokumen ini adalah fondasi kerja. Nama tabel, API, Edge Function, dan detail deployment yang belum diverifikasi ditandai sebagai usulan atau perlu diperiksa. Perbarui setelah implementasi selesai dan diuji.
