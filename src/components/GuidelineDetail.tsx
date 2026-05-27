import React, { useState } from "react";
import { ArrowLeft, BookOpen, CircleCheck, FileDown, FileText, Globe, Copy, Check, Bookmark, Sparkles } from "lucide-react";
import { CampusService } from "../types";

interface GuidelineDetailProps {
  service: CampusService;
  onBack: () => void;
  onNavigateToDraft: (service: CampusService) => void;
  onSaveGuideline?: (service: CampusService) => void;
  onBackToChat?: () => void;
}

export default function GuidelineDetail({ service, onBack, onNavigateToDraft, onSaveGuideline, onBackToChat }: GuidelineDetailProps) {
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
    <div id="guideline-screen" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in text-slate-800">
      
      {/* Breadcrumbs / Back button row */}
      <div id="guideline-breadcrumbs" className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/60">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-rose-700 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Pencarian
          </button>
          {onBackToChat && (
            <button
              onClick={onBackToChat}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-650 hover:text-teal-800 px-3 py-1.5 rounded-lg hover:bg-teal-50/50 transition-all cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              AI Navigator
            </button>
          )}
        </div>
        <span className="text-xs font-bold tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full uppercase">
          Rumpun // {service.category}
        </span>
      </div>

      {/* Hero Title Head */}
      <div id="guideline-header" className="mb-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-rose-50/40 to-transparent rounded-bl-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
              {service.recommendation.split(" ")[0] || "Unit"} {service.title.split(" ")[0]} Recommendation
            </span>
            <h2 id="guideline-title" className="text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl mt-3 leading-tight">
              {service.title}
            </h2>
            <p id="guideline-desc" className="text-sm text-slate-600 mt-2.5 max-w-3xl leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
        
        <div id="guideline-action" className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mt-6 pt-6 border-t border-slate-100">
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex-1">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Rekomendasi AI</p>
            <p className="text-xs text-slate-700 mt-1 max-w-xl leading-relaxed font-medium">
              {service.recommendation}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
            {onSaveGuideline && (
              <button
                onClick={() => onSaveGuideline(service)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap active:scale-98"
              >
                <Bookmark className="h-4.5 w-4.5 text-slate-400" />
                Simpan Panduan
              </button>
            )}
            <button
              onClick={() => onNavigateToDraft(service)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-sm font-bold shadow-md active:scale-98 transition-all cursor-pointer whitespace-nowrap"
            >
              <FileText className="h-4.5 w-4.5" />
              Mulai Buat Draft Laporan
            </button>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Step-by-Step Stepper (Left Column, spanned 2) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 pb-4 mb-6 border-b border-slate-100 flex items-center gap-2.5">
              <BookOpen className="h-5 w-5 text-rose-700" />
              Alur Prosedur Pengurusan Resmi
            </h3>
 
            {/* Stepper Steps Render */}
            <div className="relative pl-6 space-y-6 before:absolute before:inset-y-1.5 before:left-3 before:w-[2px] before:bg-slate-100">
              {stepsList.map((step, idx) => {
                const isActive = activeStep === idx;
                const isPassed = idx < activeStep;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`relative cursor-pointer transition-all group`}
                  >
                    {/* Circle Indicator */}
                    <span
                      className={`absolute -left-6 top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-all z-10 ${
                        isPassed
                          ? "bg-rose-700 border border-rose-700 text-white"
                          : isActive
                          ? "bg-white border-2 border-rose-700 text-rose-700 scale-110 shadow-sm"
                          : "bg-slate-50 border border-slate-200 text-slate-400 group-hover:border-slate-300"
                      }`}
                    >
                      {isPassed ? <CircleCheck className="h-3.5 w-3.5" /> : idx + 1}
                    </span>

                    <div className={`p-4 rounded-xl border transition-all ${
                      isActive 
                        ? "bg-rose-50/30 border-rose-200 text-slate-900 shadow-xs" 
                        : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50/50 hover:border-slate-200"
                    }`}>
                      <h4 className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-rose-700' : 'text-slate-400'}`}>
                        Langkah {idx + 1}
                      </h4>
                      <p className="text-sm font-semibold mt-1 leading-relaxed">{step}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-between items-center bg-slate-50 rounded-xl p-4 border border-slate-100">
              <span className="text-[11px] font-medium text-slate-500">Klik langkah untuk melihat detail</span>
              <div className="flex gap-2">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-800 text-slate-600 disabled:opacity-40 transition-all cursor-pointer"
                >
                  Sebelumnya
                </button>
                <button
                  disabled={activeStep === stepsList.length - 1}
                  onClick={() => setActiveStep(Math.min(stepsList.length - 1, activeStep + 1))}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-rose-700 hover:bg-rose-800 text-white disabled:opacity-40 transition-all cursor-pointer"
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Information / Required Files Details */}
        <div className="space-y-6">
          
          {/* Document list required card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 pb-3 mb-4 border-b border-slate-100 flex items-center gap-2">
              <FileDown className="h-4.5 w-4.5 text-rose-700" />
              Informasi yang Diperlukan
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Pastikan Anda mempersiapkan dokumen/informasi berikut sebelum melakukan pengaduan resmi:
            </p>
            <ul className="space-y-3">
              {requiredInfo.map((info, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                  <span className="flex h-1.5 w-1.5 shrink-0 bg-rose-600 rounded-full mt-1.5"></span>
                  <span className="leading-relaxed">{info}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Channel Address Escaltion */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-teal-600" />
                Kanal Resmi Eskalasi
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Kirim draf laporan yang telah disalin melalui link/alamat resmi berikut:
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono text-xs text-slate-700 break-all leading-relaxed select-all">
              {service.officialChannel}
            </div>
            
            <button
              onClick={handleCopyChannel}
              className={`w-full inline-flex items-center justify-center gap-2 rounded-xl text-xs font-semibold py-3 border transition-all cursor-pointer ${
                copied 
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                  : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  Salin Berhasil
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Salin Kontak/Link Resmi
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}


