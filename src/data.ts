import { CampusService, CampusProblem } from "./types";

export const INITIAL_SERVICES: CampusService[] = [
  {
    id: "surat-aktif-kuliah",
    title: "Pengurusan Surat Keterangan Aktif Kuliah",
    category: "Akademik",
    description: "Panduan resmi untuk memperoleh surat keterangan aktif kuliah guna pengurusan beasiswa, BPJS, atau keperluan administrasi lainnya.",
    recommendation: "Gunakan portal mahasiswa untuk unggah berkas awal, waktu verifikasi adalah 1-2 hari kerja.",
    officialChannel: "Direktorat Akademik (Gedung Rektorat Lt. 2) / Email: akademik@univ.ac.id",
    searchCount: 452,
    steps: [
      "Login ke Portal Mahasiswa dengan akun SSO Anda.",
      "Pilih menu 'Layanan Surat' kemudian klik 'Surat Aktif Kuliah'.",
      "Unduh dan isi formulir permohonan, lampirkan bukti pembayaran UKT semester berjalan.",
      "Unggah kembali formulir yang telah ditandatangani oleh Dosen Wali ke portal.",
      "Kumpulkan draf fisik atau tunggu notifikasi persetujuan digital untuk diunduh (Surat bertanda tangan dekan)."
    ],
    requiredDetails: [
      "Nama Lengkap & NIM aktif",
      "Program Studi dan Fakultas",
      "Semester Berjalan & Status Registrasi",
      "Tujuan Pembuatan Surat (misal: Pengajuan Beasiswa, BPJS, Tunjangan Orang Tua)",
      "KRS Semester Aktif yang telah disetujui Dosen Wali"
    ]
  },
  {
    id: "sso-password",
    title: "Reset Password SSO & Akun Mahasiswa",
    category: "Sistem Akun",
    description: "Alur pemulihan kata sandi Single Sign On (SSO) universitas untuk mengakses portal akademik, LMS, dan email kampus.",
    recommendation: "Gunakan fitur lupa kata sandi dengan email pemulihan sekunder, atau hubungi Helpdesk IT.",
    officialChannel: "Pusat Layanan Teknologi Informasi (Gedung Kuliah Umum Lt. 1) / Email: helpdesk@univ.ac.id",
    searchCount: 521,
    steps: [
      "Akses laman login SSO universitas di sso.univ.ac.id.",
      "Klik opsi 'Lupa Password?' di bawah tombol login.",
      "Masukkan NIM (Mahasiswa) atau NIP (Dosen/Staf) serta email pemulihan terdaftar.",
      "Cek kotak masuk email pemulihan untuk kiriman tautan setel ulang password.",
      "Jika email pemulihan tidak aktif, ajukan pemulihan manual dengan mengunggah foto KTM."
    ],
    requiredDetails: [
      "NIM (Nomor Induk Mahasiswa)",
      "Nama Lengkap sesuai data SIAKAD",
      "Alamat email pribadi (non-kampus) yang terdaftar",
      "Nomor WhatsApp aktif",
      "Foto Kartu Tanda Mahasiswa (KTM)"
    ]
  },
  {
    id: "pengisian-krs",
    title: "Panduan Pengisian KRS & Konsultasi Wali",
    category: "Akademik",
    description: "Prosedur pengisian Kartu Rencana Studi (KRS) pada awal semester, termasuk kuota SKS berdasarkan IPK dan persetujuan dosen wali.",
    recommendation: "Konsultasikan draf kuliah dengan dosen wali terlebih dahulu untuk menghindari penolakan KRS.",
    officialChannel: "Layanan Akademik Fakultas / Dosen Wali masing-masing",
    searchCount: 387,
    steps: [
      "Periksa jadwal resmi pengisian KRS dan batas pembayaran UKT.",
      "Pastikan status kemahasiswaan aktif di portal akademik Anda.",
      "Pilih daftar mata kuliah yang sesuai dengan kurikulum dan kuota SKS Anda.",
      "Klik 'Simpan Draft KRS' dan hubungi Dosen Wali untuk verifikasi.",
      "Setelah disetujui oleh dosen wali, pastikan status KRS berubah menjadi 'Disetujui'."
    ],
    requiredDetails: [
      "Draf mata kuliah yang akan diambil",
      "Nama dan NIP Dosen Wali",
      "KTM digital",
      "Transkrip Nilai Semester Sebelumnya (untuk acuan kuota SKS)"
    ]
  },
  {
    id: "pembayaran-ukt",
    title: "Kendala Pembayaran UKT & Pengajuan Cicilan",
    category: "Keuangan",
    description: "Panduan penyelesaian masalah pembayaran Uang Kuliah Tunggal (UKT), kode Virtual Account (VA) tidak terdeteksi, dan prosedur pengajuan penangguhan/cicilan.",
    recommendation: "Batas pengajuan keringanan atau cicilan UKT adalah 2 minggu sebelum masa pengisian KRS dimulai.",
    officialChannel: "Direktorat Keuangan & Sumber Daya / Email: finance@univ.ac.id / WA: +62 812-3456-7890",
    searchCount: 298,
    steps: [
      "Unduh tagihan UKT terbaru di portal keuangan mahasiswa.",
      "Salin kode Virtual Account (VA) untuk bank yang bermitra (Mandiri, BNI, BRI).",
      "Jika kode VA kedaluwarsa, lakukan 'Generate Ulang' di portal keuangan.",
      "Untuk pengajuan cicilan, isi borang alasan finansial dan lampirkan surat pernyataan orang tua.",
      "Kirimkan dokumen pengajuan ke Direktorat Keuangan untuk verifikasi dan pembukaan blokir KRS."
    ],
    requiredDetails: [
      "Nilai UKT semester ini",
      "Nomor Virtual Account yang kedaluwarsa",
      "Surat Keterangan Penghasilan Orang Tua (apabila mengajukan cicilan)",
      "Bukti pembayaran semester sebelumnya"
    ]
  },
  {
    id: "kendala-lms",
    title: "Kendala Akses LMS & Portal CeLOE",
    category: "IT & Jaringan",
    description: "Penyelesaian masalah autentikasi atau gagal sinkronisasi kelas pada Learning Management System (LMS) universitas.",
    recommendation: "Lakukan sinkronisasi mandiri kelas pada halaman profil portal SSO jika kelas semester baru belum muncul di LMS.",
    officialChannel: "Unit E-Learning Kampus / Email: celoe@univ.ac.id",
    searchCount: 189,
    steps: [
      "Pastikan KRS Anda sudah disetujui (Disetujui Wali) dan sinkronisasi SIAKAD selesai.",
      "Masuk ke LMS universitas lms.univ.ac.id menggunakan akun SSO.",
      "Jika kelas Anda masih kosong, buka halaman 'Sync SIAKAD' di pojok kanan profil.",
      "Tunggu proses sinkronisasi database sekitar 10-15 menit.",
      "Bila kendala berlanjut, laporkan ke admin prodi dengan menyertakan bukti KRS disetujui."
    ],
    requiredDetails: [
      "NIM & Nama Mahasiswa",
      "Mata Kuliah & Kode Seksi yang tidak muncul",
      "Screenshot bukti KRS disetujui dosen wali",
      "Nama Dosen Pengampu kelas tersebut"
    ]
  },
  {
    id: "wifi-universitas",
    title: "Koneksi Wifi Universitas (Univ-Wifi-Secure)",
    category: "IT & Jaringan",
    description: "Panduan registrasi perangkat MAC Address untuk terhubung ke jaringan Wi-Fi kecepatan tinggi di seluruh lobi, kelas, dan asrama universitas.",
    recommendation: "Pastikan MAC Address perangkat Anda sudah terdaftar di portal Wi-Fi SSO untuk koneksi tanpa batas.",
    officialChannel: "IT Support Center Gedung Perpustakaan Lt. G",
    searchCount: 124,
    steps: [
      "Sambungkan ke Wi-Fi dengan nama SSID 'Univ-Wifi-Secure'.",
      "Saat landing page autentikasi terbuka, login dengan username SSO.",
      "Jika gagal tersambung otomatis, salin MAC Address HP/Laptop Anda.",
      "Buka portal sso.univ.ac.id, pilih menu 'My Devices', masukkan MAC Address baru.",
      "Restart modul Wi-Fi perangkat Anda, coba sambungkan kembali."
    ],
    requiredDetails: [
      "Alamat Fisik (MAC Address) perangkat",
      "Jenis perangkat (Android/iOS/Windows/macOS)",
      "Username SSO aktif"
    ]
  }
];

export const INITIAL_PROBLEMS: CampusProblem[] = [
  { id: "p1", title: "Keterlambatan Penilaian SIAKAD Semester Ganjil", reportedCount: 45, status: "Dalam Peninjauan", category: "Akademik" },
  { id: "p2", title: "Masalah Autentikasi Aplikasi Presensi Kehadiran", reportedCount: 92, status: "Kritis", category: "IT & Jaringan" },
  { id: "p3", title: "Pengembalian Lebih UKT (Refund) Jalur Prestasi", reportedCount: 12, status: "Aman", category: "Keuangan" },
  { id: "p4", title: "Sinkronisasi Server LMS CeLOE di Jam Kuliah Utama", reportedCount: 68, status: "Kritis", category: "IT & Jaringan" },
  { id: "p5", title: "Pengajuan Bebas Pustaka Online Perpustakaan Pusat", reportedCount: 29, status: "Sedang", category: "Fasilitas" }
];
