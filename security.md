# Keamanan Pukico

**Status:** Baseline pengembangan, bukan audit keamanan formal.

## Prinsip dasar
Pukico menggunakan alur wallet non-custodial. Aplikasi tidak boleh meminta atau menyimpan private key pengguna. Membuat permintaan pembayaran tidak boleh memindahkan dana.

## Autentikasi dan otorisasi
- Verifikasi identitas pengguna di backend untuk setiap operasi yang memerlukan sesi.
- ID pengguna yang dikirim frontend bukan bukti kepemilikan.
- Jangan gunakan user-editable metadata sebagai dasar otorisasi.
- Terapkan otorisasi per objek; login saja tidak berarti boleh membaca semua permintaan.
- Menyembunyikan tombol bukan kontrol keamanan.

## Supabase dan RLS
- Aktifkan RLS pada tabel di schema yang terekspos.
- Batasi baris sesuai pemilik dan pihak yang berhak, bukan sekadar status login.
- Pastikan policy UPDATE memiliki pemeriksaan `USING` dan `WITH CHECK` yang sesuai.
- Jangan menonaktifkan RLS untuk mengatasi error.
- Jangan mengekspos service-role key di browser atau variabel frontend.
- Periksa grants, policies, fungsi database, view, dan Edge Function dengan hak istimewa.

## Request Money
- Backend menetapkan pembuat dari identitas sesi terverifikasi.
- Validasi nominal, penerima, jaringan, catatan, dan status di backend.
- Jangan percaya `paid`, hash transaksi, atau nilai pembayaran dari klien tanpa verifikasi.
- Tautan/QR bukan bukti otorisasi.
- Membuka tautan tidak boleh memulai transfer.
- Jangan menaruh token rahasia di URL.
- Permintaan privat hanya boleh terlihat oleh pihak yang berhak.

## Verifikasi blockchain
Sebelum menandai permintaan lunas, verifikasi:
- Jaringan yang benar.
- Receipt sukses.
- Token USDC yang benar untuk jaringan itu.
- Alamat penerima yang benar.
- Nominal sesuai aturan pembayaran.
- Hubungan transaksi dengan permintaan.
- Hash/event tidak diproses berulang.

Hash transaksi saja bukan bukti bahwa pembayaran berhasil. Pending bukan confirmed.

## Pembayaran ganda dan idempotensi
- Cegah satu permintaan diselesaikan oleh transaksi yang tidak sesuai atau diproses berulang.
- Tangani event/sinkronisasi yang sama lebih dari sekali.
- Gunakan constraint database atau transaksi atomik yang sesuai.
- Tangani pembayaran sukses di blockchain tetapi update database gagal.
- Periksa transaksi sebelumnya sebelum meminta pengguna membayar lagi.

## Input dan biaya
- Gunakan integer token units untuk nominal.
- Tolak nol, nilai negatif, NaN/Infinity, dan nilai di luar batas.
- Gunakan presisi token dan jaringan yang benar.
- Bedakan estimasi network fee dari biaya final.
- Jangan tampilkan angka biaya yang belum tersedia sebagai angka pasti.
- Jangan percaya nominal dari URL tanpa validasi terhadap data permintaan tersimpan.

## Secrets dan logging
- Simpan secret di environment backend yang sesuai.
- Jangan log private key, access token, atau secret.
- Hindari log data pengguna yang tidak diperlukan.
- Jangan mengirim secret melalui tautan atau QR.

## Checklist sebelum deployment
- [ ] RLS dan policy diuji untuk pemilik, penerima, dan pengguna tanpa hak.
- [ ] Service-role key tidak ada di bundle frontend.
- [ ] Edge Function memverifikasi autentikasi dan otorisasi.
- [ ] Frontend tidak dapat menetapkan status paid sendiri.
- [ ] Receipt, jaringan, token, penerima, dan nominal diverifikasi.
- [ ] Sinkronisasi idempotent.
- [ ] Kegagalan update database setelah transaksi sukses dapat dipulihkan.
- [ ] Error tidak membocorkan secret atau detail internal.
- [ ] Uji di Base Sepolia sebelum produksi.

Klaim keamanan harus didukung pemeriksaan kode, konfigurasi, policy, dan pengujian aktual.
