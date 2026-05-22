import React, { useState, useEffect } from "react";
import { Copy, Save, Sparkles, FileText, Trash2, CircleHelp, Upload, Paperclip, Check, RotateCcw } from "lucide-react";
import { CampusService, DraftReport } from "../types";

interface BuatDraftLaporanProps {
  services: CampusService[];
  prefilledService?: CampusService | null;
  prefilledDraft?: DraftReport | null;
  savedDrafts: DraftReport[];
  userRole: "mahasiswa" | "dosen" | "pegawai" | null;
  onSaveDraft: (draft: DraftReport) => void;
  onDeleteDraft: (id: string) => void;
}

export default function BuatDraftLaporan({
  services,
  prefilledService,
  prefilledDraft,
  savedDrafts,
  userRole,
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
      setGeneratedLetter(""); // reset live text to force compile
    }
  }, [prefilledService]);

  // Monitor prefilled draft from history
  useEffect(() => {
    if (prefilledDraft) {
      setNama(prefilledDraft.nama);
      setNim(prefilledDraft.nim);
      setEmail(prefilledDraft.email);
      setJenisKendala(prefilledDraft.jenisKendala);
      setWaktuKejadian(prefilledDraft.waktuKejadian || "");
      setDeskripsi(prefilledDraft.deskripsi);
      if (prefilledDraft.generatedLetter) {
        setGeneratedLetter(prefilledDraft.generatedLetter);
      }
    }
  }, [prefilledDraft]);

  // Handle local state compile in real-time if no AI generation
  useEffect(() => {
    if (!generatedLetter && (nama || nim || email || jenisKendala || deskripsi)) {
      compileDefaultLetter();
    }
  }, [nama, nim, email, jenisKendala, waktuKejadian, deskripsi]);

  const compileDefaultLetter = () => {
    const isMhs = userRole === "mahasiswa";
    const labelId = isMhs ? "NIM" : "NIP";
    
    const defaultTemplate = `Yth. Kepala Unit Pelayanan Terpadu
Telkom University
Bandung, Jawa Barat

Hal: Laporan Kendala ${jenisKendala || "Sistem Akademik"}

Dengan hormat,
Saya yang bertandatangan di bawah ini mengajukan pengaduan resmi mengenai kendala teknis:

- Nama Lengkap : ${nama || "[Nama Lengkap]"}
- ${labelId}      : ${nim || (isMhs ? "[NIM Anda]" : "[NIP Anda]")}
- Email Kampus : ${email || "[Email Kampus]"}
- Waktu Masalah: ${waktuKejadian || "[Waktu Kejadian]"}

Kronologi & detail kendala:
${deskripsi || "[Tuliskan deskripsi ringkas kendala Anda di form samping]"}

Adapun dokumen pendukung tambahan telah saya persiapkan berserta laporan ini untuk ditinjau lebih lanjut.

Demikian draf permohonan laporan ini saya buat. Atas perhatian, arahan, dan kebijaksanaan Bapak/Ibu staf Universitas, saya mengucapkan terima kasih.

Hormat saya,

${nama || "[Nama Lengkap]"}
${labelId}: ${nim || (isMhs ? "[NIM Anda]" : "[NIP Anda]")}`;

    setGeneratedLetter(defaultTemplate);
  };

  // Generate with real Gemini AI
  const handleAIGenerate = async () => {
    const isMhs = userRole === "mahasiswa";
    const labelId = isMhs ? "NIM" : "NIP";
    if (!nama || !nim || !email || !deskripsi) {
      setErrorMessage(`Harap lengkapi Nama, ${labelId}, Email, dan Deskripsi untuk merakit draf!`);
      setTimeout(() => setErrorMessage(""), 4000);
      return;
    }

    setIsGenerating(true);
    setErrorMessage("");
    try {
      const response = await fetch("/api/generate-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, nim, email, jenisKendala, waktuKejadian, deskripsi, role: userRole })
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
    <div id="draft-report-screen" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in text-slate-800 bg-[#f8fafc]">
      
      {/* Page Title */}
      <div className="mb-8 border-b border-slate-200 pb-4">
        <span className="text-xs font-bold text-rose-700 tracking-wider uppercase">Drafter Laporan Akademis</span>
        <h2 id="drafter-heading" className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">Buat Draft Laporan Resmi</h2>
        <p id="drafter-subheading" className="text-sm text-slate-500 mt-1">
          Lengkapi formulir berikut untuk menyusun draf laporan/permohonan formal secara instan dibantu AI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form (7 columns) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-rose-700" />
            Borang Informasi Pelapor
          </h3>

          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-medium">
              ⚠️ {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Lengkap</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Contoh: Andi Wijaya"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 focus:outline-hidden transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {userRole === "mahasiswa" ? "NIM (Nomor Induk Mahasiswa)" : "NIP (Nomor Induk Pegawai)"}
              </label>
              <input
                type="text"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                placeholder={userRole === "mahasiswa" ? "Contoh: 1301194002" : "Contoh: 19880021"}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 focus:outline-hidden transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Kampus / Resmi</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={userRole === "mahasiswa" ? "Contoh: andi@student.univ.ac.id" : "Contoh: andi@univ.ac.id"}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 focus:outline-hidden transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Jenis Kendala / Layanan</label>
              <div className="relative">
                <select
                  value={jenisKendala}
                  onChange={(e) => setJenisKendala(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 focus:outline-hidden transition-all appearance-none cursor-pointer"
                >
                  {services.map((svc) => (
                    <option key={svc.id} value={svc.title}>
                      {svc.title}
                    </option>
                  ))}
                  <option value="Lainnya">Lainnya / Masalah Umum</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Perkiraan Waktu Kejadian</label>
              <input
                type="text"
                value={waktuKejadian}
                onChange={(e) => setWaktuKejadian(e.target.value)}
                placeholder="Contoh: Senin Sore, 22 Jan 2026"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 focus:outline-hidden transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Lampiran Pendukung (Optional)</label>
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`relative border border-dashed rounded-xl p-2.5 text-center transition-all cursor-pointer bg-slate-50 ${
                  dragActive ? "border-teal-500 bg-teal-50/20" : "border-slate-300 hover:border-rose-400/50"
                }`}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex items-center justify-center gap-2 text-xs py-1 text-slate-600">
                    {lampiran ? (
                      <>
                        <Paperclip className="h-4 w-4 text-teal-600 shrink-0" />
                        <span className="font-semibold text-slate-800 truncate max-w-[150px]">{lampiran.name}</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 text-slate-400 shrink-0" />
                        <span>Tarik file atau klik di sini</span>
                      </>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Deskripsi Singkat Kendala</label>
            <textarea
              rows={4}
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Tuliskan secara ringkas kronologi atau masalah yang Anda hadapi..."
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 focus:outline-hidden transition-all resize-y"
            ></textarea>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAIGenerate}
              disabled={isGenerating}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className={`h-4 w-4 ${isGenerating ? 'animate-spin' : 'animate-pulse'}`} />
              {isGenerating ? "Menyusun Draf AI..." : "Generasikan Draf AI Cerdas"}
            </button>
            
            <button
              onClick={compileDefaultLetter}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold transition-all cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Setel Ulang
            </button>
          </div>
        </div>

        {/* Right Preview Output Letter Panel (5 columns) */}
        <div className="lg:col-span-5 flex flex-col h-full space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col flex-1">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-teal-600" />
                Live Preview Dokumen
              </span>
              <span className="text-[10px] font-medium text-slate-400">Siap Disalin</span>
            </div>

            <textarea
              value={generatedLetter}
              onChange={(e) => setGeneratedLetter(e.target.value)}
              rows={14}
              className="w-full bg-slate-50 px-4 py-3.5 text-xs font-mono text-slate-700 leading-relaxed border border-slate-200 rounded-xl focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 focus:outline-hidden resize-y flex-grow min-h-[300px]"
            ></textarea>

            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2">
              <button
                onClick={handleCopy}
                className={`col-span-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  copied 
                    ? "bg-emerald-600 text-white shadow-md" 
                    : "bg-rose-700 hover:bg-rose-800 text-white shadow-md hover:shadow-lg"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Berhasil Disalin!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Salin Draf Surat
                  </>
                )}
              </button>

              <button
                onClick={handleSave}
                className={`inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  saveSuccess 
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700 font-bold" 
                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                {saveSuccess ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-600" />
                    Tersimpan
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 text-slate-500" />
                    Simpan
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-teal-50/50 border border-teal-100 rounded-2xl p-5 text-xs text-teal-800">
            <p className="font-bold flex items-center gap-1.5 mb-2 text-teal-900">
              <CircleHelp className="h-4 w-4 text-teal-600 shrink-0" />
              Langkah Selanjutnya:
            </p>
            <p className="leading-relaxed text-[11px] text-teal-700">
              Salin draf surat di atas, lalu kirimkan melalui kanal kontak resmi yang disarankan atau unggah langsung di portal aduan resmi universitas.
            </p>
            <div className="mt-3 pt-3 border-t border-teal-100/50 text-[10px] text-slate-400 italic">
              * CampusCare AI membantu menyusun draf. Pengiriman laporan tetap dilakukan secara mandiri oleh pelapor melalui kanal resmi kampus.
            </div>
          </div>

        </div>

      </div>

      {/* Draft Saved History Panel */}
      <div id="saved-history-log" className="mt-12 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 mb-5">
          Riwayat Draf Tersimpan Saya ({savedDrafts.length})
        </h3>
        {savedDrafts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedDrafts.map((d) => (
              <div
                key={d.id}
                id={`saved-draft-item-${d.id}`}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-rose-200/60 transition-all flex justify-between items-start"
              >
                <div onClick={() => handleLoadDraft(d)} className="flex-1 cursor-pointer pr-4">
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-tight truncate">{d.jenisKendala}</p>
                  <p className="text-[10px] text-slate-400 mt-1">Dibuat: {d.tanggalDibuat}</p>
                  <button className="text-[10px] text-rose-700 hover:text-rose-800 font-bold mt-3.5 block uppercase tracking-wider transition-colors">
                    Muat ke Formulir &rarr;
                  </button>
                </div>
                
                <button
                  onClick={() => onDeleteDraft(d.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-slate-400">
            <p className="text-sm font-semibold">Belum ada draf yang disimpan</p>
            <p className="text-xs mt-1 max-w-sm mx-auto leading-relaxed">
              Seluruh draf yang telah diisi dan disimpan akan dicatat di memori lokal (localStorage) browser Anda.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}


