import React from "react";
import { Home, Search, Sparkles, History, BarChart3, Menu, X, ArrowRightLeft } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onTanyaAI: () => void;
  userRole: "mahasiswa" | "dosen" | "pegawai" | null;
  onLogoutRole: () => void;
}

export default function Header({ currentTab, onTabChange, onTanyaAI, userRole, onLogoutRole }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: "home", label: "Beranda", icon: Home },
    { id: "browse", label: "Cari Layanan", icon: Search },
    { id: "chat", label: "AI Navigator", icon: Sparkles },
    { id: "history", label: "Riwayat", icon: History },
    ...(userRole === "pegawai" ? [{ id: "insight", label: "Insight Admin", icon: BarChart3 }] : [])
  ];

  const handleNavClick = (tabId: string) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header id="app-header" className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Section */}
        <div 
          id="logo-container" 
          className="flex cursor-pointer items-center space-x-2.5 transition-opacity hover:opacity-90"
          onClick={() => handleNavClick("home")}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 border border-rose-100 text-rose-700 shadow-xs">
            <Sparkles id="logo-icon" className="h-5 w-5" />
          </div>
          <div>
            <h1 id="app-title" className="text-lg font-extrabold tracking-tight text-slate-900">
              CampusCare <span className="text-rose-700 font-bold">AI</span>
            </h1>
            <p id="app-subtitle" className="text-[10px] font-medium tracking-wide text-slate-500">
              Navigator Layanan Kampus
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id || (item.id === "chat" && currentTab === "chat") || (item.id === "history" && currentTab === "drafter");
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-all rounded-lg border ${
                  isActive
                    ? "bg-rose-50/60 text-rose-700 border-rose-100/50"
                    : "text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${isActive ? "text-rose-700" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div id="header-action" className="flex items-center space-x-2 sm:space-x-3">
          {userRole && (
            <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="capitalize">{userRole === 'pegawai' ? 'Pegawai Kampus' : userRole}</span>
            </div>
          )}

          <button
            onClick={onLogoutRole}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer shadow-xs"
          >
            <ArrowRightLeft className="h-3.5 w-3.5 text-slate-400" />
            <span>Ganti Role</span>
          </button>

          <button
            id="tanya-ai-btn"
            onClick={onTanyaAI}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-rose-700 px-4.5 py-2 text-xs font-semibold text-white shadow-md hover:bg-rose-800 active:scale-95 transition-all outline-hidden cursor-pointer whitespace-nowrap"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-200"></span>
            </span>
            Tanya AI Navigator
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex md:hidden items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/80 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Expandable) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 shadow-md">
          {userRole && (
            <div className="flex items-center justify-between px-4 py-2 mb-2 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-xs text-slate-500 font-medium">Role Aktif</span>
              <span className="text-xs font-bold text-slate-700 capitalize bg-white px-2 py-0.5 rounded-md border border-slate-200">
                {userRole === 'pegawai' ? 'Pegawai Kampus' : userRole}
              </span>
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id || (item.id === "chat" && currentTab === "chat") || (item.id === "history" && currentTab === "drafter");
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex w-full items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-rose-50 text-rose-700 border-l-4 border-rose-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-rose-700" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div className="pt-2 border-t border-slate-100 flex flex-col space-y-2">
            <button
              onClick={() => {
                onTanyaAI();
                setMobileMenuOpen(false);
              }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-rose-700 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-rose-800 transition-all cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              Tanya AI Navigator
            </button>
            <button
              onClick={() => {
                onLogoutRole();
                setMobileMenuOpen(false);
              }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <ArrowRightLeft className="h-4 w-4 text-slate-400" />
              Ganti Role
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
