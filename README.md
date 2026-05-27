# 🏛️ CampusCare AI
> **Satu Pintu untuk Menemukan Layanan Kampus yang Tepat.**

CampusCare AI adalah *Smart Service Navigator* berbasis kecerdasan buatan (AI) untuk civitas akademika (Mahasiswa, Dosen, dan Pegawai Kampus). Aplikasi ini mempermudah pencarian layanan kampus yang tepat secara interaktif dan terpersonalisasi, serta membantu otomatisasi penyusunan draf surat pengaduan atau permohonan administrasi resmi.

Aplikasi ini menggunakan aksen warna **Maroon khas Telkom University** yang dikombinasikan dengan **Deep Navy & Off-White** untuk menghasilkan estetika premium, profesional, dan bersih.

---

## ✨ Fitur Utama (Must Have & Should Have)

### 1. 🚪 Landing Page Berbasis Role (Pintu Masuk Awal)
* Halaman depan yang elegan dan informatif untuk memilih peran pengguna sebelum mengakses dasbor utama.
* **One-Click Quick Demo Login**: Tombol demo sekali klik khusus juri untuk masuk sebagai Mahasiswa, Dosen, atau Pegawai Kampus tanpa mengetik sandi.
* Formulir registrasi dan login simulasi dengan validasi domain email resmi kampus.

### 2. 💬 Smart AI Navigator (Konsultasi Pintar)
* Asisten virtual interaktif yang menyesuaikan tanggapan dan sapaan awal berdasarkan peran aktif pengguna.
* Pencocokan alur layanan secara cerdas (*AI Solution Detection*) saat berkonsultasi, mendeteksi kata kunci keluhan secara otomatis, dan memperkirakan tingkat akurasi kecocokan rekomendasi alur.
* Tombol pintasan langsung: "Lihat Panduan", "Buat Draft Laporan", dan "Simpan ke Riwayat" dari hasil deteksi AI.

### 3. 🔍 Smart Service Search & Guidance
* Navigasi pencarian layanan interaktif dengan filter kategori instan.
* **Service Guidance**: Panduan langkah-demi-langkah (timeline stepper) yang detail, daftar dokumen persyaratan, catatan penting, dan tautan kanal resmi unit terkait.

### 4. 📄 Pembuat Draf Laporan Otomatis (Auto-Drafter)
* Menyusun surat pengaduan formal sesuai standar Ejaan Bahasa Indonesia (EBI).
* Mengisi otomatis profil pelapor (Nama, NIM/NIP, dan Email) sesuai dengan akun simulasi yang sedang aktif.
* Struktur draf surat langsung siap disalin ke email resmi kampus atau sistem tiket pengaduan.

### 5. ⏳ Riwayat Penggunaan & Dropdown Status
* Menyimpan daftar panduan yang terakhir dibaca dan draf laporan yang telah dibuat dengan persistensi `localStorage`.
* Dropdown untuk memperbarui status draf secara instan ("Draft", "Tindak Lanjut", "Selesai") secara langsung dari halaman Riwayat.

### 6. 📊 Dashboard Insight Admin & Campus Problem Bank
* Halaman visualisasi statistik interaktif khusus untuk peran **Pegawai Kampus** yang berisi:
  * Total pertanyaan masuk, draf dibuat, rekomendasi berhasil, dan rata-rata waktu respons dengan mini chart SVG premium.
  * Bar chart kategori terpopuler dan grafik garis tren mingguan, serta diagram donat distribusi role civitas.
  * **Campus Problem Bank**: Kumpulan aduan civitas yang kritis untuk dijadikan tantangan inovasi (Challenge Hackathon) dengan tombol "Jadikan Challenge".
  * **Knowledge Base CMS**: Pratinjau (*preview*) halaman pengelola untuk memvalidasi dan mengedit database panduan layanan secara mandiri.

---

## 🚀 Alur Demo Flow Kompetisi
Demonstrasikan alur menyeluruh berikut kepada juri:
1. **Landing Page**: Lihat copywriting premium dan visual navigasi.
2. **Login/Register**: Gunakan **One-click Quick Demo Login** untuk masuk instan.
3. **Role Selection**: Konten dasbor, menu kategori, dan welcome AI menyesuaikan peran (Mahasiswa/Dosen/Pegawai).
4. **AI Navigator**: Cari solusi via input teks, lalu klik pintasan visual solusi.
5. **Panduan (Guideline)**: Baca langkah resmi dan klik "Buat Draft Laporan".
6. **Draft Laporan**: Profil pengguna terisi otomatis. Edit detail masalah dan klik "Simpan ke Riwayat".
7. **Riwayat**: Periksa daftar draf dan perbarui statusnya melalui dropdown status.
8. **Insight Admin & Problem Bank**: Masuk sebagai Pegawai, klik menu Insight Admin, lihat analitik real-time, dan jadikan keluhan kritis sebagai Challenge inovasi kampus.

---

## 🔮 Future Development (Roadmap)
* **SSO & LDAP Real Integration**: Integrasi autentikasi tunggal kampus untuk sinkronisasi otomatis status & data mahasiswa/dosen secara instan.
* **Helpdesk & Ticketing Bridging**: Integrasi API satu pintu guna meneruskan secara otomatis draf laporan AI ke helpdesk tujuan (e.g., Service Desk).
* **Predictive Analytics & AI Agent**: Analitik prediktif berbasis machine learning untuk memproyeksikan potensi penumpukan aduan pada periode akademik tertentu.

---

## 🛠️ Tech Stack & Dependencies

* **Frontend**: React 19, TypeScript, Vite.
* **Styling**: Tailwind CSS v4.
* **Backend**: Node.js & Express (berperan sebagai server API sekaligus melayani aset frontend).
* **AI Engine**: `@google/genai` (Google Gemini SDK).
* **Ikonografi**: Lucide React.

---

## ⚙️ Cara Menjalankan Aplikasi Secara Lokal

### Prasyarat
* Pastikan **Node.js** (v18+) dan npm telah terinstal di komputer Anda.

### Langkah-langkah
1. **Instal Dependensi**:
   ```bash
   npm install
   ```
2. **Konfigurasi Lingkungan (Environment Variables)**:
   Buat berkas `.env` di folder root dan masukkan API Key Gemini Anda:
   ```env
   GEMINI_API_KEY=isi_kunci_api_gemini_anda_di_sini
   PORT=3000
   ```
   *(Jika `.env` kosong atau API Key belum diset, aplikasi akan berjalan dalam mode **Demo/Mock Cerdas** secara otomatis tanpa terjadi crash).*

3. **Jalankan Mode Pengembangan**:
   ```bash
   npm run dev
   ```
   Aplikasi akan menyala di tautan: `http://localhost:3000`

4. **Build dan Jalankan Mode Produksi**:
   ```bash
   npm run build
   ```

---

© 2026 CampusCare AI — Satu Pintu untuk Menemukan Layanan Kampus yang Tepat.
