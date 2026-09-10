import { useState, useEffect } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BellRing,
  Calendar,
  Check,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Copy,
  Download,
  FileCheck,
  FileText,
  HeartPulse,
  Info,
  MapPin,
  Mic,
  MicOff,
  Pill as PillIcon,
  Printer,
  QrCode,
  RefreshCw,
  Search,
  Share2,
  Sparkles,
  Stethoscope,
  Trash2,
  Upload,
  User,
  Volume2,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  ActionButton,
  ClinSyncLogo,
  ClinSyncWordmark,
  ModalWrapper,
  Pill,
  ScreenHeader,
  Section,
  SectionTitle,
} from "./primitives";
import type {
  Doctor,
  Language,
  OCRItem,
  PatientProfile,
  TabId,
  TokenState,
  VisitRecord,
  ClinicalReportData,
} from "./data";
import {
  DOCTORS,
  SPECIALTIES,
  TRANSLATIONS,
  VISITS,
  DEFAULT_CLINICAL_REPORT,
} from "./data";

/* ==========================================================================
   1. HOME SCREEN
   ========================================================================== */

export function HomeScreen({
  token,
  patient,
  onGo,
  language,
  onEditProfile,
}: {
  token: TokenState;
  patient: PatientProfile;
  onGo: (tab: TabId) => void;
  language: Language;
  onEditProfile: () => void;
}) {
  const t = TRANSLATIONS[language];
  const [queueModalOpen, setQueueModalOpen] = useState(false);
  const [chimePlaying, setChimePlaying] = useState(false);

  const handleChime = () => {
    setChimePlaying(true);
    toast.info(`🔔 Token #${token.number} announcement called for ${token.room}`, {
      description: `Calling patient ${patient.name} to ${token.department}.`,
    });
    setTimeout(() => setChimePlaying(false), 2500);
  };

  return (
    <div className="mk-screen-in space-y-5">
      <ScreenHeader
        title={
          language === "हिंदी" ? (
            <div className="flex items-center gap-2">
              <ClinSyncWordmark size="md" />
              <span className="text-sm font-bold text-muted-foreground">(क्लिनसिंक)</span>
            </div>
          ) : (
            <ClinSyncWordmark size="md" />
          )
        }
        subtitle={t.brandSubtitle}
        right={
          <div className="flex items-center gap-2">
            <Pill tone="neutral" className="hidden sm:inline-flex">
              🌐 {language}
            </Pill>
            <button
              type="button"
              onClick={onEditProfile}
              className="group flex items-center gap-2 rounded-full border border-border bg-card p-1.5 pr-3 hover:bg-secondary transition-all"
              title="View / Edit Profile"
            >
              <span className="grid size-8 place-items-center rounded-full bg-primary text-xs font-black text-primary-foreground shadow-sm group-hover:scale-105 transition-transform">
                {patient.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </span>
              <span className="text-xs font-bold text-foreground hidden md:inline">
                {patient.name}
              </span>
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Active Token Hero Card */}
        <div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f766e] via-[#115e59] to-[#0b1926] p-6 text-white lg:col-span-2 shadow-xl border border-teal-500/20"
          style={{ boxShadow: "var(--shadow-token)" }}
        >
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute -right-10 -top-10 size-60 rounded-full bg-teal-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 -bottom-10 size-60 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex size-2.5 rounded-full bg-emerald-400 animate-ping" />
                <p className="text-xs font-black tracking-[0.18em] uppercase text-accent">
                  {t.activeTokenTitle}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleChime}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur transition-all hover:bg-white/20 active:scale-95",
                    chimePlaying && "ring-2 ring-accent bg-accent/30",
                  )}
                  title="Play Token Audio Chime"
                >
                  <BellRing className="size-3.5 text-accent animate-bounce" />
                  <span>Chime</span>
                </button>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                  ● {token.room}
                </span>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-white/10 px-4 py-2 backdrop-blur border border-white/10">
                  <span className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-white tracking-tight">
                    #{token.number}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-extrabold text-white">{token.doctor}</p>
                  <p className="text-sm font-medium text-white/80">{token.department}</p>
                  <p className="mt-0.5 text-xs text-accent/90 flex items-center gap-1">
                    <MapPin className="size-3" /> Ground Floor, OPD Wing A
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur border border-white/10 text-right">
                <p className="text-[11px] font-semibold text-white/70">
                  Status: <span className="text-emerald-300 font-bold">{token.status}</span>
                </p>
                <p className="text-xs font-bold text-white">Booked at {token.bookedAt}</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-black/20 p-4 border border-white/10 backdrop-blur">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5 text-accent" />
                  {t.waitLabel}: ~{token.waitMins} Mins ({token.ahead} {t.aheadLabel})
                </span>
                <span className="inline-flex items-center gap-1 text-emerald-400 font-extrabold">
                  <span className="size-2 rounded-full bg-emerald-400" />
                  Live Sync
                </span>
              </div>
              <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-emerald-400 transition-all duration-500"
                  style={{ width: `${Math.max(20, 100 - token.ahead * 25)}%` }}
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setQueueModalOpen(true)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-primary shadow-lg hover:bg-slate-100 active:scale-[0.98] transition-all"
              >
                <Activity className="size-4" />
                {t.viewLiveSummary}
              </button>
              <button
                type="button"
                onClick={() => onGo("summary")}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-accent-foreground shadow-lg hover:bg-accent/90 active:scale-[0.98] transition-all"
              >
                <FileText className="size-4" />
                {t.viewClinicalReport}
              </button>
              <button
                type="button"
                onClick={() => onGo("book")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 border border-white/20 px-4 py-3 text-sm font-bold text-white hover:bg-white/25 active:scale-[0.98] transition-all"
              >
                <Calendar className="size-4" />
                Change Doctor
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:col-span-2">
          <QuickAction
            emoji="📅"
            title={t.bookDoctor}
            copy={t.bookDoctorSub}
            badge="15 Doctors Live"
            onClick={() => onGo("book")}
          />
          <QuickAction
            emoji="🎙️"
            title={t.aiIntake}
            copy={t.aiIntakeSub}
            badge="AYUSH Voice AI"
            onClick={() => onGo("intake")}
          />
          <QuickAction
            emoji="📋"
            title={language === "हिंदी" ? "क्लिनिकल सारांश" : "Clinical Report"}
            copy="Pre-Consult Summary"
            badge="Ready for Doctor"
            onClick={() => onGo("summary")}
          />
          <QuickAction
            emoji="📁"
            title="OCR Rx Vault"
            copy="Digitised Prescriptions"
            badge="2 Active Meds"
            onClick={() => onGo("vault")}
          />
          <QuickAction
            emoji="🪪"
            title="ABHA Health ID"
            copy="ABDM Connected"
            badge="Verified ✓"
            onClick={() => onGo("profile")}
          />
          <QuickAction
            emoji="🖨️"
            title={language === "हिंदी" ? "प्रिंट रिपोर्ट" : "Print OPD Sheet"}
            copy="Doctor Consultation A4"
            badge="Official Token"
            onClick={() => onGo("summary")}
          />
        </div>

        {/* Health Profile Snapshot Card */}
        <Section className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <SectionTitle>{t.healthProfile}</SectionTitle>
            <button
              type="button"
              onClick={onEditProfile}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              ⚙️ Edit Profile
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-teal-50 border border-teal-200 text-base font-black text-teal-800">
                {patient.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate font-extrabold text-foreground text-base">
                    {patient.name}
                  </p>
                  <Pill tone="success" className="py-0.5 text-[10px]">
                    <BadgeCheck className="size-3" /> ABDM Verified
                  </Pill>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Age: {patient.age} ({patient.gender}) • Mobile: {patient.mobile}
                </p>
                <p className="text-xs font-semibold text-primary mt-0.5">
                  ABHA: {patient.abhaId}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <ActionButton
                variant="outline"
                className="min-h-9 px-3 text-xs"
                onClick={() => onGo("profile")}
              >
                <QrCode className="size-3.5" /> View ABHA Card
              </ActionButton>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-border">
            {patient.allergies.map((allergy) => (
              <Pill key={allergy} tone="danger">
                ⚠️ Allergy: {allergy}
              </Pill>
            ))}
            <Pill tone="primary">Prakriti: {patient.prakriti}</Pill>
            <Pill tone="neutral">Agni: {patient.agniStatus}</Pill>
            <Pill tone="purple">Blood: {patient.bloodGroup}</Pill>
          </div>
        </Section>
      </div>

      {/* Live Queue Progress Modal */}
      <ModalWrapper
        isOpen={queueModalOpen}
        onClose={() => setQueueModalOpen(false)}
        title="Live Token Queue & Consultation Tracker"
        maxWidth="max-w-lg"
      >
        <div className="space-y-4">
          <div className="rounded-2xl bg-primary/10 border border-primary/20 p-4 text-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider">Token In Queue</p>
                <p className="text-3xl font-black text-foreground">#{token.number}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{token.room}</p>
                <p className="text-sm font-bold text-foreground">{token.doctor}</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Estimated Consultation Window: <strong>10:45 AM - 11:00 AM</strong>
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Queue Milestones
            </p>
            <div className="space-y-2">
              <QueueStep
                number="1"
                title="Kiosk Check-in & Token Issued"
                time="10:15 AM"
                status="completed"
              />
              <QueueStep
                number="2"
                title="Vitals & Prakriti Pre-screening"
                time="10:18 AM"
                status="completed"
              />
              <QueueStep
                number="3"
                title="AI Voice Symptom Intake Summary Synced"
                time="10:22 AM"
                status="completed"
              />
              <QueueStep
                number="4"
                title={`Waiting in OPD Lounge (${token.ahead} patients ahead)`}
                time="Current Step"
                status="active"
              />
              <QueueStep
                number="5"
                title={`Doctor Consultation in ${token.room}`}
                time="Up Next (~10m)"
                status="pending"
              />
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            <ActionButton
              className="flex-1"
              onClick={() => {
                handleChime();
                setQueueModalOpen(false);
              }}
            >
              <Volume2 className="size-4" /> Announce Token Audio
            </ActionButton>
            <ActionButton
              variant="outline"
              onClick={() => setQueueModalOpen(false)}
            >
              Close
            </ActionButton>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
}

function QueueStep({
  number,
  title,
  time,
  status,
}: {
  number: string;
  title: string;
  time: string;
  status: "completed" | "active" | "pending";
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl p-3 text-xs transition-colors",
        status === "completed" && "bg-emerald-50 text-emerald-900 border border-emerald-200",
        status === "active" && "bg-primary/10 text-primary border border-primary/30 font-bold",
        status === "pending" && "bg-muted text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-black",
          status === "completed" && "bg-emerald-600 text-white",
          status === "active" && "bg-primary text-white animate-pulse",
          status === "pending" && "bg-secondary text-muted-foreground",
        )}
      >
        {status === "completed" ? "✓" : number}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">{title}</p>
      </div>
      <span className="shrink-0 text-[11px] opacity-80">{time}</span>
    </div>
  );
}

function QuickAction({
  emoji,
  title,
  copy,
  badge,
  onClick,
}: {
  emoji: string;
  title: string;
  copy: string;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mk-card group relative p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg active:scale-[0.98]"
    >
      {badge ? (
        <span className="absolute top-3 right-3 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
          {badge}
        </span>
      ) : null}
      <span className="text-2xl transition-transform group-hover:scale-110 inline-block">
        {emoji}
      </span>
      <p className="mt-3 font-bold text-foreground text-sm sm:text-base leading-tight">
        {title}
      </p>
      <p className="text-xs text-muted-foreground mt-0.5">{copy}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-1.5 transition-all">
        Open <ArrowRight className="size-3.5" />
      </span>
    </button>
  );
}

/* ==========================================================================
   2. BOOK SCREEN
   ========================================================================== */

export function BookScreen({
  language,
  patient,
  onBook,
}: {
  language: Language;
  patient: PatientProfile;
  onBook: (doctor: Doctor) => void;
}) {
  const t = TRANSLATIONS[language];
  const [specialty, setSpecialty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [consultType, setConsultType] = useState<"OPD" | "Follow-up" | "Panchakarma">("OPD");
  const [smsAlerts, setSmsAlerts] = useState(true);

  const filteredDoctors = DOCTORS.filter((d) => {
    const matchesSpecialty = specialty === "all" || d.specialty === specialty;
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.subSpecialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  const handleOpenBooking = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setBookingModalOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedDoctor) return;
    onBook(selectedDoctor);
    setBookingModalOpen(false);
    toast.success(`Token #${selectedDoctor.token} Booked Successfully!`, {
      description: `Appointment confirmed with ${selectedDoctor.name} (${selectedDoctor.room}). SMS alert sent to ${patient.mobile}.`,
    });
  };

  return (
    <div className="mk-screen-in space-y-5">
      <ScreenHeader
        title="Book OPD Appointment"
        subtitle={t.doctorsAvailable}
        right={<Pill tone="neutral">🌐 {language}</Pill>}
      />

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <label className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 shadow-sm">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            placeholder="Search doctors by name, department or specialty..."
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs text-muted-foreground hover:text-foreground font-semibold"
            >
              Clear
            </button>
          ) : null}
        </label>
      </div>

      {/* Specialty Filter Pills */}
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        <button
          type="button"
          onClick={() => setSpecialty("all")}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all active:scale-95",
            specialty === "all"
              ? "border-primary bg-primary text-primary-foreground shadow-sm"
              : "border-border bg-card text-muted-foreground hover:bg-secondary",
          )}
        >
          🏥 All Specialties ({DOCTORS.length})
        </button>
        {SPECIALTIES.map((s) => {
          const count = DOCTORS.filter((d) => d.specialty === s.id).length;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSpecialty(s.id)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all active:scale-95",
                specialty === s.id
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card text-muted-foreground hover:bg-secondary",
              )}
            >
              {s.emoji} {language === "हिंदी" ? s.labelHi : s.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {filteredDoctors.map((doctor) => (
          <Section key={doctor.id} className="flex flex-col justify-between hover:border-primary/40 transition-all shadow-sm">
            <div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-base font-extrabold text-foreground">
                      {doctor.name}
                    </p>
                    <span className="inline-flex items-center gap-1 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-900">
                      ★ {doctor.rating}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-primary">{doctor.subSpecialty}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {doctor.qualification} • {doctor.experience}
                  </p>
                  <p className="text-xs font-semibold text-foreground/80 mt-1 flex items-center gap-1">
                    <MapPin className="size-3 text-muted-foreground" /> {doctor.room}
                  </p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
                  <Stethoscope className="size-6" />
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Pill tone={doctor.available ? "success" : "warning"}>
                  ● {doctor.statusLabel} • Wait: ~{doctor.waitMins}m
                </Pill>
                <Pill tone="neutral" className="text-[11px]">
                  Next Token: #{doctor.token}
                </Pill>
              </div>
            </div>

            <ActionButton
              variant={doctor.available ? "primary" : "outline"}
              className="mt-5 w-full"
              onClick={() => handleOpenBooking(doctor)}
            >
              {doctor.ctaLabel}
              <ArrowRight className="size-4" />
            </ActionButton>
          </Section>
        ))}

        {filteredDoctors.length === 0 ? (
          <Section className="col-span-full py-12 text-center">
            <p className="text-base font-bold text-foreground">No doctors found</p>
            <p className="text-xs text-muted-foreground mt-1">
              Try selecting another specialty or clear the search query.
            </p>
            <ActionButton
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSpecialty("all");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </ActionButton>
          </Section>
        ) : null}
      </div>

      {/* Booking Confirmation Dialog */}
      {selectedDoctor ? (
        <ModalWrapper
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          title={`Confirm Appointment: ${selectedDoctor.name}`}
          maxWidth="max-w-md"
        >
          <div className="space-y-4 text-left">
            <div className="rounded-2xl bg-secondary/80 p-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">Assigned Token</p>
                  <p className="text-2xl font-black text-primary">#{selectedDoctor.token}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-foreground">{selectedDoctor.room}</p>
                  <p className="text-xs text-muted-foreground">{selectedDoctor.department}</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground pt-2 border-t border-border">
                Patient: <strong>{patient.name}</strong> (ABHA: {patient.abhaId})
              </p>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Consultation Type
              </label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(["OPD", "Follow-up", "Panchakarma"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setConsultType(type)}
                    className={cn(
                      "rounded-xl border py-2 text-xs font-bold transition-all",
                      consultType === type
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:bg-secondary",
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border p-3">
              <div className="text-xs">
                <p className="font-bold text-foreground">Send SMS / WhatsApp Alerts</p>
                <p className="text-muted-foreground">Alert when 2 patients remain</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={smsAlerts}
                onClick={() => setSmsAlerts(!smsAlerts)}
                className={cn(
                  "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                  smsAlerts ? "bg-success" : "bg-border",
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 size-5 rounded-full bg-white shadow transition-all",
                    smsAlerts ? "left-5" : "left-0.5",
                  )}
                />
              </button>
            </div>

            <div className="pt-2 flex gap-2">
              <ActionButton className="flex-1" onClick={handleConfirmBooking}>
                <Check className="size-4" /> Confirm Token #{selectedDoctor.token}
              </ActionButton>
              <ActionButton
                variant="outline"
                onClick={() => setBookingModalOpen(false)}
              >
                Cancel
              </ActionButton>
            </div>
          </div>
        </ModalWrapper>
      ) : null}
    </div>
  );
}

/* ==========================================================================
   3. INTAKE SCREEN
   ========================================================================== */

const SYMPTOMS = [
  { emoji: "🤢", title: "Stomach / Agni", copy: "Acidity, Indigestion, GERD", dosha: "Pitta" },
  { emoji: "🌡️", title: "Fever / Cold", copy: "High Temperature, Chills", dosha: "Vata-Kapha" },
  { emoji: "🦴", title: "Joint Stiffness", copy: "Arthritis, Vata Imbalance", dosha: "Vata" },
  { emoji: "🩹", title: "Follow-up", copy: "Old Prescription Review", dosha: "All" },
  { emoji: "🫀", title: "Chest Tightness", copy: "Mild Palpitations, Anxiety", dosha: "Prana Vata" },
  { emoji: "🩺", title: "Skin / Allergy", copy: "Rash, Itching, Pitta Flare", dosha: "Rakta-Pitta" },
];

const SAMPLE_TRANSCRIPTS = [
  "Doctor, I have been experiencing severe acid burning in my chest and upper stomach after meals for 3 days. It worsens late at night.",
  "डॉक्टर साहब, मुझे 2 दिन से तेज बुखार, बदन दर्द और हल्का सिरदर्द है। खाने की इच्छा नहीं हो रही है।",
  "Severe pain in lower back and knee joint stiffness during morning hours. Difficulty standing for long periods.",
];

export function IntakeScreen({
  onBack,
  onNext,
  language,
}: {
  onBack: () => void;
  onNext: () => void;
  language: Language;
}) {
  const t = TRANSLATIONS[language];
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState(SAMPLE_TRANSCRIPTS[0]!);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(["Stomach / Agni"]);
  const [aiAnalysisDone, setAiAnalysisDone] = useState(true);
  const [freeText, setFreeText] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      toast.info("🎙️ AI Mic Active: Speak in Hindi or English", {
        description: "ClinSync speech intelligence is listening and parsing medical terms.",
      });
      // Simulate changing transcript
      const randomTranscript =
        SAMPLE_TRANSCRIPTS[Math.floor(Math.random() * SAMPLE_TRANSCRIPTS.length)]!;
      setTimeout(() => {
        setTranscript(randomTranscript);
      }, 2000);
    } else {
      setIsRecording(false);
      setAiAnalysisDone(true);
      toast.success("Voice Intake Recorded & Analyzed!", {
        description: "Extracted symptoms, Dosha imbalance score and triage level.",
      });
    }
  };

  const toggleSymptom = (title: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  const handleAnalyzeAi = () => {
    if (!freeText && !transcript) {
      toast.error("Please provide symptoms or speak into the mic first.");
      return;
    }
    setAiAnalysisDone(true);
    toast.success("ClinSync AI Intake Analysis Complete!", {
      description: "Clinical summary prepared for Dr. Rajesh Sharma's OPD console.",
    });
  };

  return (
    <div className="mk-screen-in space-y-5">
      <ScreenHeader
        title={t.step1Title}
        subtitle={t.step1Sub}
        right={<Pill tone="success">{t.ayushMode}</Pill>}
      />

      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="size-4" /> Back to Dashboard
      </button>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Voice Recording Simulator */}
        <Section className="flex flex-col items-center justify-between py-8 text-center">
          <div>
            <div className="relative mx-auto grid size-44 place-items-center">
              {isRecording ? (
                <>
                  <span className="mk-ring-pulse absolute inset-0 rounded-full bg-emergency/40" />
                  <span className="absolute inset-2 rounded-full bg-emergency/20 animate-ping" />
                </>
              ) : (
                <span className="mk-ring-pulse absolute inset-0 rounded-full bg-accent/40" />
              )}
              <button
                type="button"
                onClick={toggleRecording}
                className={cn(
                  "relative grid size-28 place-items-center rounded-full text-white shadow-2xl transition-all duration-300 active:scale-95",
                  isRecording
                    ? "bg-emergency hover:bg-emergency/90 shadow-emergency/40"
                    : "bg-primary hover:bg-primary/90 shadow-primary/40",
                )}
                aria-label={isRecording ? "Stop Recording" : "Start Voice Intake"}
              >
                {isRecording ? (
                  <MicOff className="size-12 animate-pulse" strokeWidth={2.5} />
                ) : (
                  <Mic className="size-12" strokeWidth={2.2} />
                )}
              </button>
            </div>

            <div className="mt-5">
              <p className="text-sm font-extrabold text-foreground">
                {isRecording
                  ? `Recording... (00:${recordingTime < 10 ? `0${recordingTime}` : recordingTime})`
                  : t.aiListening}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {isRecording
                  ? "Tap mic icon again to stop recording"
                  : "Tap the microphone to speak your symptoms in Hindi / English"}
              </p>
            </div>
          </div>

          {/* Soundwave Bars Simulation during recording */}
          {isRecording ? (
            <div className="mt-4 flex items-center justify-center gap-1 h-8">
              {[40, 75, 95, 60, 30, 85, 100, 50, 70, 90, 45, 80].map((h, i) => (
                <span
                  key={i}
                  className="w-1 rounded-full bg-emergency animate-pulse"
                  style={{
                    height: `${h}%`,
                    animationDelay: `${i * 75}ms`,
                  }}
                />
              ))}
            </div>
          ) : null}

          {/* Live Transcript Box */}
          <div className="mt-5 w-full rounded-2xl bg-muted/80 p-4 border border-border text-left">
            <div className="flex items-center justify-between text-xs font-bold text-muted-foreground mb-1">
              <span>Live Speech-to-Text Transcription</span>
              <span className="text-primary font-semibold">Hindi / ENG Dual Engine</span>
            </div>
            <p className="text-sm italic text-foreground font-medium">
              &ldquo;{transcript}&rdquo;
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 w-full">
            <button
              type="button"
              onClick={() => {
                setTranscript(
                  SAMPLE_TRANSCRIPTS[Math.floor(Math.random() * SAMPLE_TRANSCRIPTS.length)]!,
                );
                toast.info("Sample clinical voice prompt loaded.");
              }}
              className="flex-1 rounded-xl border border-border bg-card px-3 py-2 text-xs font-bold text-muted-foreground hover:bg-secondary transition-all"
            >
              🔄 Load Another Voice Sample
            </button>
            <button
              type="button"
              onClick={() => {
                setTranscript("");
                toast.info("Transcript cleared.");
              }}
              className="rounded-xl border border-border bg-card px-3 py-2 text-xs font-bold text-muted-foreground hover:bg-secondary transition-all"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        </Section>

        {/* Touch Symptom Grid & AI Clinical Summary */}
        <div className="space-y-5">
          <Section>
            <div className="flex items-center justify-between">
              <SectionTitle>{t.touchSymptomGrid}</SectionTitle>
              <span className="text-xs font-bold text-primary">
                {selectedSymptoms.length} Selected
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {SYMPTOMS.map((s) => {
                const isSelected = selectedSymptoms.includes(s.title);
                return (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => toggleSymptom(s.title)}
                    className={cn(
                      "min-h-24 rounded-2xl border p-3.5 text-left transition-all duration-200 active:scale-[0.97]",
                      isSelected
                        ? "border-primary bg-primary/10 ring-2 ring-primary/30 shadow-sm"
                        : "border-border bg-card hover:bg-secondary",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{s.emoji}</span>
                      {isSelected ? (
                        <CheckCircle2 className="size-4 text-primary" />
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm font-extrabold leading-tight text-foreground">
                      {s.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{s.copy}</p>
                    <span className="mt-1.5 inline-block rounded bg-secondary px-1.5 py-0.5 text-[9px] font-bold text-muted-foreground uppercase">
                      Dosha: {s.dosha}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Notes Input */}
            <div className="mt-4">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Additional Symptom Notes (Optional)
              </label>
              <textarea
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
                placeholder="Type additional details or allergies for the doctor..."
                rows={2}
                className="mt-1.5 w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
              />
              <ActionButton
                variant="outline"
                className="mt-2 w-full min-h-9 text-xs"
                onClick={handleAnalyzeAi}
              >
                <Sparkles className="size-3.5 text-accent" /> Analyze &amp; Tag with ClinSync AI
              </ActionButton>
            </div>
          </Section>

          {/* AI Intake Diagnostic Card */}
          {aiAnalysisDone ? (
            <Section className="border-primary/30 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <SectionTitle className="text-primary">
                  ClinSync AI Clinical Triage Summary
                </SectionTitle>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div className="flex items-center justify-between rounded-lg bg-card p-2 border border-border">
                  <span className="font-semibold text-muted-foreground">Suspected Condition</span>
                  <span className="font-bold text-foreground">Amlapitta / Non-Ulcer Dyspepsia</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-card p-2 border border-border">
                  <span className="font-semibold text-muted-foreground">Prakriti / Agni Impact</span>
                  <span className="font-bold text-amber-700">Pitta Aggravation • Manda Agni</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-card p-2 border border-border">
                  <span className="font-semibold text-muted-foreground">Triage Priority</span>
                  <span className="font-bold text-emerald-700">Standard OPD (Token #042)</span>
                </div>
              </div>
            </Section>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <ActionButton className="w-full sm:w-auto sm:px-10" onClick={onNext}>
          {t.nextScan}
        </ActionButton>
        <ActionButton variant="outline" onClick={onBack}>
          Save Draft &amp; Return Home
        </ActionButton>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. VAULT SCREEN
   ========================================================================== */

export function VaultScreen({
  patient,
}: {
  patient: PatientProfile;
}) {
  const [ocrItems, setOcrItems] = useState<OCRItem[]>([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedVisit, setSelectedVisit] = useState<VisitRecord | null>(null);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [rxModalOpen, setRxModalOpen] = useState(false);

  // Initialize initial OCR items
  useEffect(() => {
    import("./data").then((m) => {
      setOcrItems(m.INITIAL_OCR_ITEMS);
    });
  }, []);

  const handleSimulateScan = () => {
    setIsScanning(true);
    setScanProgress(10);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setUploadModalOpen(false);

          // Add newly scanned drug
          const newItem: OCRItem = {
            id: `ocr-${Date.now()}`,
            medicine: "Kamdudha Ras 250mg + Shankha Bhasma",
            dosage: "1 Tab BD with lukewarm water",
            status: "Active",
            tagType: "success",
            message: "Scanned from newly uploaded OPD prescription. Verified Ayush formulation.",
            detectedDate: "Today (Live)",
            confidence: 99.3,
          };
          setOcrItems((prev) => [newItem, ...prev]);
          toast.success("Prescription OCR Extraction Complete!", {
            description: "Extracted Kamdudha Ras 250mg into active medicine profile with 99.3% accuracy.",
          });
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const handleViewPdf = (visit: VisitRecord) => {
    setSelectedVisit(visit);
    setPdfModalOpen(true);
  };

  const handleViewRx = (visit: VisitRecord) => {
    setSelectedVisit(visit);
    setRxModalOpen(true);
  };

  return (
    <div className="mk-screen-in space-y-5">
      <ScreenHeader
        title="Records & OCR Vault"
        subtitle="Digitised prescriptions & visit summaries"
        right={
          <button
            type="button"
            onClick={() => setUploadModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-95 transition-all"
          >
            <Upload className="size-3.5" /> + Upload Document
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Scanned OCR Intelligence */}
        <Section>
          <div className="flex items-center justify-between">
            <SectionTitle>Scanned OCR Intelligence</SectionTitle>
            <Pill tone="accent">{ocrItems.length} Detected Items</Pill>
          </div>

          <div className="mt-4 space-y-3">
            {ocrItems.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "rounded-2xl p-4 transition-all border",
                  item.tagType === "success" && "bg-success-soft/80 border-success/30 text-success",
                  item.tagType === "warning" && "bg-warning-soft/80 border-warning/30 text-warning",
                  item.tagType === "danger" && "bg-emergency-soft/80 border-emergency/30 text-emergency",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-extrabold text-sm">{item.medicine}</p>
                    <p className="text-xs font-semibold opacity-90 mt-0.5">{item.dosage}</p>
                    <p className="text-[11px] opacity-80 mt-1">{item.message}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-black shadow-xs">
                    {item.confidence}% Match
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-black/10 text-[11px]">
                  <span className="font-medium">Detected: {item.detectedDate}</span>
                  <button
                    type="button"
                    onClick={() => {
                      toast.info(`Inspecting ${item.medicine}`, {
                        description: `Dosage: ${item.dosage}. Confidence: ${item.confidence}%.`,
                      });
                    }}
                    className="font-bold underline hover:opacity-80"
                  >
                    Details →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <ActionButton
            variant="outline"
            className="mt-4 w-full text-xs min-h-10"
            onClick={() => setUploadModalOpen(true)}
          >
            <Upload className="size-3.5" /> Scan Another Prescription / Lab Report
          </ActionButton>
        </Section>

        {/* Past Visit History */}
        <Section>
          <div className="flex items-center justify-between">
            <SectionTitle>Past Visit History</SectionTitle>
            <span className="text-xs font-bold text-muted-foreground">ABDM Vault</span>
          </div>

          <div className="mt-4 space-y-3">
            {VISITS.map((v) => (
              <div
                key={v.id}
                className="rounded-2xl border border-border bg-card p-4 hover:border-primary/40 transition-all shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-extrabold text-foreground text-sm">
                      {v.date} | {v.doctor}
                    </p>
                    <p className="text-xs font-semibold text-primary">{v.department}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      Diagnosis: {v.diagnosis}
                    </p>
                  </div>
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-secondary text-foreground text-xs font-bold">
                    {v.room}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-border">
                  <ActionButton
                    variant="ghost"
                    className="min-h-9 px-3 text-xs"
                    onClick={() => handleViewPdf(v)}
                  >
                    <FileText className="size-3.5 text-primary" /> Summary PDF
                  </ActionButton>
                  <ActionButton
                    variant="ghost"
                    className="min-h-9 px-3 text-xs"
                    onClick={() => handleViewRx(v)}
                  >
                    <PillIcon className="size-3.5 text-emerald-600" /> Prescriptions ({v.prescriptions.length})
                  </ActionButton>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Upload Document & Laser Scan Simulator Modal */}
      <ModalWrapper
        isOpen={uploadModalOpen}
        onClose={() => !isScanning && setUploadModalOpen(false)}
        title="Upload & OCR Prescription Scanner"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-left">
          <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 p-6 text-center">
            {isScanning ? (
              <div className="space-y-3">
                <div className="relative mx-auto h-36 w-full max-w-[200px] rounded-lg bg-card shadow-md p-3 border border-border flex flex-col justify-around">
                  <div className="h-2 w-3/4 rounded bg-primary/20" />
                  <div className="h-2 w-full rounded bg-muted" />
                  <div className="h-2 w-5/6 rounded bg-muted" />
                  <div className="h-2 w-1/2 rounded bg-primary/30" />
                  {/* Laser Scan Line Animation */}
                  <div
                    className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emergency to-transparent shadow-lg shadow-emergency transition-all duration-300"
                    style={{ top: `${scanProgress}%` }}
                  />
                </div>
                <p className="text-xs font-extrabold text-primary animate-pulse">
                  ClinSync AI OCR Scanning... ({scanProgress}%)
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Extracting Drug Names, Dosages & AYUSH Formulations
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Upload className="size-6" />
                </span>
                <p className="text-sm font-bold text-foreground">
                  Select Prescription or Drag &amp; Drop
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports JPEG, PNG, PDF prescriptions &amp; lab reports up to 25MB
                </p>
              </div>
            )}
          </div>

          {!isScanning ? (
            <div className="space-y-2">
              <ActionButton className="w-full" onClick={handleSimulateScan}>
                <Sparkles className="size-4" /> Run AI OCR Extraction (Demo)
              </ActionButton>
              <ActionButton
                variant="outline"
                className="w-full"
                onClick={() => setUploadModalOpen(false)}
              >
                Cancel
              </ActionButton>
            </div>
          ) : null}
        </div>
      </ModalWrapper>

      {/* Clinical Visit Summary PDF Modal */}
      {selectedVisit ? (
        <ModalWrapper
          isOpen={pdfModalOpen}
          onClose={() => setPdfModalOpen(false)}
          title={`Clinical Visit Summary — ${selectedVisit.date}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4 text-left">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <ClinSyncLogo size="sm" showBadge={false} />
                  <div>
                    <p className="text-xs font-bold text-foreground">ClinSync Health Hub</p>
                    <p className="text-[10px] text-muted-foreground">Official ABDM OPD Record</p>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <p className="font-bold text-foreground">{selectedVisit.date}</p>
                  <p className="text-muted-foreground">{selectedVisit.room}</p>
                </div>
              </div>

              {/* Patient & Doctor details */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground font-semibold">Patient</p>
                  <p className="font-bold text-foreground">{patient.name}</p>
                  <p className="text-muted-foreground">ABHA: {patient.abhaId}</p>
                </div>
                <div>
                  <p className="text-muted-foreground font-semibold">Attending Physician</p>
                  <p className="font-bold text-foreground">{selectedVisit.doctor}</p>
                  <p className="text-muted-foreground">{selectedVisit.department}</p>
                </div>
              </div>

              {/* Vitals */}
              <div className="rounded-xl bg-secondary/80 p-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Patient Vitals
                </p>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div>
                    <p className="text-muted-foreground text-[10px]">BP</p>
                    <p className="font-bold text-foreground">{selectedVisit.vitals.bp}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-[10px]">Pulse</p>
                    <p className="font-bold text-foreground">{selectedVisit.vitals.pulse}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-[10px]">Temp</p>
                    <p className="font-bold text-foreground">{selectedVisit.vitals.temp}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-[10px]">Weight</p>
                    <p className="font-bold text-foreground">{selectedVisit.vitals.weight}</p>
                  </div>
                </div>
              </div>

              {/* Clinical Note */}
              <div className="text-xs">
                <p className="font-bold text-foreground">Diagnosis: {selectedVisit.diagnosis}</p>
                <p className="text-muted-foreground mt-1">{selectedVisit.note}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <ActionButton
                className="flex-1"
                onClick={() => {
                  toast.success("Visit Summary PDF Downloaded!");
                }}
              >
                <Download className="size-4" /> Download PDF
              </ActionButton>
              <ActionButton
                variant="outline"
                className="flex-1"
                onClick={() => {
                  toast.info("Sent to print spooler.");
                }}
              >
                <Printer className="size-4" /> Print
              </ActionButton>
              <ActionButton
                variant="outline"
                onClick={() => {
                  toast.success("Shared to WhatsApp & ABHA Locker!");
                }}
              >
                <Share2 className="size-4" />
              </ActionButton>
            </div>
          </div>
        </ModalWrapper>
      ) : null}

      {/* Digital Prescriptions Viewer Modal */}
      {selectedVisit ? (
        <ModalWrapper
          isOpen={rxModalOpen}
          onClose={() => setRxModalOpen(false)}
          title={`Digital Prescription — ${selectedVisit.doctor}`}
          maxWidth="max-w-lg"
        >
          <div className="space-y-4 text-left">
            <div className="space-y-3">
              {selectedVisit.prescriptions.map((rx, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card p-4 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-extrabold text-foreground text-sm">{rx.medicine}</p>
                      <p className="text-xs font-semibold text-primary">{rx.dosage} • {rx.frequency}</p>
                    </div>
                    {rx.ayushCategory ? (
                      <Pill tone="success" className="text-[10px]">
                        🌿 {rx.ayushCategory}
                      </Pill>
                    ) : null}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 bg-muted/60 p-2 rounded-lg">
                    Instructions: <strong>{rx.instructions}</strong> (Duration: {rx.duration})
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex gap-2">
              <ActionButton
                className="flex-1"
                onClick={() => {
                  toast.success("Refill Request sent to In-House Pharmacy!");
                }}
              >
                <RefreshCw className="size-4" /> Request 14-Day Refill
              </ActionButton>
              <ActionButton
                variant="outline"
                onClick={() => setRxModalOpen(false)}
              >
                Close
              </ActionButton>
            </div>
          </div>
        </ModalWrapper>
      ) : null}
    </div>
  );
}

/* ==========================================================================
   5. PROFILE SCREEN
   ========================================================================== */

export function ProfileScreen({
  patient,
  consents,
  onToggleConsent,
  onEditProfile,
}: {
  patient: PatientProfile;
  consents: { shareSummary: boolean; cacheVoice: boolean; teleconsult: boolean };
  onToggleConsent: (key: "shareSummary" | "cacheVoice" | "teleconsult") => void;
  onEditProfile: () => void;
}) {
  const [abhaCardOpen, setAbhaCardOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncLocker = () => {
    setIsSyncing(true);
    toast.info("Connecting to Ayushman Bharat Digital Mission (ABDM)...", {
      description: "Fetching longitudinal health records from National Health Exchange.",
    });
    setTimeout(() => {
      setIsSyncing(false);
      toast.success("ABDM Health Locker Synced Successfully!", {
        description: "3 OPD summaries and 2 diagnostic reports updated.",
      });
    }, 2000);
  };

  return (
    <div className="mk-screen-in space-y-5">
      <ScreenHeader
        title="My Profile & ABHA"
        subtitle="Identity, consent & clinical constitution"
        right={
          <button
            type="button"
            onClick={onEditProfile}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-bold text-foreground shadow-sm hover:bg-secondary active:scale-95 transition-all"
          >
            ⚙️ Edit Profile
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Profile Header Card */}
        <Section className="lg:col-span-2">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 sm:flex sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <span className="grid size-16 shrink-0 place-items-center rounded-3xl bg-teal-700 text-xl font-black text-white shadow-sm">
                {patient.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-lg font-extrabold text-foreground">
                    {patient.name}
                  </p>
                  <Pill tone="success" className="py-0.5 text-[10px]">
                    <BadgeCheck className="size-3.5" /> Verified ✓
                  </Pill>
                </div>
                <p className="text-sm text-muted-foreground">
                  Patient ID: #{patient.id} • Age: {patient.age} ({patient.gender})
                </p>
                <p className="text-sm text-muted-foreground">
                  📱 Mobile: {patient.mobile}
                </p>
              </div>
            </div>
            <ActionButton
              variant="outline"
              className="min-h-9 px-4 text-xs col-span-2 justify-self-start sm:col-span-1"
              onClick={onEditProfile}
            >
              Edit Details
            </ActionButton>
          </div>
        </Section>

        {/* ABDM Card */}
        <Section className="border-primary/20 bg-abha/70">
          <SectionTitle>ABDM Digital Health Account (ABHA)</SectionTitle>
          <p className="mt-3 text-sm font-bold text-foreground">
            Linked Handle: <span className="text-primary">{patient.abhaId}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Status: Connected to National Health Exchange (HIP/HIU Active)
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <ActionButton
              className="flex-1 min-w-36 text-xs"
              onClick={handleSyncLocker}
              disabled={isSyncing}
            >
              <RefreshCw className={cn("size-3.5", isSyncing && "animate-spin")} />
              {isSyncing ? "Syncing..." : "Sync Health Locker"}
            </ActionButton>
            <ActionButton
              variant="outline"
              className="flex-1 min-w-36 text-xs"
              onClick={() => setAbhaCardOpen(true)}
            >
              <QrCode className="size-3.5" /> View ABHA Card
            </ActionButton>
          </div>
        </Section>

        {/* Saved Clinical & AYUSH Profile */}
        <Section>
          <div className="flex items-center justify-between">
            <SectionTitle>Saved Clinical &amp; AYUSH Profile</SectionTitle>
            <button
              type="button"
              onClick={onEditProfile}
              className="text-xs text-primary font-bold hover:underline"
            >
              Edit
            </button>
          </div>
          <dl className="mt-3 space-y-2.5 text-xs">
            <div className="flex justify-between gap-3 border-b border-border pb-1.5">
              <dt className="text-muted-foreground font-semibold">Prakriti Constitution</dt>
              <dd className="font-extrabold text-foreground">{patient.prakriti}</dd>
            </div>
            <div className="flex justify-between gap-3 border-b border-border pb-1.5">
              <dt className="text-muted-foreground font-semibold">Agni Status</dt>
              <dd className="font-extrabold text-foreground">{patient.agniStatus}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground font-semibold">Blood Group</dt>
              <dd className="font-extrabold text-foreground">{patient.bloodGroup}</dd>
            </div>
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            {patient.allergies.map((allergy) => (
              <Pill key={allergy} tone="danger">
                ⚠️ {allergy} Allergy
              </Pill>
            ))}
          </div>
        </Section>

        {/* DPDP Act 2023 Consent Logs */}
        <Section className="lg:col-span-2">
          <SectionTitle>DPDP Act 2023 Consent Logs</SectionTitle>
          <div className="mt-4 space-y-3">
            <ConsentRow
              label="Share Intake Summary with Doctor"
              copy="Enables automatic transfer of voice symptoms to physician OPD screen"
              checked={consents.shareSummary}
              onChange={() => onToggleConsent("shareSummary")}
            />
            <ConsentRow
              label="Cache Voice Recording Temporarily"
              copy="Temporarily stores audio for 24h for AI transcription review"
              checked={consents.cacheVoice}
              onChange={() => onToggleConsent("cacheVoice")}
            />
            <ConsentRow
              label="Allow Teleconsultation &amp; Remote Follow-up"
              copy="Authorizes registered doctors to view previous ABDM visit history"
              checked={consents.teleconsult}
              onChange={() => onToggleConsent("teleconsult")}
            />
          </div>
        </Section>
      </div>

      {/* Digital ABHA Card Modal */}
      <ModalWrapper
        isOpen={abhaCardOpen}
        onClose={() => setAbhaCardOpen(false)}
        title="Official Digital ABHA Card"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-left">
          {/* ABHA Card Graphic */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d9488] via-[#0f766e] to-[#0b1926] p-5 text-white shadow-xl border border-white/20">
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="rounded bg-white/20 px-2 py-0.5 text-[10px] font-black tracking-wider uppercase">
                  National Health Authority
                </span>
              </div>
              <span className="text-xs font-bold text-accent">ABDM Verified</span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs text-white/70">Name</p>
                <p className="text-base font-extrabold tracking-tight">{patient.name}</p>
                <p className="text-xs text-white/70 mt-2">ABHA Address</p>
                <p className="text-sm font-bold text-accent">{patient.abhaId}</p>
                <p className="text-xs text-white/70 mt-2">ABHA Number</p>
                <p className="text-xs font-mono font-bold tracking-widest">
                  91-4829-1049-8892
                </p>
              </div>

              {/* QR Code Graphic */}
              <div className="rounded-xl bg-white p-2.5 shadow-md">
                <div className="grid size-20 place-items-center bg-slate-950 text-white rounded">
                  <QrCode className="size-16 text-white" />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10 text-[10px] text-white/60 font-semibold">
              <span>Gender: {patient.gender} • DOB: 1999</span>
              <span>Mobile: {patient.mobile}</span>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <ActionButton
              className="flex-1"
              onClick={() => toast.success("ABHA Card image saved to device gallery!")}
            >
              <Download className="size-4" /> Download Card
            </ActionButton>
            <ActionButton
              variant="outline"
              onClick={() => toast.info("ABHA Link copied to clipboard.")}
            >
              <Copy className="size-4" />
            </ActionButton>
            <ActionButton
              variant="outline"
              onClick={() => setAbhaCardOpen(false)}
            >
              Close
            </ActionButton>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
}

function ConsentRow({
  label,
  copy,
  checked,
  onChange,
}: {
  label: string;
  copy?: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 shadow-xs">
      <div className="min-w-0">
        <span className="text-sm font-extrabold text-foreground">{label}</span>
        {copy ? <p className="text-xs text-muted-foreground mt-0.5">{copy}</p> : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        className={cn(
          "relative h-7 w-12 shrink-0 rounded-full transition-colors",
          checked ? "bg-success" : "bg-border",
        )}
      >
        <span
          className={cn(
            "absolute top-1 size-5 rounded-full bg-white shadow transition-all",
            checked ? "left-6" : "left-1",
          )}
        />
      </button>
    </div>
  );
}

/* ==========================================================================
   6. EDIT PATIENT PROFILE MODAL
   ========================================================================== */

export function EditProfileModal({
  isOpen,
  onClose,
  patient,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientProfile;
  onSave: (updated: PatientProfile) => void;
}) {
  const [form, setForm] = useState(patient);

  useEffect(() => {
    setForm(patient);
  }, [patient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    toast.success("Profile Updated Successfully!");
    onClose();
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Patient Profile & Health Identity"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 sm:col-span-1">
            <label className="text-xs font-bold text-muted-foreground uppercase">
              Full Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-xl border border-border bg-card p-2.5 text-sm font-semibold outline-none focus:border-primary"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="text-xs font-bold text-muted-foreground uppercase">
              Mobile Number
            </label>
            <input
              type="text"
              required
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              className="mt-1 w-full rounded-xl border border-border bg-card p-2.5 text-sm font-semibold outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase">Age</label>
            <input
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
              className="mt-1 w-full rounded-xl border border-border bg-card p-2.5 text-sm font-semibold outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase">Gender</label>
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value as any })}
              className="mt-1 w-full rounded-xl border border-border bg-card p-2.5 text-sm font-semibold outline-none focus:border-primary"
            >
              <option value="M">Male (M)</option>
              <option value="F">Female (F)</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase">Blood Group</label>
            <input
              type="text"
              value={form.bloodGroup}
              onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
              className="mt-1 w-full rounded-xl border border-border bg-card p-2.5 text-sm font-semibold outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase">
              ABHA Handle
            </label>
            <input
              type="text"
              value={form.abhaId}
              onChange={(e) => setForm({ ...form, abhaId: e.target.value })}
              className="mt-1 w-full rounded-xl border border-border bg-card p-2.5 text-sm font-semibold outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase">
              Prakriti Constitution
            </label>
            <input
              type="text"
              value={form.prakriti}
              onChange={(e) => setForm({ ...form, prakriti: e.target.value })}
              className="mt-1 w-full rounded-xl border border-border bg-card p-2.5 text-sm font-semibold outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase">
            Allergies (Comma separated)
          </label>
          <input
            type="text"
            value={form.allergies.join(", ")}
            onChange={(e) =>
              setForm({
                ...form,
                allergies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
              })
            }
            className="mt-1 w-full rounded-xl border border-border bg-card p-2.5 text-sm font-semibold outline-none focus:border-primary"
          />
        </div>

        <div className="pt-3 flex gap-2">
          <ActionButton type="submit" className="flex-1">
            <Check className="size-4" /> Save Changes
          </ActionButton>
          <ActionButton variant="outline" onClick={onClose}>
            Cancel
          </ActionButton>
        </div>
      </form>
    </ModalWrapper>
  );
}

/* ==========================================================================
   6. SUMMARY SCREEN (PRE-CONSULTATION CLINICAL REPORT)
   ========================================================================== */

export function SummaryScreen({
  patient,
  token,
  language,
  onGo,
}: {
  patient: PatientProfile;
  token: TokenState;
  language: Language;
  onGo?: (tab: TabId) => void;
}) {
  const t = TRANSLATIONS[language];
  const [report, setReport] = useState<ClinicalReportData>(DEFAULT_CLINICAL_REPORT);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [doctorMode, setDoctorMode] = useState(false);
  const [doctorSigned, setDoctorSigned] = useState(true);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [abhaSynced, setAbhaSynced] = useState(true);

  const handlePrint = () => {
    window.print();
  };

  const handlePlayVoice = () => {
    if (isPlayingAudio) {
      window.speechSynthesis?.cancel();
      setIsPlayingAudio(false);
      return;
    }

    if ("speechSynthesis" in window) {
      setIsPlayingAudio(true);
      const utter = new SpeechSynthesisUtterance(report.voiceIntake.rawTranscript);
      utter.lang = "hi-IN";
      utter.rate = 0.95;
      utter.onend = () => setIsPlayingAudio(false);
      utter.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utter);
      toast.info("🔊 Playing patient voice intake transcript...");
    } else {
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 3000);
      toast.info("🔊 Simulated Voice Intake Playback (00:42)");
    }
  };

  const handleSyncAbha = () => {
    setAbhaSynced(true);
    toast.success("✓ Report pushed to ABHA Health Locker", {
      description: `Linked to ABHA: ${patient.abhaId} under ABDM Consent Artifact #ABDM-CR-9042`,
    });
  };

  return (
    <div className="mk-screen-in space-y-5">
      {/* Web Controls Top Bar (Hidden on Print) */}
      <div className="mk-no-print flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-card border border-border p-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-extrabold text-foreground tracking-tight">
              {t.clinicalSummaryTitle}
            </h1>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-black text-emerald-700 border border-emerald-500/20">
              ● READY FOR DOCTOR REVIEW
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Auto-synthesized by ClinSync AI for Room {token.room.replace("Room ", "")} ({token.doctor})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handlePlayVoice}
            className={cn(
              "flex items-center gap-1.5 rounded-xl border border-border bg-secondary px-3 py-2 text-xs font-bold text-foreground hover:bg-border transition-all active:scale-95",
              isPlayingAudio && "border-primary bg-primary/10 text-primary animate-pulse",
            )}
            title="Listen to patient speech audio"
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="size-4 text-primary animate-bounce" />
                <span>Playing Audio...</span>
              </>
            ) : (
              <>
                <Volume2 className="size-4 text-muted-foreground" />
                <span>Listen Audio (00:42)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleSyncAbha}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-secondary px-3 py-2 text-xs font-bold text-foreground hover:bg-border transition-all active:scale-95"
            title="Push to ABHA Health Locker"
          >
            <Sparkles className="size-4 text-accent" />
            <span>{abhaSynced ? "ABHA Synced ✓" : "Sync ABHA"}</span>
          </button>

          <button
            type="button"
            onClick={() => setShareModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-secondary px-3 py-2 text-xs font-bold text-foreground hover:bg-border transition-all active:scale-95"
            title="Share with doctor or patient"
          >
            <Share2 className="size-4 text-muted-foreground" />
            <span>Share / QR</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow hover:bg-primary/90 transition-all active:scale-95"
            title="Print A4 Clinical Report Sheet"
          >
            <Printer className="size-4" />
            <span>{t.printReport}</span>
          </button>
        </div>
      </div>

      {/* Printable / Viewable Clinical Report Document */}
      <div className="print-clean-page mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-300 bg-white p-6 md:p-10 text-slate-900 shadow-xl font-sans">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b-2 border-slate-900">
          <div className="flex items-center gap-3">
            <img
              src="/clinsync-logo.png"
              alt="ClinSync"
              className="h-10 sm:h-12 w-auto object-contain shrink-0"
            />
            <div className="hidden sm:block h-8 w-px bg-slate-300 mx-1" />
            <span className="text-xs sm:text-sm font-black tracking-wider text-slate-800 uppercase">
              | PRE-CONSULTATION CLINICAL REPORT
            </span>
          </div>

          <div className="text-left sm:text-right text-[11px] font-medium text-slate-700 space-y-0.5 shrink-0">
            <div>
              <span className="font-bold text-slate-900">DATE:</span> {report.date}
            </div>
            <div>
              <span className="font-bold text-slate-900">STATUS:</span>{" "}
              <span className="font-extrabold text-emerald-700">{report.status}</span>
            </div>
            <div>
              <span className="font-bold text-slate-900">REPORT ID:</span>{" "}
              <span className="font-mono font-bold text-slate-900">
                #CS-2026-{token.number || "042"}
              </span>
            </div>
          </div>
        </div>

        {/* Patient Demographics & Token Card */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-lg border border-slate-300 bg-slate-50/80 p-3.5 text-xs">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              PATIENT DEMOGRAPHICS
            </p>
            <p className="text-slate-900">
              <strong>Name:</strong>{" "}
              <span className="font-bold text-slate-900">
                {patient.name} ({patient.age} {patient.gender})
              </span>
            </p>
            <p className="text-slate-700">
              <strong>ABHA ID:</strong> <span className="font-mono">{patient.abhaId}</span> |{" "}
              <strong>Mobile:</strong> {patient.mobile}
            </p>
          </div>

          <div className="space-y-1 sm:border-l sm:border-slate-200 sm:pl-4">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              APPOINTMENT & TOKEN DETAILS
            </p>
            <p className="text-slate-900">
              <strong>Token Number:</strong>{" "}
              <span className="font-black text-[#009688]">#{token.number}</span> |{" "}
              <strong>Room:</strong> {token.room.replace("Room ", "") || "12"}
            </p>
            <p className="text-slate-700">
              <strong>Doctor:</strong> {token.doctor} ({token.department || "Ayurveda OPD"})
            </p>
          </div>
        </div>

        {/* 1. History of Present Illness */}
        <div className="mt-5">
          <h2 className="text-xs font-black tracking-wide text-slate-900 uppercase">
            1. HISTORY OF PRESENT ILLNESS (ClinSync VOICE INTAKE)
          </h2>

          <div className="mt-2 overflow-x-auto rounded border border-slate-300">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/90 text-[11px] font-black text-slate-700 border-b border-slate-300">
                  <th className="w-1/3 p-2.5 border-r border-slate-300 uppercase tracking-wider">
                    PARAMETER
                  </th>
                  <th className="p-2.5 uppercase tracking-wider">
                    CLINICAL FINDING (PARSED NARRATIVE)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                <tr>
                  <td className="p-2.5 font-bold bg-slate-50/50 border-r border-slate-300">
                    Chief Complaint
                  </td>
                  <td className="p-2.5 font-semibold text-slate-900">
                    {report.voiceIntake.chiefComplaint}
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold bg-slate-50/50 border-r border-slate-300">
                    Onset & Site
                  </td>
                  <td className="p-2.5">{report.voiceIntake.onsetAndSite}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold bg-slate-50/50 border-r border-slate-300">
                    Character & Severity
                  </td>
                  <td className="p-2.5">{report.voiceIntake.characterAndSeverity}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold bg-slate-50/50 border-r border-slate-300">
                    Aggravating Factors
                  </td>
                  <td className="p-2.5">{report.voiceIntake.aggravatingFactors}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold bg-slate-50/50 border-r border-slate-300">
                    Associated Symptoms
                  </td>
                  <td className="p-2.5">{report.voiceIntake.associatedSymptoms}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Raw Speech Transcript */}
          <div className="mt-2.5 space-y-1">
            <p className="text-[11px] font-bold text-slate-800">
              Raw Speech Transcript (ClinSync ASR):
            </p>
            <div className="flex items-center justify-between gap-3 rounded bg-slate-50 border border-slate-200 p-2.5 text-xs italic text-slate-700">
              <span>"{report.voiceIntake.rawTranscript}"</span>
              <button
                type="button"
                onClick={handlePlayVoice}
                className="mk-no-print shrink-0 flex items-center gap-1 text-[11px] font-bold text-primary hover:underline"
              >
                <Volume2 className="size-3.5" />
                {isPlayingAudio ? "Pause" : "Play"}
              </button>
            </div>
          </div>
        </div>

        {/* 2. Clinical & AYUSH Baseline Profile */}
        <div className="mt-5">
          <h2 className="text-xs font-black tracking-wide text-slate-900 uppercase">
            2. CLINICAL & AYUSH BASELINE PROFILE
          </h2>

          <div className="mt-2 overflow-x-auto rounded border border-slate-300">
            <table className="w-full text-center text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/90 text-[10px] font-black text-slate-700 border-b border-slate-300">
                  <th className="p-2 border-r border-slate-300 uppercase tracking-wider">
                    PRAKRITI
                  </th>
                  <th className="p-2 border-r border-slate-300 uppercase tracking-wider">
                    AGNI STATUS
                  </th>
                  <th className="p-2 border-r border-slate-300 uppercase tracking-wider">
                    KOSHTHA
                  </th>
                  <th className="p-2 border-r border-slate-300 uppercase tracking-wider">
                    BLOOD GROUP
                  </th>
                  <th className="p-2 uppercase tracking-wider">KNOWN ALLERGIES</th>
                </tr>
              </thead>
              <tbody>
                <tr className="divide-x divide-slate-300 text-xs">
                  <td className="p-2.5 font-bold text-slate-900">
                    {patient.prakriti.split(" ")[0] || report.ayushBaseline.prakriti}
                  </td>
                  <td className="p-2.5 font-bold text-amber-700">
                    {report.ayushBaseline.agniStatus}
                  </td>
                  <td className="p-2.5 font-semibold text-slate-800">
                    {report.ayushBaseline.koshtha}
                  </td>
                  <td className="p-2.5 font-semibold text-slate-800">
                    {patient.bloodGroup.split(" ")[0] || report.ayushBaseline.bloodGroup}
                  </td>
                  <td className="p-2.5 font-black text-red-600 bg-red-50/40">
                    {patient.allergies[0] ? `${patient.allergies[0]} Group` : report.ayushBaseline.knownAllergies}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. ClinSync OCR Intelligence & Safety Audit */}
        <div className="mt-5">
          <h2 className="text-xs font-black tracking-wide text-slate-900 uppercase">
            3. ClinSync OCR INTELLIGENCE & SAFETY AUDIT
          </h2>

          <div className="mt-2 overflow-x-auto rounded border border-slate-300">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/90 text-[11px] font-black text-slate-700 border-b border-slate-300">
                  <th className="w-1/3 p-2.5 border-r border-slate-300 uppercase tracking-wider">
                    CATEGORY
                  </th>
                  <th className="p-2.5 uppercase tracking-wider">
                    EXTRACTED DETAILS & AUTOMATED AUDIT FINDINGS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                <tr>
                  <td className="p-2.5 font-bold bg-slate-50/50 border-r border-slate-300">
                    Active Medication
                  </td>
                  <td className="p-2.5 font-medium text-slate-900">
                    <strong>Paracetamol 500mg (1-0-1)</strong>{" "}
                    <span className="text-slate-600">[Scanned 10-Jul-2026 Prescription]</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-amber-800 bg-amber-50/30 border-r border-slate-300">
                    Duplicate Drug Flag
                  </td>
                  <td className="p-2.5 text-amber-900">
                    <strong className="text-amber-700">WARNING:</strong> Prior NSAID painkiller
                    detected. Risk of aggravating gastric mucosa burning.
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-red-800 bg-red-50/30 border-r border-slate-300">
                    Allergy Guard
                  </td>
                  <td className="p-2.5 text-red-900">
                    <strong className="text-red-600">BLOCKED:</strong> Penicillin antibiotics locked
                    in e-prescription module based on patient profile.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Physician Examination & Prescription Sheet */}
        <div className="mt-5">
          <h2 className="text-xs font-black tracking-wide text-slate-900 uppercase">
            4. PHYSICIAN EXAMINATION & PRESCRIPTION SHEET (DOCTOR USE ONLY)
          </h2>

          <div className="mt-2 rounded-lg border border-slate-300 p-4 space-y-3.5 bg-white">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                PHYSICAL & NADI EXAMINATION NOTES:
              </p>
              <p className="mt-1 text-xs text-slate-800">
                {report.physicianNotes.physicalAndNadiNotes}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                CLINICAL DIAGNOSIS:
              </p>
              <p className="mt-1 text-xs font-black text-slate-900">
                {report.physicianNotes.clinicalDiagnosis}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                TREATMENT PLAN & PRESCRIPTION (RX):
              </p>
              <ol className="mt-1 list-decimal list-inside space-y-1 text-xs text-slate-800">
                {report.physicianNotes.prescriptions.map((rx, idx) => (
                  <li key={idx}>
                    <strong>{rx.medicine}</strong> — {rx.instructions}
                  </li>
                ))}
              </ol>
            </div>

            {/* Doctor Signature Line */}
            <div className="pt-4 flex items-end justify-between">
              <div className="text-[10px] text-slate-400 font-mono">
                Digitally authenticated by ClinSync Hospital Information System (HIS)
              </div>
              <div className="text-right">
                <div className="w-56 border-b border-dashed border-slate-400 mb-1" />
                <p className="text-xs font-medium text-slate-700">
                  {report.physicianNotes.doctorName} (Signature)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Document Footer Bar */}
        <div className="mt-6 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-[10px] text-slate-500">
          <div>
            ClinSync Smart OPD Kiosk v2.5 • ABDM M3 Compliant • DPDP Act 2023 Certified
          </div>
          <div>Page 1 of 1</div>
        </div>
      </div>

      {/* Share Modal */}
      <ModalWrapper
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        maxWidth="max-w-md"
      >
        <div className="text-center space-y-4">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
            <QrCode className="size-7" />
          </div>
          <div>
            <h2 className="text-lg font-black text-foreground">
              Share Pre-Consultation Summary
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              QR Code & ABHA Direct Link for Room {token.room} ({token.doctor})
            </p>
          </div>

          <div className="mx-auto size-44 rounded-2xl bg-white p-3 shadow-inner border border-border flex items-center justify-center">
            <div className="text-center space-y-1">
              <div className="grid size-32 place-items-center rounded-xl bg-slate-900 text-white font-mono text-xs font-black">
                [ CLINSYNC QR ]
                <span className="text-[9px] text-emerald-400">#CS-2026-042</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-secondary p-3 text-xs font-mono text-left break-all text-muted-foreground">
            https://clinsync.health/report/#CS-2026-{token.number || "042"}
          </div>

          <div className="flex gap-2">
            <ActionButton
              className="flex-1"
              onClick={() => {
                navigator.clipboard?.writeText(
                  `https://clinsync.health/report/#CS-2026-${token.number || "042"}`,
                );
                toast.success("Report link copied to clipboard!");
                setShareModalOpen(false);
              }}
            >
              <Copy className="size-4" /> Copy Link
            </ActionButton>
            <ActionButton variant="outline" onClick={() => setShareModalOpen(false)}>
              Close
            </ActionButton>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
}

