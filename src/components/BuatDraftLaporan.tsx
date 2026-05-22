import React, { useState, useEffect } from "react";
import { Copy, Save, Sparkles, FileText, CheckCircle, Trash2, HelpCircle, Upload, Paperclip } from "lucide-react";
import { CampusService, DraftReport } from "../types";

interface BuatDraftLaporanProps {
  services: CampusService[];
  prefilledService?: CampusService | null;
  savedDrafts: DraftReport[];
  onSaveDraft: (draft: DraftReport) => void;
  onDeleteDraft: (id: string) => void;
}

export default function BuatDraftLaporan({
  services,
  prefilledService,
  savedDrafts,
  onSaveDraft,
  onDeleteDraft
}: BuatDraftLaporanProps) {
  
  // Form State
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState("");
  const [jenisKendala, setJenisKendala] = useState("Layanan Umum Akademik");
  const [waktuKejadian, setWaktuKejadian] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [lampiran, setLampiran] = useState<File | null>(null);
  
  // App UI state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [copied, setCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Monitor prefilled inputs from other pages
  useEffect(() => {
    if (prefilledService) {
      setJenisKendala(prefilledService.title);
      setDeskripsi(`Saya mengalami kendala saat memproses "${prefilledService.title}". Mohon bantuannya sesuai dengan panduan resmi.`);
    }
  }, [prefilledService]);

  // Handle local state compile in real-time if no AI generation
  useEffect(() => {
    if (!generatedLetter && (nama || nim || email || jenisKendala || deskripsi)) {
      compileDefaultLetter();
    }
  }, [nama, nim, email, jenisKendala, waktuKejadian, deskripsi]);

  const compileDefaultLetter = () => {
    const defaultTemplate = `Yth. Kepala Unit Pelayanan Terpadu
Universitas Cerdas Indonesia
Bandung, Jawa Barat

Hal: Laporan Kendala ${jenisKendala || "Sistem Akademik"}

Dengan hormat,
Saya yang bertandatangan di bawah ini mengajukan pengaduan resmi mengenai kendala teknis:

- Nama Lengkap : ${nama || "[Masukan Nama Anda]"}
- NIM/NIP      : ${nim || "[Masukan NIM / NIP]"}
- Email Kampus : ${email || "[Masukan Email Kampus]"}
- Waktu Masalah: ${waktuKejadian || "[Masukan Waktu Kejadian]"}

Kronologi & detail kendala:
${deskripsi || "[Tuliskan deskripsi ringkas kendala Anda di form samping]"}

Adapun dokumen pendukung tambahan telah saya persiapkan berserta laporan ini untuk ditinjau lebih lanjut.

Demikian draf permohonan laporan ini saya buat. Atas perhatian, arahan, dan kebijaksanaan Bapak/Ibu staf Universitas, saya mengucapkan terima kasih.

Hormat saya,

${nama || "[Nama Anda]"}
NIM: ${nim || "[NIM Anda]"}`;

    setGeneratedLetter(defaultTemplate);
  };

  // Generate with real Gemini AI
  const handleAIGenerate = async () => {
    if (!nama || !nim || !email || !deskripsi) {
      setErrorMessage("Harap lengkapi Nama, NIM, Email, dan Deskripsi untuk merakit draf!");
      setTimeout(() => setErrorMessage(""), 4000);
      return;
    }

    setIsGenerating(true);
    setErrorMessage("");
    try {
      const response = await fetch("/api/generate-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, nim, email, jenisKendala, waktuKejadian, deskripsi })
      });

      if (!response.ok) {
        throw new Error("HTTP error while generating draf");
      }

      const data = await response.json();
      setGeneratedLetter(data.text);
    } catch (err) {
      console.error(err);
      // Fallback
      compileDefaultLetter();
    } finally {
      setIsGenerating(false);
    }
  };

  // Drag and Drop files upload handler
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setLampiran(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLampiran(e.target.files[0]);
    }
  };

  const handleCopy = () => {
    if (generatedLetter) {
      navigator.clipboard.writeText(generatedLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    const draft: DraftReport = {
      id: "dr-" + Math.random().toString(36).substring(2, 9),
      nama,
      nim,
      email,
      jenisKendala,
      waktuKejadian,
      deskripsi,
      lampiranName: lampiran ? lampiran.name : undefined,
      status: "Draft",
      tanggalDibuat: new Date().toLocaleDateString("id-ID"),
      generatedLetter
    };
    onSaveDraft(draft);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleLoadDraft = (d: DraftReport) => {
    setNama(d.nama);
    setNim(d.nim);
    setEmail(d.email);
    setJenisKendala(d.jenisKendala);
    setWaktuKejadian(d.waktuKejadian);
    setDeskripsi(d.deskripsi);
    if (d.generatedLetter) {
      setGeneratedLetter(d.generatedLetter);
    }
  };

  return (
    <div id="draft-report-screen" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-white bg-[#0a0a0a]">
      
      {/* Page Title */}
      <div className="mb-8 border-b border-[#1a1a1a] pb-4">
        <span className="text-[10px] font-mono text-[#ff4d00] tracking-widest uppercase">Report & Letter Drafter</span>
        <h2 id="drafter-heading" className="text-2xl font-black text-white uppercase mt-1">Buat Draft Laporan Resmi</h2>
        <p id="drafter-subheading" className="text-xs text-[#777] font-mono mt-1">Lengkapi form berikut untuk menyusun draf email / surat laporan kendala akademis formal yang dibantu AI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form (7 columns) */}
        <div className="lg:col-span-7 bg-[#0e0e0e] border border-[#1a1a1a] p-6 space-y-6">
          <h3 className="text-xs font-mono tracking-wider text-white uppercase border-b border-[#1a1a1a] pb-3 flex items-center gap-1.5">
            <FileText className="h-4.5 w-4.5 text-[#ff4d00]" />
            BORANG INFORMASI PELAPOR
          </h3>

          {errorMessage && (
            <div className="p-3 bg-red-950/70 border border-red-500/30 text-red-200 text-xs font-mono">
              ⚠️ {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase text-[#888] mb-1.5">Nama Lengkap</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Misal: Andi Wijaya"
                className="w-full rounded-none border border-[#222] bg-[#111] px-3.5 py-2.5 text-xs font-mono text-white focus:border-[#ff4d00] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase text-[#888] mb-1.5">NIM atau NIP</label>
              <input
                type="text"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                placeholder="Misal: 1301194002"
                className="w-full rounded-none border border-[#222] bg-[#111] px-3.5 py-2.5 text-xs font-mono text-white focus:border-[#ff4d00] focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase text-[#888] mb-1.5">Email Kampus / Resmi</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Misal: andi@student.univ.ac.id"
                className="w-full rounded-none border border-[#222] bg-[#111] px-3.5 py-2.5 text-xs font-mono text-white focus:border-[#ff4d00] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase text-[#888] mb-1.5">Jenis Kendala / Layanan</label>
              <select
                value={jenisKendala}
                onChange={(e) => setJenisKendala(e.target.value)}
                className="w-full rounded-none border border-[#222] bg-[#111] px-3.5 py-2.5 text-xs font-mono text-white focus:border-[#ff4d00] focus:outline-hidden appearance-none"
                style={{ backgroundImage: 'none' }}
              >
                <option value="Reset Pemulihan Sandi SSO" className="bg-[#0e0e0e]">Reset Pemulihan Sandi SSO</option>
                <option value="Pengurusan Surat Aktif Kuliah" className="bg-[#0e0e0e]">Pengurusan Surat Aktif Kuliah</option>
                <option value="Persetujuan KRS & Wali Dosen" className="bg-[#0e0e0e]">Persetujuan KRS & Wali Dosen</option>
                <option value="Cicilan Pembayaran UKT" className="bg-[#0e0e0e]">Cicilan Pembayaran UKT</option>
                <option value="Masalah Sinkron LMS CeLOE" className="bg-[#0e0e0e]">Masalah Sinkron LMS CeLOE</option>
                <option value="Registrasi MAC Address Wifi Secure" className="bg-[#0e0e0e]">Registrasi Device Wifi Secure</option>
                <option value="Lainnya" className="bg-[#0e0e0e]">Lainnya / Masalah Umum</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase text-[#888] mb-1.5">Perkiraan Waktu Kejadian</label>
              <input
                type="text"
                value={waktuKejadian}
                onChange={(e) => setWaktuKejadian(e.target.value)}
                placeholder="Misal: Senin Sore, 22 Jan 2026"
                className="w-full rounded-none border border-[#222] bg-[#111] px-3.5 py-2.5 text-xs font-mono text-white focus:border-[#ff4d00] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase text-[#888] mb-1.5">Lampiran Pendukung (KTM / KRS)</label>
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`relative border border-dashed p-3.5 text-center transition-all cursor-pointer bg-[#111] ${
                  dragActive ? "border-[#ff4d00] bg-[#111]" : "border-[#333] hover:border-[#ff4d00]/50"
                }`}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex items-center justify-center gap-2 text-[11px] font-mono py-1 text-[#aaa]">
                    {lampiran ? (
                      <>
                        <Paperclip className="h-4 w-4 text-[#ff4d00]" />
                        <span className="font-semibold text-white truncate max-w-[150px]">{lampiran.name}</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 text-[#555]" />
                        <span>Seret file atau klik disini</span>
                      </>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono font-bold uppercase text-[#888] mb-1.5">Deskripsi Singkat Kendala</label>
            <textarea
              rows={4}
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Tuliskan detail kronologis atau urutan kendala..."
              className="w-full rounded-none border border-[#222] bg-[#111] px-3.5 py-3 text-xs font-mono text-white focus:border-[#ff4d00] focus:outline-hidden"
            ></textarea>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAIGenerate}
              disabled={isGenerating}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#ff4d00] text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-white transition-all disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="h-4 w-4 animate-pulse" />
              {isGenerating ? "Menyusun Draf AI..." : "Generasikan Draf AI Cerdas_"}
            </button>
            
            <button
              onClick={compileDefaultLetter}
              className="px-4 py-3.5 border border-[#222] bg-[#0c0c0c] hover:text-[#fff] text-[#888] text-xs font-mono font-bold uppercase transition-all cursor-pointer"
            >
              Setel Ulang Manual
            </button>
          </div>
        </div>

        {/* Right Preview Output Letter Panel (5 columns) */}
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col h-full space-y-4">
          
          <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-5 flex flex-col">
            <div className="flex items-center justify-between border-b border-[#222] pb-3 mb-4">
              <span className="text-[10px] font-mono font-bold text-[#ff4d00] uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                DRAF LAPORAN AI
              </span>
              <span className="text-[9px] font-mono text-[#555]">// LIVE_COMPILING</span>
            </div>

            <textarea
              value={generatedLetter}
              onChange={(e) => setGeneratedLetter(e.target.value)}
              rows={14}
              className="w-full bg-[#0a0a0a] px-4 py-3.5 text-xs font-mono text-[#bbb] leading-relaxed border border-[#222] focus:border-[#ff4d00] focus:outline-hidden resize-y flex-1"
            ></textarea>

            <div className="mt-4 pt-4 border-t border-[#1a1a1a] grid grid-cols-3 gap-2">
              <button
                onClick={handleCopy}
                className={`col-span-2 inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  copied ? "bg-green-500 text-black" : "bg-[#ff4d00] text-black hover:bg-white"
                }`}
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    COPIED!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    SALIN SURAT DRAFT
                  </>
                )}
              </button>

              <button
                onClick={handleSave}
                className={`inline-flex items-center justify-center gap-1.5 px-3 py-3 text-xs font-mono font-bold uppercase transition-all bg-[#0a0a0a] border border-[#222] text-[#888] hover:text-white cursor-pointer ${
                  saveSuccess ? "border-green-500 text-green-400" : ""
                }`}
              >
                {saveSuccess ? "SAVED!" : "SAVE_"}
              </button>
            </div>
          </div>

          <div className="bg-[#0e0e0e] border border-dashed border-[#ff4d00]/30 p-5 font-mono text-xs">
            <p className="font-bold text-[#ffbb00] uppercase flex items-center gap-1.5 leading-none mb-2">
              <HelpCircle className="h-4 w-4 text-[#ffbb00] shrink-0" />
              LANGKAH SELANJUTNYA:
            </p>
            <p className="leading-relaxed text-[10.5px] text-[#888]">
              Salin draf surat di atas, lalu teruskan ke Unit Pelayanan Mahasiswa Terpadu melalui email resmi atau formulir eskalasi loket fakultas Anda sesuai kanal kontak resmi.
            </p>
          </div>

        </div>

      </div>

      {/* Draft Saved History Panel */}
      <div id="saved-history-log" className="mt-12 bg-[#0e0e0e] border border-[#1a1a1a] p-6">
        <h3 className="text-sm font-mono tracking-wider text-white border-b border-[#1a1a1a] pb-3 mb-5 uppercase">
          RIWAYAT DRAF TERSIMPAN SAYA ({savedDrafts.length})
        </h3>
        {savedDrafts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedDrafts.map((d) => (
              <div
                key={d.id}
                id={`saved-draft-item-${d.id}`}
                className="p-4 bg-[#111] border border-[#1e1e1e] hover:border-[#ff4d00]/35 transition-all flex justify-between items-start"
              >
                <div onClick={() => handleLoadDraft(d)} className="flex-1 cursor-pointer pr-4 font-mono">
                  <p className="text-xs font-bold text-white uppercase tracking-tight truncate">{d.jenisKendala}</p>
                  <p className="text-[9px] text-[#555] mt-1">LOAD_DATE: {d.tanggalDibuat}</p>
                  <p className="text-[10px] text-[#ff4d00] hover:text-white mt-2 block font-bold uppercase tracking-wider">LOAD_DRAF_FORM_</p>
                </div>
                
                <button
                  onClick={() => onDeleteDraft(d.id)}
                  className="p-1.5 text-[#555] hover:text-red-500 hover:bg-neutral-800 transition-all cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 font-mono text-[#555]">
            <p className="text-xs font-bold uppercase">Belum ada draf tersimpan</p>
            <p className="text-[10px] mt-1.5 max-w-sm mx-auto leading-relaxed">Seluruh draf yang telah diisi dan disimpan akan dicatat di memori lokal (localStorage) browser Anda.</p>
          </div>
        )}
      </div>

    </div>
  );
}

