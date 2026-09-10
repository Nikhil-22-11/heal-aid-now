import { useState } from "react";
import {
  Activity,
  AlertOctagon,
  ArrowRight,
  Bell,
  CheckCheck,
  PhoneCall,
  Search,
  ShieldAlert,
  User,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ActionButton, ClinSyncLogo, ModalWrapper, Pill } from "./primitives";
import {
  BookScreen,
  EditProfileModal,
  HomeScreen,
  IntakeScreen,
  ProfileScreen,
  SummaryScreen,
  VaultScreen,
} from "./screens";
import {
  DEFAULT_TOKEN,
  DOCTORS,
  INITIAL_NOTIFICATIONS,
  INITIAL_PATIENT,
  NAV_ITEMS,
  SPECIALTIES,
  TRANSLATIONS,
  type ClinicNotification,
  type Doctor,
  type Language,
  type PatientProfile,
  type TabId,
  type TokenState,
} from "./data";

export function ClinSyncApp() {
  const [tab, setTab] = useState<TabId>("home");
  const [token, setToken] = useState<TokenState>(DEFAULT_TOKEN);
  const [patient, setPatient] = useState<PatientProfile>(INITIAL_PATIENT);
  const [language, setLanguage] = useState<Language>("ENG");
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [ambulanceCalling, setAmbulanceCalling] = useState(false);
  const [ambulanceTimer, setAmbulanceTimer] = useState(5);
  const [nurseAlerted, setNurseAlerted] = useState(false);
  const [consents, setConsents] = useState({
    shareSummary: true,
    cacheVoice: false,
    teleconsult: true,
  });
  const [notice, setNotice] = useState<string | null>(
    "Welcome to ClinSync Kiosk. Token #042 is active for Room 12.",
  );

  // Global Search Modal
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  // Notifications Modal
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<ClinicNotification[]>(INITIAL_NOTIFICATIONS);

  // Edit Profile Modal
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const t = TRANSLATIONS[language];

  const go = (next: TabId) => setTab(next);

  const handleBook = (doctor: Doctor) => {
    setToken({
      number: doctor.token,
      doctor: doctor.name,
      department: doctor.department,
      room: doctor.room,
      waitMins: doctor.waitMins,
      ahead: doctor.available ? 2 : 5,
      bookedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "Waiting",
    });
    setNotice(
      `Token #${doctor.token} confirmed with ${doctor.name} (${doctor.room})`,
    );
    go("home");
  };

  const toggleConsent = (key: "shareSummary" | "cacheVoice" | "teleconsult") => {
    setConsents((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      toast.info(`Consent Setting Updated: ${key}`);
      return updated;
    });
  };

  const handleTriggerEmergency = () => {
    setEmergencyOpen(true);
    setNurseAlerted(false);
    setAmbulanceCalling(false);
    setAmbulanceTimer(5);
  };

  const handleCallAmbulance = () => {
    setAmbulanceCalling(true);
    toast.error("🚨 108 Emergency Ambulance Dispatched!", {
      description: "Priority GPS location broadcasted to Central Ambulance Fleet.",
    });
    const interval = setInterval(() => {
      setAmbulanceTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAlertNurse = () => {
    setNurseAlerted(true);
    toast.warning("🚨 Floor Nurse Paged to Kiosk #01", {
      description: `Nurse assigned: Sister Anjali (ETA: ~45 seconds). Protocol active for Patient #${patient.id}.`,
    });
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read.");
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Search results
  const searchResults = searchKeyword.trim()
    ? DOCTORS.filter(
        (d) =>
          d.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          d.department.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          d.subSpecialty.toLowerCase().includes(searchKeyword.toLowerCase()),
      )
    : [];

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-white">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-card text-card-foreground lg:flex border-r border-border shadow-xs z-40">
        <div className="border-b border-border px-5 py-5">
          <ClinSyncLogo size="md" variant="light" />
          <button
            type="button"
            onClick={() => setEditProfileOpen(true)}
            className="mt-3 flex items-center justify-between w-full rounded-xl bg-muted/80 px-3 py-2 text-xs font-bold text-foreground hover:bg-secondary border border-border transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span className="truncate">{patient.name}</span>
            </div>
            <span className="text-[10px] text-primary font-black uppercase">Edit ⚙️</span>
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm font-bold"
                    : "text-slate-600 hover:bg-muted hover:text-slate-900 dark:text-slate-400 dark:hover:bg-muted dark:hover:text-slate-100",
                )}
              >
                <span className="text-lg">{item.emoji}</span>
                <span className="truncate">
                  {language === "हिंदी" ? item.longHi : item.long}
                </span>
                {item.id === "home" ? (
                  <span
                    className={cn(
                      "ml-auto rounded-full px-2 py-0.5 text-[10px] font-black",
                      active
                        ? "bg-white/20 text-white"
                        : "bg-primary/10 text-primary border border-primary/20",
                    )}
                  >
                    #{token.number}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* Desktop Emergency Triage Button */}
        <div className="p-3 border-t border-border bg-muted/30">
          <button
            type="button"
            onClick={handleTriggerEmergency}
            className="w-full rounded-2xl bg-destructive hover:bg-red-700 p-3.5 text-left text-xs font-black text-white shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">🚨</span>
              <span className="leading-tight">CHEST PAIN? NURSE ASSIST</span>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex min-h-screen w-full flex-col lg:pl-64">
        {/* Desktop Sticky Header */}
        <header className="sticky top-0 z-30 hidden border-b border-border bg-card/90 backdrop-blur-md lg:block">
          <div className="flex items-center gap-4 px-8 py-3.5">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl bg-muted px-4 py-2.5 text-left text-sm text-muted-foreground hover:bg-secondary transition-colors"
            >
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate">{t.searchPlaceholder}</span>
              <kbd className="ml-auto hidden rounded bg-card px-1.5 py-0.5 text-[10px] font-bold border border-border sm:inline-block">
                Ctrl K
              </kbd>
            </button>

            {/* Language Switch */}
            <button
              type="button"
              onClick={() => {
                const nextLang = language === "ENG" ? "हिंदी" : "ENG";
                setLanguage(nextLang);
                toast.info(`Language switched to ${nextLang === "ENG" ? "English" : "हिंदी"}`);
              }}
              className="shrink-0 rounded-full border border-border px-4 py-2 text-xs font-bold hover:bg-secondary transition-all active:scale-95 shadow-xs"
            >
              🌐 {language === "ENG" ? "ENG / हिंदी" : "हिंदी / ENG"}
            </button>

            {/* Notifications Button */}
            <button
              type="button"
              onClick={() => setNotificationsOpen(true)}
              className="relative grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-border transition-colors active:scale-95"
              aria-label="Notifications"
            >
              <Bell className="size-4" />
              {unreadCount > 0 ? (
                <span className="absolute -top-0.5 -right-0.5 grid size-5 place-items-center rounded-full bg-emergency text-[10px] font-black text-white ring-2 ring-card animate-bounce">
                  {unreadCount}
                </span>
              ) : null}
            </button>

            {/* Avatar Pill */}
            <button
              type="button"
              onClick={() => setEditProfileOpen(true)}
              className="flex items-center gap-2 rounded-full border border-border bg-card p-1 pr-3 hover:bg-secondary transition-all active:scale-95"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-black text-primary-foreground shadow-sm">
                {patient.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </span>
              <span className="text-xs font-bold text-foreground">
                {patient.name}
              </span>
            </button>
          </div>
        </header>

        {/* Mobile Top Header */}
        <div className="flex items-center justify-between gap-3 bg-shell px-4 py-3 shadow-md lg:hidden z-30">
          <ClinSyncLogo size="sm" />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const nextLang = language === "ENG" ? "हिंदी" : "ENG";
                setLanguage(nextLang);
                toast.info(`Language switched to ${nextLang === "ENG" ? "English" : "हिंदी"}`);
              }}
              className="rounded-full bg-sidebar-accent px-3 py-1 text-xs font-bold text-shell-foreground active:scale-95"
            >
              🌐 {language}
            </button>
            <button
              type="button"
              onClick={() => setNotificationsOpen(true)}
              className="relative grid size-8 place-items-center rounded-full bg-sidebar-accent text-shell-foreground"
              aria-label="Notifications"
            >
              <Bell className="size-3.5" />
              {unreadCount > 0 ? (
                <span className="absolute -top-1 -right-1 size-2 rounded-full bg-emergency" />
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => setEditProfileOpen(true)}
              className="grid size-8 place-items-center rounded-full bg-primary text-xs font-black text-white"
            >
              {patient.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="w-full flex-1 px-4 pt-5 pb-44 lg:px-8 lg:pt-6 lg:pb-12">
          <div className="mx-auto w-full max-w-6xl space-y-4">
            {/* Global Notice Banner */}
            {notice ? (
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-xs font-bold text-emerald-800 animate-in fade-in">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="min-w-0">{notice}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setNotice(null)}
                  aria-label="Dismiss notice"
                  className="shrink-0 p-1 hover:opacity-75"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            ) : null}

            {/* Tab Rendering */}
            {tab === "home" ? (
              <HomeScreen
                token={token}
                patient={patient}
                onGo={go}
                language={language}
                onEditProfile={() => setEditProfileOpen(true)}
              />
            ) : null}

            {tab === "book" ? (
              <BookScreen
                language={language}
                patient={patient}
                onBook={handleBook}
              />
            ) : null}

            {tab === "intake" ? (
              <IntakeScreen
                onBack={() => go("home")}
                onNext={() => go("summary")}
                language={language}
              />
            ) : null}

            {tab === "summary" ? (
              <SummaryScreen
                patient={patient}
                token={token}
                language={language}
                onGo={go}
              />
            ) : null}

            {tab === "vault" ? <VaultScreen patient={patient} /> : null}

            {tab === "profile" ? (
              <ProfileScreen
                patient={patient}
                consents={consents}
                onToggleConsent={toggleConsent}
                onEditProfile={() => setEditProfileOpen(true)}
              />
            ) : null}
          </div>
        </main>
      </div>

      {/* Mobile Emergency Banner + Fixed Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 z-40 w-full lg:hidden shadow-2xl">
        <button
          type="button"
          onClick={handleTriggerEmergency}
          className="w-full bg-destructive hover:bg-red-700 px-4 py-3 text-center text-xs font-black text-white shadow-md"
        >
          {t.emergencyBanner}
        </button>

        <nav className="grid grid-cols-6 border-t border-border bg-card pb-[env(safe-area-inset-bottom)]">
          {NAV_ITEMS.map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className={cn(
                  "flex min-h-16 flex-col items-center justify-center gap-1 text-[9px] font-bold transition-all px-0.5",
                  active
                    ? "text-primary bg-primary/5 scale-105"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="text-base">{item.emoji}</span>
                <span className="truncate w-full text-center">{language === "हिंदी" ? item.shortHi : item.short}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Emergency Triage Modal */}
      <ModalWrapper
        isOpen={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
        maxWidth="max-w-md"
      >
        <div className="text-center space-y-4">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-emergency-soft text-3xl shadow-inner animate-pulse">
            🚨
          </span>
          <div>
            <h2 className="text-lg font-black text-emergency tracking-tight">
              {t.emergencyAlertTitle}
            </h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Stay seated at Kiosk #01. Cardiac and critical triage protocol
              activated for <strong>{patient.name}</strong> (Token #{token.number}).
            </p>
          </div>

          {ambulanceCalling ? (
            <div className="rounded-2xl bg-emergency/10 border border-emergency/30 p-4 text-xs space-y-2">
              <p className="font-extrabold text-emergency">
                Connecting to Emergency Control Room...
              </p>
              <p className="text-muted-foreground">
                Dispatch Beacon Active. Estimated Ambulance ETA: <strong>06:30 mins</strong>
              </p>
            </div>
          ) : null}

          {nurseAlerted ? (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 font-bold">
              ✓ Floor Nurse Acknowledged. Approaching your kiosk now.
            </div>
          ) : null}

          <div className="flex flex-col gap-2 pt-2">
            <ActionButton
              variant="danger"
              className="w-full"
              onClick={handleCallAmbulance}
            >
              <PhoneCall className="size-4" /> {t.callAmbulance}
            </ActionButton>

            {!nurseAlerted ? (
              <ActionButton
                variant="outline"
                className="w-full"
                onClick={handleAlertNurse}
              >
                <ShieldAlert className="size-4 text-warning" /> {t.alertNurse}
              </ActionButton>
            ) : null}

            <ActionButton
              variant="ghost"
              className="w-full"
              onClick={() => setEmergencyOpen(false)}
            >
              {t.dismiss}
            </ActionButton>
          </div>
        </div>
      </ModalWrapper>

      {/* Global Search Modal */}
      <ModalWrapper
        isOpen={searchModalOpen}
        onClose={() => {
          setSearchModalOpen(false);
          setSearchKeyword("");
        }}
        title="Quick Search ClinSync Hub"
        maxWidth="max-w-lg"
      >
        <div className="space-y-4 text-left">
          <label className="flex items-center gap-2 rounded-xl border border-primary bg-card p-3 shadow-inner">
            <Search className="size-4 text-primary" />
            <input
              autoFocus
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search doctors, departments, symptoms, medicines..."
              className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-muted-foreground"
            />
            {searchKeyword ? (
              <button
                type="button"
                onClick={() => setSearchKeyword("")}
                className="text-xs text-muted-foreground font-bold hover:text-foreground"
              >
                Clear
              </button>
            ) : null}
          </label>

          <div className="max-h-72 overflow-y-auto space-y-2">
            {searchResults.length > 0 ? (
              searchResults.map((doctor) => (
                <button
                  key={doctor.id}
                  type="button"
                  onClick={() => {
                    handleBook(doctor);
                    setSearchModalOpen(false);
                    setSearchKeyword("");
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-border p-3 text-left hover:bg-secondary transition-colors"
                >
                  <div>
                    <p className="text-sm font-bold text-foreground">{doctor.name}</p>
                    <p className="text-xs text-primary">{doctor.department}</p>
                  </div>
                  <span className="rounded bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                    Book #{doctor.token}
                  </span>
                </button>
              ))
            ) : searchKeyword.trim() ? (
              <p className="text-xs text-center py-6 text-muted-foreground">
                No matching doctors found.
              </p>
            ) : (
              <div className="space-y-2 text-xs text-muted-foreground">
                <p className="font-bold uppercase tracking-wider">Quick Shortcuts</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchModalOpen(false);
                      go("book");
                    }}
                    className="rounded-xl border border-border p-3 text-left hover:bg-secondary font-semibold"
                  >
                    📅 Book OPD Token
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchModalOpen(false);
                      go("intake");
                    }}
                    className="rounded-xl border border-border p-3 text-left hover:bg-secondary font-semibold"
                  >
                    🎙️ AI Voice Intake
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchModalOpen(false);
                      go("vault");
                    }}
                    className="rounded-xl border border-border p-3 text-left hover:bg-secondary font-semibold"
                  >
                    📁 Scanned OCR Vault
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchModalOpen(false);
                      go("profile");
                    }}
                    className="rounded-xl border border-border p-3 text-left hover:bg-secondary font-semibold"
                  >
                    🪪 ABHA Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </ModalWrapper>

      {/* Notifications Drawer Modal */}
      <ModalWrapper
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        title="ClinSync Alerts & Notification Center"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-left">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-muted-foreground">
              {unreadCount} Unread Notifications
            </span>
            {unreadCount > 0 ? (
              <button
                type="button"
                onClick={handleMarkAllNotificationsRead}
                className="font-bold text-primary hover:underline flex items-center gap-1"
              >
                <CheckCheck className="size-3.5" /> Mark all read
              </button>
            ) : null}
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={cn(
                  "rounded-xl border p-3 text-xs transition-colors",
                  n.read
                    ? "border-border bg-card text-muted-foreground"
                    : "border-primary/30 bg-primary/5 text-foreground font-medium",
                )}
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-foreground">{n.title}</p>
                  <span className="text-[10px] text-muted-foreground">{n.time}</span>
                </div>
                <p className="mt-1 text-xs">{n.message}</p>
              </div>
            ))}
          </div>

          <ActionButton
            variant="outline"
            className="w-full text-xs"
            onClick={() => setNotificationsOpen(false)}
          >
            Close Notifications
          </ActionButton>
        </div>
      </ModalWrapper>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
        patient={patient}
        onSave={(updated) => setPatient(updated)}
      />
    </div>
  );
}
