import React, { useState } from "react";
import { Search, KeyRound, BookOpen, Wallet, Wifi, ShieldCheck, ArrowRight, Activity, HelpCircle } from "lucide-react";
import { CampusService } from "../types";

interface BerandaProps {
  services: CampusService[];
  onTabChange: (tab: string) => void;
  onSelectCategory: (category: string) => void;
  onSearchQuery: (query: string) => void;
  onSelectService: (service: CampusService) => void;
}

export default function Beranda({ services, onTabChange, onSelectCategory, onSearchQuery, onSelectService }: BerandaProps) {
  const [searchVal, setSearchVal] = useState("");

  const popularCats = [
    { title: "AKUN & SSO", code: "Sistem Akun", desc: "Masalah autentikasi & sandi kampus", icon: KeyRound, bg: "bg-neutral-900 text-[#ff4d00]" },
    { title: "AKADEMIK", code: "Akademik", desc: "Surat aktif kuliah, KRS, berkas administrasi", icon: BookOpen, bg: "bg-neutral-900 text-[#ffbb00]" },
    { title: "KEUANGAN & UKT", code: "Keuangan", desc: "Cicilan, VA, keringanan ukt terpadu", icon: Wallet, bg: "bg-neutral-900 text-[#00f2fe]" },
    { title: "IT & JARINGAN", code: "IT & Jaringan", desc: "Registrasi MAC, wifi secure kampus", icon: Wifi, bg: "bg-neutral-900 text-[#49f310]" }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      onSearchQuery(searchVal);
      onTabChange("browse");
    }
  };

  const trendServices = services.slice(0, 3);

  return (
    <div id="beranda-screen" className="pb-20 bg-[#0a0a0a] text-white">
      {/* Hero Banner Section */}
      <section id="hero-section" className="relative overflow-hidden bg-[#0d0d0d] py-16 sm:py-24 border-b border-[#1a1a1a]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(40rem_40rem_at_top,#261108,#0a0a0a)] opacity-60"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-none bg-[#161616] px-4 py-2 text-xs font-mono font-bold tracking-widest text-[#ff4d00] border border-[#ff4d00]/30">
            <ShieldCheck className="h-4 w-4" />
            STANDARD_OPERATION_SUPPORT // UNIVERSITAS CERDAS
          </span>
          <h2 id="hero-heading" className="mt-8 text-4xl font-black tracking-tighter text-[#fff] sm:text-5xl lg:text-7xl uppercase">
            SATU PORTAL PANDUAN <br />
            <span className="bg-gradient-to-r from-[#ff4d00] to-[#ffaa00] bg-clip-text text-transparent">
              LAYANAN AKADEMIS & IT
            </span>
          </h2>
          <p id="hero-tagline" className="mx-auto mt-6 max-w-2xl text-sm font-mono tracking-wide text-[#8a8a8a]">
            Dapatkan solusi instan atas kendala SSO, pengunduhan berkas, kebijakan ukt, hingga panduan KRS didampingi asisten kecerdasan buatan.
          </p>

          {/* Centered Search Bar */}
          <form id="hero-search-form" onSubmit={handleSearchSubmit} className="mx-auto mt-12 max-w-2xl">
            <div className="relative flex items-center rounded-none bg-[#111] p-1 border border-[#2e2e2e] focus-within:border-[#ff4d00] transition-colors">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-5 w-5 text-[#555]" />
              </div>
              <input
                id="hero-search-input"
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Cari solusi alur... (Misal: 'KRS', 'Keringanan UKT')"
                className="w-full rounded-none bg-transparent py-4 pl-12 pr-24 text-xs font-mono text-white placeholder-gray-600 focus:outline-hidden"
              />
              <button
                id="hero-search-btn"
                type="submit"
                className="absolute right-1 px-5 py-3 bg-[#ff4d00] hover:bg-white hover:text-black uppercase text-[10px] font-mono font-bold tracking-wider text-white rounded-none transition-all cursor-pointer"
              >
                CARI
              </button>
            </div>
          </form>

          {/* Mini Search Keywords */}
          <div id="suggested-keywords" className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-xs font-mono">
            <span className="text-[#555]">SHORTCUTS:</span>
            {["SSO", "SURAT AKTIF", "KRS", "CICILAN UKT", "PANDUAN WIFI"].map((kw) => (
              <button
                key={kw}
                onClick={() => {
                  setSearchVal(kw);
                  onSearchQuery(kw);
                  onTabChange("browse");
                }}
                className="text-[#aaa] hover:text-[#ff4d00] hover:border-[#ff4d00]/50 bg-[#121212] px-3.5 py-1.5 border border-[#1e1e1e] transition-all cursor-pointer uppercase text-[10px]"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div id="beranda-content" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        
        {/* Info Notification Banner */}
        <div id="info-banner" className="mb-16 rounded-none bg-[#0e0e0e] p-6 text-white border-2 border-dashed border-[#ff4d00]/30 relative">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#151515] border border-[#ff4d00]/20">
                <Activity className="h-6 w-6 text-[#ff4d00]" />
              </span>
              <div>
                <h3 className="text-sm font-bold tracking-wider font-mono uppercase text-[#f2f2f2]">Butuh Draf Laporan Pengaduan Formal Instan?</h3>
                <p className="text-[#888] text-xs font-mono mt-1.5 max-w-2xl leading-relaxed">
                  Gunakan tab Konsultasi AI untuk berinteraksi mengenai kendala administrasi. AI kami akan menyusun draf email keluhan kemahasiswaan formal secara dinamis.
                </p>
              </div>
            </div>
            <button
              onClick={() => onTabChange("chat")}
              className="inline-flex shrink-0 items-center gap-2 px-5 py-3 bg-[#ff4d00] text-black hover:bg-white hover:text-black transition-all cursor-pointer font-mono text-[10px] font-bold tracking-wider"
            >
              COBA CHAT AI
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 1. Popular Categories Grid */}
        <div id="popular-categories-container" className="mb-16">
          <div className="flex items-end justify-between mb-8 border-b border-[#1a1a1a] pb-4">
            <div>
              <span className="text-[10px] font-mono text-[#ff4d00] tracking-widest uppercase">Solusi Terpadu</span>
              <h3 className="text-xl font-black text-white uppercase mt-1">KATEGORI LAYANAN POPULER</h3>
            </div>
            <button 
              onClick={() => {
                onSelectCategory("Semua");
                onTabChange("browse");
              }} 
              className="text-[10px] font-mono font-bold text-[#ff4d00] hover:text-white flex items-center gap-1.5 transition-all"
            >
              LIHAT SEMUA LAYANAN <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularCats.map((cat) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={cat.title}
                  id={`cat-card-${cat.title.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => {
                    onSelectCategory(cat.code);
                    onTabChange("browse");
                  }}
                  className="group relative cursor-pointer bg-[#0e0e0e] border border-[#1a1a1a] p-6 hover:border-[#ff4d00] transition-all duration-200"
                >
                  <div className={`p-3 w-fit border border-neutral-800 ${cat.bg}`}>
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h4 className="mt-5 text-sm font-bold tracking-wider text-white group-hover:text-[#ff4d00] transition-colors uppercase font-mono">
                    {cat.title}
                  </h4>
                  <p className="mt-2 text-xs text-[#888] font-mono leading-relaxed">
                    {cat.desc}
                  </p>
                  <div className="mt-5 flex items-center text-[9px] font-mono font-bold text-[#ff4d00] uppercase tracking-widest group-hover:translate-x-1 duration-200 transition-all">
                    AKSES PANDUAN_ <ArrowRight className="h-3 w-3 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Top Searched Preview Section */}
        <div id="treanding-services-container" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-sm font-mono tracking-widest text-[#ff4d00] uppercase mb-6 flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 bg-[#ff4d00]"></span> Frequently Searched Guidelines
            </h3>
            <div className="space-y-4">
              {trendServices.map((svc) => (
                <div
                  key={svc.id}
                  id={`svc-trend-card-${svc.id}`}
                  onClick={() => onSelectService(svc)}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-[#0e0e0e] border border-[#1a1a1a] hover:border-[#ff4d00]/60 transition-all cursor-pointer"
                >
                  <div className="max-w-xl">
                    <span className="inline-flex items-center bg-[#151515] px-2.5 py-1 text-[9px] font-mono text-[#ffbb00] uppercase tracking-wider mb-2 border border-neutral-800">
                      {svc.category}
                    </span>
                    <h4 className="text-sm font-bold tracking-tight text-[#f2f2f2]">{svc.title}</h4>
                    <p className="text-xs text-[#777] font-mono mt-1.5 line-clamp-2 leading-relaxed">{svc.description}</p>
                  </div>
                  <div className="mt-3 sm:mt-0 flex items-center gap-1 text-[10px] font-mono font-bold text-[#ff4d00] hover:text-white shrink-0 uppercase tracking-widest">
                    PANDUAN_
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick FAQ / FAQ Widget Card */}
          <div id="faq-widget" className="bg-[#0c0c0c] border border-[#1e1e1e] p-6">
            <h3 className="text-xs font-mono tracking-wider text-white uppercase flex items-center gap-2 border-b border-[#1e1e1e] pb-3">
              <HelpCircle className="h-4.5 w-4.5 text-[#ffbb00]" />
              FAQ // WHY CHOOSE CAMPUSCARE
            </h3>
            <div className="mt-4 space-y-4 font-mono text-xs">
              <div>
                <h4 className="font-bold text-[#f2f2f2]">01 // AKSES MANDIRI</h4>
                <p className="text-[#777] mt-1 leading-relaxed">Sistem memandu Anda mengatasi masalah secara mandiri (self-service) sebelum harus mengajukan keluhan ke helpdesk universitas.</p>
              </div>
              <div className="border-t border-[#1a1a1a] pt-3">
                <h4 className="font-bold text-[#f2f2f2]">02 // DRAF FORMAL AI</h4>
                <p className="text-[#777] mt-1 leading-relaxed">Secara otomatis menghasilkan berkas/email pengaduan akademik resmi dengan tata bahasa Indonesia yang santun.</p>
              </div>
              <div className="border-t border-[#1a1a1a] pt-3">
                <h4 className="font-bold text-[#f2f2f2]">03 // PANDUAN TERKINI</h4>
                <p className="text-[#777] mt-1 leading-relaxed">Seluruh alur pelayanan divalidasi berkala demi menjamin keakuratan Standar Operasional kemahasiswaan.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

