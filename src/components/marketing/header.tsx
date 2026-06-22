import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/brand/theme-toggle";

const NAV = [
  { href: "#features", label: "Возможности" },
  { href: "#citizens", label: "Для граждан" },
  { href: "#business", label: "Для бизнеса" },
  { href: "#developers", label: "Для разработчиков" },
  { href: "#integrations", label: "Интеграции" },
  { href: "#pricing", label: "Тарифы" },
];

export function MarketingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2.5" : "py-4",
      )}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={cn(
            "flex items-center justify-between gap-6 rounded-2xl border border-transparent px-4 py-2.5 transition-all duration-300",
            scrolled && "glass-strong border-border/60 shadow-card",
          )}
        >
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeToggle className="hidden sm:inline-flex" />
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/auth" search={{ mode: "signin" }}>
                Войти
              </Link>
            </Button>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link to="/auth" search={{ mode: "signup" }}>
                Регистрация
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Меню"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {open && (
          <div className="glass-strong mt-2 rounded-2xl border border-border/60 p-3 shadow-card lg:hidden">
            <nav className="flex flex-col">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-muted"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-2 flex gap-2 border-t border-border pt-3">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link to="/auth" search={{ mode: "signin" }}>
                    Войти
                  </Link>
                </Button>
                <Button asChild size="sm" className="flex-1">
                  <Link to="/auth" search={{ mode: "signup" }}>
                    Регистрация
                  </Link>
                </Button>
                <ThemeToggle />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
