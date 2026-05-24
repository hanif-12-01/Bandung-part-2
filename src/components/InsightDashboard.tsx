import React, { useState } from "react";
import { 
  TrendingUp, CircleHelp, FileText, Compass, CirclePlus, Sparkles, 
  Search, Bell, ChevronDown, User, LayoutDashboard, MessageSquare, 
  History, Settings, Download, Zap, BookOpen, AlertCircle, ShieldCheck,
  CheckCircle2, AlertTriangle, Lightbulb
} from "lucide-react";
import { CampusProblem, CampusService } from "../types";

interface InsightDashboardProps {
  services: CampusService[];
  problems: CampusProblem[];
  onAddProblem: (title: string, category: string) => void;
  onTabChange?: (tab: string) => void;
  userRole?: string | null;
}

export default function InsightDashboard({ services, problems, onAddProblem, onTabChange, userRole }: InsightDashboardProps) {
  
  const [activeMenu, setActiveMenu] = useState("Insight Admin");
  const [filterRole, setFilterRole] = useState("Semua");
  const [filterPeriod, setFilterPeriod] = useState("Bulan Ini");
  
  // Custom interactive tooltip state for the bar chart
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  
  const [newTitle, setNewTitle] = useState("");
  const [newCat, setNewCat] = useState("Akademik");

  const statCards = [
    { title: "Total Pertanyaan", val: "1.248", change: "+12% dari minggu lalu", changeType: "positive", icon: MessageSquare, color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20", trend: "M0,15 L5,10 L10,12 L15,5 L20,8 L25,2" },
    { title: "Draft Laporan Dibuat", val: "318", change: "+5% dari minggu lalu", changeType: "positive", icon: FileText, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20", trend: "M0,15 L5,12 L10,14 L15,8 L20,9 L25,3" },
    { title: "Rekomendasi Berhasil", val: "962", change: "+18% dari minggu lalu", changeType: "positive", icon: ShieldCheck, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", trend: "M0,20 L5,15 L10,15 L15,8 L20,5 L25,0" },
    { title: "Rata-rata Waktu", val: "2m 15s", change: "-10s lebih cepat", changeType: "positive", icon: Zap, color: "text-teal-400", bg: "bg-teal-400/10", border: "border-teal-400/20", trend: "M0,5 L5,8 L10,6 L15,12 L20,10 L25,18" }
  ];

  const barData = [
    { label: "Akun & SSO", count: 521, limit: 600 },
    { label: "Akademik", count: 452, limit: 600 },
    { label: "LMS/CeLOE", count: 387, limit: 600 },
    { label: "Keuangan", count: 298, limit: 600 },
    { label: "IT & Jaringan", count: 189, limit: 600 },
    { label: "Fasilitas", count: 124, limit: 600 }
  ];

  const heatmapData = [
    { label: "Akun & SSO", intensity: "Tinggi", color: "bg-rose-600", val: 92 },
    { label: "Akademik", intensity: "Tinggi", color: "bg-rose-500", val: 85 },
    { label: "LMS/CeLOE", intensity: "Sedang", color: "bg-amber-500", val: 65 },
    { label: "Keuangan", intensity: "Sedang", color: "bg-amber-500", val: 58 },
    { label: "Fasilitas", intensity: "Sedang", color: "bg-amber-400", val: 45 },
    { label: "Open Library", intensity: "Rendah", color: "bg-teal-600", val: 20 },
  ];

  const topServices = [
    { name: "Kendala Login SSO", cat: "Akun & IT", role: "Mahasiswa", count: 342, priority: "Tinggi", rec: "Perjelas panduan reset akun" },
    { name: "Surat Aktif Kuliah", cat: "Akademik", role: "Mahasiswa", count: 215, priority: "Tinggi", rec: "Tambahkan checklist dokumen" },
    { name: "Kendala LMS/CeLOE", cat: "Pembelajaran", role: "Dosen/Mhs", count: 178, priority: "Sedang", rec: "Tambahkan kanal bantuan cepat" },
    { name: "Pembayaran UKT", cat: "Keuangan", role: "Mahasiswa", count: 141, priority: "Sedang", rec: "Tambahkan panduan pembayaran" },
    { name: "Peminjaman Ruangan", cat: "Fasilitas", role: "Dosen/Pegawai", count: 97, priority: "Sedang", rec: "Tampilkan alur peminjaman" }
  ];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      onAddProblem(newTitle, newCat);
      setNewTitle("");
    }
  };

  const handleNavigation = (tabName: string) => {
    setActiveMenu(tabName);
    if (onTabChange) {
      if (tabName === "Beranda") onTabChange("home");
      else if (tabName === "AI Navigator") onTabChange("chat");
      else if (tabName === "Cari Layanan") onTabChange("browse");
      else if (tabName === "Draft Laporan") onTabChange("drafter");
      else if (tabName === "Riwayat") onTabChange("history");
      else if (tabName === "Insight Admin") onTabChange("insight");
      else if (tabName === "Problem Bank") onTabChange("insight");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0B1120] text-slate-200 font-sans selection:bg-rose-500/30">
      
      {/* 1. Sidebar */}
      <aside className="w-64 bg-[#0F172A] border-r border-slate-800 flex flex-col z-20 shrink-0">
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.4)]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-white">
                CampusCare <span className="text-rose-500">AI</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 custom-scrollbar">
          <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3">Main Menu</p>
          {[
            { name: "Beranda", icon: LayoutDashboard },
            { name: "AI Navigator", icon: Sparkles },
            { name: "Cari Layanan", icon: Search },
            { name: "Draft Laporan", icon: FileText },
            { name: "Riwayat", icon: History },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeMenu === item.name 
                  ? "bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[inset_0_0_10px_rgba(225,29,72,0.05)]" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </button>
          ))}

          <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-8 mb-3">Admin Panel</p>
          {[
            { name: "Insight Admin", icon: TrendingUp },
            { name: "Problem Bank", icon: AlertCircle },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeMenu === item.name 
                  ? "bg-teal-500/10 text-teal-400 border border-teal-500/20 shadow-[inset_0_0_10px_rgba(20,184,166,0.05)]" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Glow Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-rose-500/5 blur-[100px] pointer-events-none"></div>

        {/* 2. Top Bar */}
        <header className="h-20 bg-[#0F172A]/80 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between px-8 z-10 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-white">Insight Layanan Kampus</h2>
            <p className="text-xs text-slate-400 mt-0.5">Pantau pola kebutuhan layanan civitas secara real-time</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Cari kategori layanan..." 
                className="w-64 bg-slate-900/50 border border-slate-700 rounded-full py-2 pl-9 pr-4 text-xs text-white focus:outline-hidden focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all placeholder:text-slate-500"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <select 
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="bg-slate-900/50 border border-slate-700 rounded-full py-2 px-3 text-xs text-slate-300 focus:outline-hidden appearance-none cursor-pointer"
              >
                <option>Semua Role</option>
                <option>Mahasiswa</option>
                <option>Dosen</option>
                <option>Pegawai</option>
              </select>
              <select 
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                className="bg-slate-900/50 border border-slate-700 rounded-full py-2 px-3 text-xs text-slate-300 focus:outline-hidden appearance-none cursor-pointer"
              >
                <option>Hari Ini</option>
                <option>Minggu Ini</option>
                <option>Bulan Ini</option>
                <option>Semester Ini</option>
              </select>
            </div>

            <div className="h-6 w-px bg-slate-800 mx-2"></div>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-slate-400 hover:text-white transition-colors cursor-pointer">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 border-2 border-[#0F172A]"></span>
              </button>
              <div className="flex items-center gap-2 cursor-pointer bg-slate-800/50 border border-slate-700/50 py-1.5 px-3 rounded-full hover:bg-slate-800 transition-colors">
                <div className="h-6 w-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
                  <User className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-200">Admin</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar relative z-10">
          <div className="max-w-7xl mx-auto space-y-6">

            {/* Narrative 1: KPI Cards with Mini Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((card, idx) => (
                <div key={idx} className="bg-[#1E293B]/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-5 hover:bg-[#1E293B]/80 transition-all flex flex-col justify-between group relative overflow-hidden">
                  <div className={`absolute -right-6 -top-6 w-24 h-24 ${card.bg} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <p className="text-xs font-semibold text-slate-400">{card.title}</p>
                      <h4 className="text-2xl font-bold text-white mt-1">{card.val}</h4>
                    </div>
                    <div className={`p-2.5 rounded-xl border ${card.bg} ${card.border} ${card.color}`}>
                      <card.icon className="h-5 w-5" />
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between relative z-10">
                    <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                      <TrendingUp className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">{card.change.split(' ')[0]}</span>
                      <span>{card.change.split(' ').slice(1).join(' ')}</span>
                    </div>
                    {/* SVG Mini Chart Simulation */}
                    <div className="h-6 w-12 opacity-60 group-hover:opacity-100 transition-opacity">
                      <svg viewBox="0 0 25 20" className="w-full h-full overflow-visible">
                        <path d={card.trend} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={card.color.replace('text-', 'stroke-')} />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Narrative 2: Charts & Heatmap Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Main Chart: Kategori Teratas (4 cols) */}
              <div className="lg:col-span-5 bg-[#1E293B]/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-5 relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white">Kategori Teratas</h3>
                  </div>
                </div>
                
                <div className="relative h-44 flex items-end justify-between gap-2 px-1">
                  <div className="absolute left-0 bottom-0 top-0 w-full pointer-events-none flex flex-col justify-between text-[10px] text-slate-500 border-l border-slate-700/50 pl-2">
                    <div className="border-t border-slate-700/50 w-full pt-1">600</div>
                    <div className="border-t border-slate-700/50 w-full pt-1">300</div>
                    <div className="w-full pb-0.5">0</div>
                  </div>

                  {barData.slice(0, 5).map((bar, idx) => {
                    const percentageHeight = (bar.count / bar.limit) * 100;
                    const isTop = idx === 0;
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center justify-end group cursor-pointer z-10" title={`${bar.count} Queries`}>
                        <div
                          style={{ height: `${percentageHeight}%` }}
                          className={`w-full max-w-[24px] rounded-t-md transition-all duration-300 relative ${
                            isTop ? "bg-rose-500" : "bg-slate-600 hover:bg-slate-500"
                          } group-hover:brightness-125`}
                        >
                          {isTop && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-rose-300 shadow-[0_0_8px_rgba(253,164,175,0.8)] animate-pulse"></div>
                          )}
                        </div>
                        <span className="text-[9px] font-semibold text-slate-400 mt-2 text-center truncate w-full">
                          {bar.label.split(' ')[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Line Chart: Tren Mingguan (4 cols) */}
              <div className="lg:col-span-4 bg-[#1E293B]/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-5 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white">Tren Mingguan</h3>
                  <TrendingUp className="h-4 w-4 text-slate-500" />
                </div>
                
                <div className="flex-1 relative flex items-center justify-center pt-2">
                   <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="gradient-teal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,30 L15,20 L30,25 L45,10 L60,15 L75,5 L90,12 L100,0 L100,40 L0,40 Z" fill="url(#gradient-teal)" />
                    <path d="M0,30 L15,20 L30,25 L45,10 L60,15 L75,5 L90,12 L100,0" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    
                    {/* Points */}
                    <circle cx="45" cy="10" r="2" fill="#1E293B" stroke="#14b8a6" strokeWidth="1.5" />
                    <circle cx="75" cy="5" r="2" fill="#1E293B" stroke="#14b8a6" strokeWidth="1.5" />
                  </svg>
                  <div className="absolute bottom-0 w-full flex justify-between text-[9px] text-slate-500 mt-2 px-1">
                    <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span>
                  </div>
                </div>
              </div>

              {/* Donut Chart: Distribusi Role (3 cols) */}
              <div className="lg:col-span-3 bg-[#1E293B]/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-5 flex flex-col items-center justify-center">
                <h3 className="text-sm font-bold text-white mb-6 w-full text-left">Distribusi Role</h3>
                
                <div className="relative w-32 h-32 rounded-full mb-4 shadow-[0_0_20px_rgba(0,0,0,0.2)]" 
                     style={{ background: "conic-gradient(#f43f5e 0% 55%, #14b8a6 55% 85%, #f59e0b 85% 100%)" }}>
                  <div className="absolute inset-3 bg-[#1E293B] rounded-full flex flex-col items-center justify-center">
                    <span className="text-white text-lg font-bold">1.2K</span>
                    <span className="text-[9px] text-slate-400">Total</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 w-full mt-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500"></div><span className="text-slate-300">Mahasiswa</span></div>
                    <span className="font-bold text-white">55%</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-teal-500"></div><span className="text-slate-300">Dosen</span></div>
                    <span className="font-bold text-white">30%</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"></div><span className="text-slate-300">Pegawai</span></div>
                    <span className="font-bold text-white">15%</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Heatmap Row */}
            <div className="bg-[#1E293B]/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-5">
               <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white">Service Heatmap</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Area layanan prioritas berdasarkan intensitas pencarian</p>
                  </div>
                  <Compass className="h-4 w-4 text-slate-500" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 flex-1">
                  {heatmapData.map((item, idx) => (
                    <div key={idx} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 flex flex-col justify-between group hover:border-slate-500 transition-colors">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold text-slate-300">{item.label}</span>
                        <div className={`h-2 w-2 rounded-full ${item.color} shadow-[0_0_5px_currentColor]`}></div>
                      </div>
                      <div className="mt-3 flex items-end justify-between">
                        <span className="text-lg font-bold text-white">{item.val}<span className="text-[10px] text-slate-500 ml-1 font-normal">hits</span></span>
                        <span className="text-[9px] text-slate-400 font-medium">{item.intensity}</span>
                      </div>
                    </div>
                  ))}
                </div>
            </div>

            {/* Narrative 3 & 4: AI Insight & Recommendation Table */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* AI Insight & Recommendations (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* AI Insight Panel */}
                <div className="relative overflow-hidden bg-gradient-to-br from-teal-900/40 to-slate-900 border border-teal-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(20,184,166,0.05)]">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles className="h-24 w-24 text-teal-400" />
                  </div>
                  <div className="flex items-center gap-2 mb-4 relative z-10">
                    <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white tracking-wide">AI Insight</h3>
                  </div>
                  <ul className="space-y-4 relative z-10">
                    <li className="flex gap-3 items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0 shadow-[0_0_5px_currentColor]"></div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <span className="font-semibold text-white">SSO Login</span> meningkat tajam di awal semester. Pengguna banyak terjebak di loop verifikasi.
                      </p>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0 shadow-[0_0_5px_currentColor]"></div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Pencarian <span className="font-semibold text-white">Surat Aktif Kuliah</span> tinggi, mengindikasikan panduan di portal akademik kurang terlihat.
                      </p>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0 shadow-[0_0_5px_currentColor]"></div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Keluhan <span className="font-semibold text-white">LMS/CeLOE</span> didominasi oleh Dosen terkait sinkronisasi absen.
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Quick Actions Admin */}
                <div className="bg-[#1E293B]/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-400" />
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors text-slate-300 hover:text-white cursor-pointer">
                      <CirclePlus className="h-4 w-4 mb-2 text-teal-400" />
                      <span className="text-[10px] font-semibold">Tambah FAQ</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors text-slate-300 hover:text-white cursor-pointer">
                      <BookOpen className="h-4 w-4 mb-2 text-rose-400" />
                      <span className="text-[10px] font-semibold">Update Base</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors text-slate-300 hover:text-white col-span-2 cursor-pointer">
                      <Download className="h-4 w-4 mb-2 text-slate-400" />
                      <span className="text-[10px] font-semibold">Export Laporan Bulanan</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Top Service Table & Recommendations (8 cols) */}
              <div className="lg:col-span-8 bg-[#1E293B]/60 backdrop-blur-md border border-slate-700/50 rounded-2xl flex flex-col overflow-hidden">
                <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Rekomendasi Perbaikan Layanan</h3>
                    <p className="text-xs text-slate-400 mt-1">Action insight berdasarkan volume pencarian tertinggi</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-[10px] font-medium text-slate-300">
                      Sort: Prioritas
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-slate-800/30 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                        <th className="py-3 px-6">Nama Layanan</th>
                        <th className="py-3 px-4">Kategori</th>
                        <th className="py-3 px-4">Dominasi Role</th>
                        <th className="py-3 px-4">Prioritas</th>
                        <th className="py-3 px-6">Action Insight</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50 text-xs text-slate-300">
                      {topServices.map((svc, idx) => {
                        const isTinggi = svc.priority === "Tinggi";
                        return (
                          <tr key={idx} className="hover:bg-slate-800/30 transition-colors group">
                            <td className="py-4 px-6 font-semibold text-slate-200">
                              {svc.name}
                              <span className="block text-[10px] font-normal text-slate-500 mt-0.5">{svc.count} pencarian</span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="px-2 py-1 rounded border border-slate-700 bg-slate-800/80 text-[10px]">
                                {svc.cat}
                              </span>
                            </td>
                            <td className="py-4 px-4 font-medium text-slate-400">{svc.role}</td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                isTinggi ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              }`}>
                                {isTinggi ? <AlertTriangle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                                {svc.priority}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-slate-400 group-hover:text-white transition-colors">
                              <div className="flex items-center gap-2">
                                <Lightbulb className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                                {svc.rec}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Narrative 5: Campus Problem Bank */}
            <div className="bg-[#1E293B]/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Compass className="h-4 w-4 text-rose-500" />
                    Campus Problem Bank
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Ide inovasi berdasarkan kendala berulang yang dilaporkan civitas</p>
                </div>
                <button className="text-xs text-rose-400 hover:text-rose-300 font-medium transition-colors border-b border-transparent hover:border-rose-400 cursor-pointer">
                  Lihat Semua Problem &rarr;
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {problems.slice(0,3).map((prob) => (
                  <div key={prob.id} className="bg-slate-800/40 border border-slate-700 hover:border-rose-500/50 rounded-xl p-4 transition-all group flex flex-col justify-between cursor-pointer">
                    <p className="text-sm font-semibold text-slate-200 group-hover:text-white leading-snug">{prob.title}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] px-2 py-1 bg-slate-900 rounded-md text-slate-400 uppercase tracking-wider font-semibold border border-slate-700">
                        {prob.category}
                      </span>
                      <button className="text-[10px] font-bold text-teal-400 opacity-80 group-hover:opacity-100 bg-teal-400/10 px-2 py-1 rounded transition-opacity cursor-pointer border border-teal-400/20">
                        Jadikan Challenge
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
