import React, { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import Beranda from "./components/Beranda";
import CariLayanan from "./components/CariLayanan";
import GuidelineDetail from "./components/GuidelineDetail";
import AIKonsultasi from "./components/AIKonsultasi";
import BuatDraftLaporan from "./components/BuatDraftLaporan";
import InsightDashboard from "./components/InsightDashboard";
import Riwayat, { ViewedGuideline } from "./components/Riwayat";
import LandingPage from "./components/LandingPage";

import { CampusService, Message, DraftReport, CampusProblem, UserInfo } from "./types";
import { INITIAL_SERVICES, INITIAL_PROBLEMS } from "./data";

export default function App() {
  
  // Current User State for Authentication
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(() => {
    const saved = localStorage.getItem("campus_care_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  // User Role State (synced with currentUser)
  const [userRole, setUserRole] = useState<"mahasiswa" | "dosen" | "pegawai" | null>(() => {
    const saved = localStorage.getItem("campus_care_current_user");
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.role || null;
    }
    return null;
  });

  // Sync userRole with currentUser
  useEffect(() => {
    if (currentUser) {
      setUserRole(currentUser.role);
      localStorage.setItem("campus_care_current_user", JSON.stringify(currentUser));
    } else {
      setUserRole(null);
      localStorage.removeItem("campus_care_current_user");
    }
  }, [currentUser]);

  // App routing state
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };
  
  // Content states
  const [services, setServices] = useState<CampusService[]>(INITIAL_SERVICES);
  const [selectedService, setSelectedService] = useState<CampusService | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>("Semua");
  
  // Filtered services based on role
  const filteredServices = useMemo(() => {
    return services.filter(svc => !svc.roles || svc.roles.includes(userRole as any));
  }, [services, userRole]);
  
  // prefilled values for writing draft
  const [prefilledService, setPrefilledService] = useState<CampusService | null>(null);
  const [prefilledDraft, setPrefilledDraft] = useState<DraftReport | null>(null);

  // Saved Drafts local states
  const [savedDrafts, setSavedDrafts] = useState<DraftReport[]>(() => {
    const saved = localStorage.getItem("campus_care_saved_drafts");
    return saved ? JSON.parse(saved) : [];
  });

  // Viewed Guidelines local history states
  const [viewedGuidelines, setViewedGuidelines] = useState<ViewedGuideline[]>(() => {
    const saved = localStorage.getItem("campus_care_viewed_guidelines");
    return saved ? JSON.parse(saved) : [];
  });

  // Incident problem bank state
  const [problems, setProblems] = useState<CampusProblem[]>(() => {
    const saved = localStorage.getItem("campus_care_saved_problems");
    return saved ? JSON.parse(saved) : INITIAL_PROBLEMS;
  });

  // AI Consultation Messages logs
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  // Dynamic Welcome Message on Role changes
  useEffect(() => {
    if (userRole) {
      let welcomeText = "";
      if (userRole === "mahasiswa") {
        welcomeText = "Halo! Selamat datang di CampusCare AI, Navigator Layanan Kampus Terpadu.\n\nSaya asisten kecerdasan buatan bentukan Pusat Sistem Informasi Universitas yang siap membantu Anda sebagai Mahasiswa.\n\nAda kendala SSO login, KRS, UKT/keuangan, LMS CeLOE, Open Library, WiFi, atau kemahasiswaan yang bisa saya bantu arahkan hari ini?";
      } else if (userRole === "dosen") {
        welcomeText = "Halo! Selamat datang di CampusCare AI, Navigator Layanan Kampus Terpadu.\n\nSaya asisten kecerdasan buatan bentukan Pusat Sistem Informasi Universitas yang siap membantu Anda sebagai Dosen.\n\nAda kendala LMS CeLOE pengajaran, presensi/iGracias, BKD/JAFA, penelitian/pengabdian, VPN, atau peminjaman lab/ruang rapat hari ini?";
      } else if (userRole === "pegawai") {
        welcomeText = "Halo! Selamat datang di CampusCare AI, Navigator Layanan Kampus Terpadu.\n\nSaya asisten kecerdasan buatan bentukan Pusat Sistem Informasi Universitas yang siap membantu Anda sebagai Pegawai Kampus.\n\nAda kendala operasional, nota dinas/surat tugas internal, IT support unit, logistik/ATK, kepegawaian SDM, ticket helpdesk unit, atau knowledge base SOP hari ini?";
      }
      setMessages([
        {
          id: "msg-welcome-" + userRole,
          sender: "ai",
          text: welcomeText,
          timestamp: new Date()
        }
      ]);
    }
  }, [userRole]);

  // Persist storage updates
  useEffect(() => {
    localStorage.setItem("campus_care_saved_drafts", JSON.stringify(savedDrafts));
  }, [savedDrafts]);

  useEffect(() => {
    localStorage.setItem("campus_care_viewed_guidelines", JSON.stringify(viewedGuidelines));
  }, [viewedGuidelines]);

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
        body: JSON.stringify({ messages: updatedMsgs, role: userRole })
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
    let welcomeText = "Riwayat percakapan telah dibersihkan.";
    if (userRole === "mahasiswa") {
      welcomeText += " Hubungi saya kembali jika Anda membutuhkan navigasi alur akademik mahasiswa atau pengaduan baru.";
    } else if (userRole === "dosen") {
      welcomeText += " Hubungi saya kembali jika Anda membutuhkan navigasi LMS pengajaran, presensi, BKD, atau layanan dosen lainnya.";
    } else if (userRole === "pegawai") {
      welcomeText += " Hubungi saya kembali jika Anda membutuhkan navigasi nota dinas internal, IT support, SDM, atau operasional pegawai lainnya.";
    }
    setMessages([
      {
        id: "msg-welcome-clear-" + userRole,
        sender: "ai",
        text: welcomeText,
        timestamp: new Date()
      }
    ]);
  };

  // Navigation handlers
  const handleSelectService = (service: CampusService) => {
    setSelectedService(service);
    setCurrentTab("guideline");
    
    // Add to viewedGuidelines history
    const newViewed: ViewedGuideline = {
      id: "vg-" + Math.random().toString(36).substring(2, 9),
      serviceId: service.id,
      title: service.title,
      category: service.category,
      tanggalDilihat: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };
    
    setViewedGuidelines((prev) => [
      newViewed,
      ...prev.filter((item) => item.serviceId !== service.id)
    ]);
  };

  const handleSaveToHistory = (service: CampusService) => {
    const newViewed: ViewedGuideline = {
      id: "vg-" + Math.random().toString(36).substring(2, 9),
      serviceId: service.id,
      title: service.title,
      category: service.category,
      tanggalDilihat: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };
    setViewedGuidelines((prev) => [
      newViewed,
      ...prev.filter((item) => item.serviceId !== service.id)
    ]);
    showToast(`Layanan "${service.title}" berhasil disimpan ke Riwayat!`);
  };

  const handleSelectServiceById = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (service) {
      handleSelectService(service);
    }
  };

  const handleNavigateToDraft = (service: CampusService) => {
    setPrefilledService(service);
    setPrefilledDraft(null);
    setCurrentTab("drafter");
  };

  // Saved draft list controllers
  const handleSaveDraft = (draft: DraftReport) => {
    setSavedDrafts((prev) => [draft, ...prev.filter((d) => d.id !== draft.id)]);
    showToast("Draft laporan berhasil disimpan!");
  };

  const handleDeleteDraft = (id: string) => {
    setSavedDrafts((prev) => prev.filter((d) => d.id !== id));
  };

  const handleUpdateDraftStatus = (id: string, status: any) => {
    setSavedDrafts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
    showToast("Status draf berhasil diperbarui!");
  };

  const handleLoadDraft = (draft: DraftReport) => {
    setPrefilledDraft(draft);
    setPrefilledService(null);
    setCurrentTab("drafter");
  };

  const handleClearViewedGuidelines = () => {
    setViewedGuidelines([]);
  };

  if (userRole === null) {
    return (
      <LandingPage
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setCurrentTab("home");
        }}
        lastUser={currentUser || (localStorage.getItem("campus_care_current_user") ? JSON.parse(localStorage.getItem("campus_care_current_user")!) : null)}
      />
    );
  }

  return (
    <div id="app-root-container" className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-rose-100 selection:text-rose-900 flex flex-col">
      {currentTab !== "insight" && (
        <Header
          currentTab={currentTab}
          userRole={userRole}
          currentUser={currentUser}
          onLogoutRole={() => {
            setCurrentUser(null);
            setCurrentTab("home");
          }}
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
      )}

      {/* Main Container Views Wrapper */}
      <main id="app-viewport" className={`flex-grow ${currentTab !== "insight" ? "pb-10" : ""}`}>
        
        {currentTab === "home" && (
          <Beranda
            services={filteredServices}
            userRole={userRole}
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
            services={filteredServices}
            filterCategory={selectedFilterCategory}
            searchQuery={searchQuery}
            userRole={userRole}
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
            onSaveGuideline={handleSaveToHistory}
            onBackToChat={() => {
              setCurrentTab("chat");
              setSelectedService(null);
            }}
          />
        )}

        {currentTab === "chat" && (
          <AIKonsultasi
            services={filteredServices}
            messages={messages}
            isLoading={isChatLoading}
            userRole={userRole}
            onSendMessage={handleSendMessage}
            onClearChat={handleClearChat}
            onNavigateToDraft={handleNavigateToDraft}
            onSelectService={handleSelectService}
            onSaveToHistory={handleSaveToHistory}
          />
        )}

        {currentTab === "drafter" && (
          <BuatDraftLaporan
            services={filteredServices}
            prefilledService={prefilledService}
            prefilledDraft={prefilledDraft}
            savedDrafts={savedDrafts}
            userRole={userRole}
            currentUser={currentUser}
            onSaveDraft={handleSaveDraft}
            onDeleteDraft={handleDeleteDraft}
          />
        )}

        {currentTab === "history" && (
          <Riwayat
            savedDrafts={savedDrafts}
            viewedGuidelines={viewedGuidelines}
            onDeleteDraft={handleDeleteDraft}
            onLoadDraft={handleLoadDraft}
            onSelectServiceById={handleSelectServiceById}
            onClearViewedGuidelines={handleClearViewedGuidelines}
            onUpdateDraftStatus={handleUpdateDraftStatus}
          />
        )}

        {currentTab === "insight" && (
          <InsightDashboard
            services={services}
            problems={problems}
            onAddProblem={handleAddProblem}
            onTabChange={setCurrentTab}
            userRole={userRole}
          />
        )}

      </main>

      {currentTab !== "insight" && (
        <footer id="footer-container" className="mt-auto py-8 bg-white border-t border-slate-200/80 text-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p id="footer-logo" className="text-sm font-bold text-slate-800">
              CampusCare <span className="text-rose-700">AI</span>
            </p>
            <p id="footer-credits" className="text-xs text-slate-400 mt-2">
              © 2026 CampusCare AI — Satu Pintu untuk Menemukan Layanan Kampus yang Tepat.
            </p>
          </div>
        </footer>
      )}
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white text-xs font-bold py-3 px-4.5 rounded-xl shadow-xl border border-slate-800">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
