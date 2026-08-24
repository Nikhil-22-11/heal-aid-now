import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ChevronLeft,
  FileText,
  Mic,
  Pill as PillIcon,
  RefreshCw,
  Stethoscope,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ActionButton, Pill, ScreenHeader, Section, SectionTitle } from "./primitives";
import type { Doctor, TabId, TokenState } from "./data";
import { DOCTORS, SPECIALTIES, VISITS } from "./data";

/* ---------------------------------- HOME ---------------------------------- */

export function HomeScreen({
  token,
  onGo,
  language,
}: {
  token: TokenState;
  onGo: (tab: TabId) => void;
  language: string;
}) {
  return (
    <div className="mk-screen-in space-y-5">
      <ScreenHeader
        title="MediKiosk"
        subtitle="Smart OPD queue & AYUSH intake"
        right={
          <>
            <Pill tone="neutral">🌐 {language}</Pill>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              NL
            </span>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Active token */}
        <div
          className="rounded-3xl bg-primary p-5 text-primary-foreground lg:col-span-2"
          style={{ boxShadow: "var(--shadow-token)" }}
        >
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <p className="min-w-0 truncate text-[11px] font-bold tracking-[0.16em] uppercase opacity-80">
              Active token today
            </p>
            <span className="shrink-0 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold">
              ● {token.room}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-end gap-x-5 gap-y-2">
            <span className="text-5xl leading-none font-black lg:text-6xl">
              #{token.number}
            </span>
            <div className="min-w-0">
              <p className="text-base font-bold">{token.doctor}</p>
              <p className="text-sm opacity-85">{token.department}</p>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between text-xs font-semibold opacity-90">
              <span>
                Wait Time: ~{token.waitMins} Mins ({token.ahead} Ahead)
              </span>
              <span>Live</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-primary-foreground/20">
              <div className="h-full w-2/3 rounded-full bg-accent" />
            </div>
          </div>

          <ActionButton
            variant="outline"
            className="mt-5 w-full border-transparent bg-primary-foreground text-primary hover:bg-primary-foreground/90 lg:w-auto lg:px-8"
            onClick={() => onGo("vault")}
          >
            View Live Summary
          </ActionButton>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          <QuickAction
            emoji="📅"
            title="Book Doctor"
            copy="Select & Queue"
            onClick={() => onGo("book")}
          />
          <QuickAction
            emoji="🎙️"
            title="AI Intake"
            copy="Voice Symptoms"
            onClick={() => onGo("intake")}
          />
        </div>

        {/* Health profile */}
        <Section className="lg:col-span-2">
          <SectionTitle>Health Profile</SectionTitle>
          <div className="mt-3 flex items-start gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-secondary text-sm font-bold">
              NL
            </span>
            <div className="min-w-0">
              <p className="truncate font-bold">Nikhil Ladwani (24 M)</p>
              <p className="text-sm text-muted-foreground">ABHA: nikhil@abdm</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Pill tone="danger">⚠️ Penicillin Allergy</Pill>
            <Pill tone="neutral">Prakriti: Vata-Pitta</Pill>
            <Pill tone="neutral">Agni: Manda</Pill>
          </div>
        </Section>
      </div>
    </div>
  );
}

function QuickAction({
  emoji,
  title,
  copy,
  onClick,
}: {
  emoji: string;
  title: string;
  copy: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mk-card group p-4 text-left transition-transform hover:-translate-y-0.5 hover:border-primary/40"
    >
      <span className="text-2xl">{emoji}</span>
      <p className="mt-3 font-bold">{title}</p>
      <p className="text-xs text-muted-foreground">{copy}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
        Open <ArrowRight className="size-3.5" />
      </span>
    </button>
  );
}

/* ---------------------------------- BOOK ---------------------------------- */

export function BookScreen({
  language,
  onBook,
}: {
  language: string;
  onBook: (doctor: Doctor) => void;
}) {
  const [specialty, setSpecialty] = useState(SPECIALTIES[0]!.id);

  return (
    <div className="mk-screen-in space-y-5">
      <ScreenHeader
        title="Book OPD Appointment"
        subtitle="Real-time doctor availability"
        right={<Pill tone="neutral">🌐 {language}</Pill>}
      />

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {SPECIALTIES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSpecialty(s.id)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              specialty === s.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-secondary",
            )}
          >
            {s.emoji} {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {DOCTORS.filter((d) => d.specialty === specialty).map((doctor) => (
          <Section key={doctor.id} className="flex flex-col">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <p className="truncate text-base font-bold">{doctor.name}</p>
                <p className="text-sm text-muted-foreground">
                  {doctor.subSpecialty} • {doctor.room}
                </p>
              </div>
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Stethoscope className="size-5" />
              </span>
            </div>

            <div className="mt-4">
              <Pill tone={doctor.available ? "success" : "warning"}>
                ● {doctor.statusLabel} • Wait: ~{doctor.waitMins}m
              </Pill>
            </div>

            <ActionButton
              variant={doctor.available ? "primary" : "ghost"}
              className="mt-4 w-full"
              onClick={() => onBook(doctor)}
            >
              {doctor.ctaLabel}
              {doctor.available ? <ArrowRight className="size-4" /> : null}
            </ActionButton>
          </Section>
        ))}
        {DOCTORS.every((d) => d.specialty !== specialty) ? (
          <Section className="text-sm text-muted-foreground">
            No doctors on duty in this specialty right now.
          </Section>
        ) : null}
      </div>
    </div>
  );
}

/* --------------------------------- INTAKE --------------------------------- */

const SYMPTOMS = [
  { emoji: "🤢", title: "Stomach / Agni", copy: "Acidity, Digestion" },
  { emoji: "🌡️", title: "Fever / Cold", copy: "High Temperature" },
  { emoji: "🦴", title: "Joint Stiffness", copy: "Vata Imbalance" },
  { emoji: "🩹", title: "Follow-up", copy: "Old Prescription" },
];

export function IntakeScreen({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (title: string) =>
    setSelected((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );

  return (
    <div className="mk-screen-in space-y-5">
      <ScreenHeader
        title="Step 1: Voice Intake"
        subtitle="Describe your symptoms in your language"
        right={<Pill tone="success">🌿 AYUSH Mode</Pill>}
      />

      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" /> Back
      </button>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Section className="flex flex-col items-center py-8">
          <div className="relative grid size-40 place-items-center">
            <span className="mk-ring-pulse absolute inset-0 rounded-full bg-accent/40" />
            <span className="absolute inset-3 rounded-full bg-primary/10" />
            <span className="relative grid size-24 place-items-center rounded-full bg-primary text-primary-foreground">
              <Mic className="size-11" strokeWidth={2.2} />
            </span>
          </div>
          <p className="mt-6 text-center text-sm font-bold">
            AI Listening in Hindi/English...
          </p>
          <div className="mt-4 w-full rounded-2xl bg-muted px-4 py-3 text-center text-sm italic text-muted-foreground">
            &ldquo;Stomach pain &amp; severe acid burning...&rdquo;
          </div>
        </Section>

        <Section>
          <SectionTitle>Touch Symptom Grid</SectionTitle>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {SYMPTOMS.map((s) => (
              <button
                key={s.title}
                type="button"
                onClick={() => toggle(s.title)}
                className={cn(
                  "min-h-24 rounded-2xl border p-3 text-left transition-colors",
                  selected.includes(s.title)
                    ? "border-primary bg-primary/8 ring-2 ring-primary/30"
                    : "border-border bg-card hover:bg-secondary",
                )}
              >
                <span className="text-xl">{s.emoji}</span>
                <p className="mt-2 text-sm font-bold leading-tight">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.copy}</p>
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            {selected.length
              ? `${selected.length} symptom${selected.length > 1 ? "s" : ""} tagged for the doctor.`
              : "Tap any card to tag it for the doctor."}
          </p>
        </Section>
      </div>

      <ActionButton className="w-full lg:w-auto lg:px-10" onClick={onNext}>
        Next: Scan Documents <ArrowRight className="size-4" />
      </ActionButton>
    </div>
  );
}

/* ---------------------------------- VAULT --------------------------------- */

export function VaultScreen() {
  return (
    <div className="mk-screen-in space-y-5">
      <ScreenHeader
        title="Records & OCR Vault"
        subtitle="Digitised prescriptions & visit summaries"
        right={
          <Pill tone="primary" className="cursor-pointer">
            <Upload className="size-3.5" /> Upload
          </Pill>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Section>
          <SectionTitle>Scanned OCR Intelligence</SectionTitle>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl bg-success-soft px-4 py-3 text-sm font-semibold text-success">
              ✓ Paracetamol 500mg (Active) — 10-Jul Visit
            </div>
            <div className="rounded-2xl bg-warning-soft px-4 py-3 text-sm font-semibold text-warning">
              ⚠️ Duplicate Painkiller Alert — Flagged AI
            </div>
          </div>
        </Section>

        <Section>
          <SectionTitle>Past Visit History</SectionTitle>
          <div className="mt-4 space-y-3">
            {VISITS.map((v) => (
              <div key={v.date} className="rounded-2xl border border-border p-4">
                <p className="font-bold">
                  {v.date} | {v.doctor}
                </p>
                <p className="text-sm text-muted-foreground">
                  {v.department} • {v.note}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <ActionButton variant="ghost" className="min-h-10 px-3 text-xs">
                    <FileText className="size-3.5" /> Summary PDF
                  </ActionButton>
                  <ActionButton variant="ghost" className="min-h-10 px-3 text-xs">
                    <PillIcon className="size-3.5" /> Prescriptions
                  </ActionButton>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

/* --------------------------------- PROFILE -------------------------------- */

export function ProfileScreen({
  consents,
  onToggleConsent,
}: {
  consents: { shareSummary: boolean; cacheVoice: boolean };
  onToggleConsent: (key: "shareSummary" | "cacheVoice") => void;
}) {
  return (
    <div className="mk-screen-in space-y-5">
      <ScreenHeader
        title="My Profile & ABHA"
        subtitle="Identity, consent & clinical constitution"
        right={<Pill tone="neutral">⚙️ Edit</Pill>}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Section className="lg:col-span-2">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 sm:flex sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <span className="grid size-16 shrink-0 place-items-center rounded-3xl bg-primary text-lg font-black text-primary-foreground">
                NL
              </span>
              <div className="min-w-0">
                <p className="truncate text-lg font-extrabold">Nikhil Ladwani</p>
                <p className="text-sm text-muted-foreground">
                  Patient ID: #8892 • Age: 24 (M)
                </p>
                <p className="text-sm text-muted-foreground">
                  📱 Mobile: +91 98765 43210
                </p>
              </div>
            </div>
            <Pill tone="success" className="col-span-2 justify-self-start">
              <BadgeCheck className="size-3.5" /> Verified ✓
            </Pill>
          </div>
        </Section>

        <Section className="border-primary/20 bg-abha">
          <SectionTitle>ABDM Digital Health Account (ABHA)</SectionTitle>
          <p className="mt-3 text-sm font-bold">Linked Handle: nikhil@abdm</p>
          <p className="text-sm text-muted-foreground">
            Status: Connected to National Health Exchange
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <ActionButton className="flex-1 min-w-40">
              <RefreshCw className="size-4" /> Sync Health Locker
            </ActionButton>
            <ActionButton variant="outline" className="flex-1 min-w-40">
              View ABHA Card
            </ActionButton>
          </div>
        </Section>

        <Section>
          <SectionTitle>Saved Clinical &amp; AYUSH Profile</SectionTitle>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Prakriti Constitution</dt>
              <dd className="font-bold">Vata-Pitta</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Agni Status</dt>
              <dd className="font-bold">Manda (Sluggish)</dd>
            </div>
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            <Pill tone="danger">⚠️ Penicillin Allergy</Pill>
            <Pill tone="neutral">Blood Group: B Positive</Pill>
          </div>
        </Section>

        <Section className="lg:col-span-2">
          <SectionTitle>DPDP Act 2023 Consent Logs</SectionTitle>
          <div className="mt-4 space-y-3">
            <ConsentRow
              label="Share Intake Summary with Doctor"
              checked={consents.shareSummary}
              onChange={() => onToggleConsent("shareSummary")}
            />
            <ConsentRow
              label="Cache Voice Recording Temporarily"
              checked={consents.cacheVoice}
              onChange={() => onToggleConsent("cacheVoice")}
            />
          </div>
        </Section>
      </div>
    </div>
  );
}

function ConsentRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border p-4">
      <span className="min-w-0 text-sm font-semibold">{label}</span>
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
            "absolute top-1 size-5 rounded-full bg-card shadow transition-all",
            checked ? "left-6" : "left-1",
          )}
        />
      </button>
    </div>
  );
}

export const IconMap = { CalendarDays };
