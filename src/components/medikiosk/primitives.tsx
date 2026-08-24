import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("mk-card p-5", className)}>{children}</div>;
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[11px] font-bold tracking-[0.14em] text-muted-foreground uppercase">
      {children}
    </h2>
  );
}

type PillTone = "neutral" | "primary" | "success" | "danger" | "warning" | "accent";

const pillTones: Record<PillTone, string> = {
  neutral: "bg-secondary text-secondary-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-success-soft text-success",
  danger: "bg-emergency-soft text-emergency",
  warning: "bg-warning-soft text-warning",
  accent: "bg-accent/15 text-accent-foreground",
};

export function Pill({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: PillTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        pillTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function ActionButton({
  children,
  onClick,
  variant = "primary",
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost" | "danger";
  className?: string;
}) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
    outline: "border border-border bg-card text-foreground hover:bg-secondary",
    ghost: "bg-secondary text-secondary-foreground hover:bg-border",
    danger: "bg-emergency text-emergency-foreground hover:bg-emergency/90",
  } as const;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

export function ScreenHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 lg:flex lg:justify-between">
      <div className="min-w-0">
        <h1 className="truncate text-lg font-extrabold tracking-tight lg:text-2xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="truncate text-xs text-muted-foreground lg:text-sm">{subtitle}</p>
        ) : null}
      </div>
      {right ? <div className="flex shrink-0 items-center gap-2">{right}</div> : null}
    </header>
  );
}
