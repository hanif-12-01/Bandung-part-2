import React, { useState } from "react";
import { TrendingUp, CircleHelp, FileText, Compass, CirclePlus, Sparkles } from "lucide-react";
import { CampusProblem, CampusService } from "../types";

interface InsightDashboardProps {
  services: CampusService[];
  problems: CampusProblem[];
  onAddProblem: (title: string, category: string) => void;
}

export default function InsightDashboard({ services, problems, onAddProblem }: InsightDashboardProps) {
  
  // Custom interactive tooltip state for the bar chart
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  
  // Add Problem form state
  const [newTitle, setNewTitle] = useState("");
  const [newCat, setNewCat] = useState("Akademik");

  const statCards = [
    { title: "Total Pertanyaan", val: "1,248", change: "+14.2% m-o-m", icon: CircleHelp, color: "text-rose-700 bg-rose-50 border-rose-100" },
    { title: "Kategori Terpopuler", val: "Akun & SSO", change: "521 Pencarian", icon: Compass, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
    { title: "Draft Dibuat", val: "318 Laporan", change: "+24.8% m-o-m", icon: FileText, color: "text-amber-600 bg-amber-50 border-amber-100" },
    { title: "Akurasi Rekomendasi", val: "98.4%", change: "920 Validasi", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50 border-emerald-100" }
  ];

  const barData = [
    { label: "SSO", count: 521, limit: 600, color: "bg-rose-600 hover:bg-rose-700 border-rose-600" },
    { label: "Surat Aktif", count: 452, limit: 600, color: "bg-rose-400 hover:bg-rose-500 border-rose-400" },
    { label: "KRS", count: 387, limit: 600, color: "bg-slate-400 hover:bg-slate-500 border-slate-400" },
    { label: "UKT / Cicil", count: 298, limit: 600, color: "bg-rose-300 hover:bg-rose-400 border-rose-300" },
    { label: "LMS", count: 189, limit: 600, color: "bg-slate-300 hover:bg-slate-400 border-slate-300" },
    { label: "Lainnya", count: 124, limit: 600, color: "bg-slate-200 hover:bg-slate-300 border-slate-200" }
  ];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      onAddProblem(newTitle, newCat);
      setNewTitle("");
    }
  };

  return (
    <div id="insight-screen" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in text-slate-800 bg-[#f8fafc]">
      
      {/* Page Title */}
      <div className="mb-8 border-b border-slate-200 pb-4">
        <span className="text-xs font-bold text-rose-700 tracking-wider uppercase font-mono">System Analytics Dashboard</span>
        <h2 id="insight-heading" className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">Insight Layanan Kampus</h2>
        <p id="insight-subheading" className="text-sm text-slate-500 mt-1">
          Sistem dasbor analitik pemantau kualitas pelayanan administrasi dan respon keluhan civitas akademika.
        </p>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((card, idx) => {
          const IconComp = card.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-all flex items-center gap-4">
              <span className={`p-3 rounded-xl border ${card.color}`}>
                <IconComp className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-500">{card.title}</p>
                <h4 className="text-xl font-extrabold text-slate-900 mt-1 leading-none">{card.val}</h4>
                <span className="text-xs font-bold text-rose-700 mt-1.5 block">{card.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Stats Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Interactive Charts & Tables (8 columns) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* AI Summarizer Block */}
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 flex gap-3.5 items-start">
            <Sparkles className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-teal-900 uppercase tracking-widest font-mono mb-1">
                AI Insight & Ringkasan Log
              </h3>
              <p className="text-xs text-teal-800 leading-relaxed font-medium">
                Terjadi lonjakan volume pencarian topik <span className="font-bold text-teal-950">Setel Ulang Kata Sandi SSO</span> sebesar +15% selama 48 jam terakhir, pasca rilis registrasi asrama semester baru. Sebagian besar draf laporan tidak mencantumkan email cadangan sekunder. Direkomendasikan menambah petunjuk popup pemulihan kata sandi di landing page utama.
              </p>
            </div>
          </div>

          {/* Custom SVG Bar Chart */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 relative">
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-950">Kategori Masalah Teratas</h3>
                <p className="text-xs text-slate-500 mt-0.5">Analisis frekuensi pencarian draf laporan civitas</p>
              </div>
              <span className="text-xs font-bold tracking-wider bg-rose-100 text-rose-800 px-3 py-1 rounded-full">
                Bulan Ini
              </span>
            </div>

            {/* Custom Interactive Bars */}
            <div className="relative h-64 flex items-end justify-between gap-2 sm:gap-4 mt-4 select-none px-4">
              
              {/* Y Axis indicators */}
              <div className="absolute left-0 bottom-0 top-0 w-full pointer-events-none flex flex-col justify-between text-[10px] text-slate-400 border-l border-slate-100 pl-2">
                <div className="border-t border-slate-100 w-full pt-1">600</div>
                <div className="border-t border-slate-100 w-full pt-1">450</div>
                <div className="border-t border-slate-100 w-full pt-1">300</div>
                <div className="border-t border-slate-100 w-full pt-1">150</div>
                <div className="border-b border-transparent w-full pb-0.5 text-right font-medium">0</div>
              </div>

              {/* Render Bars */}
              {barData.map((bar, idx) => {
                const percentageHeight = (bar.count / bar.limit) * 100;
                const isHovered = hoveredBar === idx;
                
                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center justify-end group cursor-pointer z-10"
                    onMouseEnter={() => setHoveredBar(idx)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {/* Tooltip render on hover */}
                    {isHovered && (
                      <div className="absolute top-2 bg-slate-900 text-white font-mono text-[10px] py-1.5 px-3 rounded-lg shadow-md z-30 transition-all flex flex-col items-center">
                        <span className="font-bold">{bar.label}</span>
                        <span className="text-rose-400 font-bold">{bar.count} Kunjungan</span>
                      </div>
                    )}

                    {/* Styled Dynamic Bar */}
                    <div
                      style={{ height: `${percentageHeight}%` }}
                      className={`w-10 sm:w-12 rounded-t-lg transition-all duration-200 relative ${bar.color} ${
                        isHovered ? "brightness-105 scale-x-105" : "brightness-100"
                      }`}
                    >
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                        {bar.count}
                      </span>
                    </div>

                    <span className="text-[11px] font-semibold text-slate-500 mt-3 text-center truncate w-full">
                      {bar.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Searches Table Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 overflow-hidden">
            <h3 className="text-sm font-bold text-slate-950 border-b border-slate-100 pb-3 mb-4">
              Layanan Kampus Paling Banyak Dituju
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500 text-xs font-bold">
                    <th className="py-3.5 px-2">Nama Layanan</th>
                    <th className="py-3.5 px-2">Kategori</th>
                    <th className="py-3.5 px-2">Frekuensi</th>
                    <th className="py-3.5 px-2">Rekomendasi Petunjuk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {services.map((svc) => (
                    <tr key={svc.id} className="hover:bg-slate-50/50 transition-all">
                      <td className="py-4 px-2 font-bold text-slate-900">{svc.title}</td>
                      <td className="py-4 px-2">
                        <span className="inline-block bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                          {svc.category}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-slate-500 font-semibold">{svc.searchCount} Hits</td>
                      <td className="py-4 px-2 text-slate-500 max-w-xs truncate">{svc.recommendation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Active Incident Bank & Form Reporting Sidebar (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Active Campus Problem Bank */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-mono">
                  Campus Problem Bank
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Pemantau kendala umum aktif</p>
              </div>
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {problems.map((prob) => {
                const isKritis = prob.status === "Kritis";
                return (
                  <div
                    key={prob.id}
                    id={`prob-bank-item-${prob.id}`}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-rose-200/50 transition-all flex items-start justify-between gap-3"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-snug">{prob.title}</p>
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap text-[10px] text-slate-500 font-medium">
                        <span className="uppercase text-slate-400 font-semibold">{prob.category}</span>
                        <span>•</span>
                        <span className="text-teal-600 font-bold">{prob.reportedCount} Laporan</span>
                      </div>
                    </div>
                    
                    <span className={`inline-flex shrink-0 items-center rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                      isKritis
                        ? "bg-rose-50 text-rose-700 border border-rose-100"
                        : "bg-amber-50 text-amber-700 border border-amber-100"
                    }`}>
                      {prob.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Problem Reporter form */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-mono border-b border-slate-100 pb-3 mb-4 flex items-center gap-1.5">
              <CirclePlus className="h-4 w-4 text-rose-700" />
              Laporkan Kendala Baru
            </h4>
            
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Judul Kendala Kerja Sistem</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Misal: Portal presensi login timbal-balik"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-950 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 focus:outline-hidden transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Rumpun Kategori</label>
                <div className="relative">
                  <select
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-950 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 focus:outline-hidden transition-all appearance-none cursor-pointer"
                  >
                    <option value="Akademik">Akademik</option>
                    <option value="IT & Jaringan">IT & Jaringan</option>
                    <option value="Keuangan">Keuangan</option>
                    <option value="Fasilitas">Fasilitas</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-1.5 py-3 px-4 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Submit Kendala Baru
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
