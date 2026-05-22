import React, { useState } from "react";
import { Search, KeyRound, BookOpen, Wallet, Wifi, LayoutGrid, Building, ArrowRight, ShieldCheck, CircleHelp } from "lucide-react";
import { CampusService } from "../types";

interface BerandaProps {
  services: CampusService[];
  userRole: "mahasiswa" | "dosen" | "pegawai" | null;
  onTabChange: (tab: string) => void;
  onSelectCategory: (category: string) => void;
  onSearchQuery: (query: string) => void;
  onSelectService: (service: CampusService) => void;
}

export default function Beranda({ services, userRole, onTabChange, onSelectCategory, onSearchQuery, onSelectService }: BerandaProps) {
  const [searchVal, setSearchVal] = useState("");

  const categoriesByRole = {
    mahasiswa: [
      { title: "Akun & SSO", code: "Akun & SSO", desc: "Reset password SSO & KTM", icon: KeyRound, bg: "bg-rose-50 text-rose-600 border-rose-100/50" },
      { title: "Akademik", code: "Akademik", desc: "Surat aktif kuliah, KRS, berkas", icon: BookOpen, bg: "bg-blue-50 text-blue-600 border-blue-100/50" },
      { title: "IT & Jaringan", code: "IT & Jaringan", desc: "Wifi secure, MAC address", icon: Wifi, bg: "bg-indigo-50 text-indigo-600 border-indigo-100/50" },
      { title: "Keuangan", code: "Keuangan", desc: "Cicilan, VA, keringanan UKT", icon: Wallet, bg: "bg-emerald-50 text-emerald-600 border-emerald-100/50" },
      { title: "LMS/CeLOE", code: "LMS/CeLOE", desc: "Sinkronisasi kelas kuliah", icon: LayoutGrid, bg: "bg-purple-50 text-purple-600 border-purple-100/50" },
      { title: "Fasilitas", code: "Fasilitas", desc: "Peminjaman ruang, perpustakaan", icon: Building, bg: "bg-amber-50 text-amber-600 border-amber-100/50" }
    ],
    dosen: [
      { title: "LMS Pengajaran", code: "LMS/CeLOE", desc: "Kelola nilai & kelas LMS", icon: LayoutGrid, bg: "bg-purple-50 text-purple-600 border-purple-100/50" },
      { title: "Sistem Akademik", code: "Sistem Akademik", desc: "iGracias & portal SIAKAD", icon: BookOpen, bg: "bg-blue-50 text-blue-600 border-blue-100/50" },
      { title: "Akun & SSO", code: "Akun & SSO", desc: "Akun iGracias & e-mail dosen", icon: KeyRound, bg: "bg-rose-50 text-rose-600 border-rose-100/50" },
      { title: "Penelitian & Abdimas", code: "Penelitian & Pengabdian", desc: "Hibah internal & jurnal", icon: Wallet, bg: "bg-emerald-50 text-emerald-600 border-emerald-100/50" },
      { title: "Administrasi Dosen", code: "Administrasi Dosen", desc: "BKD, JAFA, & kepangkatan", icon: Building, bg: "bg-amber-50 text-amber-600 border-amber-100/50" },
      { title: "Akses VPN/WiFi", code: "IT & Jaringan", desc: "Akses luar kampus & WiFi secure", icon: Wifi, bg: "bg-indigo-50 text-indigo-600 border-indigo-100/50" }
    ],
    pegawai: [
      { title: "Admin Internal", code: "Administrasi Internal", desc: "Nota dinas & surat tugas", icon: BookOpen, bg: "bg-blue-50 text-blue-600 border-blue-100/50" },
      { title: "IT & Sistem", code: "IT & Sistem", desc: "E-office & database unit", icon: KeyRound, bg: "bg-rose-50 text-rose-600 border-rose-100/50" },
      { title: "Logistik & Sarpras", code: "Logistik & Fasilitas", desc: "Pengadaan ATK & logistik", icon: Building, bg: "bg-amber-50 text-amber-600 border-amber-100/50" },
      { title: "Layanan SDM", code: "SDM", desc: "Cuti, kesehatan, slip gaji", icon: Wallet, bg: "bg-emerald-50 text-emerald-600 border-emerald-100/50" },
      { title: "Helpdesk Unit", code: "Helpdesk Unit", desc: "Sistem tiket penanganan unit", icon: LayoutGrid, bg: "bg-purple-50 text-purple-600 border-purple-100/50" },
      { title: "SOP & KB", code: "Knowledge Base", desc: "Dokumen SOP standar unit", icon: Wifi, bg: "bg-indigo-50 text-indigo-600 border-indigo-100/50" }
    ]
  };

  const currentRole = userRole || "mahasiswa";
  const categories = categoriesByRole[currentRole];

  const keywordsByRole = {
    mahasiswa: ["Reset SSO", "Surat Aktif Kuliah", "KRS", "LMS", "Cicilan UKT"],
    dosen: ["Sinkronisasi LMS", "Input Nilai iGracias", "Hibah Penelitian", "Pengajuan BKD", "Akses VPN Kampus"],
    pegawai: ["E-Office Nota Dinas", "Pengadaan ATK", "Pengajuan Cuti SDM", "Tiket Helpdesk", "SOP Kerja Unit"]
  };

  const keywords = keywordsByRole[currentRole];

  const placeholdersByRole = {
    mahasiswa: "Contoh: saya tidak bisa login SSO / KRS / UKT...",
    dosen: "Contoh: kendala LMS pengajaran / iGracias / BKD...",
    pegawai: "Contoh: nota dinas internal / IT support / logistik..."
  };

  const placeholder = placeholdersByRole[currentRole];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      onSearchQuery(searchVal);
      onTabChange("browse");
    }
  };

  const handleAiStart = () => {
    if (searchVal.trim()) {
      onSearchQuery(searchVal);
    }
    onTabChange("chat");
  };

  const trendServices = services.slice(0, 3);

  return (
    <div id="beranda-screen" className="pb-20 bg-slate-50/50 text-slate-800">
      
      {/* Hero Banner Section */}
      <section id="hero-section" className="relative overflow-hidden bg-white py-16 sm:py-24 border-b border-slate-100">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_20rem_at_top,#fff1f2,#ffffff)] opacity-70"></div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3.5 py-1.5 text-xs font-semibold text-rose-700 border border-rose-100/50 shadow-xs">
            <ShieldCheck className="h-4 w-4 text-rose-700" />
            Smart Service Navigator Universitas
          </span>
          
          <h2 id="hero-heading" className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Temukan Layanan Kampus <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-rose-700 to-rose-500 bg-clip-text text-transparent">
              yang Tepat & Cepat
            </span>
          </h2>
          
          <p id="hero-tagline" className="mx-auto mt-4 max-w-xl text-base text-slate-500 leading-relaxed">
            Ceritakan masalahmu, CampusCare AI akan membantu mengarahkan ke kanal layanan yang sesuai.
          </p>

          {/* Centered Search Bar */}
          <form id="hero-search-form" onSubmit={handleSearchSubmit} className="mx-auto mt-10 max-w-2xl">
            <div className="relative flex items-center rounded-2xl bg-white p-2 border border-slate-200 shadow-lg focus-within:border-rose-600 focus-within:ring-3 focus-within:ring-rose-100 transition-all">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="hero-search-input"
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl bg-transparent py-3.5 pl-11 pr-44 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden"
              />
              <div className="absolute right-2 flex gap-2">
                <button
                  id="hero-search-ai-btn"
                  type="button"
                  onClick={handleAiStart}
                  className="px-4 py-2.5 bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  Mulai dengan AI Navigator
                </button>
                <button
                  id="hero-search-manual-btn"
                  type="submit"
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-all cursor-pointer"
                >
                  Cari Manual
                </button>
              </div>
            </div>
          </form>

          {/* Mini Search Keywords */}
          <div id="suggested-keywords" className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Kata Kunci Populer:</span>
            {keywords.map((kw) => (
              <button
                key={kw}
                onClick={() => {
                  setSearchVal(kw);
                  onSearchQuery(kw);
                  onTabChange("browse");
                }}
                className="text-slate-600 hover:text-rose-700 hover:bg-rose-50 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/60 transition-all cursor-pointer font-medium"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* Main Content Area */}
      <div id="beranda-content" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Banner Khusus Pegawai */}
        {userRole === "pegawai" && (
          <div className="mb-8 p-4 bg-rose-50/50 border border-rose-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-100/60 rounded-xl text-rose-700">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-slate-800">Panel Khusus Pegawai Aktif</h4>
                <p className="text-xs text-slate-500">Anda dapat memantau aduan kritis civitas akademika dan status penyelesaian sistem.</p>
              </div>
            </div>
            <button
              onClick={() => onTabChange("insight")}
              className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer"
            >
              Buka Dashboard Insight Admin
            </button>
          </div>
        )}

        {/* 1. Popular Categories Grid */}
        <div id="popular-categories-container" className="mb-14">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Kategori Layanan Utama</h3>
              <p className="text-sm text-slate-500 mt-1">Pilih kategori layanan kampus yang ingin kamu temukan panduannya.</p>
            </div>
            <button 
              onClick={() => {
                onSelectCategory("Semua");
                onTabChange("browse");
              }} 
              className="text-sm font-semibold text-rose-700 hover:text-rose-800 flex items-center gap-1 transition-all"
            >
              Lihat Semua <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={cat.title}
                  id={`cat-card-${cat.title.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => {
                    onSearchQuery("");
                    onSelectCategory(cat.code);
                    onTabChange("browse");
                  }}
                  className="group relative cursor-pointer bg-white border border-slate-200/80 p-5 rounded-2xl hover:shadow-md hover:border-rose-200 transition-all duration-200 flex flex-col items-center text-center shadow-xs"
                >
                  <div className={`p-3 rounded-xl border ${cat.bg}`}>
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h4 className="mt-4 text-sm font-bold text-slate-900 group-hover:text-rose-700 transition-colors">
                    {cat.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-400">
                    {cat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Cara Kerja Section */}
        <div id="how-it-works-section" className="mb-14 bg-white border border-slate-200/60 rounded-3xl p-8 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-xl font-bold text-slate-900">Cara Kerja CampusCare AI</h3>
            <p className="text-sm text-slate-500 mt-1">Langkah mudah menemukan jalan keluar bagi masalah layanan kampus Anda.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center px-4 relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 border border-rose-100 text-rose-700 font-bold text-sm mb-4 shadow-xs">
                1
              </div>
              <h4 className="text-sm font-bold text-slate-900">Ceritakan Masalah</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Tuliskan keluhan atau kendala layanan yang sedang Anda hadapi pada kolom AI Navigator.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center px-4 relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 border border-rose-100 text-rose-700 font-bold text-sm mb-4 shadow-xs">
                2
              </div>
              <h4 className="text-sm font-bold text-slate-900">Dapatkan Rekomendasi</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                AI kami mendeteksi unit pelayanan, tingkat keyakinan, dan memberikan langkah penyelesaian yang tepat.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center px-4 relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 border border-rose-100 text-rose-700 font-bold text-sm mb-4 shadow-xs">
                3
              </div>
              <h4 className="text-sm font-bold text-slate-900">Ikuti Alur atau Draf Laporan</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Ikuti langkah interaktif resmi atau buat draf surat laporan formal siap kirim yang dirakit AI.
              </p>
            </div>
            
          </div>
        </div>

        {/* 3. Top Searched Preview Section */}
        <div id="treanding-services-container" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-rose-600 rounded-full"></span> 
              Layanan Paling Sering Dicari
            </h3>
            <div className="space-y-3">
              {trendServices.map((svc) => (
                <div
                  key={svc.id}
                  id={`svc-trend-card-${svc.id}`}
                  onClick={() => onSelectService(svc)}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-white border border-slate-200/80 rounded-2xl hover:shadow-md hover:border-rose-200 transition-all cursor-pointer shadow-xs"
                >
                  <div className="max-w-xl pr-4">
                    <span className="inline-flex items-center bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[10px] font-semibold mb-2">
                      {svc.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">{svc.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1 leading-normal">{svc.description}</p>
                  </div>
                  <div className="mt-3 sm:mt-0 flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700 shrink-0">
                    Lihat Panduan
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick FAQ / FAQ Widget Card */}
          <div id="faq-widget" className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
              <CircleHelp className="h-4 w-4 text-rose-700" />
              Mengapa Menggunakan CampusCare?
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-800">01 / Pencarian Satu Pintu</h4>
                <p className="text-slate-500 mt-1 leading-relaxed">
                  Tidak perlu mencari kontak atau website unit yang berbeda secara terpisah. Cukup ceritakan masalahmu di sini.
                </p>
              </div>
              <div className="border-t border-slate-100 pt-3">
                <h4 className="font-bold text-slate-800">02 / Penyusunan Draf Laporan AI</h4>
                <p className="text-slate-500 mt-1 leading-relaxed">
                  AI membantu menyusun format laporan formal yang santun dan profesional untuk langsung disalin ke kanal resmi.
                </p>
              </div>
              <div className="border-t border-slate-100 pt-3">
                <h4 className="font-bold text-slate-800">03 / Informasi Selalu Akurat</h4>
                <p className="text-slate-500 mt-1 leading-relaxed">
                  Semua alur divalidasi berkala sesuai standar operasional yang berlaku di lingkungan universitas.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


