import { CampusService, CampusProblem } from "./types";

export const INITIAL_SERVICES: CampusService[] = [
  // ================= MAHASISWA SERVICES =================
  {
    id: "surat-aktif-kuliah",
    title: "Pengurusan Surat Keterangan Aktif Kuliah",
    category: "Akademik",
    description: "Panduan resmi memperoleh surat keterangan aktif kuliah untuk beasiswa, BPJS, atau keperluan administrasi lainnya.",
    recommendation: "Gunakan portal mahasiswa untuk unggah berkas awal, waktu verifikasi adalah 1-2 hari kerja.",
    officialChannel: "Direktorat Akademik (Gedung Rektorat Lt. 2) / Email: akademik@univ.ac.id",
    searchCount: 452,
    steps: [
      "Login ke Portal Mahasiswa dengan akun SSO Anda.",
      "Pilih menu 'Layanan Surat' kemudian klik 'Surat Aktif Kuliah'.",
      "Unduh dan isi formulir permohonan, lampirkan bukti pembayaran UKT semester berjalan.",
      "Unggah kembali formulir yang telah ditandatangani oleh Dosen Wali ke portal.",
      "Unduh surat digital bertanda tangan dekan yang terbit dalam 1-2 hari kerja."
    ],
    requiredDetails: [
      "Nama Lengkap & NIM aktif",
      "Program Studi dan Fakultas",
      "Semester Berjalan & Status Registrasi",
      "Tujuan Pembuatan Surat (misal: Beasiswa, BPJS, Tunjangan)",
      "KRS Semester Aktif yang telah disetujui Dosen Wali"
    ],
    roles: ["mahasiswa"]
  },
  {
    id: "sso-password-mhs",
    title: "Reset Password SSO & Akun Mahasiswa",
    category: "Akun & SSO",
    description: "Pemulihan kata sandi Single Sign On (SSO) untuk mahasiswa guna mengakses iGracias, LMS, portal akademik, dan email kampus.",
    recommendation: "Gunakan fitur lupa kata sandi dengan email sekunder, atau hubungi Helpdesk IT.",
    officialChannel: "Pusat Layanan IT (Gedung GKU Lt. 1) / Email: helpdesk@univ.ac.id",
    searchCount: 521,
    steps: [
      "Akses laman login SSO mahasiswa di sso.univ.ac.id.",
      "Klik opsi 'Lupa Password?' di bawah tombol login.",
      "Masukkan NIM dan alamat email pribadi sekunder yang terdaftar.",
      "Buka kotak masuk email sekunder dan klik tautan setel ulang password.",
      "Jika email sekunder tidak aktif, lakukan reset manual di Helpdesk IT dengan menyertakan foto KTM."
    ],
    requiredDetails: [
      "NIM (Nomor Induk Mahasiswa)",
      "Nama Lengkap sesuai data SIAKAD",
      "Alamat email pribadi sekunder aktif",
      "Nomor WhatsApp aktif",
      "Foto KTM (Kartu Tanda Mahasiswa)"
    ],
    roles: ["mahasiswa"]
  },
  {
    id: "pembayaran-ukt",
    title: "Kendala Pembayaran UKT & Pengajuan Cicilan",
    category: "Keuangan",
    description: "Panduan penyelesaian masalah pembayaran Uang Kuliah Tunggal (UKT), Virtual Account kedaluwarsa, dan alur permohonan cicilan.",
    recommendation: "Ajukan surat penangguhan atau cicilan UKT paling lambat 2 minggu sebelum masa pengisian KRS dimulai.",
    officialChannel: "Direktorat Keuangan / Email: finance@univ.ac.id / WA: +62 812-3456-7890",
    searchCount: 298,
    steps: [
      "Periksa rincian tagihan UKT semester berjalan di portal keuangan.",
      "Salin nomor Virtual Account (VA) untuk pembayaran via Bank Mandiri, BNI, atau BRI.",
      "Jika VA kedaluwarsa, klik 'Generate Ulang' di portal keuangan.",
      "Untuk permohonan cicilan, isi formulir alasan finansial dan lampirkan slip gaji orang tua.",
      "Kirimkan dokumen ke Direktorat Keuangan untuk pembukaan blokir KRS sementara."
    ],
    requiredDetails: [
      "Nominal UKT dan status tagihan saat ini",
      "Nomor Virtual Account yang bermasalah",
      "Surat Keterangan Penghasilan Orang Tua (untuk pengajuan cicilan)",
      "Bukti pembayaran UKT semester sebelumnya"
    ],
    roles: ["mahasiswa"]
  },
  {
    id: "kendala-lms",
    title: "Kendala Akses LMS & Portal CeLOE",
    category: "LMS/CeLOE",
    description: "Penyelesaian masalah gagal login atau kelas mata kuliah baru tidak muncul di Learning Management System (LMS) CeLOE.",
    recommendation: "Lakukan sinkronisasi kelas secara mandiri melalui tombol 'Sync SIAKAD' di profil portal mahasiswa.",
    officialChannel: "Unit E-Learning CeLOE / Email: celoe@univ.ac.id",
    searchCount: 189,
    steps: [
      "Pastikan KRS Anda sudah disetujui (Disetujui Wali) dan berstatus aktif di SIAKAD.",
      "Login ke LMS di lms.univ.ac.id dengan akun SSO mahasiswa.",
      "Bila kelas kosong, buka halaman Profil di kanan atas dan pilih menu 'Sync SIAKAD'.",
      "Tunggu proses sinkronisasi database sekitar 10-15 menit.",
      "Bila kelas tetap tidak muncul, laporkan ke admin prodi dengan melampirkan screenshot bukti KRS."
    ],
    requiredDetails: [
      "NIM & Nama Mahasiswa",
      "Mata Kuliah & Kode Kelas yang tidak muncul",
      "Screenshot bukti KRS disetujui dosen wali",
      "Nama Dosen Pengampu"
    ],
    roles: ["mahasiswa"]
  },
  {
    id: "bebas-pustaka",
    title: "Bebas Pustaka Online & Open Library",
    category: "Open Library",
    description: "Prosedur pengurusan surat bebas perpustakaan (bebas pustaka) sebagai syarat kelulusan, wisuda, atau pengunduran diri.",
    recommendation: "Kembalikan semua pinjaman buku fisik dan bayar denda (jika ada) secara online terlebih dahulu.",
    officialChannel: "Unit Perpustakaan Pusat (Open Library) / Email: library@univ.ac.id",
    searchCount: 145,
    steps: [
      "Akses portal Open Library di openlib.univ.ac.id.",
      "Login menggunakan akun SSO mahasiswa.",
      "Pilih menu 'Layanan Bebas Pustaka' di dashboard.",
      "Periksa status pinjaman buku dan tanggungan denda keterlambatan.",
      "Unggah file tugas akhir/skripsi yang telah disetujui ke repositori institusi.",
      "Unduh Surat Keterangan Bebas Pustaka digital setelah diverifikasi petugas (1 hari kerja)."
    ],
    requiredDetails: [
      "NIM & Nama Mahasiswa",
      "Judul Tugas Akhir / Skripsi yang diunggah",
      "Lembar Pengesahan Tugas Akhir bertanda tangan lengkap",
      "Bukti pembayaran denda perpustakaan (jika ada)"
    ],
    roles: ["mahasiswa"]
  },
  {
    id: "wifi-universitas",
    title: "Koneksi Wifi Universitas (Univ-Wifi-Secure)",
    category: "IT & Jaringan",
    description: "Panduan registrasi MAC Address perangkat untuk tersambung ke jaringan Wi-Fi kecepatan tinggi di area kampus.",
    recommendation: "Daftarkan MAC Address laptop/smartphone Anda di portal Wi-Fi SSO agar tidak perlu login berulang.",
    officialChannel: "IT Support Center (Gedung Perpustakaan Lt. G)",
    searchCount: 124,
    steps: [
      "Aktifkan Wi-Fi perangkat dan hubungkan ke SSID 'Univ-Wifi-Secure'.",
      "Saat portal login terbuka, masukkan username dan password SSO Anda.",
      "Bila koneksi terputus otomatis, salin MAC Address perangkat Anda.",
      "Buka portal sso.univ.ac.id, masuk ke menu 'Device Management', dan daftarkan MAC Address.",
      "Sambungkan kembali ke Wi-Fi tanpa harus memasukkan kredensial lagi."
    ],
    requiredDetails: [
      "MAC Address perangkat",
      "Tipe perangkat (Windows/macOS/Android/iOS)",
      "Username SSO aktif"
    ],
    roles: ["mahasiswa"]
  },
  {
    id: "lomba-kemahasiswaan",
    title: "Info Beasiswa, Event, Lomba, dan Karier",
    category: "Kemahasiswaan",
    description: "Informasi dan pendaftaran bantuan beasiswa internal/eksternal, delegasi lomba nasional/internasional, dan bimbingan karier mahasiswa.",
    recommendation: "Gunakan portal kemahasiswaan untuk mendaftarkan keikutsertaan lomba guna pencatatan poin Transkrip Aktivitas Kemahasiswaan (TAK).",
    officialChannel: "Direktorat Kemahasiswaan (Gedung Student Center Lt. 1) / Email: student.care@univ.ac.id",
    searchCount: 167,
    steps: [
      "Buka portal kemahasiswaan di student.univ.ac.id.",
      "Pilih kategori 'Beasiswa & Lomba' untuk melihat daftar program aktif.",
      "Lengkapi persyaratan administrasi seperti Transkrip Nilai dan rekomendasi prodi.",
      "Unggah berkas pendaftaran melalui form yang disediakan.",
      "Pantau pengumuman hasil seleksi wawancara dan administrasi secara berkala."
    ],
    requiredDetails: [
      "NIM & Nama Mahasiswa",
      "Transkrip Nilai (IPK) berjalan",
      "Sertifikat prestasi pendukung",
      "Surat Rekomendasi Fakultas (jika mendaftar lomba resmi)"
    ],
    roles: ["mahasiswa"]
  },
  {
    id: "peminjaman-fasilitas-mhs",
    title: "Peminjaman Fasilitas & Ruang Kegiatan Mahasiswa",
    category: "Fasilitas",
    description: "Prosedur reservasi lapangan olahraga, gedung serbaguna, dan ruang rapat untuk keperluan kegiatan organisasi kemahasiswaan.",
    recommendation: "Ajukan permohonan peminjaman minimal 7 hari sebelum acara dimulai dengan melampirkan proposal kegiatan disetujui pembina.",
    officialChannel: "Bagian Rumah Tangga & Logistik / Email: logistik.mhs@univ.ac.id",
    searchCount: 95,
    steps: [
      "Periksa jadwal ketersediaan ruangan di portal fasilitas kampus.",
      "Unduh formulir peminjaman ruang di website kemahasiswaan.",
      "Isi formulir dan lampirkan proposal kegiatan yang sudah ditandatangani Ketua Himpunan/UKM dan Dosen Pembina.",
      "Serahkan formulir ke Bagian Rumah Tangga Gedung Rektorat Lt. 1.",
      "Terima Surat Izin Peminjaman Fasilitas resmi setelah disetujui."
    ],
    requiredDetails: [
      "Nama Organisasi/Unit Kegiatan Mahasiswa (UKM)",
      "Nama & Kontak Penanggung Jawab (NIM)",
      "Jenis Fasilitas/Ruang yang diajukan",
      "Tanggal, Waktu, dan Estimasi Jumlah Peserta",
      "Proposal Kegiatan yang sudah disetujui pembina"
    ],
    roles: ["mahasiswa"]
  },

  // ================= DOSEN SERVICES =================
  {
    id: "kendala-lms-dosen",
    title: "Kelola Nilai & Sinkronisasi Kelas LMS Dosen",
    category: "LMS/CeLOE",
    description: "Solusi kendala input tugas, pembuatan kuis, sinkronisasi daftar mahasiswa dari SIAKAD, serta pengunggahan materi ajar pada LMS CeLOE.",
    recommendation: "Gunakan fitur 'Sync Students' pada panel mata kuliah untuk memperbarui daftar mahasiswa secara instan dari database SIAKAD.",
    officialChannel: "Unit CeLOE Support Center / Email: celoe.lecturer@univ.ac.id",
    searchCount: 224,
    steps: [
      "Login ke lms.univ.ac.id menggunakan akun SSO Dosen.",
      "Pilih kelas/mata kuliah yang diampu pada semester berjalan.",
      "Jika daftar mahasiswa tidak sesuai, klik tombol 'Sync Students from SIAKAD' di panel kanan.",
      "Untuk kendala impor nilai ke SIAKAD, unduh draf nilai berformat Excel dari LMS lalu unggah manual di SIAKAD Dosen.",
      "Jika berkas materi gagal diunggah karena batas ukuran file, gunakan integrasi Google Drive Google Workspace Kampus."
    ],
    requiredDetails: [
      "Nama & NIP Dosen",
      "Kode Mata Kuliah, Nama Kelas, & Kode Seksi",
      "Screenshot kendala atau error log LMS"
    ],
    roles: ["dosen"]
  },
  {
    id: "presensi-siakad-dosen",
    title: "Masalah Presensi Kelas & Portal iGracias Dosen",
    category: "Sistem Akademik",
    description: "Panduan mengatasi masalah pengisian presensi mahasiswa, perubahan jadwal kuliah, input nilai UTS/UAS, dan verifikasi KRS di portal akademik iGracias Dosen.",
    recommendation: "Segera lakukan penguncian presensi (lock attendance) sesaat setelah kelas berakhir demi keakuratan data kehadiran mahasiswa.",
    officialChannel: "Layanan Akademik Fakultas / Admin iGracias Pusat",
    searchCount: 312,
    steps: [
      "Buka portal akademik Dosen di igracias.univ.ac.id.",
      "Pilih menu 'Perkuliahan' lalu klik 'Presensi Kelas'.",
      "Pilih tanggal perkuliahan dan kelas yang ingin diisi.",
      "Jika tombol presensi terkunci, hubungi Admin Akademik Fakultas untuk memeriksa kalender akademik.",
      "Untuk persetujuan KRS mahasiswa bimbingan wali, masuk ke menu 'Dosen Wali' -> 'Persetujuan KRS'."
    ],
    requiredDetails: [
      "NIP Dosen",
      "Mata Kuliah & Kode Seksi Kelas",
      "Tanggal & Jam Sesi Kuliah yang bermasalah",
      "NIM mahasiswa bersangkutan (jika kendala presensi individu)"
    ],
    roles: ["dosen"]
  },
  {
    id: "sso-password-dosen",
    title: "Reset Password SSO Akun Dosen",
    category: "Akun & SSO",
    description: "Prosedur penyelesaian masalah gagal login Single Sign On (SSO) Dosen untuk iGracias, LMS, email dinas, dan VPN.",
    recommendation: "Gunakan email alternatif dinas universitas untuk pemulihan mandiri cepat.",
    officialChannel: "Pusat Teknologi Informasi (Gedung GKU Lt. 1) / Email: helpdesk@univ.ac.id",
    searchCount: 145,
    steps: [
      "Akses laman setel ulang sandi di sso.univ.ac.id.",
      "Pilih 'Reset Sandi Dosen/Pegawai'.",
      "Masukkan NIP Dosen dan alamat email dinas (@univ.ac.id) sebagai alamat pemulihan.",
      "Klik link verifikasi yang dikirimkan ke kotak masuk email dinas.",
      "Jika email dinas tidak bisa diakses, hubungi Helpdesk IT dengan melampirkan foto ID Pegawai/Dosen."
    ],
    requiredDetails: [
      "NIP / Kode Dosen",
      "Alamat email dinas (@univ.ac.id)",
      "Nomor WhatsApp aktif",
      "Foto Kartu Pegawai / ID Card Dosen"
    ],
    roles: ["dosen"]
  },
  {
    id: "penelitian-pengabdian",
    title: "Pengajuan Proposal Penelitian & Pengabdian Masyarakat",
    category: "Penelitian & Pengabdian",
    description: "Panduan pengajuan pendanaan penelitian internal, hibah DIKTI, pelaporan luaran, serta administrasi pengabdian masyarakat (Abdimas).",
    recommendation: "Pastikan kelengkapan berkas reviewer internal telah terpenuhi sebelum mengunggah draf ke sistem SIMLITABMAS internal.",
    officialChannel: "Direktorat Penelitian & Pengabdian Masyarakat (PPM) / Email: research@univ.ac.id",
    searchCount: 178,
    steps: [
      "Masuk ke portal SIMPPM menggunakan akun SSO Dosen.",
      "Pilih menu 'Pengajuan Hibah Baru' dan pilih kategori (Penelitian atau Abdimas).",
      "Unduh template proposal, susun rencana anggaran, dan unggah draf proposal PDF.",
      "Tambahkan anggota tim dosen dan mahasiswa beserta tugas masing-masing.",
      "Klik 'Submit Proposal' dan tunggu hasil desk evaluation dari komite reviewer."
    ],
    requiredDetails: [
      "Judul Penelitian / Abdimas",
      "NIP Ketua Pengusul & Identitas Anggota",
      "Kategori Hibah (Internal, Kemendikbud, Kerjasama Industri)",
      "Dokumen Rencana Anggaran Biaya (RAB) & Draf Proposal"
    ],
    roles: ["dosen"]
  },
  {
    id: "jafa-dosen",
    title: "Pengurusan Jabatan Akademik Fungsional Dosen (JAFA)",
    category: "Administrasi Dosen",
    description: "Tata cara pengajuan kenaikan Jabatan Akademik Fungsional Dosen (Asisten Ahli, Lektor, Lektor Kepala, Guru Besar).",
    recommendation: "Lakukan pencatatan KUM BKD (Beban Kerja Dosen) secara rutin setiap akhir semester agar penilaian angka kredit berjalan lancar.",
    officialChannel: "Direktorat Sumber Daya Manusia (SDM) / Email: sdm.jafa@univ.ac.id",
    searchCount: 201,
    steps: [
      "Akses sistem BKD/JAFA di portal sdm.univ.ac.id.",
      "Periksa perolehan KUM dari unsur Pendidikan, Penelitian, Pengabdian, dan Penunjang.",
      "Unggah berkas SK Mengajar, Sertifikat Publikasi Ilmiah, dan Laporan Kinerja Dosen.",
      "Ajukan usulan kenaikan jabatan fungsional melalui sistem.",
      "Verifikasi dokumen oleh Tim Penilai Angka Kredit (TPAK) tingkat Fakultas lalu Universitas."
    ],
    requiredDetails: [
      "NIP & Nama Lengkap",
      "Jabatan Fungsional saat ini & target kenaikan",
      "Daftar Publikasi Ilmiah (link Jurnal/Scopus)",
      "Berkas KUM yang telah divalidasi dekanat"
    ],
    roles: ["dosen"]
  },
  {
    id: "vpn-dosen",
    title: "Koneksi VPN & IT Support Dosen",
    category: "IT & Jaringan",
    description: "Panduan setup Virtual Private Network (VPN) universitas untuk mengakses database jurnal langganan dan sistem kampus secara remote.",
    recommendation: "Instal aplikasi FortiClient VPN atau OpenVPN sesuai sistem operasi laptop Anda sebelum mengimpor file konfigurasi kampus.",
    officialChannel: "Unit Infrastruktur & Jaringan IT / Email: net.support@univ.ac.id",
    searchCount: 110,
    steps: [
      "Unduh panduan VPN dan file konfigurasi (.ovpn / profil Fortinet) di it.univ.ac.id.",
      "Instal klien VPN resmi di komputer Anda.",
      "Impor file konfigurasi dan masukkan server tujuan: vpn.univ.ac.id.",
      "Koneksikan dengan username SSO dan password Dosen Anda.",
      "Akses database jurnal internasional (IEEE, ScienceDirect) secara langsung dari rumah."
    ],
    requiredDetails: [
      "NIP Dosen",
      "Sistem Operasi Perangkat (Windows/macOS/Linux)",
      "Status keaktifan SSO"
    ],
    roles: ["dosen"]
  },
  {
    id: "peminjaman-lab",
    title: "Peminjaman Ruang Rapat & Laboratorium Riset Dosen",
    category: "Ruang & Fasilitas",
    description: "Prosedur reservasi ruang rapat utama, auditorium fakultas, dan penggunaan fasilitas laboratorium riset untuk keperluan penelitian bersama mitra luar.",
    recommendation: "Reservasi ruangan sebaiknya dilakukan minimal 3 hari sebelum jadwal penggunaan guna menghindari tabrakan jadwal perkuliahan praktikum.",
    officialChannel: "Sub-Bagian Logistik & Rumah Tangga Fakultas",
    searchCount: 88,
    steps: [
      "Login ke portal logistik fakultas di logistik-fakultas.univ.ac.id.",
      "Cek status ketersediaan laboratorium riset atau ruang rapat pada tanggal yang dituju.",
      "Isi form reservasi online dengan mencantumkan detail keperluan pertemuan/riset.",
      "Unggah surat undangan mitra atau proposal riset sebagai lampiran pendukung.",
      "Petugas logistik akan mengirimkan konfirmasi pemesanan dan kode akses ruangan via email."
    ],
    requiredDetails: [
      "Nama Dosen Peminjam & NIP",
      "Ruangan / Laboratorium yang dituju",
      "Tanggal, Waktu, & Durasi pemakaian",
      "Agenda kegiatan (misal: Rapat Koordinasi Hibah, Eksperimen Riset)"
    ],
    roles: ["dosen"]
  },

  // ================= PEGAWAI KAMPUS SERVICES =================
  {
    id: "nota-dinas-pegawai",
    title: "Pembuatan Surat Tugas & Nota Dinas Internal",
    category: "Administrasi Internal",
    description: "Panduan pengajuan surat tugas dinas luar kota, nota dinas antar unit kerja, serta penomoran surat resmi di lingkungan administrasi kantor universitas.",
    recommendation: "Gunakan aplikasi e-Office universitas untuk proses persetujuan dan tanda tangan digital pimpinan yang sah.",
    officialChannel: "Sekretariat Rektorat (Gedung Rektorat Lt. 3) / Email: office@univ.ac.id",
    searchCount: 198,
    steps: [
      "Buka sistem e-Office di eoffice.univ.ac.id.",
      "Pilih menu 'Buat Surat Baru' lalu pilih template 'Nota Dinas' atau 'Surat Tugas'.",
      "Isikan perihal, unit penerima, nomor surat otomatis, dan isi surat dinas.",
      "Unggah lampiran pendukung seperti undangan dinas atau proposal tugas.",
      "Ajukan draf surat ke pimpinan unit kerja Anda untuk mendapatkan persetujuan digital (e-sign)."
    ],
    requiredDetails: [
      "NIP / NIK Pegawai",
      "Unit Kerja Asal & Unit Kerja Tujuan",
      "Perihal Nota Dinas / Rincian Lokasi & Waktu Tugas",
      "Anggaran Unit Kerja Terkait (jika dibebankan ke anggaran)"
    ],
    roles: ["pegawai"]
  },
  {
    id: "it-helpdesk-internal",
    title: "Tiket Kerusakan & Gangguan Sistem IT Pegawai",
    category: "IT & Sistem",
    description: "Pelaporan kerusakan komputer kerja, gangguan akses printer jaringan, instalasi software dinas, dan penanganan gangguan koneksi LAN di unit kerja.",
    recommendation: "Sertakan nomor aset komputer universitas saat mengajukan pelaporan kerusakan perangkat keras.",
    officialChannel: "IT Helpdesk Layanan Pegawai / Email: staff.ithelp@univ.ac.id",
    searchCount: 245,
    steps: [
      "Akses portal pengaduan internal di helpdesk.univ.ac.id.",
      "Login menggunakan akun SSO Pegawai Anda.",
      "Pilih sub-kategori 'Infrastruktur Kantor' -> 'Masalah Hardware/Software'.",
      "Tulis detail kendala (misal: PC tidak mau menyala, printer kantor macet).",
      "Petugas IT support akan ditugaskan ke ruangan Anda dalam waktu maksimal 1 jam."
    ],
    requiredDetails: [
      "NIP Pegawai & Lokasi Ruangan Unit Kerja",
      "Nomor Aset Perangkat (tertera pada stiker barcode aset)",
      "Deskripsi kendala & foto kondisi perangkat"
    ],
    roles: ["pegawai"]
  },
  {
    id: "logistik-atk",
    title: "Pengadaan Logistik & ATK Unit Kerja",
    category: "Logistik & Fasilitas",
    description: "Prosedur pengajuan Alat Tulis Kantor (ATK), permohonan pemeliharaan AC ruangan kantor, pengadaan kursi/meja kerja baru, dan permintaan servis berkala logistik.",
    recommendation: "Pengajuan ATK rutin unit dilakukan di minggu pertama setiap bulan agar pengadaan dapat diproses secara kolektif.",
    officialChannel: "Direktorat Logistik & Sarana Prasarana (Gedung Logistik Lt. 1)",
    searchCount: 156,
    steps: [
      "Buka sistem logistik log.univ.ac.id menggunakan akun SSO Pegawai.",
      "Pilih menu 'Pengadaan ATK Bulanan' atau 'Service Ticket'.",
      "Pilih barang ATK yang dibutuhkan beserta kuantitasnya dari daftar katalog.",
      "Kirim permohonan untuk verifikasi anggaran oleh Kepala Bagian Administrasi Unit.",
      "ATK siap diambil di gudang logistik setelah status disetujui (biasanya 2-3 hari kerja)."
    ],
    requiredDetails: [
      "Nama Unit Kerja / Fakultas",
      "Nama Pegawai Pemohon (NIP)",
      "Daftar barang ATK yang dibutuhkan (nama barang & jumlah)",
      "Alasan pengajuan (untuk ATK bulanan atau acara khusus)"
    ],
    roles: ["pegawai"]
  },
  {
    id: "sdm-pegawai",
    title: "Pengelolaan Cuti, Absensi, & Kepegawaian SDM",
    category: "SDM",
    description: "Tata cara pelaporan ketidakhadiran, permohonan cuti tahunan/sakit/melahirkan, perubahan data keluarga, dan akses slip gaji bulanan pegawai.",
    recommendation: "Pengajuan cuti tahunan diajukan minimal 3 hari kerja sebelum pelaksanaan cuti melalui sistem HRIS.",
    officialChannel: "Direktorat SDM (Gedung Rektorat Lt. 2) / Email: sdm@univ.ac.id",
    searchCount: 187,
    steps: [
      "Buka portal HRIS Pegawai di hris.univ.ac.id.",
      "Login dengan username SSO Pegawai.",
      "Untuk cuti, masuk ke menu 'Leave Request' -> 'New Leave', isi tanggal dan alasan cuti.",
      "Tunggu persetujuan pimpinan unit yang dikirimkan secara otomatis via sistem.",
      "Untuk melihat rincian gaji dan slip, buka menu 'Payroll System' -> 'Pay Slip', masukkan pin sekunder Anda."
    ],
    requiredDetails: [
      "NIP / NIK Pegawai",
      "Tanggal Cuti yang diinginkan & Alasan Cuti",
      "Nama Pegawai Pengganti Sementara (jika diperlukan)",
      "Pin Sekunder Gaji (untuk melihat slip)"
    ],
    roles: ["pegawai"]
  },
  {
    id: "helpdesk-unit",
    title: "Pengelolaan Penyaluran Tiket Helpdesk Unit",
    category: "Helpdesk Unit",
    description: "Panduan operasional bagi pegawai (administrator unit) untuk menerima, menugaskan teknisi, serta merespon tiket aduan layanan dari mahasiswa atau dosen.",
    recommendation: "Segera ubah status tiket menjadi 'Dalam Penanganan' setelah ditugaskan ke staf lapangan demi kepuasan pelapor.",
    officialChannel: "Pusat Jaminan Mutu Layanan (Gedung Rektorat Lt. 4)",
    searchCount: 98,
    steps: [
      "Login ke panel backend helpdesk di helpdesk-admin.univ.ac.id.",
      "Buka dasbor 'Tiket Masuk' unit kerja Anda.",
      "Analisis keluhan pelapor, lalu tentukan tingkat urgensi tiket (Kritis/Sedang/Aman).",
      "Klik 'Tugaskan Agen' dan pilih nama staf teknisi yang bertugas.",
      "Perbarui komentar solusi jika masalah sudah selesai ditangani oleh tim lapangan."
    ],
    requiredDetails: [
      "NIP Administrator Unit",
      "Nomor Tiket Aduan yang diproses",
      "Nama Staf Pelaksana Lapangan yang ditugaskan",
      "Catatan Penutupan Masalah (Closing Note)"
    ],
    roles: ["pegawai"]
  },
  {
    id: "kb-management",
    title: "Pembaruan Knowledge Base SOP Layanan Unit",
    category: "Knowledge Base",
    description: "Prosedur pengunggahan Standard Operating Procedure (SOP) layanan baru, pembaruan kontak resmi, dan integrasi artikel pemecahan masalah ke sistem panduan CampusCare AI.",
    recommendation: "Lakukan review SOP minimal 1 kali per semester agar petunjuk yang dibaca civitas tidak kedaluwarsa.",
    officialChannel: "Direktorat Perencanaan & Jaminan Mutu / Email: sop.assurance@univ.ac.id",
    searchCount: 82,
    steps: [
      "Akses repositori dokumen SOP di kb.univ.ac.id.",
      "Pilih kategori unit kerja Anda.",
      "Klik 'Buat SOP Baru' atau edit artikel panduan yang sudah ada.",
      "Tulis panduan dengan langkah yang jelas, persyaratannya, serta alamat unit resmi.",
      "Klik 'Ajukan Review'. Dokumen akan disinkronisasikan ke sistem CampusCare AI setelah disetujui Unit Mutu."
    ],
    requiredDetails: [
      "NIP Pengelola SOP",
      "Nama Unit Kerja / Biro",
      "Judul Prosedur & File SOP PDF Resmi yang disahkan Rektorat",
      "Tanggal Mulai Berlaku SOP"
    ],
    roles: ["pegawai"]
  },
  {
    id: "insight-admin-service",
    title: "Akses Dashboard Insight Analitis Pelayanan",
    category: "Insight Admin",
    description: "Akses visualisasi data keluhan civitas, tren topik terpopuler, durasi respon helpdesk unit, serta pelaporan kepuasan pelayanan universitas.",
    recommendation: "Gunakan data analitis tren keluhan mingguan sebagai bahan rapat evaluasi perbaikan layanan unit.",
    officialChannel: "Pusat Analisis Data Layanan Rektorat",
    searchCount: 115,
    steps: [
      "Akses dasbor analitik di analytics.univ.ac.id menggunakan akun SSO Pegawai level manajemen.",
      "Pilih tab 'Tingkat Kepuasan' untuk memantau rating bintang dari pelapor.",
      "Pilih tab 'Problem Bank' untuk menganalisis kendala sistem yang sedang kritis.",
      "Ekspor laporan bulanan berformat PDF/Excel untuk bahan presentasi ke pimpinan."
    ],
    requiredDetails: [
      "NIP Pegawai & Jabatan Struktural",
      "Rentang Tanggal Laporan Analitik (misal: 1 s.d 30 Mei 2026)",
      "Unit kerja yang ingin dianalisis datanya"
    ],
    roles: ["pegawai"]
  }
];

export const INITIAL_PROBLEMS: CampusProblem[] = [
  { id: "p1", title: "Keterlambatan Penilaian SIAKAD Semester Ganjil", reportedCount: 45, status: "Dalam Peninjauan", category: "Akademik" },
  { id: "p2", title: "Masalah Autentikasi Aplikasi Presensi Kehadiran", reportedCount: 92, status: "Kritis", category: "IT & Jaringan" },
  { id: "p3", title: "Pengembalian Lebih UKT (Refund) Jalur Prestasi", reportedCount: 12, status: "Aman", category: "Keuangan" },
  { id: "p4", title: "Sinkronisasi Server LMS CeLOE di Jam Kuliah Utama", reportedCount: 68, status: "Kritis", category: "IT & Jaringan" },
  { id: "p5", title: "Pengajuan Bebas Pustaka Online Perpustakaan Pusat", reportedCount: 29, status: "Sedang", category: "Fasilitas" }
];
