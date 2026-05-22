# 🏛️ CampusCare AI
> **Satu Pintu untuk Menemukan Layanan Kampus yang Tepat.**

CampusCare AI adalah *Smart Service Navigator* berbasis kecerdasan buatan (AI) untuk civitas akademika (Mahasiswa, Dosen, dan Pegawai Kampus). Aplikasi ini mempermudah pencarian layanan kampus yang tepat secara interaktif dan terpersonalisasi, serta membantu otomatisasi penyusunan draf surat pengaduan atau permohonan administrasi resmi.

Aplikasi ini menggunakan aksen warna **Maroon khas Telkom University** yang dikombinasikan dengan **Deep Navy & Off-White** untuk menghasilkan estetika premium, profesional, dan bersih.

---

## ✨ Fitur Utama

### 1. 🚪 Landing Page Berbasis Role (Pintu Masuk Awal)
* Halaman depan yang elegan dan informatif untuk memilih peran pengguna sebelum mengakses dasbor utama.
* Tiga kartu peran interaktif:
  * **Mahasiswa**: Layanan seputar UKT/Keuangan, Surat Aktif Kuliah, LMS CeLOE, Akun SSO, WiFi, Perpustakaan, dan Kemahasiswaan.
  * **Dosen**: Layanan seputar Sinkronisasi LMS, Pengabdian Masyarakat & Penelitian (PPM), Pangkat & Jabatan Akademik (JAFA), dan peminjaman laboratorium/ruang.
  * **Pegawai Kampus**: Layanan seputar Nota Dinas, pengadaan logistik/ATK, pengelolaan tiket Helpdesk Unit, SDM (Cuti/Gaji), dan basis data panduan kerja (SOP).

### 2. 💬 Smart AI Navigator (Konsultasi Pintar)
* Asisten virtual interaktif yang menyesuaikan tanggapan dan sapaan awal berdasarkan peran aktif pengguna.
* Pencocokan alur layanan secara cerdas (*AI Solution Detection*) saat berkonsultasi, mendeteksi kata kunci keluhan secara otomatis, dan memperkirakan tingkat akurasi kecocokan rekomendasi alur.
* Opsi integrasi langsung dengan **Gemini API** untuk navigasi interaktif atau fallback mock demo jika API Key belum terkonfigurasi.

### 3. 📄 Pembuat Draf Laporan Otomatis (Auto-Drafter)
* Menyusun surat pengaduan formal sesuai standar Ejaan Bahasa Indonesia (EBI).
* Variabel dinamis otomatis:
  * Menggunakan **NIM** untuk Mahasiswa dan **NIP** untuk Dosen atau Pegawai Kampus.
  * Menyesuaikan unit tujuan surat resmi (contoh: Direktorat Akademik untuk mahasiswa, PPM untuk riset dosen, Direktorat SDM untuk staf pegawai).
  * Struktur draf surat langsung siap disalin ke email resmi kampus atau sistem tiket pengaduan.

### 4. 📊 Dashboard Insight Admin
* Halaman visualisasi statistik interaktif khusus untuk peran **Pegawai Kampus** yang berisi:
  * Total pertanyaan masuk dan metrik performa.
  * Grafik batang tingkat keluhan terpopuler di kalangan civitas akademika.
  * Formulir manajemen pelaporan untuk menambahkan status kendala layanan kampus secara dinamis.

---

## 🛠️ Tech Stack & Dependencies

* **Frontend**: React 19, TypeScript, Vite.
* **Styling**: Tailwind CSS v4 (Aksen Maroon, Deep Navy, Teal AI Accent, Soft Shadows, Clean Typography).
* **Backend**: Node.js & Express (berperan sebagai server API sekaligus melayani aset frontend).
* **AI Engine**: `@google/genai` (Google Gemini SDK).
* **Animasi & Interaksi**: Motion (dahulu Framer Motion) untuk transisi mikro-interaksi yang halus.
* **Ikonografi**: Lucide React.

---

## 🚀 Panduan Menjalankan Aplikasi Secara Lokal

### Prasyarat
* Pastikan **Node.js** (v18+) dan npm telah terinstal di komputer Anda.

### Langkah-langkah
1. **Klon Repositori**:
   ```bash
   git clone https://github.com/hanif-12-01/Bandung-part-2.git
   cd Bandung-part-2
   ```

2. **Instal Dependensi**:
   ```bash
   npm install
   ```

3. **Konfigurasi Lingkungan (Environment Variables)**:
   Buat berkas `.env` di folder root dan masukkan API Key Gemini Anda:
   ```env
   GEMINI_API_KEY=isi_kunci_api_gemini_anda_di_sini
   PORT=3000
   ```
   *(Jika `.env` kosong atau API Key belum diset, aplikasi akan berjalan dalam mode **Demo/Mock Cerdas** secara otomatis tanpa terjadi crash).*

4. **Jalankan Mode Pengembangan**:
   ```bash
   npm run dev
   ```
   Aplikasi akan menyala di tautan: `http://localhost:3000`

5. **Build dan Jalankan Mode Produksi**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📦 Panduan Melakukan Commit & Push ke GitHub

Untuk menyimpan semua perubahan dan mengunggah kode terbaru ke repositori GitHub Anda (`https://github.com/hanif-12-01/Bandung-part-2`), ikuti urutan perintah Git berikut di terminal Anda:

### 1. Periksa Status Perubahan
Pastikan semua file yang dimodifikasi terdeteksi oleh Git:
```bash
git status
```

### 2. Tambahkan Semua Perubahan ke Staging
```bash
git add .
```

### 3. Buat Commit dengan Pesan Deskriptif
```bash
git commit -m "feat: implementasi landing page berbasis role, kustomisasi dashboard dinamis, dan perbaikan tipe backend"
```

### 4. Push Perubahan ke Repositori GitHub
Unggah kode ke cabang utama (biasanya `main` atau `master`):
```bash
git push origin main
```
*(Catatan: Sesuaikan nama branch `main` dengan branch aktif Anda apabila menggunakan nama branch yang berbeda, misalnya `master` atau `development`).*

---

## 📝 Format Berkas Penting
* **Struktur Data**: [src/data.ts](file:///D:/LOMBA/BANDUNG%20TECNO%20PARK/PROTOTIPE/src/data.ts)
* **Model Tipe TypeScript**: [src/types.ts](file:///D:/LOMBA/BANDUNG%20TECNO%20PARK/PROTOTIPE/src/types.ts)
* **API Endpoints**: [server.ts](file:///D:/LOMBA/BANDUNG%20TECNO%20PARK/PROTOTIPE/server.ts)

---
© 2026 CampusCare AI — Satu Pintu untuk Menemukan Layanan Kampus yang Tepat.
