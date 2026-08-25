export type TabId = "home" | "book" | "intake" | "summary" | "vault" | "profile";

export type Language = "ENG" | "हिंदी";

export type TokenState = {
  number: string;
  doctor: string;
  department: string;
  room: string;
  waitMins: number;
  ahead: number;
  bookedAt: string;
  status: "Waiting" | "In Consultation" | "Completed" | "Next in Line";
};

export type PatientProfile = {
  id: string;
  name: string;
  age: number;
  gender: "M" | "F" | "Other";
  mobile: string;
  abhaId: string;
  bloodGroup: string;
  prakriti: string;
  agniStatus: string;
  allergies: string[];
  emergencyContact: string;
  address: string;
  isVerified: boolean;
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
  rating: number;
  experience: string;
  qualification: string;
};

export type PrescriptionItem = {
  medicine: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  ayushCategory?: string;
};

export type VisitRecord = {
  id: string;
  date: string;
  doctor: string;
  department: string;
  room: string;
  diagnosis: string;
  note: string;
  vitals: { bp: string; pulse: string; temp: string; weight: string };
  prescriptions: PrescriptionItem[];
};

export type OCRItem = {
  id: string;
  medicine: string;
  dosage: string;
  status: "Active" | "Warning" | "Completed";
  tagType: "success" | "warning" | "danger";
  message: string;
  detectedDate: string;
  confidence: number;
};

export type ClinicNotification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "queue" | "doctor" | "alert" | "report";
};

export const INITIAL_PATIENT: PatientProfile = {
  id: "P-8892",
  name: "Nikhil Ladwani",
  age: 24,
  gender: "M",
  mobile: "+91 98765 43210",
  abhaId: "nikhil@abdm",
  bloodGroup: "B Positive (B+)",
  prakriti: "Vata-Pitta (Dual Dominant)",
  agniStatus: "Manda (Sluggish / Mild Dyspepsia)",
  allergies: ["Penicillin", "Sulfa Drugs"],
  emergencyContact: "+91 98111 22334 (Brother)",
  address: "Sector 14, Urban Estate, New Delhi, 110078",
  isVerified: true,
};

export const DEFAULT_TOKEN: TokenState = {
  number: "042",
  doctor: "Dr. Rajesh Sharma",
  department: "Ayurveda OPD (Kayachikitsa)",
  room: "Room 12",
  waitMins: 12,
  ahead: 2,
  bookedAt: "10:15 AM",
  status: "Waiting",
};

export const SPECIALTIES = [
  { id: "ayurveda", label: "Ayurveda", labelHi: "आयुर्वेद", emoji: "🌿" },
  { id: "genmed", label: "Gen Med", labelHi: "जनरल मेडिसिन", emoji: "🩺" },
  { id: "cardio", label: "Cardio", labelHi: "ह्रदय रोग (कार्डियो)", emoji: "🫀" },
  { id: "ortho", label: "Ortho", labelHi: "हड्डी रोग (ऑर्थो)", emoji: "🦴" },
  { id: "ent", label: "ENT", labelHi: "नाक-कान-गला (ENT)", emoji: "👂" },
];

export const DOCTORS: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Rajesh Sharma",
    specialty: "ayurveda",
    subSpecialty: "Kayachikitsa (Internal Medicine)",
    room: "Room 12",
    statusLabel: "Available Now",
    available: true,
    waitMins: 10,
    token: "042",
    ctaLabel: "Book Token #042",
    department: "Ayurveda OPD (Kayachikitsa)",
    rating: 4.9,
    experience: "16 yrs exp",
    qualification: "BAMS, MD (Kayachikitsa - NIA Jaipur)",
  },
  {
    id: "d2",
    name: "Dr. Priya Deshmukh",
    specialty: "ayurveda",
    subSpecialty: "Panchakarma & Detox Therapy",
    room: "Room 14",
    statusLabel: "Busy (Token #38)",
    available: false,
    waitMins: 25,
    token: "039",
    ctaLabel: "Book Next Slot",
    department: "Ayurveda OPD (Panchakarma)",
    rating: 4.8,
    experience: "12 yrs exp",
    qualification: "BAMS, MD (Panchakarma - BHU)",
  },
  {
    id: "d3",
    name: "Dr. Vikram Joshi",
    specialty: "ayurveda",
    subSpecialty: "Shalya Tantra & Spine Care",
    room: "Room 15",
    statusLabel: "Available Now",
    available: true,
    waitMins: 5,
    token: "017",
    ctaLabel: "Book Token #017",
    department: "Ayurveda OPD (Shalya Tantra)",
    rating: 4.7,
    experience: "9 yrs exp",
    qualification: "BAMS, MS (Shalya Tantra)",
  },
  {
    id: "d4",
    name: "Dr. A. K. Verma",
    specialty: "genmed",
    subSpecialty: "Internal Medicine & Diabetology",
    room: "Room 04",
    statusLabel: "Available Now",
    available: true,
    waitMins: 8,
    token: "112",
    ctaLabel: "Book Token #112",
    department: "General Medicine OPD",
    rating: 4.9,
    experience: "20 yrs exp",
    qualification: "MBBS, MD (General Medicine - AIIMS)",
  },
  {
    id: "d5",
    name: "Dr. Neha Kapoor",
    specialty: "genmed",
    subSpecialty: "Infectious Diseases & Family Health",
    room: "Room 06",
    statusLabel: "Available Now",
    available: true,
    waitMins: 14,
    token: "115",
    ctaLabel: "Book Token #115",
    department: "General Medicine OPD",
    rating: 4.8,
    experience: "11 yrs exp",
    qualification: "MBBS, DNB (Family Medicine)",
  },
  {
    id: "d6",
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
    rating: 5.0,
    experience: "18 yrs exp",
    qualification: "MBBS, MD, DM (Cardiology)",
  },
  {
    id: "d7",
    name: "Dr. Sanjay Bhatt",
    specialty: "ortho",
    subSpecialty: "Joint Replacement & Arthroscopy",
    room: "Room 18",
    statusLabel: "Available Now",
    available: true,
    waitMins: 12,
    token: "058",
    ctaLabel: "Book Token #058",
    department: "Orthopedics OPD",
    rating: 4.8,
    experience: "14 yrs exp",
    qualification: "MBBS, MS (Orthopedics)",
  },
  {
    id: "d8",
    name: "Dr. Rohini Gupta",
    specialty: "ent",
    subSpecialty: "Otorhinolaryngology & Vertigo",
    room: "Room 09",
    statusLabel: "Available Now",
    available: true,
    waitMins: 6,
    token: "031",
    ctaLabel: "Book Token #031",
    department: "ENT OPD",
    rating: 4.7,
    experience: "10 yrs exp",
    qualification: "MBBS, MS (ENT)",
  },
];

export const INITIAL_OCR_ITEMS: OCRItem[] = [
  {
    id: "ocr-1",
    medicine: "Paracetamol 500mg (Active)",
    dosage: "1 Tab SOS (Max 3/day)",
    status: "Active",
    tagType: "success",
    message: "Verified from 10-Jul Visit with Dr. A.K. Verma",
    detectedDate: "10-Jul-2026",
    confidence: 98.4,
  },
  {
    id: "ocr-2",
    medicine: "Duplicate Painkiller Alert",
    dosage: "Aceclofenac + Ibuprofen overlap",
    status: "Warning",
    tagType: "warning",
    message: "ClinSync AI detected dual NSAID prescription conflict across visits.",
    detectedDate: "12-Jul-2026",
    confidence: 94.2,
  },
  {
    id: "ocr-3",
    medicine: "Avipattikar Churna (Ayurvedic)",
    dosage: "3g twice daily with lukewarm water before meals",
    status: "Active",
    tagType: "success",
    message: "Prakriti compatible: Alleviates Pitta & Acidity",
    detectedDate: "12-Jul-2026",
    confidence: 99.1,
  },
];

export const VISITS: VisitRecord[] = [
  {
    id: "v-001",
    date: "12-Jul-2026",
    doctor: "Dr. Rajesh Sharma",
    department: "Ayurveda OPD (Kayachikitsa)",
    room: "Room 12",
    diagnosis: "Amlapitta (Hyperacidity) with Agnimandya",
    note: "Epigastric burning, acid reflux aggravated after spicy foods and late dinners. Vata-Pitta imbalance.",
    vitals: { bp: "118/76 mmHg", pulse: "72 bpm", temp: "98.4 °F", weight: "68 kg" },
    prescriptions: [
      {
        medicine: "Avipattikar Churna",
        dosage: "3 grams",
        frequency: "Twice daily (BD)",
        duration: "14 days",
        instructions: "Mix with lukewarm water 20 mins before meals.",
        ayushCategory: "Classical Churna",
      },
      {
        medicine: "Kamdudha Ras (Moti Yukta)",
        dosage: "1 tablet (250mg)",
        frequency: "Twice daily (BD)",
        duration: "14 days",
        instructions: "Take with cow's milk or honey after food.",
        ayushCategory: "Rasayana / Pitta Shamaka",
      },
      {
        medicine: "Sutshekhar Ras",
        dosage: "1 tablet (125mg)",
        frequency: "Once daily (Morning)",
        duration: "7 days",
        instructions: "Take with amla juice or warm water.",
        ayushCategory: "Pitta Samana",
      },
    ],
  },
  {
    id: "v-002",
    date: "04-Mar-2026",
    doctor: "Dr. A. K. Verma",
    department: "General Medicine OPD",
    room: "Room 04",
    diagnosis: "Acute Viral Rhinitis with Mild Pyrexia",
    note: "Seasonal fever, sore throat and rhinorrhea for 3 days. Chest clear.",
    vitals: { bp: "122/80 mmHg", pulse: "84 bpm", temp: "100.2 °F", weight: "67.5 kg" },
    prescriptions: [
      {
        medicine: "Paracetamol 650mg",
        dosage: "1 tablet",
        frequency: "Thrice daily (TDS) as needed",
        duration: "3 days",
        instructions: "Take after meals if body temperature > 99.5°F.",
      },
      {
        medicine: "Levocetirizine 5mg + Montelukast 10mg",
        dosage: "1 tablet",
        frequency: "Once daily at bedtime (OD HS)",
        duration: "5 days",
        instructions: "Take before sleeping with water.",
      },
      {
        medicine: "Vitamin C 500mg + Zinc chewable",
        dosage: "1 chewable tablet",
        frequency: "Once daily after breakfast",
        duration: "10 days",
        instructions: "Chew thoroughly after morning meal.",
      },
    ],
  },
];

export const INITIAL_NOTIFICATIONS: ClinicNotification[] = [
  {
    id: "n-1",
    title: "OPD Token Priority Updated",
    message: "Dr. Rajesh Sharma is currently attending Token #040. You are 2 patients away in Room 12.",
    time: "2 mins ago",
    read: false,
    type: "queue",
  },
  {
    id: "n-2",
    title: "ABDM Health Records Synced",
    message: "3 clinical artifacts successfully fetched from AIIMS Health Repository.",
    time: "15 mins ago",
    read: false,
    type: "report",
  },
  {
    id: "n-3",
    title: "AI Symptom Triage Ready",
    message: "Voice intake summary generated for Kayachikitsa consultation with Dosha score.",
    time: "1 hour ago",
    read: true,
    type: "doctor",
  },
];

export type ClinicalReportData = {
  reportId: string;
  date: string;
  status: string;
  voiceIntake: {
    chiefComplaint: string;
    onsetAndSite: string;
    characterAndSeverity: string;
    aggravatingFactors: string;
    associatedSymptoms: string;
    rawTranscript: string;
    audioDuration?: string;
  };
  ayushBaseline: {
    prakriti: string;
    agniStatus: string;
    koshtha: string;
    bloodGroup: string;
    knownAllergies: string;
  };
  ocrAudit: {
    activeMedication: string;
    duplicateDrugFlag: string;
    allergyGuard: string;
  };
  physicianNotes: {
    physicalAndNadiNotes: string;
    clinicalDiagnosis: string;
    prescriptions: { medicine: string; instructions: string }[];
    doctorName: string;
    doctorTitle: string;
    signatureDate: string;
    verifiedStamp: boolean;
  };
};

export const DEFAULT_CLINICAL_REPORT: ClinicalReportData = {
  reportId: "#CS-2026-042",
  date: "25-AUG-2026",
  status: "READY FOR REVIEW",
  voiceIntake: {
    chiefComplaint: "Severe upper stomach pain & epigastric burning",
    onsetAndSite: "Epigastric region; started 3 days ago, gradually worsening",
    characterAndSeverity: "Continuous burning sensation | Severity: 6 / 10",
    aggravatingFactors: "Oily/spicy meals and irregular eating schedules",
    associatedSymptoms: "Acid reflux, mild nausea, and post-meal abdominal fullness",
    rawTranscript:
      "3 din se pet me severe burning ho rahi hai, spicy khana khane ke baad acidity double ho jati hai...",
    audioDuration: "00:42",
  },
  ayushBaseline: {
    prakriti: "Vata-Pitta",
    agniStatus: "Manda (Sluggish)",
    koshtha: "Mridu (Sensitive)",
    bloodGroup: "B Positive",
    knownAllergies: "Penicillin Group",
  },
  ocrAudit: {
    activeMedication: "Paracetamol 500mg (1-0-1) [Scanned 10-Jul-2026 Prescription]",
    duplicateDrugFlag: "WARNING: Prior NSAID painkiller detected. Risk of aggravating gastric mucosa burning.",
    allergyGuard: "BLOCKED: Penicillin antibiotics locked in e-prescription module based on patient profile.",
  },
  physicianNotes: {
    physicalAndNadiNotes:
      "Pitta-dominant pulse observed. Abdominal tenderness present in epigastrium on deep palpation.",
    clinicalDiagnosis: "Amlapitta (Functional Dyspepsia / Hyperacidity)",
    prescriptions: [
      {
        medicine: "Avipattikar Churna",
        instructions: "3g before meals with warm water (0-1-1)",
      },
      {
        medicine: "Kamadugha Rasa",
        instructions: "250mg twice daily after meals (1-0-1)",
      },
    ],
    doctorName: "Dr. Rajesh Sharma",
    doctorTitle: "MD (Kayachikitsa) — Senior Physician",
    signatureDate: "25-AUG-2026",
    verifiedStamp: true,
  },
};

export const NAV_ITEMS: {
  id: TabId;
  emoji: string;
  short: string;
  shortHi: string;
  long: string;
  longHi: string;
}[] = [
  { id: "home", emoji: "📊", short: "Home", shortHi: "होम", long: "Dashboard", longHi: "डैशबोर्ड" },
  { id: "book", emoji: "📅", short: "Book", shortHi: "अपॉइंटमेंट", long: "Book OPD", longHi: "ओपीडी टोकन" },
  { id: "intake", emoji: "🎙️", short: "Intake", shortHi: "आवाज जाँच", long: "AI Intake", longHi: "एआई लक्षण जांच" },
  { id: "summary", emoji: "📋", short: "Summary", shortHi: "सारांश", long: "Pre-Consult Report", longHi: "परामर्श सारांश" },
  { id: "vault", emoji: "📁", short: "Vault", shortHi: "रिकॉर्ड्स", long: "Document Vault", longHi: "दस्तावेज़ वॉल्ट" },
  { id: "profile", emoji: "👤", short: "Profile", shortHi: "प्रोफ़ाइल", long: "Profile & ABHA", longHi: "प्रोफ़ाइल एवं आभा" },
];

export const TRANSLATIONS = {
  ENG: {
    brandName: "ClinSync",
    brandSubtitle: "Smart OPD Tokens, AI Intake & ABHA Records",
    activeTokenTitle: "ACTIVE TOKEN TODAY",
    waitLabel: "Wait Time",
    aheadLabel: "Ahead",
    viewLiveSummary: "View Live Summary",
    viewClinicalReport: "View Clinical Report",
    bookDoctor: "Book Doctor",
    bookDoctorSub: "Select & Queue",
    aiIntake: "AI Intake",
    aiIntakeSub: "Voice Symptoms",
    healthProfile: "Health Profile",
    emergencyBanner: "🚨 CHEST PAIN? TAP FOR NURSE ASSIST",
    searchPlaceholder: "Search doctors, specialties, medicines, reports...",
    doctorsAvailable: "Real-time doctor availability",
    emergencyAlertTitle: "Emergency triage alert sent",
    callAmbulance: "Call 108 Ambulance",
    dismiss: "Dismiss",
    alertNurse: "Alert Floor Nurse",
    step1Title: "Step 1: Voice Intake",
    step1Sub: "Speak or select symptoms in Hindi or English",
    ayushMode: "🌿 AYUSH Mode",
    aiListening: "AI Listening in Hindi/English...",
    touchSymptomGrid: "Touch Symptom Grid",
    nextScan: "Next: Scan Documents →",
    recordsVaultTitle: "Records & OCR Vault",
    recordsVaultSub: "Digitised prescriptions & visit summaries",
    uploadBtn: "+ Upload Document",
    ocrIntelligenceTitle: "Scanned OCR Intelligence",
    pastVisitsTitle: "Past Visit History",
    summaryPdf: "Summary PDF",
    prescriptions: "Prescriptions",
    profileTitle: "My Profile & ABHA",
    profileSub: "Identity, consent & clinical constitution",
    editProfile: "⚙️ Edit Profile",
    abhaAccountTitle: "ABDM Digital Health Account (ABHA)",
    syncLocker: "Sync Health Locker",
    viewAbhaCard: "View ABHA Card",
    consentTitle: "DPDP Act 2023 Consent Logs",
    consent1: "Share Intake Summary with Doctor",
    consent2: "Cache Voice Recording Temporarily",
    consent3: "Allow Teleconsultation & Audio AI Storage",
    clinicalSummaryTitle: "Pre-Consultation Clinical Report",
    clinicalSummarySub: "Official OPD Token & AI Triage Summary for Doctor",
    printReport: "Print / Save PDF",
    shareAbha: "Push to ABHA Locker",
    doctorMode: "Doctor Review Mode",
  },
  हिंदी: {
    brandName: "ClinSync (क्लिनसिंक)",
    brandSubtitle: "स्मार्ट ओपीडी टोकन, एआई लक्षण जांच एवं आभा रिकॉर्ड्स",
    activeTokenTitle: "आज का सक्रिय टोकन",
    waitLabel: "अनुमानित प्रतीक्षा",
    aheadLabel: "आगे कतार में",
    viewLiveSummary: "लाइव कतार स्थिति देखें",
    viewClinicalReport: "क्लिनिकल रिपोर्ट देखें",
    bookDoctor: "डॉक्टर टोकन लें",
    bookDoctorSub: "विभाग चुनें और कतार में लगें",
    aiIntake: "एआई लक्षण जांच",
    aiIntakeSub: "बोलकर लक्षण बताएं",
    healthProfile: "मरीज स्वास्थ्य प्रोफ़ाइल",
    emergencyBanner: "🚨 सीने में दर्द या आपातकाल? नर्स सहायता के लिए दबाएं",
    searchPlaceholder: "डॉक्टर, विभाग, दवाइयाँ या रिपोर्ट खोजें...",
    doctorsAvailable: "उपलब्ध डॉक्टर एवं टोकन स्थिति",
    emergencyAlertTitle: "आपातकालीन ट्राइएज अलर्ट भेजा गया",
    callAmbulance: "108 एम्बुलेंस बुलाएं",
    dismiss: "बंद करें",
    alertNurse: "नर्स को तुरंत सूचित करें",
    step1Title: "चरण 1: आवाज लक्षण जांच",
    step1Sub: "हिंदी या अंग्रेजी में अपनी तकलीफ बताएं",
    ayushMode: "🌿 आयुष मोड सक्रिय",
    aiListening: "एआई आपकी बात हिंदी/अंग्रेजी में सुन रहा है...",
    touchSymptomGrid: "त्वरित लक्षण चयन",
    nextScan: "अगला: पर्ची / रिपोर्ट स्कैन करें →",
    recordsVaultTitle: "मेडिकल रिकॉर्ड्स एवं ओसीआर वॉल्ट",
    recordsVaultSub: "डिजिटल पर्चियां एवं परामर्श इतिहास",
    uploadBtn: "+ नई पर्ची अपलोड करें",
    ocrIntelligenceTitle: "ओसीआर द्वारा जाँची गई दवाइयाँ",
    pastVisitsTitle: "पुराना परामर्श इतिहास",
    summaryPdf: "परामर्श सारांश PDF",
    prescriptions: "दवा पर्ची देखें",
    profileTitle: "मेरी प्रोफ़ाइल एवं आभा आईडी",
    profileSub: "पहचान, सहमति एवं आयुर्वेदिक प्रकृति",
    editProfile: "⚙️ प्रोफ़ाइल बदलें",
    abhaAccountTitle: "आयुष्मान भारत डिजिटल मिशन (आभा)",
    syncLocker: "हेल्थ लॉकर सिंक करें",
    viewAbhaCard: "आभा कार्ड देखें",
    consentTitle: "डीपीडीपी एक्ट 2023 मरीज सहमति",
    consent1: "डॉक्टर के साथ एआई लक्षण सारांश साझा करें",
    consent2: "आवाज रिकॉर्डिंग को सुरक्षित रूप से कैश करें",
    consent3: "टेली-परामर्श एवं एआई डायग्नोस्टिक्स सहमति",
    clinicalSummaryTitle: "पूर्व-परामर्श क्लिनिकल रिपोर्ट",
    clinicalSummarySub: "डॉक्टर परामर्श हेतु आधिकारिक एआई ट्राइएज रिपोर्ट",
    printReport: "प्रिंट / PDF डाउनलोड",
    shareAbha: "आभा लॉकर में भेजें",
    doctorMode: "डॉक्टर समीक्षा मोड",
  },
};
