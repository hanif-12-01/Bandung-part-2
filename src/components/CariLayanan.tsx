import React, { useMemo } from "react";
import { Search, Sparkles, Filter, ChevronRight, CircleHelp } from "lucide-react";
import { CampusService } from "../types";

interface CariLayananProps {
  services: CampusService[];
  filterCategory: string;
  searchQuery: string;
  userRole: "mahasiswa" | "dosen" | "pegawai" | null;
  onSelectCategory: (category: string) => void;
  onSearchQuery: (query: string) => void;
  onSelectService: (service: CampusService) => void;
  onTabChange: (tab: string) => void;
}

export default function CariLayanan({
  services,
  filterCategory,
  searchQuery,
  userRole,
  onSelectCategory,
  onSearchQuery,
  onSelectService,
  onTabChange
}: CariLayananProps) {
  
  const currentRole = userRole || "mahasiswa";

  const categoriesByRole = {
    mahasiswa: ["Semua", "Akademik", "Akun & SSO", "Keuangan", "LMS/CeLOE", "Open Library", "IT & Jaringan", "Kemahasiswaan", "Fasilitas"],
    dosen: ["Semua", "LMS/CeLOE", "Sistem Akademik", "Akun & SSO", "Penelitian & Pengabdian", "Administrasi Dosen", "IT & Jaringan", "Ruang & Fasilitas"],
    pegawai: ["Semua", "Administrasi Internal", "IT & Sistem", "Logistik & Fasilitas", "SDM", "Helpdesk Unit", "Knowledge Base"]
  };

  const categories = categoriesByRole[currentRole];

  const popSearchesByRole = {
    mahasiswa: [
      { label: "Kendala Login SSO", q: "SSO", cat: "Akun & SSO" },
      { label: "Surat Keterangan Aktif Kuliah", q: "Surat", cat: "Akademik" },
      { label: "Cicilan Uang Kuliah Tunggal (UKT)", q: "Cicilan", cat: "Keuangan" },
      { label: "Koneksi Wifi Secure Kampus", q: "Wifi", cat: "IT & Jaringan" }
    ],
    dosen: [
      { label: "Sinkronisasi LMS Pengajaran", q: "LMS", cat: "LMS/CeLOE" },
      { label: "Input Nilai iGracias SIAKAD", q: "Nilai", cat: "Sistem Akademik" },
      { label: "Reset Password Akun Dosen", q: "Akun", cat: "Akun & SSO" },
      { label: "Pengusulan Hibah Penelitian", q: "Hibah", cat: "Penelitian & Pengabdian" }
    ],
    pegawai: [
      { label: "Pembuatan Nota Dinas / Surat Tugas", q: "Nota", cat: "Administrasi Internal" },
      { label: "Pengadaan ATK / Logistik Unit", q: "ATK", cat: "Logistik & Fasilitas" },
      { label: "Klaim Kesehatan & SDM Cuti", q: "SDM", cat: "SDM" },
      { label: "Pembuatan Tiket Helpdesk Unit", q: "Tiket", cat: "Helpdesk Unit" }
    ]
  };

  const popSearches = popSearchesByRole[currentRole];

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
    <div id="cari-layanan-screen" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-slate-800">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Main Search Panel */}
        <div className="flex-1">
          <div className="mb-6">
            <h2 id="browse-heading" className="text-xl font-bold text-slate-900">Cari Layanan Kampus</h2>
            <p id="browse-subheading" className="text-xs text-slate-500 mt-1">Temukan prosedur resmi, berkas persyaratan, dan kanal eskalasi universitas.</p>
          </div>

          {/* Combined Filters & Search Row */}
          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                id="browse-search"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchQuery(e.target.value)}
                placeholder="Tulis kendala administrasi kuliah atau jaringan..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-rose-600 focus:outline-hidden transition-all shadow-xs"
              />
            </div>

            {/* Chips Container */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mr-2 shrink-0">
                <Filter className="h-4 w-4 text-slate-400" />
                Filter:
              </span>
              {categories.map((cat) => {
                const isActive = filterCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => onSelectCategory(cat)}
                    className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all border cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-rose-700 text-white border-rose-800 shadow-sm"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-950"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredServices.map((svc) => (
                <div
                  key={svc.id}
                  id={`svc-browse-card-${svc.id}`}
                  onClick={() => onSelectService(svc)}
                  className="flex flex-col justify-between bg-white border border-slate-200/80 hover:border-rose-200 p-5 rounded-2xl hover:shadow-md transition-all cursor-pointer group shadow-xs"
                >
                  <div className="space-y-3 text-left">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center bg-teal-50 text-teal-700 px-2 py-0.5 rounded-md text-[10px] font-semibold">
                        {svc.category}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {svc.searchCount} pencarian
                      </span>
                    </div>
                    
                    <h3 className="text-sm font-bold text-slate-950 leading-snug group-hover:text-rose-700 transition-colors">
                      {svc.title}
                    </h3>
                    
                    <div className="text-xs text-slate-500 space-y-1">
                      <p className="font-semibold text-slate-600">Unit Rekomendasi:</p>
                      <p className="line-clamp-1 truncate bg-slate-50 p-2 rounded-lg border border-slate-100 text-slate-700 font-mono text-[10.5px]">
                        {svc.officialChannel.split("/")[0].trim()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-600 group-hover:text-teal-700 transition-colors">
                    <span>Lihat Panduan</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 shadow-xs">
              <p className="text-sm font-bold text-slate-600">Layanan tidak ditemukan</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto leading-normal">Coba gunakan kata kunci umum lainnya, bersihkan filter, atau tanyakan langsung ke AI Navigator kami.</p>
              <button
                onClick={() => {
                  onSearchQuery("");
                  onSelectCategory("Semua");
                }}
                className="mt-5 inline-flex items-center justify-center text-xs font-semibold text-white bg-rose-700 hover:bg-rose-800 px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Widgets Column */}
        <div className="w-full lg:w-72 shrink-0 space-y-5">
          
          {/* AI Navigator CTA Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50/50 rounded-full -mr-8 -mt-8 -z-10"></div>
            <span className="inline-flex items-center gap-1 bg-teal-50 text-teal-700 px-2 py-1 rounded-md text-[10px] font-semibold border border-teal-100/50">
              <Sparkles className="h-3 w-3" />
              AI Navigator
            </span>
            <h3 className="mt-4 text-sm font-bold text-slate-900 leading-snug text-left">Bingung memilih alur yang sesuai?</h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed text-left">
              Konsultasikan keluhan Anda langsung ke AI Navigator. Kami akan mengarahkan dokumen apa saja yang diperlukan dan memandu Anda step-by-step.
            </p>
            <button
              onClick={() => onTabChange("chat")}
              className="mt-5 w-full inline-flex items-center justify-center text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
            >
              Konsultasi AI Sekarang
              <ChevronRight className="h-4 w-4 ml-0.5" />
            </button>
          </div>

          {/* Quick Filter Searches Sidebar widget */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3 mb-3">
              <CircleHelp className="h-4 w-4 text-rose-700" />
              Pencarian Cepat
            </h4>
            <div className="space-y-2">
              {popSearches.map((ps) => (
                <button
                  key={ps.label}
                  onClick={() => {
                    onSearchQuery(ps.q);
                    onSelectCategory(ps.cat);
                  }}
                  className="w-full text-left flex items-start p-2.5 bg-slate-50 hover:bg-rose-50/30 border border-slate-200/50 hover:border-rose-200 rounded-xl transition-all text-xs cursor-pointer"
                >
                  <div className="flex-1 pr-2">
                    <p className="font-semibold text-slate-700 leading-snug">{ps.label}</p>
                    <span className="text-[9px] text-teal-600 font-bold uppercase tracking-wider mt-1 block">{ps.cat}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 self-center shrink-0" />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}


