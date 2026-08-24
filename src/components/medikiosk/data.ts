export type TabId = "home" | "book" | "intake" | "vault" | "profile";

export type TokenState = {
  number: string;
  doctor: string;
  department: string;
  room: string;
  waitMins: number;
  ahead: number;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  subSpecialty: string;
  room: string;
  statusLabel: string;
  available: boolean;
  waitMins: number;
  token: string;
  ctaLabel: string;
  department: string;
};

export const SPECIALTIES = [
  { id: "ayurveda", label: "Ayurveda", emoji: "🌿" },
  { id: "genmed", label: "Gen Med", emoji: "🩺" },
  { id: "cardio", label: "Cardio", emoji: "🫀" },
];

export const DOCTORS: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Rajesh Sharma",
    specialty: "ayurveda",
    subSpecialty: "Kayachikitsa",
    room: "Room 12",
    statusLabel: "Available Now",
    available: true,
    waitMins: 10,
    token: "042",
    ctaLabel: "Book Token #042",
    department: "Ayurveda OPD (Kayachikitsa)",
  },
  {
    id: "d2",
    name: "Dr. Priya Deshmukh",
    specialty: "ayurveda",
    subSpecialty: "Panchakarma",
    room: "Room 14",
    statusLabel: "Busy (Token #38)",
    available: false,
    waitMins: 25,
    token: "039",
    ctaLabel: "Book Next Slot",
    department: "Ayurveda OPD (Panchakarma)",
  },
  {
    id: "d3",
    name: "Dr. Vikram Joshi",
    specialty: "ayurveda",
    subSpecialty: "Kayachikitsa",
    room: "Room 15",
    statusLabel: "Available Now",
    available: true,
    waitMins: 5,
    token: "017",
    ctaLabel: "Book Token",
    department: "Ayurveda OPD (Kayachikitsa)",
  },
  {
    id: "d4",
    name: "Dr. A. K. Verma",
    specialty: "genmed",
    subSpecialty: "General Medicine",
    room: "Room 04",
    statusLabel: "Available Now",
    available: true,
    waitMins: 8,
    token: "112",
    ctaLabel: "Book Token",
    department: "General Medicine OPD",
  },
  {
    id: "d5",
    name: "Dr. Meera Iyer",
    specialty: "cardio",
    subSpecialty: "Interventional Cardiology",
    room: "Room 21",
    statusLabel: "Busy (Token #12)",
    available: false,
    waitMins: 35,
    token: "014",
    ctaLabel: "Book Next Slot",
    department: "Cardiology OPD",
  },
];

export const VISITS = [
  {
    date: "12-Jul-2026",
    doctor: "Dr. Rajesh Sharma",
    department: "Ayurveda OPD",
    note: "Epigastric burning",
  },
  {
    date: "04-Mar-2026",
    doctor: "Dr. A. K. Verma",
    department: "General Med",
    note: "Seasonal fever",
  },
];

export const DEFAULT_TOKEN: TokenState = {
  number: "042",
  doctor: "Dr. Rajesh Sharma",
  department: "Ayurveda OPD (Kayachikitsa)",
  room: "Room 12",
  waitMins: 12,
  ahead: 2,
};

export const NAV_ITEMS: {
  id: TabId;
  emoji: string;
  short: string;
  long: string;
}[] = [
  { id: "home", emoji: "📊", short: "Home", long: "Dashboard" },
  { id: "book", emoji: "📅", short: "Book", long: "Book OPD" },
  { id: "intake", emoji: "🎙️", short: "Intake", long: "AI Intake" },
  { id: "vault", emoji: "📁", short: "Vault", long: "Document Vault" },
  { id: "profile", emoji: "👤", short: "Profile", long: "Profile & ABHA" },
];
