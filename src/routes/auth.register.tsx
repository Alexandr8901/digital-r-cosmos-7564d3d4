import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, Loader2, Mail, Phone, User, Calendar, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/brand/theme-toggle";
import { Progress } from "@/components/ui/progress";
import { PUBLIC_ROLES, ROLE_LABEL, ROLE_DESCRIPTION, type AppRole } from "@/lib/roles";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth/register")({
  head: () => ({
    meta: [
      { title: "Регистрация · ЦифроРубль" },
      { name: "description", content: "Создайте аккаунт ЦифроРубль за пять простых шагов." },
    ],
  }),
  component: RegisterWizard,
});

const STEPS = ["Данные входа", "Подтверждение", "Личные данные", "Выбор роли", "Готово"] as const;

const emailSchema = z.string().trim().email("Неверный email").max(255);
const passwordSchema = z.string().min(8, "Минимум 8 символов").max(72);
const phoneSchema = z.string().trim().regex(/^\+?\d[\d\s()-]{6,18}\d$/, "Неверный номер");

function RegisterWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    email: "", phone: "", password: "", password2: "",
    firstName: "", lastName: "", birthDate: "",
    role: "citizen" as AppRole,
  });
  const [loading, setLoading] = useState(false);

  function next() { setStep((s) => Math.min(s + 1, STEPS.length - 1)); }
  function back() { setStep((s) => Math.max(s - 1, 0)); }

  async function submit() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: window.location.origin + "/onboarding",
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          birth_date: data.birthDate || null,
          preferred_role: data.role,
        },
      },
    });
    setLoading(false);
    if (error) {
      toast.error("Не удалось зарегистрироваться", { description: error.message });
      return;
    }
    next();
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between p-5">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> На главную
        </Link>
        <Link to="/"><Logo /></Link>
        <ThemeToggle />
      </header>

      <div className="mx-auto max-w-2xl px-4 pb-16">
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Шаг {step + 1} из {STEPS.length}</span>
            <span>{STEPS[step]}</span>
          </div>
          <Progress value={((step + 1) / STEPS.length) * 100} className="mt-2 h-1.5" />
          <div className="mt-4 hidden gap-1 md:flex">
            {STEPS.map((s, i) => (
              <div key={s} className={cn("flex-1 rounded-full px-3 py-1 text-center text-[10px] uppercase tracking-wider",
                i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                {s}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-10"
          >
            {step === 0 && <Step1 data={data} setData={setData} onNext={next} />}
            {step === 1 && <Step2 email={data.email} phone={data.phone} onNext={next} onBack={back} />}
            {step === 2 && <Step3 data={data} setData={setData} onNext={next} onBack={back} />}
            {step === 3 && <Step4 data={data} setData={setData} onNext={submit} onBack={back} loading={loading} />}
            {step === 4 && <Step5 onDone={() => navigate({ to: "/onboarding" })} />}
          </motion.div>
        </AnimatePresence>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Уже есть аккаунт?{" "}
          <Link to="/auth" search={{ mode: "signin" }} className="font-medium text-foreground hover:underline">Войти</Link>
        </p>
      </div>
    </div>
  );
}

function StepTitle({ icon: Icon, title, sub }: { icon: React.ComponentType<{ className?: string }>; title: string; sub: string }) {
  return (
    <div className="mb-6 flex items-start gap-4">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}

function Step1({ data, setData, onNext }: any) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  function go() {
    const errs: Record<string, string> = {};
    const e = emailSchema.safeParse(data.email);
    if (!e.success) errs.email = e.error.issues[0].message;
    const p = phoneSchema.safeParse(data.phone);
    if (!p.success) errs.phone = p.error.issues[0].message;
    const pw = passwordSchema.safeParse(data.password);
    if (!pw.success) errs.password = pw.error.issues[0].message;
    if (data.password !== data.password2) errs.password2 = "Пароли не совпадают";
    setErrors(errs);
    if (!Object.keys(errs).length) onNext();
  }
  return (
    <>
      <StepTitle icon={Mail} title="Данные для входа" sub="Email, телефон и пароль" />
      <div className="grid gap-4">
        <Field label="Email" error={errors.email}>
          <Input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className="h-11" placeholder="you@example.com" />
        </Field>
        <Field label="Телефон" error={errors.phone}>
          <Input type="tel" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} className="h-11" placeholder="+7 900 000-00-00" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Пароль" error={errors.password} hint="Минимум 8 символов">
            <Input type="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} className="h-11" />
          </Field>
          <Field label="Повтор пароля" error={errors.password2}>
            <Input type="password" value={data.password2} onChange={(e) => setData({ ...data, password2: e.target.value })} className="h-11" />
          </Field>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <Button onClick={go} className="h-11"><span>Продолжить</span><ArrowRight className="ml-2 h-4 w-4" /></Button>
      </div>
    </>
  );
}

function Step2({ email, phone, onNext, onBack }: any) {
  return (
    <>
      <StepTitle icon={Phone} title="Подтверждение" sub="Подтвердите email и телефон" />
      <div className="grid gap-4">
        <div className="flex items-center justify-between rounded-xl border border-border p-4">
          <div>
            <div className="text-sm font-medium">Email</div>
            <div className="text-xs text-muted-foreground">{email || "—"}</div>
          </div>
          <Button size="sm" variant="outline" onClick={() => toast.success("Письмо отправлено")}>Отправить код</Button>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-border p-4">
          <div>
            <div className="text-sm font-medium">Телефон</div>
            <div className="text-xs text-muted-foreground">{phone || "—"}</div>
          </div>
          <Button size="sm" variant="outline" disabled>SMS — в разработке</Button>
        </div>
        <p className="rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground">
          Подтверждение email будет завершено после первого входа в аккаунт по ссылке из письма.
        </p>
      </div>
      <Footer back={onBack} next={onNext} />
    </>
  );
}

function Step3({ data, setData, onNext, onBack }: any) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  function go() {
    const errs: Record<string, string> = {};
    if (!data.firstName.trim()) errs.firstName = "Введите имя";
    if (!data.lastName.trim()) errs.lastName = "Введите фамилию";
    setErrors(errs);
    if (!Object.keys(errs).length) onNext();
  }
  return (
    <>
      <StepTitle icon={User} title="Личные данные" sub="Как к вам обращаться" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Имя" error={errors.firstName}>
          <Input value={data.firstName} onChange={(e) => setData({ ...data, firstName: e.target.value })} className="h-11" />
        </Field>
        <Field label="Фамилия" error={errors.lastName}>
          <Input value={data.lastName} onChange={(e) => setData({ ...data, lastName: e.target.value })} className="h-11" />
        </Field>
        <Field label="Дата рождения">
          <Input type="date" value={data.birthDate} onChange={(e) => setData({ ...data, birthDate: e.target.value })} className="h-11" />
        </Field>
      </div>
      <Footer back={onBack} next={go} />
    </>
  );
}

function Step4({ data, setData, onNext, onBack, loading }: any) {
  return (
    <>
      <StepTitle icon={Calendar} title="Кем вы будете работать" sub="Можно сменить роль в любой момент" />
      <div className="grid gap-3 sm:grid-cols-2">
        {PUBLIC_ROLES.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setData({ ...data, role: r })}
            className={cn("rounded-2xl border p-4 text-left transition-all",
              data.role === r ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border hover:border-primary/30")}
          >
            <div className="flex items-center justify-between">
              <div className="font-medium">{ROLE_LABEL[r]}</div>
              {data.role === r && <Check className="h-4 w-4 text-primary" />}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{ROLE_DESCRIPTION[r]}</div>
          </button>
        ))}
      </div>
      <Footer back={onBack} next={onNext} loading={loading} cta="Создать аккаунт" />
    </>
  );
}

function Step5({ onDone }: { onDone: () => void }) {
  return (
    <div className="py-6 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="mx-auto grid h-20 w-20 place-items-center rounded-3xl brand-deep text-on-brand"
      >
        <Sparkles className="h-9 w-9" />
      </motion.div>
      <h1 className="mt-6 font-display text-3xl font-semibold">Добро пожаловать!</h1>
      <p className="mt-2 text-muted-foreground">
        Аккаунт создан. Если требуется — подтвердите email из письма. Затем мы покажем короткое введение.
      </p>
      <Button onClick={onDone} className="mt-8 h-11">Продолжить <ArrowRight className="ml-2 h-4 w-4" /></Button>
    </div>
  );
}

function Field({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-sm">{label}</Label>
      <div className="mt-1.5">{children}</div>
      <div className={cn("mt-1 min-h-[16px] text-xs", error ? "text-destructive" : "text-muted-foreground")}>
        {error ?? hint ?? ""}
      </div>
    </div>
  );
}

function Footer({ back, next, loading, cta = "Продолжить" }: { back: () => void; next: () => void; loading?: boolean; cta?: string }) {
  return (
    <div className="mt-8 flex justify-between">
      <Button variant="ghost" onClick={back}><ArrowLeft className="mr-2 h-4 w-4" />Назад</Button>
      <Button onClick={next} className="h-11" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {cta} {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
}
