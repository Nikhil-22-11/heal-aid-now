import type { ReactNode } from "react";
import { Activity, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ClinSyncLogo({
  size = "md",
  variant = "auto",
  className,
  showBadge = true,
}: {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "dark" | "light" | "auto" | "icon-only";
  className?: string;
  showBadge?: boolean;
}) {
  const logoHeights = {
    xs: "h-6",
    sm: "h-8",
    md: "h-10",
    lg: "h-13",
    xl: "h-16",
  };

  const iconSizes = {
    xs: "size-6",
    sm: "size-8",
    md: "size-10",
    lg: "size-12",
    xl: "size-16",
  };

  if (variant === "icon-only") {
    return (
      <div className={cn("inline-flex items-center transition-transform hover:scale-105", className)}>
        <img
          src="/clinsync-icon.png"
          alt="ClinSync Emblem"
          className={cn("object-contain rounded-full drop-shadow-sm", iconSizes[size])}
        />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex items-center transition-transform hover:scale-[1.02]">
        {/* On dark background use dark variant, or light on light */}
        <img
          src={variant === "light" ? "/clinsync-logo.png" : variant === "dark" ? "/clinsync-logo-dark.png" : "/clinsync-logo-dark.png"}
          alt="ClinSync — बात आपकी, समझ ClinSync की"
          className={cn("w-auto object-contain drop-shadow-xs", logoHeights[size])}
        />
      </div>
      {showBadge ? (
        <span className="hidden sm:inline-flex items-center rounded-md bg-teal-50 px-1.5 py-0.5 text-[9px] font-black text-teal-700 tracking-wider uppercase border border-teal-200/80">
          OPD KIOSK
        </span>
      ) : null}
    </div>
  );
}

export function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("mk-card p-5", className)}>{children}</div>;
}

export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-[11px] font-bold tracking-[0.14em] text-muted-foreground uppercase",
        className,
      )}
    >
      {children}
    </h2>
  );
}

type PillTone = "neutral" | "primary" | "success" | "danger" | "warning" | "accent" | "purple";

const pillTones: Record<PillTone, string> = {
  neutral: "bg-secondary text-secondary-foreground border border-border",
  primary: "bg-primary/10 text-primary border border-primary/20",
  success: "bg-success-soft text-success border border-success/20",
  danger: "bg-emergency-soft text-emergency border border-emergency/20",
  warning: "bg-warning-soft text-warning border border-warning/20",
  accent: "bg-accent/15 text-accent-foreground border border-accent/30",
  purple: "bg-slate-100 text-slate-700 border border-slate-200",
};

export function Pill({
  children,
  tone = "neutral",
  className,
  onClick,
}: {
  children: ReactNode;
  tone?: PillTone;
  className?: string;
  onClick?: () => void;
}) {
  const Component = onClick ? "button" : "span";
  return (
    <Component
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all",
        pillTones[tone],
        onClick && "cursor-pointer hover:opacity-85 active:scale-95",
        className,
      )}
    >
      {children}
    </Component>
  );
}

export function ActionButton({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success" | "accent";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}) {
  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm active:scale-[0.98]",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]",
    outline:
      "border border-border bg-card text-foreground hover:bg-secondary active:scale-[0.98]",
    ghost:
      "bg-secondary text-secondary-foreground hover:bg-border active:scale-[0.98]",
    danger:
      "bg-emergency text-emergency-foreground hover:bg-emergency/90 shadow-sm active:scale-[0.98]",
    success:
      "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm active:scale-[0.98]",
    accent:
      "bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm active:scale-[0.98]",
  } as const;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

export function ClinSyncWordmark({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const heights = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
    xl: "h-12",
  };
  return (
    <img
      src="/clinsync-wordmark.png"
      alt="ClinSync"
      className={cn("w-auto object-contain shrink-0 drop-shadow-xs", heights[size], className)}
    />
  );
}

export function ScreenHeader({
  title,
  subtitle,
  right,
}: {
  title: ReactNode;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 lg:flex lg:justify-between">
      <div className="min-w-0">
        <div className="truncate text-xl font-extrabold tracking-tight lg:text-2xl text-foreground flex items-center gap-2">
          {title}
        </div>
        {subtitle ? (
          <p className="truncate text-xs text-muted-foreground lg:text-sm mt-0.5">{subtitle}</p>
        ) : null}
      </div>
      {right ? <div className="flex shrink-0 items-center gap-2">{right}</div> : null}
    </header>
  );
}

export function ModalWrapper({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-md",
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-shell/70 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={cn(
          "mk-card relative my-8 w-full border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95 duration-200",
          maxWidth,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 grid size-8 place-items-center rounded-full bg-secondary text-muted-foreground hover:bg-border hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>

        {title ? (
          <h2 className="mb-4 pr-8 text-lg font-bold tracking-tight text-foreground">
            {title}
          </h2>
        ) : null}

        {children}
      </div>
    </div>
  );
}
