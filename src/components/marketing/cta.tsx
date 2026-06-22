import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section id="pricing" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-border brand-deep p-10 text-on-brand shadow-elegant sm:p-16">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 60% at 80% 10%, color-mix(in oklab, var(--accent) 35%, transparent) 0%, transparent 60%), linear-gradient(135deg, var(--primary), var(--primary-glow))",
            }}
          />

          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                Один аккаунт.
                <br />
                Одна экосистема.
              </h2>
              <p className="mt-4 max-w-xl text-base text-primary-foreground/80 sm:text-lg">
                Начните бесплатно за 60 секунд. Подключение модулей, ролей и интеграций — без
                переустановок и повторных входов.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="h-12 bg-surface-elevated px-6 text-base text-foreground hover:bg-surface"
                >
                  <Link to="/auth" search={{ mode: "signup" }}>
                    Создать аккаунт
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 border-primary-foreground/30 bg-transparent px-6 text-base text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link to="/auth" search={{ mode: "signin" }}>
                    У меня уже есть аккаунт
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                ["60 сек", "До первого входа"],
                ["5 ролей", "В одном аккаунте"],
                ["12 SDK", "Для разработчиков"],
                ["99,99%", "Целевая доступность"],
              ].map(([v, l]) => (
                <div
                  key={l}
                  className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 backdrop-blur"
                >
                  <div className="font-display text-2xl font-semibold">{v}</div>
                  <div className="mt-1 text-sm text-primary-foreground/75">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
