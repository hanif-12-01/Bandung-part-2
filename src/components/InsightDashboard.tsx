import React, { useState } from "react";
import { TrendingUp, HelpCircle, FileText, Compass, AlertCircle, PlusCircle } from "lucide-react";
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
    { title: "Total Pertanyaan", val: "1,248", change: "+14.2% m-o-m", icon: HelpCircle, textCol: "text-[#ff4d00]" },
    { title: "Kategori Terpopuler", val: "Akun & SSO", change: "521 Pencarian", icon: Compass, textCol: "text-[#ffbb00]" },
    { title: "Draft Dibuat", val: "318 Laporan", change: "+24.8% m-o-m", icon: FileText, textCol: "text-[#ffbb00]" },
    { title: "Akurasi Rekomendasi", val: "98.4%", change: "920 Validasi", icon: TrendingUp, textCol: "text-[#00ffcc]" }
  ];

  const barData = [
    { label: "SSO", count: 521, limit: 600, color: "bg-[#ff4d00] border-[#ff4d00]" },
    { label: "Surat Aktif", count: 452, limit: 600, color: "bg-[#ffbb00] border-[#ffbb00]" },
    { label: "KRS", count: 387, limit: 600, color: "bg-[#888] border-[#888]" },
    { label: "UKT / Cicil", count: 298, limit: 600, color: "bg-[#ffbb00] border-[#ffbb00]" },
    { label: "LMS", count: 189, limit: 600, color: "bg-[#444] border-neutral-700" },
    { label: "Lainnya", count: 124, limit: 600, color: "bg-[#222] border-neutral-800" }
  ];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      onAddProblem(newTitle, newCat);
      setNewTitle("");
    }
  };

  return (
    <div id="insight-screen" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-white bg-[#0a0a0a]">
      
      {/* Page Title */}
      <div className="mb-8 border-b border-[#1a1a1a] pb-4">
        <span className="text-[10px] font-mono text-[#ff4d00] tracking-widest uppercase">System Analytics Dashboard</span>
        <h2 id="insight-heading" className="text-2xl font-black text-white uppercase mt-1">Insight Layanan Kampus</h2>
        <p id="insight-subheading" className="text-xs text-[#777] font-mono mt-1">Sistem dasbor analitik pemantau kualitas pelayanan administrasi dan respon keluhan civitas.</p>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {statCards.map((card, idx) => {
          const IconComp = card.icon;
          return (
            <div key={idx} className="bg-[#0e0e0e] border border-[#1a1a1a] p-5 hover:border-[#ff4d00]/30 transition-all flex items-center gap-4">
              <span className={`p-3 bg-[#131313] border border-neutral-800 ${card.textCol}`}>
                <IconComp className="h-5.5 w-5.5" />
              </span>
              <div className="font-mono">
                <p className="text-[9px] font-bold text-[#555] uppercase tracking-wider">{card.title}</p>
                <h4 className="text-sm font-black text-white mt-1 leading-none uppercase">{card.val}</h4>
                <span className="text-[9px] text-[#ffbb00] font-bold mt-1 block tracking-tighter">{card.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Stats Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Interactive Charts & Tables (8 columns) */}
        <div className="lg:col-span-8 space-y-8 animate-fade-in-up">
          
          {/* AI Summarizer Block */}
          <div className="bg-[#0e0e0e] border border-dashed border-[#ff4d00]/30 p-5">
            <h3 className="text-[10px] font-mono font-bold text-[#ff4d00] uppercase tracking-widest flex items-center gap-1.5 mb-2.5">
              <AlertCircle className="h-4.5 w-4.5" />
              AI_INSIGHT // LOG_ANALYSIS
            </h3>
            <p className="text-xs font-mono text-[#888] leading-relaxed">
              "Terjadi lonjakan volume pencarian topik <span className="text-[#ff4d00] font-bold opacity-100">Setel Ulang Kata Sandi SSO</span> sebesar +15% selama 48 jam terakhir, pasca rilis registrasi asrama semester baru. Sebagian besar draf awal tidak mencantumkan email cadangan sekunder. Direkomendasikan menambah petunjuk popup pemulihan kata sandi di landing page utama."
            </p>
          </div>

          {/* Custom SVG Bar Chart */}
          <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-6 relative">
            <div className="flex items-center justify-between mb-8 border-b border-[#1a1a1a] pb-4">
              <div>
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Kategori Masalah Teratas</h3>
                <p className="text-[9px] font-mono text-[#555] mt-0.5 uppercase">Analisis frekuensi pencarian draf laporan civitas</p>
              </div>
              <span className="text-[9px] font-mono text-black font-bold tracking-wider bg-[#ff4d00] px-2.5 py-1">BULAN_INI</span>
            </div>

            {/* Custom Interactive Bars */}
            <div className="relative h-64 flex items-end justify-between gap-1 sm:gap-4 mt-4 select-none px-4">
              
              {/* Y Axis indicators */}
              <div className="absolute left-0 bottom-0 top-0 w-full pointer-events-none flex flex-col justify-between text-[8px] font-mono text-[#555] border-l border-[#222] pl-2">
                <div className="border-t border-[#111] w-full pt-1">600</div>
                <div className="border-t border-[#111] w-full pt-1">450</div>
                <div className="border-t border-[#111] w-full pt-1">300</div>
                <div className="border-t border-[#111] w-full pt-1">150</div>
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
                      <div className="absolute top-2 bg-[#1c1c1c] text-white font-mono text-[9px] py-1.5 px-3 border border-[#ff4d00]/40 shadow-xl z-30 transition-all flex flex-col items-center">
                        <span className="font-bold uppercase tracking-wider">{bar.label}</span>
                        <span className="text-[#ff4d00] font-black">{bar.count} KUNJUNGAN</span>
                      </div>
                    )}

                    {/* Styled Dynamic Bar */}
                    <div
                      style={{ height: `${percentageHeight}%` }}
                      className={`w-10 sm:w-12 border ${bar.color} transition-all duration-250 relative ${
                        isHovered ? "brightness-125 scale-x-105" : "brightness-100"
                      }`}
                    >
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#555] opacity-0 group-hover:opacity-100 transition-opacity">
                        {bar.count}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-gray-400 mt-3.5 text-center truncate w-full uppercase">
                      {bar.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Searches Table Section */}
          <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-6 overflow-hidden">
            <h3 className="text-xs font-mono font-bold tracking-wider text-white border-b border-[#1a1a1a] pb-3 mb-4 uppercase">
              Layanan Kampus Paling Banyak Dituju
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1d1d1d] text-[#555] text-[9px] font-mono font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-2">Nama Layanan</th>
                    <th className="py-3.5 px-2">Kategori</th>
                    <th className="py-3.5 px-2">Frekuensi</th>
                    <th className="py-3.5 px-2">Rekomendasi Petunjuk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#151515] text-[11px] font-mono text-gray-300">
                  {services.map((svc) => (
                    <tr key={svc.id} className="hover:bg-[#111] transition-all">
                      <td className="py-4 px-2 font-bold text-white uppercase tracking-tight">{svc.title}</td>
                      <td className="py-4 px-2">
                        <span className="inline-block bg-[#161616] border border-neutral-800 text-[#ff4d00] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider">
                          {svc.category}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-[#777]">{svc.searchCount} HITS</td>
                      <td className="py-4 px-2 text-[10px] text-gray-400 leading-relaxed max-w-xs truncate">{svc.recommendation}</td>
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
          <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-5">
            <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3 mb-4">
              <div>
                <h3 className="text-[10px] font-mono font-bold text-[#ff4d00] uppercase tracking-widest">CAMPUS_PROBLEM_BANK</h3>
                <p className="text-[9px] font-mono text-[#555] mt-0.5">Sistem pemantau kendala umum aktif</p>
              </div>
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {problems.map((prob) => {
                const isKritis = prob.status === "Kritis";
                return (
                  <div
                    key={prob.id}
                    id={`prob-bank-item-${prob.id}`}
                    className="p-3 bg-[#111] border border-[#1e1e1e] hover:border-[#ff4d00]/30 transition-all flex items-start justify-between"
                  >
                    <div className="font-mono">
                      <p className="text-xs font-bold text-white uppercase leading-snug">{prob.title}</p>
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        <span className="text-[9px] font-bold text-[#555] uppercase">{prob.category}</span>
                        <span className="text-[9px] text-[#222]">•</span>
                        <span className="text-[9px] text-[#ffbb00] font-bold uppercase">{prob.reportedCount} LAPORAN</span>
                      </div>
                    </div>
                    
                    <span className={`inline-flex shrink-0 items-center border px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase ${
                      isKritis
                        ? "bg-red-950/40 text-red-400 border-red-500/30"
                        : "bg-amber-950/40 text-amber-400 border-amber-500/30"
                    }`}>
                      {prob.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Problem Reporter form */}
          <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-5">
            <h4 className="text-[10px] font-mono font-bold text-[#ffbb00] uppercase tracking-widest border-b border-[#1a1a1a] pb-3 mb-4 flex items-center gap-1.5">
              <PlusCircle className="h-4.5 w-4.5 text-[#ff4d00]" />
              LAPORKAN KENDALA BARU
            </h4>
            
            <form onSubmit={handleAddSubmit} className="space-y-4 font-mono">
              <div>
                <label className="block text-[9px] font-bold text-[#555] uppercase mb-1.5">Judul Kendala Kerja Sistem</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Misal: Portal presensi login timbale-balik"
                  className="w-full rounded-none border border-[#222] bg-[#111] px-3.5 py-2.5 text-xs text-white focus:border-[#ff4d00] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-[#555] uppercase mb-1.5">Rumpun Kategori</label>
                <select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  className="w-full rounded-none border border-[#222] bg-[#111] px-3.5 py-2.5 text-xs text-white focus:border-[#ff4d00] focus:outline-hidden appearance-none"
                  style={{ backgroundImage: 'none' }}
                >
                  <option value="Akademik" className="bg-[#0e0e0e]">Akademik</option>
                  <option value="IT & Jaringan" className="bg-[#0e0e0e]">IT & Jaringan</option>
                  <option value="Keuangan" className="bg-[#0e0e0e]">Keuangan</option>
                  <option value="Fasilitas" className="bg-[#0e0e0e]">Fasilitas</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-1.5 py-3.5 px-4 bg-[#ff4d00] text-black hover:bg-white text-xs font-mono font-bold uppercase tracking-wider cursor-pointer transition-all"
              >
                SUBMIT_TO_BANK_
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}

