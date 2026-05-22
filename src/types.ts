export interface CampusService {
  id: string;
  title: string;
  category: "Akademik" | "IT & Jaringan" | "Keuangan" | "Fasilitas" | "Sistem Akun";
  description: string;
  recommendation: string;
  officialChannel: string;
  searchCount: number;
  steps?: string[];
  requiredDetails?: string[];
}

export interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

export interface DraftReport {
  id: string;
  nama: string;
  nim: string;
  email: string;
  jenisKendala: string;
  waktuKejadian: string;
  deskripsi: string;
  lampiranName?: string;
  status: "Draft" | "Terkirim" | "Selesai";
  tanggalDibuat: string;
  generatedLetter?: string;
  serviceId?: string;
}

export interface CampusProblem {
  id: string;
  title: string;
  reportedCount: number;
  status: "Kritis" | "Sedang" | "Aman" | "Dalam Peninjauan";
  category: string;
}
