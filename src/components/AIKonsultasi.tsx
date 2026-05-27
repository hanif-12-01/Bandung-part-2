import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, CircleAlert, FileText, Compass, RefreshCw, CircleCheck, ChevronRight } from "lucide-react";
import { CampusService, Message } from "../types";

interface AIKonsultasiProps {
  services: CampusService[];
  messages: Message[];
  isLoading: boolean;
  userRole: "mahasiswa" | "dosen" | "pegawai" | null;
  onSendMessage: (text: string) => void;
  onClearChat: () => void;
  onNavigateToDraft: (service: CampusService) => void;
  onSelectService: (service: CampusService) => void;
  onSaveToHistory: (service: CampusService) => void;
}

export default function AIKonsultasi({
  services,
  messages,
  isLoading,
  userRole,
  onSendMessage,
  onClearChat,
  onNavigateToDraft,
  onSelectService,
  onSaveToHistory
}: AIKonsultasiProps) {
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const tipsList = [
    { title: "Sebutkan Masalah Utama", desc: "Tulis kendala secara spesifik seperti 'tidak bisa login SSO' atau 'buat surat aktif kuliah'." },
    { title: "Gunakan Kata Kunci", desc: "Kata kunci membantu AI Navigator memetakan solusi dan unit layanan kampus yang tepat." },
    { title: "Buat Draf Langsung", desc: "Setelah AI mendeteksi layanan, gunakan tombol 'Buat Draft Laporan' untuk menyusun surat resmi." }
  ];

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText);
      setInputText("");
    }
  };

  const handleQuickPrompt = (promptText: string) => {
    if (!isLoading) {
      onSendMessage(promptText);
    }
  };

  const currentRole: "mahasiswa" | "dosen" | "pegawai" = (userRole || "mahasiswa") as "mahasiswa" | "dosen" | "pegawai";

  const suggestionsByRole: Record<"mahasiswa" | "dosen" | "pegawai", string[]> = {
    mahasiswa: [
      "Saya lupa kata sandi SSO mahasiswa",
      "Bagaimana mengurus Surat Keterangan Aktif Kuliah?",
      "Cara mengajukan cicilan pembayaran UKT",
      "Kendala sinkronisasi mata kuliah di LMS"
    ],
    dosen: [
      "Kendala sinkronisasi mahasiswa kelas pengajaran LMS",
      "Bagaimana mengunggah berkas pengabdian masyarakat?",
      "Alur permohonan peminjaman ruang rapat rektorat",
      "Panduan pengajuan BKD iGracias Dosen"
    ],
    pegawai: [
      "Bagaimana cara membuat Nota Dinas resmi?",
      "Pengadaan ATK untuk operasional unit kerja",
      "Klaim penggantian biaya kesehatan pegawai",
      "Mengajukan cuti tahunan melalui SDM"
    ]
  };

  const suggestions = suggestionsByRole[currentRole];

  const placeholdersByRole: Record<"mahasiswa" | "dosen" | "pegawai", string> = {
    mahasiswa: "Tulis keluhan layanan kampus Anda di sini...",
    dosen: "Tulis kendala pengajaran, iGracias, atau BKD Anda di sini...",
    pegawai: "Tulis kendala operasional, IT support, atau SDM Anda di sini..."
  };

  const placeholder = placeholdersByRole[currentRole];

  const detectedSolution = React.useMemo(() => {
    const allText = messages.map((m) => m.text.toLowerCase()).join(" ");
    if (!allText) return null;

    // Word checking matches
    if (allText.includes("password") || allText.includes("sso") || allText.includes("autentikasi") || allText.includes("sandi") || allText.includes("login")) {
      return services.find((s) => s.id.includes("sso") || s.id.includes("password")) || services[0];
    }
    if (allText.includes("surat") || allText.includes("aktif") || allText.includes("bpjs") || allText.includes("keterangan")) {
      return services.find((s) => s.id.includes("surat-aktif")) || services[0];
    }
    if (allText.includes("krs") || allText.includes("wali") || allText.includes("akademik") || allText.includes("siakad")) {
      return services.find((s) => s.id.includes("krs") || s.id.includes("siakad") || s.id.includes("akademik")) || services[0];
    }
    if (allText.includes("ukt") || allText.includes("pembayaran") || allText.includes("cicilan") || allText.includes("bayar") || allText.includes("uang kuliah") || allText.includes("finansial")) {
      return services.find((s) => s.id.includes("ukt") || s.id.includes("pembayaran")) || services[0];
    }
    if (allText.includes("lms") || allText.includes("celoe") || allText.includes("kelas") || allText.includes("sinkron") || allText.includes("ajar")) {
      return services.find((s) => s.id.includes("lms") || s.id.includes("celoe")) || services[0];
    }
    if (allText.includes("wifi") || allText.includes("internet") || allText.includes("mac") || allText.includes("koneksi") || allText.includes("vpn")) {
      return services.find((s) => s.id.includes("wifi") || s.id.includes("vpn") || s.id.includes("jaringan")) || services[0];
    }
    if (allText.includes("dinas") || allText.includes("nota") || allText.includes("tugas") || allText.includes("surat dinas")) {
      return services.find((s) => s.id.includes("nota-dinas") || s.id.includes("administrasi")) || services[0];
    }
    if (allText.includes("atk") || allText.includes("logistik") || allText.includes("sarpras") || allText.includes("pengadaan")) {
      return services.find((s) => s.id.includes("atk") || s.id.includes("logistik")) || services[0];
    }
    if (allText.includes("cuti") || allText.includes("sdm") || allText.includes("kepegawaian") || allText.includes("lembur") || allText.includes("sehat") || allText.includes("klaim")) {
      return services.find((s) => s.id.includes("cuti") || s.id.includes("sdm") || s.id.includes("klaim") || s.id.includes("kesehatan")) || services[0];
    }
    if (allText.includes("tiket") || allText.includes("helpdesk") || allText.includes("aduan")) {
      return services.find((s) => s.id.includes("helpdesk") || s.id.includes("tiket")) || services[0];
    }
    if (allText.includes("sop") || allText.includes("knowledge") || allText.includes("kb") || allText.includes("panduan kerja")) {
      return services.find((s) => s.id.includes("sop") || s.id.includes("knowledge")) || services[0];
    }
    if (allText.includes("perpustakaan") || allText.includes("openlib") || allText.includes("bebas pustaka") || allText.includes("buku")) {
      return services.find((s) => s.id.includes("library") || s.id.includes("pustaka")) || services[0];
    }
    return null;
  }, [messages, services]);

  // Dynamically estimate match percentage
  const matchPercentage = React.useMemo(() => {
    if (!detectedSolution) return 0;
    const lastUserText = messages.filter(m => m.sender === "user").pop()?.text.toLowerCase() || "";
    if (!lastUserText) return 85; // default confidence
    
    let score = 80;
    const keywords = detectedSolution.title.toLowerCase().split(" ");
    keywords.forEach(kw => {
      if (kw.length > 2 && lastUserText.includes(kw)) {
        score += 8;
      }
    });
    return Math.min(score, 98);
  }, [detectedSolution, messages]);

  return (
    <div id="ai-chat-screen" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-slate-800">
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-12rem)] min-h-[500px]">
        
        {/* Chat Feed Panel */}
        <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden h-full shadow-xs">
          
          {/* Header of Chat pane */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 border border-teal-100 text-teal-600">
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="text-left">
                <h3 className="text-sm font-bold text-slate-900 leading-none">AI Navigator</h3>
                <span className="text-[10px] text-teal-600 font-semibold block mt-1">Pemandu Layanan Cerdas</span>
              </div>
            </div>
            
            <button
              onClick={onClearChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Bersihkan Chat
            </button>
          </div>

          {/* Quick recommendations on start */}
          {messages.length === 1 && (
            <div className="px-5 py-4 bg-slate-50/30 border-b border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5 text-left">Pertanyaan Populer:</span>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => handleQuickPrompt(sug)}
                    className="text-xs text-slate-600 hover:text-teal-700 hover:bg-teal-50 bg-white border border-slate-200 rounded-lg py-1.5 px-3 transition-all cursor-pointer font-medium shadow-2xs"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages Listing Feed */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/10">
            {messages.map((m) => {
              const isUser = m.sender === "user";
              return (
                <div
                  key={m.id}
                  id={`chat-msg-${m.id}`}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed border ${
                      isUser
                        ? "bg-rose-700 border-rose-700 text-white shadow-xs rounded-tr-none"
                        : "bg-white border-slate-200 text-slate-800 shadow-2xs rounded-tl-none"
                    }`}
                  >
                    {!isUser && (
                      <span className="text-[9px] font-bold text-teal-600 uppercase tracking-wider block mb-1">
                        CampusCare Assistant
                      </span>
                    )}
                    <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                    <span className={`text-[9px] text-right block mt-2 opacity-65 ${isUser ? "text-rose-100" : "text-slate-400"}`}>
                      {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* AI Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-none max-w-[75%] shadow-2xs">
                  <span className="text-[9px] font-bold text-teal-600 uppercase tracking-wider block mb-1">
                    CampusCare Assistant
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold py-1">
                    <span className="h-1.5 w-1.5 bg-teal-600 rounded-full animate-bounce"></span>
                    <span className="h-1.5 w-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="h-1.5 w-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    <span className="ml-1 text-slate-400 text-xs">Sedang merangkum arahan...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Chat Bar */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 bg-white">
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1.5 focus-within:border-teal-500 focus-within:ring-3 focus-within:ring-teal-50 transition-all">
              <input
                id="chat-input-field"
                type="text"
                disabled={isLoading}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-transparent py-2.5 pl-3 pr-14 text-sm text-slate-800 focus:outline-hidden disabled:opacity-50"
              />
              <button
                id="chat-send-btn"
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="absolute right-2 px-3.5 py-2 bg-teal-600 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-lg hover:bg-teal-700 transition-all cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2.5 text-center">
              <p className="text-[10px] text-slate-400 inline-flex items-center gap-1">
                <CircleAlert className="h-3.5 w-3.5 text-amber-500" />
                Masukan Anda diproses secara pribadi demi kelancaran penyaluran administrasi universitas.
              </p>
            </div>
          </form>

        </div>

        {/* Right Solusi & Tips Column */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-5 h-full overflow-y-auto">
          
          {/* Detected/Relevant Solution Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <h4 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-3 mb-3 flex items-center gap-1">
              <Compass className="h-4 w-4 text-teal-600" />
              Hasil Deteksi AI
            </h4>
            
            {detectedSolution ? (
              <div id="detected-sol-box" className="space-y-4 text-left">
                
                {/* Solusi Card */}
                <div className="bg-slate-50 p-4 border border-slate-200 rounded-2xl space-y-3 shadow-2xs">
                  
                  {/* Category & Accuracy badge */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center bg-teal-50 border border-teal-100 text-teal-705 px-2 py-0.5 rounded-md text-[9px] font-bold">
                      {detectedSolution.category}
                    </span>
                    <span className="text-[10px] text-teal-650 font-bold bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100/80">
                      🎯 {matchPercentage}% Akurat
                    </span>
                  </div>

                  {/* Title */}
                  <h5 className="font-bold text-xs text-slate-900 leading-snug">{detectedSolution.title}</h5>

                  {/* Ringkasan Masalah */}
                  <div className="space-y-0.5 text-xs">
                    <p className="font-semibold text-slate-400 uppercase tracking-wider text-[9px]">Deteksi Masalah:</p>
                    <p className="text-[10.5px] text-slate-650 font-medium italic truncate">
                      "{messages.filter(m => m.sender === "user").pop()?.text || "Analisis keluhan..."}"
                    </p>
                  </div>

                  {/* Target Unit */}
                  <div className="space-y-1 text-xs">
                    <p className="font-semibold text-slate-500">Unit / Kanal Tujuan:</p>
                    <p className="text-[11px] text-slate-700 font-semibold bg-white border border-slate-200/60 p-2 rounded-lg leading-relaxed shadow-3xs">
                      {detectedSolution.officialChannel}
                    </p>
                  </div>

                  {/* Langkah Awal */}
                  {detectedSolution.steps && detectedSolution.steps.length > 0 && (
                    <div className="space-y-1 text-xs">
                      <p className="font-semibold text-slate-500">Langkah Awal:</p>
                      <div className="text-[10.5px] text-slate-750 bg-white border border-slate-200/60 p-2 rounded-lg flex gap-2 shadow-3xs">
                        <CircleCheck className="h-4 w-4 text-teal-650 shrink-0 mt-0.5" />
                        <span>{detectedSolution.steps[0]}</span>
                      </div>
                    </div>
                  )}

                  {/* Dokumen yang diperlukan */}
                  {detectedSolution.requiredDetails && detectedSolution.requiredDetails.length > 0 && (
                    <div className="space-y-1 text-xs">
                      <p className="font-semibold text-slate-500">Berkas / Data yang Disiapkan:</p>
                      <ul className="text-[10.5px] text-slate-700 bg-white border border-slate-200/60 p-2 rounded-lg space-y-1 shadow-3xs">
                        {detectedSolution.requiredDetails.slice(0, 3).map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>

                {/* CTAs */}
                <div className="space-y-2">
                  <button
                    onClick={() => onSelectService(detectedSolution)}
                    className="w-full inline-flex items-center justify-between px-4 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm active:scale-98"
                  >
                    <span>Lihat Panduan Resmi</span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </button>

                  <button
                    onClick={() => onNavigateToDraft(detectedSolution)}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
                  >
                    <FileText className="h-4 w-4" />
                    Buat Draft Laporan
                  </button>

                  <button
                    onClick={() => onSaveToHistory(detectedSolution)}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Simpan ke Riwayat
                  </button>
                </div>

              </div>
            ) : (
              <div id="no-detected-sol" className="text-center py-10">
                <Compass className="h-10 w-10 mx-auto text-slate-350 stroke-1 animate-pulse" />
                <p className="text-xs font-bold mt-3 text-slate-500">Menunggu Keluhan Anda</p>
                <p className="text-[11.5px] text-slate-400 mt-1.5 px-3 leading-normal">
                  Ketikkan masalah layanan Anda pada kolom obrolan agar AI dapat mendeteksi rekomendasi alur terbaik.
                </p>
              </div>
            )}
          </div>

          {/* Guidelines Tips Sidepanel */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <h4 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">
              Tips Konsultasi
            </h4>
            <div className="space-y-4">
              {tipsList.map((tip, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-50 border border-teal-100 text-[10px] font-bold text-teal-600 mt-0.5 shadow-2xs">
                    {idx + 1}
                  </span>
                  <div className="text-xs">
                    <h5 className="font-bold text-slate-800">{tip.title}</h5>
                    <p className="text-[11px] text-slate-400 mt-1 leading-normal">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
