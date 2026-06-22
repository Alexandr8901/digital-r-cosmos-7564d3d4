import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  withWordmark?: boolean;
}

export function Logo({ className, withWordmark = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="h-8 w-8" />
      {withWordmark && (
        <span className="font-display text-[17px] font-semibold tracking-tight text-foreground">
          ЦифроРубль
        </span>
      )}
    </div>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center rounded-[10px] gradient-primary shadow-elegant",
        className,
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-1/2 w-1/2 text-primary-foreground"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Stylised ₽ */}
        <path d="M8 4v16" />
        <path d="M8 4h6a4 4 0 0 1 0 8H8" />
        <path d="M5 14h9" />
      </svg>
      <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent shadow-glow" />
    </span>
  );
}
