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
    discord: 'Discord',
    x: 'X',
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
