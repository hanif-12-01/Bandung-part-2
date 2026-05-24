import React, { useState } from "react";
import { 
  Sparkles, ShieldCheck, ChevronRight, GraduationCap, Users, LayoutDashboard,
  Search, BookOpen, Send, CheckCircle2, TrendingUp, Cpu, 
  MapPin, MessageSquare, ArrowRight, ArrowDownRight, Compass, Shield, User, FileText
} from "lucide-react";

interface LandingPageProps {
  onSelectRole: (role: "mahasiswa" | "dosen" | "pegawai") => void;
  lastRole?: "mahasiswa" | "dosen" | "pegawai" | null;
}

export default function LandingPage({ onSelectRole, lastRole }: LandingPageProps) {
  
  const [activeScenario, setActiveScenario] = useState(0);
  
  const scenarios = [
    { 
      label: "Mau bayar UKT", 
      masalah: "Saya mau bayar UKT semester ini, langkahnya bagaimana?",
      kategori: "Keuangan Akademik", 
      unit: "Direktorat Keuangan", 
      panduan: "Panduan Pembayaran Virtual Account" 
    },
    { 
      label: "Tidak bisa login SSO", 
      masalah: "Akun SSO saya terkunci dan lupa password.",
      kategori: "Akses Akun & IT", 
      unit: "Pusat Teknologi Informasi (PuTI)", 
      panduan: "Prosedur Reset Password Mandiri" 
    },
    { 
      label: "Butuh surat aktif kuliah", 
      masalah: "Saya perlu surat keterangan aktif untuk beasiswa.",
      kategori: "Administrasi Akademik", 
      unit: "Layanan Akademik Fakultas", 
      panduan: "Alur Pengajuan Surat Keterangan" 
    },
    { 
      label: "Kendala LMS/CeLOE", 
      masalah: "Materi kuliah di CeLOE tidak bisa diakses.",
      kategori: "Platform Pembelajaran", 
      unit: "Pusat Inovasi Pembelajaran (CeLOE)", 
      panduan: "Troubleshooting Akses LMS" 
    }
  ];

  const currentScenario = scenarios[activeScenario];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-rose-500/20 selection:text-rose-900">
      
      {/* 1. Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-600 text-white shadow-[0_4px_12px_rgba(225,29,72,0.3)]">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              CampusCare <span className="text-rose-600">AI</span>
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#beranda" className="text-sm font-semibold text-slate-800 hover:text-rose-600 transition-colors">Beranda</a>
            <a href="#cara-kerja" className="text-sm font-semibold text-slate-500 hover:text-rose-600 transition-colors">Cara Kerja</a>
            <a href="#fitur" className="text-sm font-semibold text-slate-500 hover:text-rose-600 transition-colors">Fitur Unggulan</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#pilih-role" className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-[0_4px_12px_rgba(15,23,42,0.15)] flex items-center gap-2">
              Masuk Layanan <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section id="beranda" className="pt-32 pb-20 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Kiri: Copywriting & Scenarios */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Smart Campus Service Navigator
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Temukan Jalur Layanan Kampus yang Tepat <br/>
              <span className="relative inline-block text-rose-600 mt-2">
                dalam Satu Pintu
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-rose-200" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/></svg>
              </span>
            </h1>
            
            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-xl">
              CampusCare AI membantu mahasiswa, dosen, dan pegawai menemukan kanal layanan kampus yang sesuai hanya dengan menjelaskan kebutuhan atau masalahnya.
            </p>

            {/* Quick Scenario Chips */}
            <div className="mb-10">
              <p className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Search className="h-4 w-4 text-teal-600" /> Coba skenario pencarian:
              </p>
              <div className="flex flex-wrap gap-2">
                {scenarios.map((sc, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveScenario(idx)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                      activeScenario === idx 
                      ? "bg-slate-900 text-white border-slate-900 shadow-md transform scale-105" 
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="#pilih-role" className="w-full sm:w-auto text-center bg-rose-600 hover:bg-rose-700 text-white px-8 py-3.5 rounded-full text-base font-bold transition-all shadow-[0_4px_15px_rgba(225,29,72,0.3)] hover:shadow-[0_6px_20px_rgba(225,29,72,0.4)]">
                Pilih Role Pengguna
              </a>
              <a href="#cara-kerja" className="w-full sm:w-auto text-center bg-white hover:bg-slate-50 text-slate-700 px-8 py-3.5 rounded-full text-base font-bold transition-all border border-slate-200">
                Lihat Cara Kerja
              </a>
            </div>

            <div className="mt-8 flex items-center gap-6 text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500"/> Untuk Mahasiswa</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500"/> Untuk Dosen</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500"/> Untuk Pegawai</span>
            </div>
          </div>

          {/* Kanan: Mockup Navigator Concept */}
          <div className="relative z-10 w-full lg:h-[600px] flex flex-col items-center justify-center mt-12 lg:mt-0 overflow-visible">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-rose-50 rounded-full blur-3xl opacity-60 z-0 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-slate-200/50 rounded-full border-dashed animate-[spin_60s_linear_infinite] z-0 pointer-events-none"></div>
            
            {/* Inner Desktop Wrapper to hold relative cards safely */}
            <div className="relative z-20 w-[340px] flex flex-col items-center">
              
              {/* 3 Floating Info Cards (Desktop) */}
              <div className="hidden xl:flex absolute right-full mr-6 top-8 bg-white p-3 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-100 items-center gap-3 animate-[bounce_5s_ease-in-out_infinite] z-30 w-40">
                <div className="h-8 w-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0"><Cpu className="h-4 w-4"/></div>
                <div>
                  <p className="text-[11px] font-bold text-slate-900 leading-tight">AI Navigator</p>
                  <p className="text-[9px] text-slate-500 leading-tight mt-0.5">Memahami konteks</p>
                </div>
              </div>

              <div className="hidden xl:flex absolute left-full ml-6 top-1/3 bg-white p-3 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-100 items-center gap-3 animate-[bounce_6s_ease-in-out_infinite_reverse] z-30 w-44">
                <div className="h-8 w-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0"><ShieldCheck className="h-4 w-4"/></div>
                <div>
                  <p className="text-[11px] font-bold text-slate-900 leading-tight">Rekomendasi Tepat</p>
                  <p className="text-[9px] text-slate-500 leading-tight mt-0.5">Ke unit resmi</p>
                </div>
              </div>

              <div className="hidden xl:flex absolute right-full mr-4 bottom-10 bg-white p-3 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-100 items-center gap-3 animate-[bounce_7s_ease-in-out_infinite] z-30 w-44">
                <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0"><Send className="h-4 w-4"/></div>
                <div>
                  <p className="text-[11px] font-bold text-slate-900 leading-tight">Draft Otomatis</p>
                  <p className="text-[9px] text-slate-500 leading-tight mt-0.5">Laporan terstruktur</p>
                </div>
              </div>

              {/* Central Mockup: Maps/Route Concept */}
              <div className="bg-white w-full rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.1)] border border-slate-200 overflow-hidden relative z-20">
                <div className="h-10 bg-slate-900 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-rose-500"></div>
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500"></div>
                    <div className="h-2.5 w-2.5 rounded-full bg-teal-500"></div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono ml-4">CampusCare AI Route</span>
                </div>
                
                <div className="p-5 space-y-5 bg-[#F8FAFC]">
                  
                  {/* Masalah (Input) */}
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-slate-600" />
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-sm border border-slate-200 shadow-xs">
                      <p className="text-xs font-medium text-slate-700">{currentScenario.masalah}</p>
                    </div>
                  </div>

                  {/* Routing Visualization */}
                  <div className="pl-4 ml-4 border-l-2 border-dashed border-teal-200 py-1 space-y-4">
                    {/* Step 1: Kategori */}
                    <div className="relative">
                      <div className="absolute -left-[23px] top-1/2 -translate-y-1/2 h-3 w-3 bg-white border-2 border-teal-500 rounded-full"></div>
                      <div className="bg-white px-3 py-2 rounded-lg border border-teal-100 shadow-xs inline-flex items-center gap-2">
                        <LayoutDashboard className="h-3 w-3 text-teal-600" />
                        <span className="text-[10px] font-bold text-slate-700">Kategori: {currentScenario.kategori}</span>
                      </div>
                    </div>
                    {/* Step 2: Unit */}
                    <div className="relative">
                      <div className="absolute -left-[23px] top-1/2 -translate-y-1/2 h-3 w-3 bg-white border-2 border-teal-500 rounded-full"></div>
                      <div className="bg-white px-3 py-2 rounded-lg border border-teal-100 shadow-xs inline-flex items-center gap-2">
                        <Shield className="h-3 w-3 text-teal-600" />
                        <span className="text-[10px] font-bold text-slate-700">Unit: {currentScenario.unit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Final Recommendation Card */}
                  <div className="bg-teal-900 p-4 rounded-xl shadow-lg relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 opacity-10">
                      <Compass className="h-20 w-20 text-white" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-teal-400" />
                      <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider">Rute Ditemukan</span>
                    </div>
                    <p className="text-sm font-bold text-white leading-snug mb-3">
                      {currentScenario.panduan}
                    </p>
                    <button className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer">
                      Lihat Panduan Penuh
                    </button>
                  </div>

                </div>
              </div>
            </div>
            
            {/* 3 Floating Info Cards (Tablet & Mobile Fallback Stack) */}
            <div className="flex xl:hidden grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 relative z-30 w-full max-w-lg mx-auto">
              <div className="bg-white p-3 rounded-xl shadow-md border border-slate-100 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0"><Cpu className="h-4 w-4"/></div>
                <div>
                  <p className="text-[11px] font-bold text-slate-900 leading-tight">AI Navigator</p>
                  <p className="text-[9px] text-slate-500 leading-tight">Memahami konteks</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl shadow-md border border-slate-100 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0"><ShieldCheck className="h-4 w-4"/></div>
                <div>
                  <p className="text-[11px] font-bold text-slate-900 leading-tight">Rekomendasi Tepat</p>
                  <p className="text-[9px] text-slate-500 leading-tight">Ke unit resmi</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl shadow-md border border-slate-100 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0"><Send className="h-4 w-4"/></div>
                <div>
                  <p className="text-[11px] font-bold text-slate-900 leading-tight">Draft Otomatis</p>
                  <p className="text-[9px] text-slate-500 leading-tight">Laporan terstruktur</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Section Role Selection */}
      <section id="pilih-role" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Pilih Role Pengguna</h2>
            <p className="text-slate-500 text-lg">Pilih peran Anda di kampus agar sistem dapat menyaring layanan dan memberikan rekomendasi prosedur yang paling relevan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mahasiswa */}
            <div className="group bg-white rounded-3xl p-8 border border-slate-200 hover:border-rose-300 shadow-sm hover:shadow-[0_15px_40px_rgba(225,29,72,0.08)] transition-all relative overflow-hidden flex flex-col">
              <div className="h-14 w-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-6 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <GraduationCap className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Mahasiswa</h3>
              <p className="text-sm text-slate-500 mb-8 flex-1">Panduan alur akademik, keuangan, dan fasilitas mahasiswa.</p>
              
              <div className="space-y-3 mb-8">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Layanan Populer:</p>
                <div className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5"></div><p className="text-xs text-slate-700 font-medium">Akademik & surat aktif kuliah</p></div>
                <div className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5"></div><p className="text-xs text-slate-700 font-medium">SSO, iGracias, dan Akun MyTelU</p></div>
                <div className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5"></div><p className="text-xs text-slate-700 font-medium">Keuangan, LMS, & Open Library</p></div>
              </div>
              
              <button onClick={() => onSelectRole("mahasiswa")} className="w-full py-3.5 rounded-xl bg-slate-50 group-hover:bg-rose-600 text-slate-700 group-hover:text-white font-bold text-sm transition-colors border border-slate-200 group-hover:border-rose-600">
                Masuk sebagai Mahasiswa
              </button>
            </div>

            {/* Dosen */}
            <div className="group bg-white rounded-3xl p-8 border border-slate-200 hover:border-teal-300 shadow-sm hover:shadow-[0_15px_40px_rgba(20,184,166,0.08)] transition-all relative overflow-hidden flex flex-col">
              <div className="h-14 w-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <BookOpen className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Dosen</h3>
              <p className="text-sm text-slate-500 mb-8 flex-1">Navigasi sistem pengajaran, penelitian, dan administrasi dosen.</p>
              
              <div className="space-y-3 mb-8">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Layanan Populer:</p>
                <div className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5"></div><p className="text-xs text-slate-700 font-medium">LMS/CeLOE dan modul kelas</p></div>
                <div className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5"></div><p className="text-xs text-slate-700 font-medium">Sistem akademik dan presensi</p></div>
                <div className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5"></div><p className="text-xs text-slate-700 font-medium">Penelitian, pengabdian, fasilitas</p></div>
              </div>
              
              <button onClick={() => onSelectRole("dosen")} className="w-full py-3.5 rounded-xl bg-slate-50 group-hover:bg-teal-600 text-slate-700 group-hover:text-white font-bold text-sm transition-colors border border-slate-200 group-hover:border-teal-600">
                Masuk sebagai Dosen
              </button>
            </div>

            {/* Pegawai Kampus */}
            <div className="group bg-white rounded-3xl p-8 border border-slate-200 hover:border-amber-300 shadow-sm hover:shadow-[0_15px_40px_rgba(245,158,11,0.08)] transition-all relative overflow-hidden flex flex-col">
              <div className="h-14 w-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Pegawai Kampus</h3>
              <p className="text-sm text-slate-500 mb-8 flex-1">Akses cepat ke dukungan operasional IT, logistik, dan HR.</p>
              
              <div className="space-y-3 mb-8">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Layanan Populer:</p>
                <div className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5"></div><p className="text-xs text-slate-700 font-medium">Administrasi internal & surat tugas</p></div>
                <div className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5"></div><p className="text-xs text-slate-700 font-medium">IT Support, logistik, dan fasilitas</p></div>
                <div className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5"></div><p className="text-xs text-slate-700 font-medium">Insight layanan & knowledge base</p></div>
              </div>
              
              <button onClick={() => onSelectRole("pegawai")} className="w-full py-3.5 rounded-xl bg-slate-50 group-hover:bg-amber-500 text-slate-700 group-hover:text-white font-bold text-sm transition-colors border border-slate-200 group-hover:border-amber-500">
                Masuk sebagai Pegawai
              </button>
            </div>
          </div>
          
          {lastRole && (
             <div className="mt-12 text-center">
               <p className="text-sm text-slate-500 mb-3">Melanjutkan sesi sebelumnya?</p>
               <button 
                onClick={() => onSelectRole(lastRole)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors border border-slate-300"
               >
                 Masuk Kembali sebagai <span className="capitalize text-rose-600">{lastRole}</span> <ArrowRight className="h-4 w-4" />
               </button>
             </div>
          )}
        </div>
      </section>

      {/* 4. Section Cara Kerja */}
      <section id="cara-kerja" className="py-24 bg-[#F8FAFC] border-y border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Bagaimana CampusCare Bekerja?</h2>
            <p className="text-slate-500 text-lg">Mulai dari masalah, bukan dari mencari menu. Biarkan AI yang menavigasi rutenya untuk Anda.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: "01", icon: Users, title: "Pilih Role", desc: "Sistem menyesuaikan rekomendasi unit layanan berdasarkan peran Anda di kampus." },
              { num: "02", icon: MessageSquare, title: "Jelaskan Masalah", desc: "Ketikkan kendala Anda dengan bahasa sehari-hari. AI memahami konteksnya." },
              { num: "03", icon: Compass, title: "Dapatkan Rekomendasi", desc: "AI menemukan kategori dan unit layanan resmi yang tepat untuk menangani masalah Anda." },
              { num: "04", icon: FileText, title: "Ikuti Panduan", desc: "Baca panduan langkah demi langkah atau buat draft tiket laporan secara otomatis." }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                {/* Connector Line (Desktop only) */}
                {idx < 3 && <div className="hidden lg:block absolute top-8 left-1/2 w-full border-t-2 border-dashed border-slate-300 z-0"></div>}
                
                <div className="bg-white relative z-10 w-16 h-16 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mx-auto mb-6">
                  <step.icon className="h-7 w-7 text-rose-600" />
                  <span className="absolute -top-3 -right-3 bg-slate-900 text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                    {step.num}
                  </span>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Section "Bukan Sekadar Chatbot" & Admin Preview */}
      <section id="fitur" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Kiri: Copywriting & Value Cards */}
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Bukan Sekadar Chatbot Biasa.</h2>
              <p className="text-slate-500 text-lg mb-10">CampusCare AI bukan pengganti layanan resmi kampus. Kami adalah navigator awal yang membantu civitas menemukan jalur yang tepat dan membantu pengelola melihat masalah secara transparan.</p>
              
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">Smart Service Navigator</h4>
                    <p className="text-sm text-slate-500">Mengarahkan masalah yang rumit ke unit pelayanan yang relevan beserta panduan resminya.</p>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">AI Draft Ticket Generator</h4>
                    <p className="text-sm text-slate-500">Membuat draf pelaporan masalah dengan format yang rapi sebelum disubmit ke Helpdesk.</p>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex gap-4 shadow-lg transform -translate-x-2">
                  <div className="h-10 w-10 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(225,29,72,0.5)]">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">Insight Dashboard Pengelola</h4>
                    <p className="text-sm text-slate-400">Deteksi pola keluhan dan temukan area layanan yang butuh peningkatan secara real-time.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kanan: Admin Preview Mockup */}
            <div className="bg-[#0B1120] rounded-3xl p-6 shadow-2xl border border-slate-800 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4 text-rose-500" />
                  <span className="text-sm font-bold text-white">Insight Admin Preview</span>
                </div>
                <span className="px-2 py-1 bg-slate-800 rounded text-[10px] text-slate-400">Live Data</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <p className="text-[10px] font-semibold text-slate-400 mb-1">Total Pertanyaan</p>
                  <p className="text-2xl font-bold text-white">1.248</p>
                  <p className="text-[10px] text-emerald-400 mt-1 flex items-center"><TrendingUp className="h-3 w-3 mr-1"/> +12%</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <p className="text-[10px] font-semibold text-slate-400 mb-1">Top Kategori</p>
                  <p className="text-base font-bold text-white mt-1">Akun & SSO</p>
                  <p className="text-[10px] text-rose-400 mt-1">521 Hits</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-900/40 to-slate-900 p-4 rounded-xl border border-teal-500/20 relative overflow-hidden">
                 <Sparkles className="absolute -right-2 -bottom-2 h-16 w-16 text-teal-500/10" />
                 <h4 className="text-[10px] font-bold text-teal-400 mb-2 flex items-center gap-1">
                   <Sparkles className="h-3 w-3" /> AI Insight
                 </h4>
                 <p className="text-xs text-slate-300 leading-relaxed">
                   Keluhan <span className="text-white font-semibold">LMS/CeLOE</span> didominasi oleh Dosen terkait sinkronisasi absen. Rekomendasi: Buat panduan cepat sinkronisasi kelas.
                 </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="py-10 bg-white border-t border-slate-200 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm font-bold text-slate-900 mb-2">
            CampusCare <span className="text-rose-600">AI</span>
          </p>
          <p className="text-xs text-slate-500">
            © 2026 CampusCare AI — Satu Pintu untuk Menemukan Layanan Kampus yang Tepat.
          </p>
        </div>
      </footer>

    </div>
  );
}
