import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Lazy initialization of Gemini client
let _ai: GoogleGenAI | null = null;
function getAIClient() {
  if (!_ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("⚠️ Warning: GEMINI_API_KEY is not defined. Falling back to rule-based mock support.");
      return null;
    }
    _ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return _ai;
}

// 1. API: Smart Chat navigator for Campus services
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, role } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const ai = getAIClient();
    const activeRole = role || "mahasiswa";
    if (!ai) {
      // Return beautiful supportive mock content if API key is not yet set
      const lastUserMsg = messages[messages.length - 1]?.text || "";
      let mockReply = `Halo! Saya adalah AI Navigator CampusCare. Saat ini saya siap membantu Anda sebagai **${
        activeRole === "mahasiswa" ? "Mahasiswa" : activeRole === "dosen" ? "Dosen" : "Pegawai Kampus"
      }**. (Mode Demo / Kunci Kontak Belum Terpasang).\n\n`;
      
      const query = lastUserMsg.toLowerCase();
      if (activeRole === "dosen") {
        if (query.includes("lms") || query.includes("celoe") || query.includes("kelas")) {
          mockReply += "Terkait kendala sinkronisasi kelas atau presensi di LMS CeLOE, silakan akses Menu iGracias Dosen lalu klik 'Sync Kelas LMS'. Jika kelas masih tidak muncul, Anda dapat menghubungi Unit E-Learning CeLOE melalui email celoe@univ.ac.id atau berkoordinasi dengan Admin Pimpinan Prodi Anda.\n\nApakah Anda ingin saya membuatkan draf resmi surat laporan kendala LMS ini?";
        } else if (query.includes("penelitian") || query.includes("dana") || query.includes("abdimas")) {
          mockReply += "Untuk pengajuan dana hibah penelitian internal atau Abdimas, silakan akses portal PPM di ppm.univ.ac.id. Pastikan Anda mengunggah proposal sesuai template terbaru dan memeriksa tenggat waktu pengumpulan.\n\nApakah Anda memerlukan bantuan membuat draf surat pengantar pengajuan ke PPM?";
        } else if (query.includes("jafa") || query.includes("jabatan") || query.includes("fungsional")) {
          mockReply += "Terkait pengurusan Jabatan Akademik Dosen (JAFA), pastikan berkas KUM Anda telah divalidasi oleh Tim Penilai Fakultas di iGracias. Untuk info lebih lanjut, hubungi Sub-Bagian Kepegawaian SDM di Rektorat Lantai 3.\n\nButuh dibuatkan draf permohonan validasi berkas JAFA?";
        } else {
          mockReply += `Terima kasih atas pertanyaan Anda tentang "${lastUserMsg}". Sebagai Dosen, Anda dapat berkoordinasi dengan Unit Layanan Dosen atau Sub-Bagian Akademik Fakultas. Jika ada kendala teknis, Anda juga dapat menulis draf laporan di menu 'Buat Laporan'. Ada yang bisa saya bantu?`;
        }
      } else if (activeRole === "pegawai") {
        if (query.includes("logistik") || query.includes("atk") || query.includes("barang")) {
          mockReply += "Untuk permohonan logistik unit kerja atau pengambilan ATK (Alat Tulis Kantor), silakan isi Formulir Permohonan Logistik di Sistem Informasi Logistik (SILOG) melalui akun SSO pegawai Anda. Setelah disetujui atasan, barang dapat diambil di Gudang Pusat Logistik.\n\nApakah Anda ingin saya membuatkan draf formulir permohonan logistik unit?";
        } else if (query.includes("nota") || query.includes("surat") || query.includes("e-office")) {
          mockReply += "Terkait pembuatan Nota Dinas internal atau surat keluar resmi, silakan gunakan aplikasi E-Office universitas di eoffice.univ.ac.id. Pastikan nomor surat dan klasifikasi arsip sudah sesuai dengan tata naskah dinas.\n\nButuh dibuatkan draf surat nota dinas atau nota internal?";
        } else if (query.includes("helpdesk") || query.includes("tiket") || query.includes("dashboard")) {
          mockReply += "Sebagai Pegawai Kampus, Anda dapat memantau tiket keluhan civitas akademika di Dashboard Unit Kerja masing-masing di helpdesk.univ.ac.id. Pastikan Anda menanggapi tiket masuk maksimal dalam 1x24 jam.\n\nApakah Anda ingin saya membuatkan draf tanggapan/resolusi tiket?";
        } else {
          mockReply += `Terima kasih atas pertanyaan Anda tentang "${lastUserMsg}". Sebagai Pegawai Kampus, Anda dapat mengakses menu E-Office, Logistik, atau mengajukan bantuan IT Support Pegawai. Jika ada laporan dinas, Anda juga bisa menulis draf laporan di menu 'Buat Laporan'. Ada yang bisa saya bantu?`;
        }
      } else {
        // Mahasiswa
        if (query.includes("sso") || query.includes("login")) {
          mockReply += "Terkait masalah login SSO atau Pemulihan Akun mahasiswa, Anda disarankan untuk melakukan setel ulang kata sandi mandiri di sso.univ.ac.id menggunakan email pemulihan terdaftar, atau menghubungi Unit Helpdesk IT di Gedung Kuliah Umum Lt. 1.\n\nApakah Anda ingin saya membuatkan draf resmi surat laporan kendala ini?";
        } else if (query.includes("surat") || query.includes("aktif")) {
          mockReply += "Untuk pengurusan Surat Keterangan Aktif Kuliah, silakan akses Menu Layanan di portal mahasiswa Anda. Siapkan juga scan KTM aktif dan KRS semester berjalan yang sudah disetujui dosen wali.\n\nButuh dibuatkan draf surat permohonan ke prodi?";
        } else if (query.includes("ukt") || query.includes("bayar")) {
          mockReply += "Terkait kendala pembayaran UKT atau pengajuan cicilan, Anda dapat membuka portal keuangan mahasiswa atau menghubungi Direktorat Keuangan via email ke finance@univ.ac.id atau WhatsApp resmi Keuangan.\n\nApakah Anda membutuhkan draf surat permohonan cicilan/penangguhan UKT?";
        } else {
          mockReply += `Terima kasih atas pertanyaan Anda tentang "${lastUserMsg}". Sebagai Mahasiswa, Anda dapat melapor ke Sub-Bagian Akademik Fakultas atau mengisi draf pengaduan di menu 'Buat Laporan'. Ada yang bisa saya bantu buatkan drafnya?`;
        }
      }
      return res.json({ text: mockReply });
    }

    const activeRoleText = activeRole === "mahasiswa" ? "Mahasiswa" : activeRole === "dosen" ? "Dosen" : "Pegawai Kampus";
    let roleSpecificInstruction = "";
    if (activeRole === "dosen") {
      roleSpecificInstruction = "Fokus layanan Anda adalah membantu Dosen dengan urusan seperti LMS CeLOE, Sinkronisasi Kelas, Penelitian & Pengabdian Masyarakat (PPM), Pangkat & Jabatan Fungsional (JAFA), serta sarana ruang/laboratorium mengajar. Gunakan nada bicara yang sangat hormat, profesional, dan solutif.";
    } else if (activeRole === "pegawai") {
      roleSpecificInstruction = "Fokus layanan Anda adalah membantu Pegawai Kampus (Tenaga Kependidikan/Staf) dengan urusan internal seperti Nota Dinas, Logistik/ATK, Slip Gaji, IT Support Pegawai, Helpdesk Unit, serta monitoring data keluhan. Gunakan bahasa yang taktis, efisien, solutif, dan berorientasi pada produktivitas kerja.";
    } else {
      roleSpecificInstruction = "Fokus layanan Anda adalah membantu Mahasiswa dengan urusan seperti Surat Aktif Kuliah, UKT/Keuangan, SSO Login, LMS CeLOE, Open Library, WiFi, Kemahasiswaan, dan KRS. Gunakan nada yang mendukung, ramah, bersahabat, dan solutif.";
    }

    // Format historical conversation matching Gemini's chats or contents format
    // We will build standard generateContent parameter list
    const systemInstruction = `Anda adalah "CampusCare AI Navigator", agen asisten pintar universitas yang ramah dan berwibawa di Indonesia.
      Saat ini Anda sedang melayani pengguna dengan peran: **${activeRoleText}**.
      
      ${roleSpecificInstruction}
      
      Bantulah dengan instruksi langkah-demi-langkah (step-by-step) yang terstruktur dan mudah dipahami sesuai dengan peran tersebut.
      Tawarkan bantuan untuk membuat draf permohonan/laporan resmi di bagian akhir jawaban Anda secara alami.
      Tanggapi dalam bahasa Indonesia yang baik, sopan, komunikatif, dan profesional.`;

    const chatContents = messages.map((m: any) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: chatContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "Maaf, saya tidak dapat memahami permintaan Anda saat ini.";
    return res.json({ text: replyText });
  } catch (err: any) {
    console.error("Gemini API Chat Error:", err);
    return res.status(500).json({ error: "Sistem AI sedang sibuk. Silakan coba sesaat lagi.", details: err.message });
  }
});

// 2. API: Auto-Drafter to generate academic level letters
app.post("/api/generate-draft", async (req, res) => {
  try {
    const { nama, nim, email, jenisKendala, waktuKejadian, deskripsi, role } = req.body;
    const activeRole = role || "mahasiswa";
    const labelId = activeRole === "mahasiswa" ? "NIM" : "NIP";
    const userRoleLabel = activeRole === "mahasiswa" ? "Mahasiswa" : activeRole === "dosen" ? "Dosen" : "Pegawai Kampus";

    const ai = getAIClient();
    if (!ai) {
      // Mocked high quality Indonesian academic letter
      let targetUnit = "Direktorat Akademik / Unit Pusat Logistik & Teknologi Informasi";
      if (activeRole === "dosen") {
        targetUnit = "Direktorat Kepegawaian / Bagian PPM & Layanan Akademik";
      } else if (activeRole === "pegawai") {
        targetUnit = "Direktorat Sumber Daya Manusia / Atasan Langsung Unit Kerja";
      }

      const draftText = `Yth. Kepala ${targetUnit}
Telkom University
Kota Bandung

Hal: Laporan Kendala Sistem / Administrasi (${userRoleLabel})

Dengan hormat,
Saya yang bertandatangan di bawah ini:
- Nama Lengkap : ${nama || "[Nama Lengkap]"}
- ${labelId}      : ${nim || `[${labelId}]`}
- Email Kampus : ${email || "[Email Kampus]"}
- Peran        : ${userRoleLabel}

Melalui surat ini, saya bermaksud untuk melaporkan kendala terkait "${jenisKendala || "Layanan Universitas"}" yang saya alami pada waktu ${waktuKejadian || "beberapa waktu lalu"}.

Adapun kronologi singkat permasalahan sebagai berikut:
${deskripsi || "(Tidak ada deskripsi rinci yang dimasukkan. Pengguna perlu melengkapi bagian ini)"}

Saya sangat mengharapkan bantuan dari unit terkait untuk menginvestigasi dan menyelesaikan masalah ini agar proses ${activeRole === "mahasiswa" ? "perkuliahan" : activeRole === "dosen" ? "pengajaran dan administrasi" : "operasional kerja"} saya tidak terhambat.

Demikian draf laporan ini saya buat dengan sebenarnya. Atas perhatian dan bantuan Bapak/Ibu, saya mengucapkan terima kasih.

Hormat saya,

${nama || "[Nama Lengkap]"}
${labelId}: ${nim || `[${labelId}]`}`;

      return res.json({ text: draftText });
    }

    const prompt = `Buatkan draf surat pengaduan akademis formal dalam Bahasa Indonesia berdasarkan data formulir berikut:
    - Nama Lengkap Pengaju: ${nama}
    - Peran Pengaju: ${userRoleLabel} (gunakan identitas ${labelId})
    - ${labelId} Pengaju: ${nim}
    - Email Resmi Kampus: ${email}
    - Jenis Masalah/Kendala: ${jenisKendala}
    - Waktu Terjadinya Kendala: ${waktuKejadian}
    - Deskripsi Detail Kejadian: ${deskripsi}

    Ketentuan Draf Surat:
    1. Ditujukan kepada unit pelayanan universitas yang relevan:
       - Jika Mahasiswa: ditujukan ke Direktorat Akademik atau Unit IT (jika kendala SSO/WiFi/LMS).
       - Jika Dosen: ditujukan ke PPM (jika penelitian), Bagian Kepegawaian, atau Unit IT (jika LMS CeLOE).
       - Jika Pegawai Kampus: ditujukan ke Direktorat SDM, Biro Umum (logistik), atau Unit IT.
    2. Nada tulisan harus sangat formal, santun, profesional, dan menggunakan Ejaan Bahasa Indonesia (EBI) yang baik dan benar.
    3. Cantumkan rincian biodata pelapor yang terstruktur rapi dengan peluru/tanda hubung.
    4. Sediakan draf yang siap pakai untuk langsung dipaste oleh pengaju ke email resmi kampus atau sistem tiket pengaduan umum.
    5. JANGAN menyertakan penjelasan pembuka di luar draf surat. Cukup hasil draf suratnya saja.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.3,
      }
    });

    const draftText = response.text || "Gagal membuat draf surat otomatis. Silakan isi draf secara manual.";
    return res.json({ text: draftText });
  } catch (err: any) {
    console.error("Gemini API Drafter Error:", err);
    return res.status(500).json({ error: "Sistem AI draf sedang sibuk. Silakan tulis manual.", details: err.message });
  }
});

// Serve frontend with Vite in Dev OR static build files in Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 CampusCare AI backend starts on http://0.0.0.0:${PORT}`);
  });
}

startServer();
