import React from "react";
import { GraduationCap, Search, MessageSquare, FilePenLine, BarChart3 } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onTanyaAI: () => void;
}

export default function Header({ currentTab, onTabChange, onTanyaAI }: HeaderProps) {
  const navItems = [
    { id: "home", label: "BERANDA", icon: GraduationCap },
    { id: "browse", label: "CARI LAYANAN", icon: Search },
    { id: "chat", label: "KONSULTASI AI", icon: MessageSquare },
    { id: "drafter", label: "BUAT DRAFT", icon: FilePenLine },
    { id: "insight", label: "INSIGHT ANALITIK", icon: BarChart3 }
  ];

  return (
    <header id="app-header" className="sticky top-0 z-50 w-full border-b border-[#1a1a1a] bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div 
          id="logo-container" 
          className="flex cursor-pointer items-center space-x-3 transition-opacity hover:opacity-90"
          onClick={() => onTabChange("home")}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-none bg-[#111] border border-[#ff4d00]/40 text-[#ff4d00] shadow-xs">
            <GraduationCap id="logo-icon" className="h-6 w-6" />
          </div>
          <div>
            <h1 id="app-title" className="text-xl font-bold tracking-tighter text-[#f2f2f2] uppercase">
              CAMPUS_CARE <span className="text-[#ff4d00]">_AI</span>
            </h1>
            <p id="app-subtitle" className="text-[9px] font-mono tracking-[0.25em] text-[#666] uppercase">
              STUDIO_AESTHETIC // NAV
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 text-xs font-mono tracking-widest transition-all rounded-none border ${
                  isActive
                    ? "bg-[#111] text-[#ff4d00] border-[#ff4d00]/40 shadow-xs"
                    : "text-[#888] border-transparent hover:text-[#fff] hover:bg-[#111]/50"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-[#ff4d00]" : "text-[#555]"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div id="header-action" className="flex items-center space-x-4">
          <button
            id="tanya-ai-btn"
            onClick={onTanyaAI}
            className="group relative inline-flex items-center justify-center rounded-none bg-[#ff4d00] p-[1px] text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-white shadow-xs hover:bg-white active:scale-95 transition-all outline-hidden cursor-pointer whitespace-nowrap"
          >
            <span className="flex items-center gap-2 bg-[#0a0a0a] px-4 py-2.5 transition-all group-hover:bg-[#ff4d00] group-hover:text-black">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffbb00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff4d00]/80"></span>
              </span>
              TANYA AI NAVIGATOR
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Sticky Rail */}
      <div id="mobile-nav" className="md:hidden border-t border-[#1a1a1a] bg-[#0a0a0a] grid grid-cols-5 text-center px-1 py-1 shadow-xs">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center py-2 text-[8px] font-mono tracking-wider uppercase transition-all ${
                isActive ? "text-[#ff4d00] bg-[#111]" : "text-[#777] hover:text-[#bbb]"
              }`}
            >
              <Icon className="h-4.5 w-4.5 mb-1" />
              <span>{item.label.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}

