export const id = {
  meta: {
    title: 'Pukico – Kirim crypto semudah kirim duit ke temen',
    description:
      'Wallet crypto buat pemula. Kirim dan terima pakai username (Pukico ID, contoh @andika), bukan alamat 0x yang panjang. Masuk waitlist sekarang.',
  },
  nav: {
    joinDiscord: 'Gabung Discord',
    joinWaitlist: 'Masuk Waitlist',
    logoAriaLabel: 'Pukico Beranda',
  },
  hero: {
    kicker: 'Lagi waitlist · Beta di Base Sepolia (testnet)',
    closedBetaBadge: 'Closed Beta',
    closedBetaText:
      'Akses saat ini lewat undangan. Gabung waitlist, atau masuk di app.pukico.xyz jika kamu sudah punya kode akses.',
    haveAccessCode: 'Punya kode akses? Masuk',
    h1Prefix: 'Kirim crypto ',
    h1Highlight: 'semudah kirim duit ke temen',
    h1Suffix: '.',
    sub: 'Gak perlu hafalin alamat 0x yang panjangnya kayak kode rahasia. Cukup pakai Pukico ID, contohnya @andika, beres.',
    inputAriaLabel: 'Ketik Pukico ID yang mau dicek',
    placeholder: 'andika',
    check: 'Cek ID kamu',
    checking: 'Mengecek...',
    claimButton: 'Amanin @{id}',
    claimLink: 'Klaim sekarang ↓',
    available: '@{id} tersedia!',
    taken: '@{id} udah diambil, coba yang lain',
    empty: 'Masukkan Pukico ID yang mau kamu cek.',
    format:
      'Format salah. Hanya boleh huruf kecil (a-z), angka (0-9), dan garis bawah (_), 3-20 karakter.',
    serverError: 'Lagi ada masalah di sisi kami. Coba lagi bentar ya.',
    finePrint:
      'ID yang kamu amanin di waitlist dikunci buat kamu. Klaim finalnya tetap lewat proses resmi di Pukico pas beta dibuka.',
  },
  why: {
    title: 'Alamat wallet itu serem.',
    p1: 'Wajar kalau banyak orang males mulai.',
    p2: 'Di Pukico, kamu cukup ketik @username. Kami cariin alamat aslinya, lalu kamu cek dulu sebelum kirim.',
    oldLabel: 'Cara lama',
    oldNote:
      'Salah satu karakter aja, aset bisa nyasar ke alamat lain dan gak bisa ditarik balik.',
    newLabel: 'Cara Pukico',
    newNote: 'Otomatis dicocokin ke 0x7a3F...c91B',
  },
  how: {
    title: 'Cara kerjanya',
    step1Title: 'Amanin Pukico ID',
    step1Desc:
      'Pilih username kamu. Sekali diklaim, gak bisa diganti atau dihapus.',
    step2Title: 'Masuk pakai email',
    step2Desc:
      'Dompet kamu dibuat lewat Privy. Kami gak nyimpen private key kamu di database kami.',
    step3Title: 'Kirim dan terima pakai @',
    step3Desc:
      'Alamat 0x tetap ada kalau kamu butuh buat kirim dari atau ke wallet lain.',
  },
  diff: {
    title: 'Yang bikin beda',
    block1Title: 'ID permanen.',
    block1Desc:
      'Sekali jadi punya kamu, gak ada yang bisa ambil. Gak bisa diganti juga, jadi pilih yang beneran kamu banget.',
    block2Title: 'Konfirmasi dulu, baru kirim.',
    block2Desc:
      'Sebelum tanda tangan, kamu liat siapa penerimanya, berapa jumlahnya, dan berapa biaya gasnya.',
    block3Title: 'Status apa adanya.',
    block3Desc:
      'Masih diproses ya ditulis diproses. Gagal ya ditulis gagal. Kami gak bilang sukses sebelum beneran sukses di blockchain.',
  },
  honest: {
    title: 'Jujur dulu ya',
    sub: 'Sebelum daftar, kamu perlu tau ini:',
    points: [
      'Pukico saat ini berjalan di testnet Base Sepolia. Tidak ada uang sungguhan yang terlibat.',
      'Ini masih testnet. Semua aset di beta gak ada nilai uang aslinya.',
      'Transaksi blockchain tetap ada biaya jaringan (gas).',
      'Transaksi bisa agak lama, bahkan bisa gagal. Makanya kami tampilin statusnya jelas.',
      'Namanya juga beta, bakal ada bug. Laporin di Discord, kami baca.',
    ],
  },
  waitlist: {
    title: 'Masuk waitlist, amanin ID kamu.',
    closedBetaBadge: 'Closed Beta',
    closedBetaNotice:
      'Akses saat ini lewat undangan. Gabung waitlist, atau masuk di app.pukico.xyz jika kamu sudah punya kode akses.',
    haveAccessCode: 'Punya kode akses? Masuk',
    emailLabel: 'Email',
    idLabel: 'Pukico ID incaran',
    optional: '(opsional)',
    checking: 'Mengecek...',
    button: 'Masuk Waitlist',
    submitting: 'Mengirim data...',
    successTitle: 'Udah masuk.',
    successText:
      'Kamu bakal kami kabarin pas beta dibuka. Biar gak ketinggalan, gabung Discord-nya sekarang.',
    successButton: 'Gabung Discord',
    noIdNote:
      'Kamu belum amanin Pukico ID. Masih bisa kok: isi form ini lagi pakai email yang sama plus ID incaran kamu.',
    errors: {
      emailExists: 'Email ini udah masuk waitlist, aman.',
      idTaken: '@{id} udah diambil orang lain, coba yang lain.',
      idTakenFallback: 'ID udah diambil orang lain.',
      invalidEmail: 'Masukkan alamat email yang valid.',
      invalidId:
        'Format ID salah. Hanya boleh huruf kecil, angka, dan garis bawah (_), 3-20 karakter.',
      server: 'Lagi ada masalah di sisi kami. Coba lagi bentar ya.',
    },
    agreementPre: 'Dengan bergabung, kamu menyetujui ',
    agreementTerms: 'Syarat',
    agreementAnd: ' dan ',
    agreementPrivacy: 'Kebijakan Privasi',
    agreementPost: '.',
  },
  faq: {
    title: 'Yang sering ditanyain',
    items: [
      {
        q: 'Pukico itu apa sih?',
        a: 'Wallet crypto yang bisa kirim dan terima pakai username, bukan alamat panjang.',
      },
      {
        q: 'Bagaimana cara dapat kode akses?',
        a: 'Gabung waitlist dan Discord kami. Undangan dikirim bertahap lewat email waitlist.',
      },
      {
        q: 'Beneran pakai duit?',
        a: 'Pukico saat ini berjalan di testnet Base Sepolia. Tidak ada uang sungguhan yang terlibat.',
      },
      {
        q: 'Pukico ID bisa diganti?',
        a: 'Gak bisa. Sekali diklaim, permanen. Jadi pikirin dulu.',
      },
      {
        q: 'Kalau ganti HP, dompetku hilang?',
        a: 'Kamu bisa pulihin lewat login dan mekanisme pemulihan Privy. Kami bakal uji ini serius di beta.',
      },
      {
        q: 'Kapan beta dibuka?',
        a: 'Belum ada tanggal pasti. Kabar terbaru kami taruh di Discord.',
      },
    ],
  },
  footer: {
    feedback: 'Dibikin sambil dengerin masukan kalian di Discord.',
    disclaimer: 'Beta di Base Sepolia testnet. Bukan nasihat keuangan.',
    testnetNotice: 'Beta uji coba di jaringan testnet Base Sepolia. Token tidak bernilai uang.',
    privacy: 'Kebijakan Privasi',
    terms: 'Syarat',
    discord: 'Discord',
    x: 'X',
  },
  privacy: {
    title: 'Kebijakan Privasi',
    lastUpdated: 'Terakhir diperbarui: 31 Oktober 2026',
    backHome: '← Kembali ke beranda',
    tocTitle: 'Daftar Isi',
    contactLine: 'Hubungi kami di {email}.',
    sections: [
      {
        id: 'section-1',
        title: '1. Siapa kami',
        content:
          'Pukico (pukico.xyz) adalah wallet non-custodial untuk uji coba (beta) di jaringan testnet Base Sepolia. Kebijakan ini menjelaskan data apa yang kami proses saat kamu memakai Pukico.',
      },
      {
        id: 'section-2',
        title: '2. Data yang kami kumpulkan',
        content:
          'Email (diverifikasi melalui penyedia login kami). Pukico ID yang kamu pilih. Alamat wallet. Pengenal akun dari penyedia login. Daftar teman yang kamu simpan. Catatan transaksi di dalam Pukico: alamat pengirim dan penerima, jumlah, hash transaksi, status, dan status biaya layanan. Notifikasi di dalam aplikasi. Data waitlist: email dan Pukico ID yang kamu inginkan. Catatan teknis keamanan: jenis kejadian, pengenal akun, dan alamat IP yang disimpan hanya dalam bentuk hash.',
      },
      {
        id: 'section-3',
        title: '3. Yang tidak kami pegang',
        content:
          'Pukico tidak pernah memegang kunci privat atau seed phrase milikmu. Kunci wallet tertanam dikelola oleh penyedia wallet kami; aksesnya kamu kendalikan melalui login email dan, jika kamu aktifkan, passkey. Jangan pernah membagikan kunci privat hasil ekspor kepada siapa pun.',
      },
      {
        id: 'section-4',
        title: '4. Untuk apa data dipakai',
        content:
          'Menjalankan layanan (login, wallet, kirim dan terima, daftar teman, notifikasi). Menjaga keamanan dan mencegah penyalahgunaan (pembatasan laju permintaan, deteksi perubahan alamat yang mencurigakan). Memperbaiki produk selama beta. Kami tidak menjual datamu dan tidak memakainya untuk iklan.',
      },
      {
        id: 'section-5',
        title: '5. Data yang bersifat publik',
        content:
          'Transaksi di blockchain bersifat publik dan permanen; siapa pun dapat melihatnya melalui penjelajah blok seperti BaseScan, dan kami tidak dapat mengubah atau menghapusnya. Selain itu, pengguna Pukico lain yang mengetahui alamat wallet-mu dapat mengetahui Pukico ID yang terkait, dan sebaliknya, karena fitur pencarian penerima.',
      },
      {
        id: 'section-6',
        title: '6. Pihak ketiga yang kami pakai',
        content:
          'Penyedia login dan wallet tertanam (Privy), basis data dan fungsi server (Supabase), hosting (Vercel), jaringan RPC publik Base Sepolia, dan layanan anti-bot (Cloudflare Turnstile) pada formulir tertentu. Faucet token uji (Circle) dibuka di situs mereka sendiri dan tunduk pada kebijakan mereka.',
      },
      {
        id: 'section-7',
        title: '7. Penyimpanan',
        content:
          'Data disimpan selama beta berlangsung. Karena ini testnet, data dan saldo dapat direset atau dihapus sewaktu-waktu. Catatan keamanan disimpan terbatas untuk kebutuhan investigasi.',
      },
      {
        id: 'section-8',
        title: '8. Hakmu',
        content:
          'Kamu dapat meminta akses, koreksi, atau penghapusan data yang kami simpan, dan menarik persetujuan, dengan menghubungi kami. Data yang sudah tercatat di blockchain publik tidak dapat dihapus.',
      },
      {
        id: 'section-9',
        title: '9. Keamanan',
        content:
          'Kami menerapkan langkah keamanan yang wajar, tetapi tidak ada sistem yang sepenuhnya aman. Laporkan dugaan celah keamanan kepada kami.',
      },
      {
        id: 'section-10',
        title: '10. Usia',
        content: 'Pukico ditujukan untuk pengguna berusia 18 tahun ke atas.',
      },
      {
        id: 'section-11',
        title: '11. Perubahan',
        content:
          'Kami dapat memperbarui kebijakan ini; tanggal pembaruan terbaru tertera di atas halaman.',
      },
      {
        id: 'section-12',
        title: '12. Kontak',
        content: '',
      },
    ],
  },
  terms: {
    title: 'Syarat Penggunaan',
    lastUpdated: 'Terakhir diperbarui: 31 Oktober 2026',
    backHome: '← Kembali ke beranda',
    tocTitle: 'Daftar Isi',
    contactLine: 'Hubungi kami di {email}.',
    sections: [
      {
        id: 'section-1',
        title: '1. Ini uji coba testnet',
        content:
          'Pukico saat ini hanya berjalan di jaringan testnet Base Sepolia. Token (termasuk USDC uji) tidak memiliki nilai uang. Jangan menganggap saldo di Pukico sebagai uang atau aset yang dapat ditukar.',
      },
      {
        id: 'section-2',
        title: '2. PERINGATAN: jangan kirim aset asli',
        content:
          'Alamat wallet-mu berbentuk alamat Ethereum yang dikenali di banyak jaringan. Jangan mengirim aset asli (mainnet) ke alamat wallet Pukico, termasuk di jaringan lain; aset itu dapat hilang permanen dan Pukico tidak dapat memulihkannya.',
      },
      {
        id: 'section-3',
        title: '3. Layanan apa adanya',
        content:
          'Pukico beta disediakan "apa adanya" tanpa jaminan ketersediaan, ketepatan, atau kelayakan untuk tujuan tertentu. Fitur dapat berubah, berhenti, atau direset tanpa pemberitahuan.',
      },
      {
        id: 'section-4',
        title: '4. Wallet non-custodial dan tanggung jawabmu',
        content:
          'Kamu bertanggung jawab atas akses akunmu (email, passkey) dan atas setiap transaksi yang kamu setujui. Transaksi blockchain tidak dapat dibatalkan. Jika kamu mengirim ke alamat yang salah atau ke kontrak yang tidak mendukung token, dana dapat hilang dan Pukico tidak dapat mengembalikannya.',
      },
      {
        id: 'section-5',
        title: '5. Biaya',
        content:
          'Pukico mengenakan biaya layanan 0,5% (minimum 0,01 USDC uji) per pengiriman. Biaya jaringan (gas) dibayar dalam ETH testnet langsung ke validator jaringan, bukan ke Pukico. Seluruh angka ini berlaku untuk masa uji coba dan dapat berubah.',
      },
      {
        id: 'section-6',
        title: '6. Pukico ID',
        content:
          'Pukico ID bersifat permanen setelah dipilih. Kami dapat mencabut atau mengubah ID yang meniru pihak lain, menyesatkan, atau melanggar syarat ini.',
      },
      {
        id: 'section-7',
        title: '7. Penggunaan yang dilarang',
        content:
          'Dilarang: menyalahgunakan layanan atau membebani sistem; mengumpulkan massal data pengguna atau menyapu direktori Pukico ID; membuat akun ganda untuk menghindari batas; mencoba menembus atau mengganggu keamanan; meniru identitas; atau melanggar hukum yang berlaku. Pelanggaran dapat berakibat pencabutan akses beta.',
      },
      {
        id: 'section-8',
        title: '8. Batas tanggung jawab',
        content:
          'Sejauh diizinkan hukum, Pukico dan pengelolanya tidak bertanggung jawab atas kerugian yang timbul dari penggunaan layanan uji coba ini.',
      },
      {
        id: 'section-9',
        title: '9. Hukum yang berlaku',
        content: 'Syarat ini tunduk pada hukum yang berlaku di Republik Indonesia.',
      },
      {
        id: 'section-10',
        title: '10. Perubahan',
        content:
          'Kami dapat memperbarui syarat ini; tanggal pembaruan tertera di atas halaman. Memakai Pukico setelah perubahan berarti kamu menerimanya.',
      },
      {
        id: 'section-11',
        title: '11. Kontak',
        content: '',
      },
    ],
  },
  preview: {
    sendTo: 'Kirim ke',
    idFound: 'ID ketemu',
    amount: 'Jumlah kirim',
    testTokenNote: 'Testnet token (tidak bernilai asli)',
    gasFee: 'Biaya gas',
    network: 'Jaringan',
    status: 'Status',
    readyToConfirm: 'Siap dikonfirmasi',
    confirmAndSend: 'Konfirmasi & Kirim',
    label: 'Ilustrasi tampilan Pukico di browser, bukan data asli',
  },
};

export type Translations = typeof id;
