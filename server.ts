import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

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
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const ai = getAIClient();
    if (!ai) {
      // Return beautiful supportive mock content if API key is not yet set
      const lastUserMsg = messages[messages.length - 1]?.text || "";
      let mockReply = "Halo! Saya adalah AI Navigator CampusCare. (Mode Demo / Kunci Kontak Belum Terpasang).\n\n";
      
      if (lastUserMsg.toLowerCase().includes("sso") || lastUserMsg.toLowerCase().includes("login")) {
        mockReply += "Terkait masalah login SSO atau Pemulihan Akun, Anda disarankan untuk melakukan setel ulang kata sandi mandiri di sso.univ.ac.id menggunakan email pemulihan terdaftar, atau menghubungi Unit Helpdesk IT di Gedung Kuliah Umum Lt. 1.\n\nApakah Anda ingin saya membuatkan draf resmi surat laporan kendala ini?";
      } else if (lastUserMsg.toLowerCase().includes("surat") || lastUserMsg.toLowerCase().includes("aktif")) {
        mockReply += "Untuk pengurusan Surat Keterangan Aktif Kuliah, silakan akses Menu Layanan di portal mahasiswa Anda. Siapkan juga scan KTM aktif dan KRS semester berjalan yang sudah disetujui dosen wali.\n\nButuh dibuatkan draf surat permohonan ke prodi?";
      } else {
        mockReply += `Terima kasih atas pertanyaan Anda tentang "${lastUserMsg}". Untuk kendala tersebut, Anda dapat melapor ke Sub-Bagian Akademik Fakultas atau mengisi draf pengaduan di menu 'Buat Laporan'. Ada yang bisa saya bantu buatkan drafnya?`;
      }
      return res.json({ text: mockReply });
    }

    // Format historical conversation matching Gemini's chats or contents format
    // We will build standard generateContent parameter list
    const systemInstruction = `Anda adalah "CampusCare AI Navigator", agen asisten pintar universitas yang ramah dan berwibawa di Indonesia.
      Tugas utama Anda adalah ramah melayani mahasiswa atau staf yang mengalami kendala teknis atau administrasi (seperti SSO login, LMS CeLOE, Surat Aktif Kuliah, Pengisian KRS, atau pembayaran UKT).
      Bantulah dengan instruksi langkah-demi-langkah (step-by-step) yang terstruktur dan mudah dipahami.
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
    const { nama, nim, email, jenisKendala, waktuKejadian, deskripsi } = req.body;

    const ai = getAIClient();
    if (!ai) {
      // Mocked high quality Indonesian academic letter
      const draftText = `Yth. Kepala Bagian Administrasi Akademik & Layanan IT
Universitas Negeri Harapan Bangsa
Kota Bandung

Hal: Laporan Kendala Sistem / Administrasi

Dengan hormat,
Saya yang bertandatangan di bawah ini:
- Nama Lengkap : ${nama || "[Nama Lengkap]"}
- NIM/NIP      : ${nim || "[NIM / NIP]"}
- Email Kampus : ${email || "[Email Kampus]"}

Melalui surat ini, saya bermaksud untuk melaporkan kendala terkait "${jenisKendala || "Layanan Universitas"}" yang saya alami pada waktu ${waktuKejadian || "beberapa waktu lalu"}.

Adapun kronologi singkat permasalahan sebagai berikut:
${deskripsi || "(Tidak ada deskripsi rinci yang dimasukkan. Pengguna perlu melengkapi bagian ini)"}

Saya sangat mengharapkan bantuan dari Unit IT / Direktorat Akademik untuk menginvestigasi masalah ini agar proses perkuliahan saya tidak terhambat.

Demikian draf laporan ini saya buat dengan sebenarnya. Atas perhatian dan bantuan Bapak/Ibu, saya mengucapkan terima kasih.

Hormat saya,

${nama || "[Nama Lengkap]"}
NIM/NIP: ${nim || "[NIM / NIP]"}`;

      return res.json({ text: draftText });
    }

    const prompt = `Buatkan draf surat pengaduan akademis formal dalam Bahasa Indonesia berdasarkan data formulir berikut:
    - Nama Lengkap Pengaju: ${nama}
    - NIM/NIP Pengaju: ${nim}
    - Email Resmi Kampus: ${email}
    - Jenis Masalah/Kendala: ${jenisKendala}
    - Waktu Terjadinya Kendala: ${waktuKejadian}
    - Deskripsi Detail Kejadian: ${deskripsi}

    Ketentuan Draf Surat:
    1. Ditujukan kepada unit pelayanan universitas yang relevan (misal: Unit Pusat Logistik & Teknologi Informasi Universitas jika kendala SSO/WiFi/LMS, atau Direktorat Kependidikan/Akademik jika urusan KRS/Surat Aktif Kuliah).
    2. Nada tulisan harus sangat formal, santun, profesional, dan menggunakan Ejaan Bahasa Indonesia (EBI) yang baik dan benar.
    3. Cantumkan rincian biodata pelapor yang terstruktur rapi dengan peluru/tanda hubung.
    4. Sediakan draf yang siap pakai untuk langsung dipaste oleh mahasiswa ke email resmi kampus atau sistem tiket pengaduan umum.
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
