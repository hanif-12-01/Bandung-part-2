import React, { useState, useMemo } from "react";
import { Search, Sparkles, Filter, ChevronRight, HelpCircle } from "lucide-react";
import { CampusService } from "../types";

interface CariLayananProps {
  services: CampusService[];
  filterCategory: string;
  searchQuery: string;
  onSelectCategory: (category: string) => void;
  onSearchQuery: (query: string) => void;
  onSelectService: (service: CampusService) => void;
  onTabChange: (tab: string) => void;
}

export default function CariLayanan({
  services,
  filterCategory,
  searchQuery,
  onSelectCategory,
  onSearchQuery,
  onSelectService,
  onTabChange
}: CariLayananProps) {
  const categories = ["Semua", "Akademik", "Sistem Akun", "Keuangan", "IT & Jaringan"];

  // Popular searches
  const popSearches = [
    { label: "Solusi lupa kata sandi SSO", q: "password", cat: "Sistem Akun" },
    { label: "Pengurusan BPJS kuliah", q: "aktif kuliah", cat: "Akademik" },
    { label: "Cicilan Uang Kuliah Tunggal", q: "cicilan", cat: "Keuangan" },
    { label: "Sambungan Wifi Secure Kampus", q: "wifi", cat: "IT & Jaringan" }
  ];

  // Filter & Search Logic
  const filteredServices = useMemo(() => {
    return services.filter((svc) => {
      const matchCat = filterCategory === "Semua" || svc.category === filterCategory;
      const matchQuery =
        svc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [services, filterCategory, searchQuery]);

  return (
    <div id="cari-layanan-screen" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-white">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Main Search Panel */}
        <div className="flex-1">
          <div className="mb-8 border-b border-[#1a1a1a] pb-4">
            <span className="text-[10px] font-mono text-[#ff4d00] tracking-widest uppercase">Service Portal Catalog</span>
            <h2 id="browse-heading" className="text-2xl font-black text-white uppercase mt-1">Cari Layanan Kampus</h2>
            <p id="browse-subheading" className="text-xs text-[#777] font-mono mt-1">Temukan prosedur, berkas yang diperlukan, dan alur eskalasi resmi universitas</p>
          </div>

          {/* Combined Filters & Search Row */}
          <div className="mb-8 space-y-5">
            <div className="relative">
              <Search className="absolute left-4 top-4 h-4.5 w-4.5 text-[#555]" />
              <input
                id="browse-search"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchQuery(e.target.value)}
                placeholder="Tulis kendala administrasi kuliah atau jaringan..."
                className="w-full rounded-none border border-[#222] bg-[#111] py-4.5 pl-11 pr-4 text-xs font-mono text-white placeholder-gray-600 focus:border-[#ff4d00] focus:outline-hidden transition-all"
              />
            </div>

            {/* Chips Container */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-[10px] font-mono text-[#ff4d00] uppercase tracking-wider flex items-center gap-1.5 mr-2 shrink-0">
                <Filter className="h-3.5 w-3.5" />
                FILTER_SORT:
              </span>
              {categories.map((cat) => {
                const isActive = filterCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => onSelectCategory(cat)}
                    className={`rounded-none px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all border cursor-pointer ${
                      isActive
                        ? "bg-[#ff4d00] text-black border-[#ff4d00] shadow-xs"
                        : "bg-[#0e0e0e] text-[#888] border-[#1e1e1e] hover:text-white hover:border-neutral-700"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Cards Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredServices.map((svc) => (
                <div
                  key={svc.id}
                  id={`svc-browse-card-${svc.id}`}
                  onClick={() => onSelectService(svc)}
                  className="flex flex-col justify-between bg-[#0e0e0e] border border-[#1a1a1a] hover:border-[#ff4d00]/55 p-6 transition-all cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center bg-[#151515] px-2.5 py-1 text-[9px] font-mono text-[#ffbb00] uppercase tracking-wider border border-neutral-800">
                        {svc.category}
                      </span>
                      <span className="text-[10px] font-mono text-[#555]">
                        {svc.searchCount}x view_logs
                      </span>
                    </div>
                    <h3 className="text-sm font-bold tracking-tight text-[#f2f2f2] group-hover:text-[#ff4d00] transition-colors">
                      {svc.title}
                    </h3>
                    <p className="mt-3 text-xs text-[#777] font-mono leading-relaxed line-clamp-3">
                      {svc.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-[#1a1a1a] pt-4.5 flex items-center justify-between text-[10px] font-mono font-bold text-[#ff4d00] group-hover:text-white transition-colors uppercase tracking-widest">
                    <span>LIHAT ALUR RESMI_</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#0c0c0c] border border-dashed border-[#222]">
              <p className="text-sm font-bold text-[#aaa] uppercase tracking-wider">Layanan tidak ditemukan</p>
              <p className="text-xs text-[#555] font-mono mt-2 max-w-sm mx-auto leading-relaxed">Coba gunakan kata kunci umum lainnya, bersihkan filter, atau tanyakan langsung ke asisten AI Navigator kami.</p>
              <button
                onClick={() => {
                  onSearchQuery("");
                  onSelectCategory("Semua");
                }}
                className="mt-6 inline-flex items-center justify-center text-[10px] font-mono font-bold text-black bg-[#ff4d00] hover:bg-white px-5 py-3 transition-all cursor-pointer uppercase tracking-wider"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Widgets Column */}
        <div className="w-full md:w-80 shrink-0 space-y-6">
          
          {/* AI Navigator CTA Card */}
          <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-6 relative overflow-hidden">
            <span className="inline-flex items-center gap-1.5 bg-[#1a1a1a] text-[#ff4d00] px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-widest border border-[#ff4d00]/10">
              <Sparkles className="h-3.5 w-3.5" />
              INTELLIGENT // AI
            </span>
            <h3 className="mt-5 text-sm font-bold uppercase tracking-wider text-white">Bingung memilih alur yang sesuai?</h3>
            <p className="mt-2 text-xs text-[#777] font-mono leading-relaxed">
              Konsultasikan keluhan Anda langsung ke AI Navigator kami. Kami akan mengarahkan dokumen apa saja yang diperlukan dan memandu Anda step-by-step.
            </p>
            <button
              onClick={() => onTabChange("chat")}
              className="mt-6 w-full inline-flex items-center justify-center text-[10px] font-mono font-bold text-black bg-[#ff4d00] hover:bg-white px-4 py-3 transition-all uppercase tracking-wider cursor-pointer"
            >
              Konsultasi AI Sekarang
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>

          {/* Quick Filter Searches Sidebar widget */}
          <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-6">
            <h4 className="text-xs font-mono tracking-wider text-white uppercase flex items-center gap-2 border-b border-[#1a1a1a] pb-3 mb-4">
              <HelpCircle className="h-4.5 w-4.5 text-[#ffbb00]" />
              Pencarian Cepat
            </h4>
            <div className="space-y-3">
              {popSearches.map((ps) => (
                <button
                  key={ps.label}
                  onClick={() => {
                    onSearchQuery(ps.q);
                    onSelectCategory(ps.cat);
                  }}
                  className="w-full text-left flex items-start p-3 bg-[#111] hover:bg-[#161616] border border-[#1e1e1e] hover:border-[#ff4d00]/30 transition-all font-mono text-xs cursor-pointer"
                >
                  <div className="flex-1 pr-2">
                    <p className="font-semibold text-[#ccc] leading-snug hover:text-white transition-colors">{ps.label}</p>
                    <span className="text-[9px] text-[#ff4d00] font-bold uppercase tracking-widest mt-1.5 block">{ps.cat}</span>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-[#555] self-center shrink-0" />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

