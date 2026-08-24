import { useState } from "react";
import { Bell, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ActionButton } from "./primitives";
import {
  BookScreen,
  HomeScreen,
  IntakeScreen,
  ProfileScreen,
  VaultScreen,
} from "./screens";
import { DEFAULT_TOKEN, NAV_ITEMS, type Doctor, type TabId } from "./data";

export function MediKioskApp() {
  const [tab, setTab] = useState<TabId>("home");
  const [token, setToken] = useState(DEFAULT_TOKEN);
  const [language, setLanguage] = useState("ENG");
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [consents, setConsents] = useState({ shareSummary: true, cacheVoice: false });
  const [notice, setNotice] = useState<string | null>(null);

  const go = (next: TabId) => setTab(next);

  const handleBook = (doctor: Doctor) => {
    setToken({
      number: doctor.token,
      doctor: doctor.name,
      department: doctor.department,
      room: doctor.room,
      waitMins: doctor.waitMins,
      ahead: doctor.available ? 2 : 5,
    });
    setNotice(`Token #${doctor.token} confirmed with ${doctor.name} · ${doctor.room}`);
    go("home");
  };

  const toggleConsent = (key: "shareSummary" | "cacheVoice") =>
    setConsents((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-shell text-shell-foreground lg:flex">
        <div className="border-b border-sidebar-border px-5 py-6">
          <p className="text-lg font-black tracking-tight text-white">MediKiosk</p>
          <p className="mt-2 inline-flex rounded-full bg-sidebar-accent px-3 py-1 text-xs font-semibold text-shell-muted">
            Nikhil Ladwani
          </p>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                tab === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-shell-muted hover:bg-sidebar-accent hover:text-white",
              )}
            >
              <span className="text-base">{item.emoji}</span>
              <span className="truncate">{item.long}</span>
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setEmergencyOpen(true)}
          className="m-3 rounded-2xl bg-emergency px-4 py-4 text-left text-sm font-bold text-emergency-foreground transition-opacity hover:opacity-90"
        >
          🚨 CHEST PAIN? TAP FOR NURSE ASSIST
        </button>
      </aside>

      {/* Main column */}
      <div className="flex min-h-screen w-full flex-col lg:pl-64">
        {/* Desktop header */}
        <header className="sticky top-0 z-30 hidden border-b border-border bg-card/90 backdrop-blur lg:block">
          <div className="flex items-center gap-4 px-8 py-4">
            <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl bg-muted px-4 py-2.5">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                placeholder="Search doctors, records, prescriptions..."
              />
            </label>
            <button
              type="button"
              onClick={() => setLanguage((l) => (l === "ENG" ? "हिंदी" : "ENG"))}
              className="shrink-0 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"
            >
              🌐 {language === "ENG" ? "ENG / हिंदी" : "हिंदी / ENG"}
            </button>
            <button
              type="button"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-muted-foreground hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="size-4" />
            </button>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              NL
            </span>
          </div>
        </header>

        {/* Mobile top strip */}
        <div className="flex items-center justify-between gap-3 bg-shell px-4 py-3 lg:hidden">
          <span className="text-base font-black text-white">MediKiosk</span>
          <button
            type="button"
            onClick={() => setLanguage((l) => (l === "ENG" ? "हिंदी" : "ENG"))}
            className="rounded-full bg-sidebar-accent px-3 py-1 text-xs font-semibold text-shell-foreground"
          >
            🌐 {language}
          </button>
        </div>

        <main className="w-full flex-1 px-4 pt-5 pb-44 lg:px-8 lg:pt-6 lg:pb-10">
          <div className="mx-auto w-full max-w-6xl">
            {notice ? (
              <div className="mb-4 flex items-start justify-between gap-3 rounded-2xl bg-success-soft px-4 py-3 text-sm font-semibold text-success">
                <span className="min-w-0">{notice}</span>
                <button
                  type="button"
                  onClick={() => setNotice(null)}
                  aria-label="Dismiss"
                  className="shrink-0"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : null}

            {tab === "home" ? (
              <HomeScreen token={token} onGo={go} language={language} />
            ) : null}
            {tab === "book" ? (
              <BookScreen language={language} onBook={handleBook} />
            ) : null}
            {tab === "intake" ? (
              <IntakeScreen onBack={() => go("home")} onNext={() => go("vault")} />
            ) : null}
            {tab === "vault" ? <VaultScreen /> : null}
            {tab === "profile" ? (
              <ProfileScreen consents={consents} onToggleConsent={toggleConsent} />
            ) : null}
          </div>
        </main>
      </div>

      {/* Mobile emergency banner + bottom nav */}
      <div className="fixed bottom-0 left-0 z-40 w-full lg:hidden">
        <button
          type="button"
          onClick={() => setEmergencyOpen(true)}
          className="w-full bg-emergency px-4 py-3 text-sm font-bold text-emergency-foreground"
        >
          🚨 CHEST PAIN? TAP FOR NURSE ASSIST
        </button>
        <nav className="grid grid-cols-5 border-t border-border bg-card pb-[env(safe-area-inset-bottom)]">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className={cn(
                "flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors",
                tab === item.id ? "text-primary" : "text-muted-foreground",
              )}
            >
              <span className="text-lg">{item.emoji}</span>
              {item.short}
            </button>
          ))}
        </nav>
      </div>

      {emergencyOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-shell/70 px-4 backdrop-blur-sm">
          <div className="mk-card w-full max-w-md p-6 text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-emergency-soft text-2xl">
              🚨
            </span>
            <h2 className="mt-4 text-lg font-extrabold text-emergency">
              Emergency triage alert sent
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A nurse has been paged to your kiosk. Stay seated — cardiac priority
              protocol activated for Patient #8892 (Token #{token.number}).
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <ActionButton variant="danger" className="flex-1">
                Call 108 Ambulance
              </ActionButton>
              <ActionButton
                variant="outline"
                className="flex-1"
                onClick={() => setEmergencyOpen(false)}
              >
                Dismiss
              </ActionButton>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
