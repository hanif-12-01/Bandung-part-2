import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, AlertCircle, FileText, GraduationCap, RefreshCw } from "lucide-react";
import { CampusService, Message } from "../types";

interface AIKonsultasiProps {
  services: CampusService[];
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  onClearChat: () => void;
  onNavigateToDraft: (service: CampusService) => void;
}

export default function AIKonsultasi({
  services,
  messages,
  isLoading,
  onSendMessage,
  onClearChat,
  onNavigateToDraft
}: AIKonsultasiProps) {
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const tipsList = [
    { title: "Sebutkan NIM & Prodi", desc: "Cantumkan NIM Anda agar mesin asisten mendeteksi wewenang unit administrasi prodi." },
    { title: "Gunakan Kosakata Baku", desc: "Bahasa terstruktur membantu kecerdasan buatan menyusun draf surat resmi yang kredibel." },
    { title: "Periksa Ulang Draf", desc: "Selalu tinjau draf laporan di tab 'Buat Draft' sebelum mengirimkannya ke helpdesk." }
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

  // Compute best matching solution from user words
  const detectedSolution = React.useMemo(() => {
    const allText = messages.map((m) => m.text.toLowerCase()).join(" ");
    if (!allText) return null;

    // Word checking matches
    if (allText.includes("password") || allText.includes("sso") || allText.includes("autentikasi")) {
      return services.find((s) => s.id === "sso-password") || services[0];
    }
    if (allText.includes("surat") || allText.includes("aktif") || allText.includes("bpjs")) {
      return services.find((s) => s.id === "surat-aktif-kuliah") || services[0];
    }
    if (allText.includes("krs") || allText.includes("wali") || allText.includes("dosen")) {
      return services.find((s) => s.id === "pengisian-krs") || services[0];
    }
    if (allText.includes("ukt") || allText.includes("pembayaran") || allText.includes("cicilan") || allText.includes("bayar")) {
      return services.find((s) => s.id === "pembayaran-ukt") || services[0];
    }
    if (allText.includes("lms") || allText.includes("celoe") || allText.includes("kelas")) {
      return services.find((s) => s.id === "kendala-lms") || services[0];
    }
    if (allText.includes("wifi") || allText.includes("internet") || allText.includes("mac")) {
      return services.find((s) => s.id === "wifi-universitas") || services[0];
    }
    return null; // fallback
  }, [messages, services]);

  return (
    <div id="ai-chat-screen" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-white">
      <div className="flex flex-col lg:flex-row gap-8 h-[calc(110vh-14rem)] min-h-[550px]">
        
        {/* Chat Feed Panel */}
        <div className="flex-1 flex flex-col bg-[#0e0e0e] border border-[#1a1a1a] overflow-hidden h-full">
          
          {/* Header of Chat pane */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a1a1a] bg-[#0c0c0c]">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center bg-[#151515] border border-[#ff4d00]/30 text-[#ff4d00]">
                <Sparkles className="h-4.5 w-4.5" />
              </span>
              <div>
                <h3 className="text-xs font-bold font-mono tracking-widest text-white leading-none uppercase">AI_NAVIGATOR // HELP</h3>
                <span className="text-[9px] text-[#ffbb00] font-mono uppercase tracking-wider block mt-1">ONLINE // INTERACTIVE SUPPORT</span>
              </div>
            </div>
            
            <button
              onClick={onClearChat}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-[#222] bg-[#0d0d0d] text-[10px] font-mono font-bold text-[#888] hover:text-[#fff] hover:border-red-500/30 transition-all cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              CLEAR_LOGS
            </button>
          </div>

          {/* Quick recommendations on start */}
          {messages.length === 1 && (
            <div className="px-5 pt-5 pb-3 bg-[#0c0c0c] border-b border-[#1a1a1a]">
              <span className="text-[9px] font-mono font-bold text-[#555] uppercase tracking-wider block mb-2.5">FAST_SHORTCUT_QUERY:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Lupa kata sandi Akun SSO mahasiswa",
                  "Bagaimana mengurus Surat Aktif Kuliah?",
                  "Cara mengajukan cicilan UKT ke prodi",
                  "Kendala sinkronisasi kelas di LMS"
                ].map((sug) => (
                  <button
                    key={sug}
                    onClick={() => handleQuickPrompt(sug)}
                    className="text-[10px] font-mono text-[#aaa] hover:text-[#ff4d00] hover:border-[#ff4d00]/55 bg-[#121212] border border-[#1e1e1e] py-1.5 px-3 transition-all cursor-pointer"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages Listing Feed */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {messages.map((m) => {
              const isUser = m.sender === "user";
              return (
                <div
                  key={m.id}
                  id={`chat-msg-${m.id}`}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] px-4 py-3.5 text-xs font-mono leading-relaxed border ${
                      isUser
                        ? "bg-[#ff4d00] border-[#ff4d00] text-black"
                        : "bg-[#111] border-[#1e1e1e] text-[#f2f2f2]"
                    }`}
                  >
                    {!isUser && (
                      <span className="text-[9px] font-bold text-[#ff4d00] uppercase tracking-widest block mb-1">
                        SYSTEM_AI_STREAM
                      </span>
                    )}
                    <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                    <span className="text-[8px] text-right block mt-2 opacity-60 font-mono tracking-tight">
                      {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* AI Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#111] border border-[#1e1e1e] px-4 py-3.5 max-w-[75%]">
                  <span className="text-[9px] font-bold text-[#ffbb00] uppercase tracking-widest block mb-1">
                    SYSTEM_AI_STREAM
                  </span>
                  <div className="flex items-center gap-2 text-xs text-[#555] font-semibold py-1">
                    <span className="h-1.5 w-1.5 bg-[#ff4d00] animate-bounce"></span>
                    <span className="h-1.5 w-1.5 bg-[#ffbb00] animate-bounce [animation-delay:0.2s]"></span>
                    <span className="h-1.5 w-1.5 bg-[#ff4d00] animate-bounce [animation-delay:0.4s]"></span>
                    <span className="ml-1 font-mono text-[10px]">Processing response...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Chat Bar */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-[#1a1a1a] bg-[#0a0a0a]">
            <div className="relative flex items-center bg-[#111] border border-[#1e1e1e] p-1 focus-within:border-[#ff4d00]">
              <input
                id="chat-input-field"
                type="text"
                disabled={isLoading}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Tulis keluhan administrasi atau jaringan..."
                className="w-full bg-transparent py-4 pl-4 pr-16 text-xs font-mono text-white focus:outline-hidden disabled:opacity-50"
              />
              <button
                id="chat-send-btn"
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="absolute right-2 px-3.5 py-2.5 bg-[#ff4d00] disabled:bg-neutral-800 text-black hover:bg-white transition-all cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-2.5 text-center">
              <p className="text-[9px] text-[#555] font-mono inline-flex items-center gap-1.5">
                <AlertCircle className="h-3 bg-transparent text-[#ffbb00]" />
                Seluruh pengolahan teks dienkripsi di server pusat sistem informasi internal universitas.
              </p>
            </div>
          </form>

        </div>

        {/* Right Solusi & Tips Column */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6 h-full overflow-y-auto">
          
          {/* Detected/Relevant Solution Box */}
          <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-5">
            <h4 className="text-[10px] font-mono font-bold text-[#ff4d00] uppercase tracking-widest border-b border-[#1a1a1a] pb-3 mb-4">
              DETECTION // DETECTED_SOLUTION
            </h4>
            
            {detectedSolution ? (
              <div id="detected-sol-box" className="space-y-4">
                <div className="bg-[#111] p-4 border border-[#1e1e1e]">
                  <span className="inline-flex items-center bg-[#1a1a1a] px-2 py-0.5 text-[8px] font-mono text-[#ffbb00] uppercase tracking-wider border border-neutral-800">
                    {detectedSolution.category}
                  </span>
                  <h5 className="font-bold text-xs uppercase tracking-tight text-white mt-2.5 leading-snug">{detectedSolution.title}</h5>
                  <p className="text-[11px] text-[#777] font-mono mt-1.5 line-clamp-3 leading-relaxed">{detectedSolution.description}</p>
                </div>
                
                <button
                  onClick={() => onNavigateToDraft(detectedSolution)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-[#ff4d00] text-black hover:bg-white text-xs font-mono font-bold tracking-wider cursor-pointer transition-all"
                >
                  <FileText className="h-4 w-4" />
                  GENERATE_DRAFT_
                </button>
              </div>
            ) : (
              <div id="no-detected-sol" className="text-center py-10">
                <GraduationCap className="h-10 w-10 mx-auto text-[#333] stroke-1" />
                <p className="text-xs font-mono font-bold mt-3 text-[#777] uppercase">Awaiting Issue Query</p>
                <p className="text-[10px] text-[#555] font-mono mt-1 px-4 leading-normal">
                  Ketikkan masalah Anda seperti "lupa sandi sso" agar asisten langsung mendeteksi alur panduan.
                </p>
              </div>
            )}
          </div>

          {/* Guidelines Tips Sidepanel */}
          <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-5">
            <h4 className="text-[10px] font-mono font-bold text-[#ffbb00] uppercase tracking-widest border-b border-[#1a1a1a] pb-3 mb-4">
              TIPS // SMART CONSULTING
            </h4>
            <div className="space-y-4">
              {tipsList.map((tip, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center bg-[#151515] border border-neutral-800 text-[10px] font-mono font-bold text-[#ff4d00] mt-0.5">
                    0{idx + 1}
                  </span>
                  <div className="font-mono text-xs">
                    <h5 className="font-bold text-[#ccc] uppercase">{tip.title}</h5>
                    <p className="text-[10px] text-[#555] mt-1 line-clamp-3 leading-relaxed">{tip.desc}</p>
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

