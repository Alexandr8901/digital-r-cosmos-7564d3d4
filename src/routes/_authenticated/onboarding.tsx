import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  UserSquare2,
  Wallet,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";
import { PUBLIC_ROLES, ROLE_LABEL, ROLE_DESCRIPTION, type AppRole } from "@/lib/roles";

export const Route = createFileRoute("/_authenticated/onboarding")({
  head: () => ({
    meta: [{ title: "Добро пожаловать · ЦифроРубль" }],
  }),
  component: OnboardingPage,
});

const SLIDES = [
  {
    icon: Sparkles,
    title: "Добро пожаловать в ЦифроРубль",
    text: "Единая платформа цифрового рубля России. Все ваши финансы, документы и интеграции — в одном аккаунте.",
  },
  {
    icon: UserSquare2,
    title: "Один аккаунт. Пять режимов",
    text: "Гражданин, самозанятый, ИП, ООО и разработчик — переключайтесь без повторного входа.",
  },
  {
    icon: ShieldCheck,
    title: "Безопасность по умолчанию",
    text: "Шифрование данных, разграничение прав, журнал аудита и подготовка к официальным стандартам.",
  },
  {
    icon: Wallet,
    title: "AI и финансы",
    text: "Встроенный ассистент готовит черновики платежей, договоров и отчётов. Окончательное действие — за вами.",
  },
];

function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<AppRole | null>(null);
  const [saving, setSaving] = useState(false);
  const isRoleStep = step === SLIDES.length;
  const total = SLIDES.length + 1;

  useEffect(() => {
    supabase
      .from("profiles")
      .select("onboarded_at, active_role")
      .single()
      .then(({ data }) => {
        if (data?.onboarded_at) navigate({ to: "/app" });
        if (data?.active_role) setRole(data.active_role as AppRole);
      });
  }, [navigate]);

  async function complete() {
    if (!role) return;
    setSaving(true);
    const { data: u } = await supabase.auth.getUser();
    const uid = u.user?.id;
    if (!uid) {
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({ active_role: role, onboarded_at: new Date().toISOString() })
      .eq("id", uid);

    if (!error) {
      await supabase.from("user_roles").insert({ user_id: uid, role }).select();
    }

    setSaving(false);
    if (error) {
      toast.error("Не удалось сохранить", { description: error.message });
      return;
    }
    toast.success("Готово!");
    navigate({ to: "/app" });
  }

  const slide = SLIDES[step];

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <div className="absolute inset-0 -z-10 gradient-hero" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" />

      <header className="flex items-center justify-between p-5">
        <Logo />
        <button
          onClick={() => navigate({ to: "/app" })}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Пропустить
        </button>
      </header>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-5 pb-10">
        {/* progress */}
        <div className="mb-10 flex w-full max-w-sm items-center gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-all",
                i <= step ? "bg-accent" : "bg-muted",
              )}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!isRoleStep ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="text-center"
            >
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-elegant">
                <slide.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h1 className="mt-7 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                {slide.title}
              </h1>
              <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground">{slide.text}</p>

              <Button size="lg" className="mt-10 h-12 px-6" onClick={() => setStep((s) => s + 1)}>
                {step === SLIDES.length - 1 ? "Выбрать роль" : "Далее"}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="role"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <div className="text-center">
                <h1 className="font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                  Выберите роль для старта
                </h1>
                <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                  Это влияет только на интерфейс. Переключиться или добавить роли можно в любой
                  момент.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {PUBLIC_ROLES.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={cn(
                      "flex items-start gap-3 rounded-2xl border p-4 text-left transition-all",
                      role === r
                        ? "border-accent bg-accent-soft/50 shadow-card"
                        : "border-border bg-card hover:border-foreground/20",
                    )}
                  >
                    <div
                      className={cn(
                        "mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors",
                        role === r ? "border-accent bg-accent" : "border-border",
                      )}
                    >
                      {role === r && <span className="h-2 w-2 rounded-full bg-accent-foreground" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-display text-base font-semibold">{ROLE_LABEL[r]}</div>
                      <div className="mt-0.5 text-sm text-muted-foreground">
                        {ROLE_DESCRIPTION[r]}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Button
                  size="lg"
                  className="h-12 px-6"
                  disabled={!role || saving}
                  onClick={complete}
                >
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Продолжить
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
