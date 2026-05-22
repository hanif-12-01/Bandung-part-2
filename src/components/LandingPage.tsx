import React from "react";
import { GraduationCap, Presentation, Briefcase, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Compass } from "lucide-react";

interface LandingPageProps {
  onSelectRole: (role: "mahasiswa" | "dosen" | "pegawai") => void;
  lastRole?: "mahasiswa" | "dosen" | "pegawai" | null;
}

export default function LandingPage({ onSelectRole, lastRole }: LandingPageProps) {
  
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMasukLayanan = () => {
    // If there is a last role used, enter that role, otherwise default to mahasiswa
    if (lastRole) {
      onSelectRole(lastRole);
    } else {
      handleScroll("role-selection-section");
    }
  };

  return (
    <div id="landing-page-root" className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col selection:bg-rose-100 selection:text-rose-900">
      
      {/* 1. Navbar */}
      <header id="landing-navbar" className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <div 
            id="landing-logo" 
            className="flex cursor-pointer items-center space-x-2.5"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 border border-rose-100 text-rose-700 shadow-xs">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
                CampusCare <span className="text-rose-700 font-bold">AI</span>
              </h1>
              <p className="text-[10px] font-medium tracking-wide text-slate-500">
                Smart Service Navigator
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Beranda
            </button>
            <button 
              onClick={() => handleScroll("cara-kerja-section")} 
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Cara Kerja
            </button>
            <button 
              onClick={() => handleScroll("role-selection-section")} 
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Pilih Role
            </button>
          </nav>

          {/* Action Button */}
          <div>
            <button
              onClick={handleMasukLayanan}
              className="inline-flex items-center justify-center rounded-full bg-rose-700 hover:bg-rose-800 text-white px-5 py-2 text-xs font-semibold shadow-md active:scale-95 transition-all outline-hidden cursor-pointer"
            >
              {lastRole ? `Masuk sebagai ${lastRole.charAt(0).toUpperCase() + lastRole.slice(1)}` : "Masuk Layanan"}
            </button>
          </div>

        </div>
      </header>

      {/* 2. Hero Section */}
      <section id="landing-hero" className="relative overflow-hidden bg-white py-20 sm:py-32 border-b border-slate-100">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(50rem_25rem_at_top,#fff1f2,#ffffff)] opacity-80"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-4 py-1.5 text-xs font-bold text-rose-700 border border-rose-100 shadow-2xs mb-6">
            <ShieldCheck className="h-4 w-4" />
            Navigator Layanan Kampus Berbasis AI
          </span>
          
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl max-w-4xl mx-auto leading-tight">
            Temukan Layanan Kampus yang Tepat <br />
            <span className="bg-gradient-to-r from-rose-700 to-rose-500 bg-clip-text text-transparent">
              dalam Satu Pintu
            </span>
          </h2>
          
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-500 leading-relaxed">
            CampusCare AI membantu mahasiswa, dosen, dan pegawai menemukan kanal layanan kampus yang sesuai hanya dengan menjelaskan kebutuhan atau masalahnya.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleScroll("role-selection-section")}
              className="w-full sm:w-auto px-8 py-3.5 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Pilih Role Pengguna
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={() => handleScroll("cara-kerja-section")}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Lihat Cara Kerja
            </button>
          </div>

          {/* Info Banner: Google Maps concept */}
          <div className="mt-16 max-w-lg mx-auto bg-slate-50 border border-slate-200/60 p-4.5 rounded-2xl shadow-3xs flex items-center gap-3.5 text-left">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center">
              <Compass className="h-5.5 w-5.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">Bukan Sekadar Chatbot</p>
              <p className="text-[11.5px] text-slate-500 mt-0.5 leading-normal">
                CampusCare AI adalah <strong>"Google Maps untuk layanan kampus"</strong>. Kami menavigasi alur resmi, bukan mengganti sistem yang sudah ada.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Section Cara Kerja */}
      <section id="cara-kerja-section" className="py-20 bg-slate-50/50 border-b border-slate-200/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold text-rose-700 tracking-wider uppercase font-mono">Alur Sederhana</span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-2">Cara Kerja CampusCare AI</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Cukup dalam tiga langkah mudah untuk mengarahkan Anda ke solusi administrasi kampus yang resmi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-3xs text-center flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 border border-rose-100 text-rose-700 font-extrabold text-sm mb-5 shadow-3xs">
                1
              </div>
              <h4 className="text-base font-bold text-slate-900">Pilih Role Pengguna</h4>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                Tentukan apakah Anda masuk sebagai Mahasiswa, Dosen, atau Pegawai Kampus agar layanan disesuaikan secara akurat.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-3xs text-center flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 border border-teal-100 text-teal-700 font-extrabold text-sm mb-5 shadow-3xs">
                2
              </div>
              <h4 className="text-base font-bold text-slate-900">Jelaskan Kebutuhan / Masalah</h4>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                Ketik keluhan di kolom AI Navigator atau cari secara manual. AI akan menganalisis SOP dan mencocokkannya ke database.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-3xs text-center flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 border border-rose-100 text-rose-700 font-extrabold text-sm mb-5 shadow-3xs">
                3
              </div>
              <h4 className="text-base font-bold text-slate-900">Dapatkan Panduan & Laporan</h4>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                Peroleh rekomendasi unit, tata cara resmi, dan buat draf surat laporan formal siap kirim menggunakan AI.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Section Role Selection */}
      <section id="role-selection-section" className="py-20 bg-white flex-grow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-rose-700 tracking-wider uppercase font-mono">Pintu Masuk Utama</span>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-2">Pilih Role Pengguna Anda</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Silakan pilih salah satu kategori di bawah ini. Kami akan menyesuaikan rekomendasi dan kanal layanan sesuai dengan wewenang serta kebutuhan Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Mahasiswa */}
            <div className="group border border-slate-200 rounded-3xl bg-[#f8fafc]/50 hover:bg-white hover:border-rose-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 border border-rose-100 text-rose-700 shadow-sm mb-6">
                  <GraduationCap className="h-7 w-7" />
                </div>
                
                <h4 className="text-xl font-bold text-slate-900 group-hover:text-rose-700 transition-colors">Mahasiswa</h4>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                  Untuk kebutuhan akademik, keuangan, LMS, SSO, perpustakaan, kemahasiswaan, dan layanan administrasi mahasiswa.
                </p>
                
                {/* List of services */}
                <div className="mt-6 pt-6 border-t border-slate-200/60">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Contoh Layanan:</p>
                  <ul className="space-y-2.5">
                    {[
                      "Pengurusan surat aktif kuliah",
                      "Kendala SSO / iGracias / MyTelU",
                      "Pembayaran UKT atau layanan keuangan",
                      "Kendala LMS / CeLOE",
                      "Open Library dan bebas pustaka",
                      "Fasilitas, WiFi, dan layanan IT",
                      "Kemahasiswaan, event, lomba, dan karier"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => onSelectRole("mahasiswa")}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-3.5 px-4 bg-rose-700 hover:bg-rose-800 text-white text-sm font-bold rounded-xl shadow-md group-hover:shadow-lg transition-all active:scale-98 cursor-pointer"
                >
                  Masuk sebagai Mahasiswa
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Card 2: Dosen */}
            <div className="group border border-slate-200 rounded-3xl bg-[#f8fafc]/50 hover:bg-white hover:border-rose-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 border border-rose-100 text-rose-700 shadow-sm mb-6">
                  <Presentation className="h-7 w-7" />
                </div>
                
                <h4 className="text-xl font-bold text-slate-900 group-hover:text-rose-700 transition-colors">Dosen</h4>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                  Untuk kebutuhan pengajaran, LMS, akademik, penelitian, pengabdian, administrasi, dan layanan pendukung dosen.
                </p>
                
                {/* List of services */}
                <div className="mt-6 pt-6 border-t border-slate-200/60">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Contoh Layanan:</p>
                  <ul className="space-y-2.5">
                    {[
                      "Kendala LMS / CeLOE",
                      "Presensi dan pengelolaan kelas",
                      "Sistem akademik dan iGracias",
                      "Layanan IT dan akun SSO",
                      "Administrasi penelitian dan pengabdian",
                      "Peminjaman ruang atau fasilitas",
                      "Layanan SDM atau administrasi dosen"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => onSelectRole("dosen")}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-3.5 px-4 bg-slate-900 hover:bg-black text-white text-sm font-bold rounded-xl shadow-md group-hover:shadow-lg transition-all active:scale-98 cursor-pointer"
                >
                  Masuk sebagai Dosen
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Card 3: Pegawai Kampus */}
            <div className="group border border-slate-200 rounded-3xl bg-[#f8fafc]/50 hover:bg-white hover:border-rose-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 border border-rose-100 text-rose-700 shadow-sm mb-6">
                  <Briefcase className="h-7 w-7" />
                </div>
                
                <h4 className="text-xl font-bold text-slate-900 group-hover:text-rose-700 transition-colors">Pegawai Kampus</h4>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                  Untuk kebutuhan operasional, administrasi internal, IT, logistik, fasilitas, layanan unit, dan insight layanan kampus.
                </p>
                
                {/* List of services */}
                <div className="mt-6 pt-6 border-t border-slate-200/60">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Contoh Layanan:</p>
                  <ul className="space-y-2.5">
                    {[
                      "Layanan IT internal",
                      "Administrasi pegawai",
                      "Logistik dan fasilitas",
                      "Pengelolaan data layanan",
                      "Helpdesk unit",
                      "Dashboard insight layanan",
                      "Manajemen knowledge base layanan"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => onSelectRole("pegawai")}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-3.5 px-4 bg-slate-900 hover:bg-black text-white text-sm font-bold rounded-xl shadow-md group-hover:shadow-lg transition-all active:scale-98 cursor-pointer"
                >
                  Masuk sebagai Pegawai
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Footer */}
      <footer id="landing-footer" className="py-8 bg-white border-t border-slate-200/80 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-slate-800">
            CampusCare <span className="text-rose-700">AI</span>
          </p>
          <p className="text-xs text-slate-400 mt-2">
            © 2026 CampusCare AI — Satu Pintu untuk Menemukan Layanan Kampus yang Tepat.
          </p>
        </div>
      </footer>

    </div>
  );
}
