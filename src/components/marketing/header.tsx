import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/brand/theme-toggle";

type NavItem = { to: string; label: string };
type NavGroup = { label: string; items: NavItem[] };

const PRODUCT: NavGroup = {
  label: "Возможности",
  items: [
    { to: "/features", label: "Все возможности" },
    { to: "/citizens", label: "Для граждан" },
    { to: "/business", label: "Для бизнеса" },
    { to: "/developers", label: "Для разработчиков" },
  ],
};

const RESOURCES: NavGroup = {
  label: "Ресурсы",
  items: [
    { to: "/api", label: "API" },
    { to: "/docs", label: "Документация" },
    { to: "/security", label: "Безопасность" },
    { to: "/support", label: "Поддержка" },
  ],
};

const FLAT: NavItem[] = [{ to: "/pricing", label: "Тарифы" }];

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
            <NavMenu group={PRODUCT} />
            <NavMenu group={RESOURCES} />
            {FLAT.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                activeProps={{ className: "text-foreground bg-muted" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeToggle className="hidden sm:inline-flex" />
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/auth" search={{ mode: "signin" }}>Войти</Link>
            </Button>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link to="/auth/register">Регистрация</Link>
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
            <nav className="flex flex-col gap-1">
              {[...PRODUCT.items, ...RESOURCES.items, ...FLAT].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 flex gap-2 border-t border-border pt-3">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link to="/auth" search={{ mode: "signin" }}>Войти</Link>
                </Button>
                <Button asChild size="sm" className="flex-1">
                  <Link to="/auth/register">Регистрация</Link>
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

function NavMenu({ group }: { group: NavGroup }) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {group.label}
        <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-0 top-full z-50 mt-2 w-64 translate-y-1 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="glass-strong rounded-xl border border-border/60 p-1.5 shadow-card">
          {group.items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
