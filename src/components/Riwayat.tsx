import React, { useState } from "react";
import { FileText, BookOpen, Trash2, ArrowRight, Calendar, User, Mail } from "lucide-react";
import { DraftReport, CampusService } from "../types";

// We define viewed guideline type locally or globally
export interface ViewedGuideline {
  id: string;
  serviceId: string;
  title: string;
  category: string;
  tanggalDilihat: string;
}

interface RiwayatProps {
  savedDrafts: DraftReport[];
  viewedGuidelines: ViewedGuideline[];
  onDeleteDraft: (id: string) => void;
  onLoadDraft: (draft: DraftReport) => void;
  onSelectServiceById: (serviceId: string) => void;
  onClearViewedGuidelines: () => void;
}

export default function Riwayat({
  savedDrafts,
  viewedGuidelines,
  onDeleteDraft,
  onLoadDraft,
  onSelectServiceById,
  onClearViewedGuidelines
}: RiwayatProps) {
  const [activeSubTab, setActiveSubTab] = useState<"drafts" | "guidelines">("drafts");

  return (
    <div id="history-screen" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in text-slate-800 bg-[#f8fafc]">
      
      {/* Page Header */}
      <div className="mb-8 border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-rose-700 tracking-wider uppercase">Riwayat Aktivitas</span>
          <h2 id="history-heading" className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">Aktivitas Saya</h2>
          <p id="history-subheading" className="text-sm text-slate-500 mt-1">
            Lihat draf laporan yang telah Anda simpan dan panduan layanan kampus yang baru saja Anda buka.
          </p>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-slate-200 mb-6">
        <button
          onClick={() => setActiveSubTab("drafts")}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-semibold text-sm transition-all cursor-pointer ${
            activeSubTab === "drafts"
              ? "border-rose-700 text-rose-700 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <FileText className="h-4 w-4" />
          Draf Laporan AI ({savedDrafts.length})
        </button>
        <button
          onClick={() => setActiveSubTab("guidelines")}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-semibold text-sm transition-all cursor-pointer ${
            activeSubTab === "guidelines"
              ? "border-rose-700 text-rose-700 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          Panduan Terakhir Dilihat ({viewedGuidelines.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeSubTab === "drafts" ? (
        <div className="space-y-6">
          {savedDrafts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedDrafts.map((draft) => (
                <div
                  key={draft.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <span className="inline-flex items-center rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-700 uppercase">
                          {draft.status}
                        </span>
                        <h4 className="text-base font-extrabold text-slate-900 mt-2 line-clamp-1">
                          {draft.jenisKendala}
                        </h4>
                      </div>
                      <button
                        onClick={() => onDeleteDraft(draft.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer shrink-0"
                        title="Hapus draf"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Metadata */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-1.5 truncate">
                        <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{draft.nama || "Tanpa Nama"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{draft.tanggalDibuat}</span>
                      </div>
                      <div className="flex items-center gap-1.5 col-span-2 truncate">
                        <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{draft.email || "Tanpa Email"}</span>
                      </div>
                    </div>

                    {/* Letter Preview Snippet */}
                    <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-3 text-[11px] font-mono text-slate-600 line-clamp-4 leading-relaxed mb-4 whitespace-pre-line">
                      {draft.generatedLetter || draft.deskripsi}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono">ID: {draft.id}</span>
                    <button
                      onClick={() => onLoadDraft(draft)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer"
                    >
                      Buka & Edit Draf
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl p-8 shadow-xs">
              <FileText className="h-12 w-12 text-slate-350 mx-auto mb-4" />
              <p className="text-base font-bold text-slate-800">Belum ada draf tersimpan</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                Anda dapat membuat draf surat/email keluhan akademis via navigator AI atau halaman Buat Draft Laporan, lalu menyimpannya di sini.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {viewedGuidelines.length > 0 ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-slate-500 font-medium">Daftar panduan yang Anda buka baru-baru ini:</span>
                <button
                  onClick={onClearViewedGuidelines}
                  className="text-xs text-slate-400 hover:text-slate-700 font-semibold cursor-pointer"
                >
                  Bersihkan Riwayat
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {viewedGuidelines.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-sm hover:border-rose-200/60 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-600 uppercase">
                        {item.category}
                      </span>
                      <h4 className="text-sm font-extrabold text-slate-900 mt-2.5 line-clamp-2">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-4">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Dilihat pada: {item.tanggalDilihat}</span>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-200 flex justify-end">
                      <button
                        onClick={() => onSelectServiceById(item.serviceId)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-700 cursor-pointer"
                      >
                        Buka Panduan
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl p-8 shadow-xs">
              <BookOpen className="h-12 w-12 text-slate-350 mx-auto mb-4" />
              <p className="text-base font-bold text-slate-800">Belum ada riwayat panduan</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                Riwayat akan tercatat secara otomatis ketika Anda membuka detail panduan layanan kampus.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
