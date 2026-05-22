import React, { useState } from "react";
import { ArrowLeft, BookOpen, CheckCircle2, FileDown, ChevronRight, FileText } from "lucide-react";
import { CampusService } from "../types";

interface GuidelineDetailProps {
  service: CampusService;
  onBack: () => void;
  onNavigateToDraft: (service: CampusService) => void;
}

export default function GuidelineDetail({ service, onBack, onNavigateToDraft }: GuidelineDetailProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [copied, setCopied] = useState(false);

  const stepsList = service.steps || [
    "Langkah awal pengajuan.",
    "Persiapkan dokumen pelengkap.",
    "Kirim laporan melalui kanal resmi.",
    "Tunggu verifikasi Unit Administrasi.",
    "Penyelesaian masalah oleh Unit terkait."
  ];

  const requiredInfo = service.requiredDetails || [
    "Identitas Mahasiswa Mandiri (Nama & NIM)",
    "Bukti Registrasi Semester Aktif",
    "Deskripsi rinci kendala sistem"
  ];

  const handleCopyChannel = () => {
    navigator.clipboard.writeText(service.officialChannel);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="guideline-screen" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 text-white">
      
      {/* Breadcrumbs / Back button row */}
      <div id="guideline-breadcrumbs" className="flex items-center justify-between mb-8 border-b border-[#1a1a1a] pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#888] hover:text-[#fff] bg-[#0c0c0c] border border-[#1e1e1e] hover:border-[#ff4d00]/40 px-4 py-2.5 transition-all cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 text-[#ff4d00]" />
          KEMBALI KE PENCARIAN
        </button>
        <span className="text-xs font-mono text-[#ffbb00]">
          RUMPUN // {service.category.toUpperCase()}
        </span>
      </div>

      {/* Hero Title Head */}
      <div id="guideline-header" className="mb-10 bg-[#0e0e0e] border border-[#1a1a1a] p-6 sm:p-8">
        <span className="inline-flex items-center bg-[#151515] px-2.5 py-1 text-[9px] font-mono text-[#ff4d00] uppercase tracking-wider border border-neutral-800">
          {service.category}
        </span>
        <h2 id="guideline-title" className="text-2xl font-black text-[#fff] uppercase sm:text-3xl mt-4 leading-tight">{service.title}</h2>
        <p id="guideline-desc" className="text-xs text-[#888] font-mono mt-3 leading-relaxed">{service.description}</p>
        
        <div id="guideline-action" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-8 pt-8 border-t border-[#1a1a1a]">
          <div>
            <p className="text-[9px] font-mono font-bold text-[#ffbb00] uppercase tracking-widest">SYSTEM // RECOMMENDATION</p>
            <p className="text-xs font-mono text-[#ccc] mt-1.5 max-w-xl leading-relaxed">{service.recommendation}</p>
          </div>
          <button
            onClick={() => onNavigateToDraft(service)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#ff4d00] text-black text-xs font-mono font-bold tracking-wider hover:bg-white transition-all cursor-pointer whitespace-nowrap"
          >
            <FileText className="h-4 w-4" />
            MULAI BUAT DRAFT_
          </button>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Step-by-Step Stepper (Left Column, spanned 2) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-6">
            <h3 className="text-sm font-mono tracking-wider text-white uppercase border-b border-[#1a1a1a] pb-4 mb-8 flex items-center gap-2">
              <BookOpen className="h-4.5 w-4.5 text-[#ff4d00]" />
              ALUR PROSEDUR PENGURUSAN RESMI
            </h3>
 
            {/* Stepper Steps Render */}
            <div className="relative pl-7 space-y-8 before:absolute before:inset-y-2 before:left-2 before:w-[1px] before:bg-neutral-800">
              {stepsList.map((step, idx) => {
                const isActive = activeStep === idx;
                const isPassed = idx < activeStep;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`relative cursor-pointer transition-all ${
                      isActive ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    {/* Circle Indicator */}
                    <span
                      className={`absolute -left-7.5 top-0 flex h-5.5 w-5.5 items-center justify-center border text-[9px] font-mono font-bold transition-all ${
                        isPassed
                          ? "bg-[#ff4d00] border-[#ff4d00] text-black"
                          : isActive
                          ? "bg-[#0a0a0a] border-[#ff4d00] text-[#ff4d00] font-black scale-110 shadow-xs"
                          : "bg-[#0c0c0c] border-[#222] text-[#444]"
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="h-3.5 w-3.5" /> : idx + 1}
                    </span>

                    <div className={`p-4 border transition-all ${
                      isActive 
                        ? "bg-[#111] border-[#ff4d00]/30 text-white" 
                        : "bg-[#0a0a0a]/50 border-transparent text-[#999] hover:bg-[#121212]"
                    }`}>
                      <h4 className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#555]">LANGKAH {idx + 1}</h4>
                      <p className="text-xs sm:text-sm font-semibold mt-1.5 leading-relaxed">{step}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-between items-center bg-[#0a0a0a] p-4 border border-[#1a1a1a]">
              <span className="text-[10px] font-mono text-[#555] uppercase">Interactive workflow slider</span>
              <div className="flex gap-2.5">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  className="px-3 py-1.5 text-xs font-mono font-bold border border-[#222] bg-[#0d0d0d] hover:text-[#fff] text-[#888] disabled:opacity-30 cursor-pointer"
                >
                  PREV
                </button>
                <button
                  disabled={activeStep === stepsList.length - 1}
                  onClick={() => setActiveStep(Math.min(stepsList.length - 1, activeStep + 1))}
                  className="px-3 py-1.5 text-xs font-mono font-bold bg-[#ff4d00] hover:bg-white text-black disabled:opacity-30 cursor-pointer"
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Information / Required Files Details */}
        <div className="space-y-6">
          
          {/* Document list required card */}
          <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-6">
            <h3 className="text-xs font-mono tracking-wider text-white uppercase border-b border-[#1a1a1a] pb-3 mb-4 flex items-center gap-1.5">
              <FileDown className="h-4.5 w-4.5 text-[#ffbb00]" />
              INFORMASI YANG DIPERLUKAN
            </h3>
            <p className="text-[11px] font-mono text-[#555] leading-relaxed mb-4">Pastikan Anda memiliki detail informasi berikut sebelum mengisi draf pengaduan atau eskalasi resmi:</p>
            <ul className="space-y-3.5 font-mono text-xs">
              {requiredInfo.map((info, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[#ccc]">
                  <span className="flex h-1.5 w-1.5 shrink-0 bg-[#ff4d00] mt-1.5"></span>
                  <span className="font-semibold leading-relaxed">{info}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Channel Address Escaltion */}
          <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-6 space-y-4">
            <div>
              <h4 className="text-xs font-mono tracking-wider text-[#ffbb00] uppercase">Kanal Resmi Eskalasi</h4>
              <p className="text-[11px] font-mono text-[#555] mt-1">Gunakan kontak berikut jika draf laporan telah Anda salin:</p>
            </div>
            <div className="bg-[#111] p-4 border border-[#1e1e1e] font-mono text-xs text-[#aaa] break-words leading-relaxed select-all">
              {service.officialChannel}
            </div>
            
            <button
              onClick={handleCopyChannel}
              className={`w-full text-center text-[10px] font-mono font-bold uppercase tracking-wider py-3 border transition-all cursor-pointer ${
                copied 
                  ? "bg-[#ff4d00] text-black border-[#ff4d00]" 
                  : "bg-[#0d0d0d] border-[#1e1e1e] text-[#aaa] hover:text-[#fff]"
              }`}
            >
              {copied ? "COPY_SUCCESSFUL!" : "SALIN KONTAK RESMI"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

