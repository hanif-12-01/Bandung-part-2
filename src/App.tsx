import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Beranda from "./components/Beranda";
import CariLayanan from "./components/CariLayanan";
import GuidelineDetail from "./components/GuidelineDetail";
import AIKonsultasi from "./components/AIKonsultasi";
import BuatDraftLaporan from "./components/BuatDraftLaporan";
import InsightDashboard from "./components/InsightDashboard";

import { CampusService, Message, DraftReport, CampusProblem } from "./types";
import { INITIAL_SERVICES, INITIAL_PROBLEMS } from "./data";

export default function App() {
  
  // App routing state
  const [currentTab, setCurrentTab] = useState<string>("home");
  
  // Content states
  const [services, setServices] = useState<CampusService[]>(INITIAL_SERVICES);
  const [selectedService, setSelectedService] = useState<CampusService | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>("Semua");
  
  // prefilled values for writing draft
  const [prefilledService, setPrefilledService] = useState<CampusService | null>(null);

  // Saved Drafts local states
  const [savedDrafts, setSavedDrafts] = useState<DraftReport[]>(() => {
    const saved = localStorage.getItem("campus_care_saved_drafts");
    return saved ? JSON.parse(saved) : [];
  });

  // Incident problem bank state
  const [problems, setProblems] = useState<CampusProblem[]>(() => {
    const saved = localStorage.getItem("campus_care_saved_problems");
    return saved ? JSON.parse(saved) : INITIAL_PROBLEMS;
  });

  // AI Consultation Messages logs
  const [messages, setMessages] = useState<Message[]>(() => {
    return [
      {
        id: "msg-welcome",
        sender: "ai",
        text: "Halo! Selamat datang di CampusCare AI, Navigator Layanan Kampus Terpadu.\n\nSaya asisten kecerdasan buatan bentukan Pusat Sistem Informasi Universitas yang siap membantu Anda dalam:\n1. Mencari alur & berkas resmi pengurusan surat aktif, KRS, UKT, atau SSO.\n2. Berdiskusi interaktif menuntaskan isu teknis portal kuliah.\n3. Menyusun draf email keluhan / surat permohonan akademis formal secara otomatis.\n\nAda kendala sistem atau administrasi sekolah yang bisa saya bantu arahkan hari ini?",
        timestamp: new Date()
      }
    ];
  });
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  // Persist storage updates
  useEffect(() => {
    localStorage.setItem("campus_care_saved_drafts", JSON.stringify(savedDrafts));
  }, [savedDrafts]);

  useEffect(() => {
    localStorage.setItem("campus_care_saved_problems", JSON.stringify(problems));
  }, [problems]);

  // Handle addition of problem log to Bank
  const handleAddProblem = (title: string, category: string) => {
    const newProb: CampusProblem = {
      id: "p-new-" + Math.random().toString(36).substring(2, 7),
      title,
      reportedCount: 1,
      status: "Dalam Peninjauan",
      category
    };
    setProblems((prev) => [newProb, ...prev]);
  };

  // Chat message submit connector calling Express Server
  const handleSendMessage = async (text: string) => {
    // 1. Add user message
    const userMsg: Message = {
      id: "msg-u-" + Date.now(),
      sender: "user",
      text,
      timestamp: new Date()
    };
    
    const updatedMsgs = [...messages, userMsg];
    setMessages(updatedMsgs);
    setIsChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMsgs })
      });

      if (!response.ok) {
        throw new Error("Gagal terhubung dengan server pengolah AI");
      }

      const data = await response.json();
      const aiMsg: Message = {
        id: "msg-ai-" + Date.now(),
        sender: "ai",
        text: data.text,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errMsg: Message = {
        id: "msg-ai-err-" + Date.now(),
        sender: "ai",
        text: "Koneksi asisten AI kami sedang mengalami pemeliharaan interkonektivitas lokal. Sembari menunggu pulih, Anda dapat menggunakan tombol manual borang laporan di tab 'Buat Draft' untuk mempersiapkan berkas secara langsung.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "msg-welcome-clear",
        sender: "ai",
        text: "Riwayat percakapan telah dibersihkan. Hubungi saya kembali jika Anda membutuhkan navigasi alur akademik atau pembentukan draf laporan AI baru.",
        timestamp: new Date()
      }
    ]);
  };

  // Navigation handlers
  const handleSelectService = (service: CampusService) => {
    setSelectedService(service);
    setCurrentTab("guideline");
  };

  const handleNavigateToDraft = (service: CampusService) => {
    setPrefilledService(service);
    setCurrentTab("drafter");
  };

  // Saved draft list controllers
  const handleSaveDraft = (draft: DraftReport) => {
    setSavedDrafts((prev) => [draft, ...prev.filter((d) => d.generatedLetter !== d.generatedLetter)]);
  };

  const handleDeleteDraft = (id: string) => {
    setSavedDrafts((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-gray-50/20 text-gray-900 font-sans selection:bg-teal-100 selection:text-teal-900 flex flex-col">
      {/* Universal Sticky Header Navigation */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          // Clean selection states if leaving sub-detail views
          if (tab !== "guideline") setSelectedService(null);
        }}
        onTanyaAI={() => {
          setCurrentTab("chat");
          setSelectedService(null);
        }}
      />

      {/* Main Container Views Wrapper */}
      <main id="app-viewport" className="flex-1 pb-10">
        
        {currentTab === "home" && (
          <Beranda
            services={services}
            onTabChange={setCurrentTab}
            onSelectCategory={(cat) => {
              setSelectedFilterCategory(cat);
              setSearchQuery("");
            }}
            onSearchQuery={setSearchQuery}
            onSelectService={handleSelectService}
          />
        )}

        {currentTab === "browse" && (
          <CariLayanan
            services={services}
            filterCategory={selectedFilterCategory}
            searchQuery={searchQuery}
            onSelectCategory={setSelectedFilterCategory}
            onSearchQuery={setSearchQuery}
            onSelectService={handleSelectService}
            onTabChange={setCurrentTab}
          />
        )}

        {currentTab === "guideline" && selectedService && (
          <GuidelineDetail
            service={selectedService}
            onBack={() => {
              setCurrentTab("browse");
              setSelectedService(null);
            }}
            onNavigateToDraft={handleNavigateToDraft}
          />
        )}

        {currentTab === "chat" && (
          <AIKonsultasi
            services={services}
            messages={messages}
            isLoading={isChatLoading}
            onSendMessage={handleSendMessage}
            onClearChat={handleClearChat}
            onNavigateToDraft={handleNavigateToDraft}
          />
        )}

        {currentTab === "drafter" && (
          <BuatDraftLaporan
            services={services}
            prefilledService={prefilledService}
            savedDrafts={savedDrafts}
            onSaveDraft={handleSaveDraft}
            onDeleteDraft={handleDeleteDraft}
          />
        )}

        {currentTab === "insight" && (
          <InsightDashboard
            services={services}
            problems={problems}
            onAddProblem={handleAddProblem}
          />
        )}

      </main>

      {/* Footer Navigation Credits */}
      <footer id="footer-container" className="mt-auto py-8 bg-white border-t border-gray-150 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p id="footer-logo" className="text-sm font-bold text-gray-800">
            CampusCare <span className="text-teal-600">AI</span>
          </p>
          <p id="footer-credits" className="text-xs text-gray-400 mt-2">
            © {new Date().getFullYear()} Universitas Cerdas Indonesia. Pusat Layanan Teknologi Informasi & Administrasi Akademik Terpadu.
          </p>
        </div>
      </footer>
    </div>
  );
}
