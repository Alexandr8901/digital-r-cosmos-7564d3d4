import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link, useSearch } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { ArrowLeft, Loader2, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/brand/theme-toggle";
import { cn } from "@/lib/utils";

type Mode = "signin" | "signup" | "reset";

const searchSchema = z.object({
  mode: z.enum(["signin", "signup", "reset"]).optional().default("signin"),
});

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Вход и регистрация · ЦифроРубль" },
      {
        name: "description",
        content: "Войдите в ЦифроРубль или создайте аккаунт за 60 секунд.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const search = useSearch({ from: "/auth" });
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>(search.mode);

  useEffect(() => {
    setMode(search.mode);
  }, [search.mode]);

  useEffect(() => {
    let alive = true;
    supabase.auth.getSession().then(({ data }) => {
      if (alive && data.session) navigate({ to: "/app" });
    });
    return () => {
      alive = false;
    };
  }, [navigate]);

  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      {/* Left — form */}
      <div className="relative flex flex-col bg-background">
        <div className="flex items-center justify-between p-5">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center px-5 pb-12">
          <div className="w-full max-w-md">
            <Link to="/" className="mb-8 inline-block">
              <Logo />
            </Link>

            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {mode === "signin" && <SignInForm onSwitch={(m) => navigate({ to: "/auth", search: { mode: m } })} />}
                {mode === "signup" && <SignUpForm onSwitch={(m) => navigate({ to: "/auth", search: { mode: m } })} />}
                {mode === "reset" && <ResetForm onSwitch={(m) => navigate({ to: "/auth", search: { mode: m } })} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="px-5 pb-6 text-center text-xs text-muted-foreground">
          Продолжая, вы соглашаетесь с условиями использования и политикой конфиденциальности
          ЦифроРубль.
        </p>
      </div>

      {/* Right — decorative */}
      <div className="relative hidden overflow-hidden brand-deep lg:block">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 80% 10%, color-mix(in oklab, var(--accent) 30%, transparent) 0%, transparent 60%), linear-gradient(135deg, var(--primary), var(--primary-glow))",
          }}
        />
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative flex h-full flex-col justify-between p-12 text-on-brand">
          <div />
          <div className="max-w-md">
            <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] leading-tight">
              Один аккаунт. Одна экосистема.
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              Граждане, самозанятые, ИП, ООО и разработчики работают в едином интерфейсе.
              Переключайтесь между ролями мгновенно.
            </p>
            <div className="mt-8 grid gap-4">
              {([
                { Icon: ShieldCheck, text: "Шифрование и журнал аудита" },
                { Icon: Zap, text: "Молниеносные платежи и переводы" },
                { Icon: Sparkles, text: "AI-помощник для финансов и документов" },
              ] as const).map(({ Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/10 ring-1 ring-inset ring-primary-foreground/15">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="text-sm text-primary-foreground/90">{text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs text-primary-foreground/60">
            ЦифроРубль · Единая платформа цифрового рубля России
          </div>
        </div>
      </div>
    </div>
  );
}

function FormHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-7">
      <h1 className="font-display text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">{sub}</p>
    </div>
  );
}

function GoogleButton() {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className="h-11 w-full"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        try {
          const result = await lovable.auth.signInWithOAuth("google", {
            redirect_uri: window.location.origin + "/app",
          });
          if (result.error) {
            toast.error("Не удалось войти через Google", { description: String(result.error.message ?? result.error) });
            setLoading(false);
            return;
          }
          if (result.redirected) return;
          window.location.assign("/app");
        } catch (e) {
          toast.error("Ошибка входа через Google", { description: e instanceof Error ? e.message : String(e) });
          setLoading(false);
        }
      }}
    >
      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon className="mr-2 h-4 w-4" />}
      Продолжить с Google
    </Button>
  );
}

function Divider() {
  return (
    <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
      <span className="h-px flex-1 bg-border" />
      или
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

const emailSchema = z.string().trim().email("Неверный email").max(255);
const passwordSchema = z.string().min(8, "Минимум 8 символов").max(72);

function SignInForm({ onSwitch }: { onSwitch: (m: Mode) => void }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const eR = emailSchema.safeParse(email);
    const pR = passwordSchema.safeParse(password);
    const errs: typeof errors = {};
    if (!eR.success) errs.email = eR.error.issues[0].message;
    if (!pR.success) errs.password = pR.error.issues[0].message;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error("Не удалось войти", { description: error.message });
      return;
    }
    toast.success("Добро пожаловать!");
    navigate({ to: "/app" });
  }

  return (
    <>
      <FormHeader title="С возвращением" sub="Войдите в аккаунт ЦифроРубль" />

      <GoogleButton />
      <Divider />

      <form onSubmit={submit} className="space-y-4">
        <Field label="Email" error={errors.email}>
          <Input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11"
            required
          />
        </Field>
        <Field
          label="Пароль"
          error={errors.password}
          aside={
            <button
              type="button"
              onClick={() => onSwitch("reset")}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Забыли пароль?
            </button>
          }
        >
          <Input
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11"
            required
          />
        </Field>

        <Button type="submit" className="h-11 w-full text-base" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Войти
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Нет аккаунта?{" "}
        <button
          type="button"
          onClick={() => onSwitch("signup")}
          className="font-medium text-foreground hover:underline"
        >
          Зарегистрироваться
        </button>
      </p>
    </>
  );
}

function SignUpForm({ onSwitch }: { onSwitch: (m: Mode) => void }) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!firstName.trim()) errs.firstName = "Введите имя";
    if (!lastName.trim()) errs.lastName = "Введите фамилию";
    const eR = emailSchema.safeParse(email);
    const pR = passwordSchema.safeParse(password);
    if (!eR.success) errs.email = eR.error.issues[0].message;
    if (!pR.success) errs.password = pR.error.issues[0].message;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + "/app",
        data: { first_name: firstName.trim(), last_name: lastName.trim() },
      },
    });
    setLoading(false);
    if (error) {
      toast.error("Не удалось зарегистрироваться", { description: error.message });
      return;
    }
    toast.success("Аккаунт создан", { description: "Проверьте почту, если требуется подтверждение." });
    navigate({ to: "/app" });
  }

  return (
    <>
      <FormHeader title="Создать аккаунт" sub="60 секунд и вы в экосистеме" />

      <GoogleButton />
      <Divider />

      <form onSubmit={submit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Имя" error={errors.firstName}>
            <Input
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="h-11"
              required
            />
          </Field>
          <Field label="Фамилия" error={errors.lastName}>
            <Input
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="h-11"
              required
            />
          </Field>
        </div>
        <Field label="Email" error={errors.email}>
          <Input
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11"
            required
          />
        </Field>
        <Field
          label="Пароль"
          error={errors.password}
          hint="Минимум 8 символов"
        >
          <Input
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11"
            required
          />
        </Field>

        <Button type="submit" className="h-11 w-full text-base" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Создать аккаунт
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Уже есть аккаунт?{" "}
        <button
          type="button"
          onClick={() => onSwitch("signin")}
          className="font-medium text-foreground hover:underline"
        >
          Войти
        </button>
      </p>
    </>
  );
}

function ResetForm({ onSwitch }: { onSwitch: (m: Mode) => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = emailSchema.safeParse(email);
    if (!r.success) {
      toast.error(r.error.issues[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/auth/reset-password",
    });
    setLoading(false);
    if (error) {
      toast.error("Не удалось отправить письмо", { description: error.message });
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <>
        <FormHeader
          title="Письмо отправлено"
          sub="Откройте письмо и перейдите по ссылке для установки нового пароля."
        />
        <Button variant="outline" className="h-11 w-full" onClick={() => onSwitch("signin")}>
          Вернуться ко входу
        </Button>
      </>
    );
  }

  return (
    <>
      <FormHeader title="Восстановление" sub="Отправим письмо со ссылкой на сброс пароля" />
      <form onSubmit={submit} className="space-y-4">
        <Field label="Email">
          <Input
            type="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11"
            required
          />
        </Field>
        <Button type="submit" className="h-11 w-full text-base" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Отправить письмо
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Вспомнили пароль?{" "}
        <button
          type="button"
          onClick={() => onSwitch("signin")}
          className="font-medium text-foreground hover:underline"
        >
          Войти
        </button>
      </p>
    </>
  );
}

function Field({
  label,
  error,
  hint,
  aside,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <Label className="text-sm">{label}</Label>
        {aside}
      </div>
      {children}
      <div className={cn("mt-1 min-h-[16px] text-xs", error ? "text-destructive" : "text-muted-foreground")}>
        {error ?? hint ?? ""}
      </div>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.4-1.74 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1S8.7 6 12 6c1.9 0 3.1.8 3.9 1.5l2.6-2.5C16.9 3.4 14.7 2.5 12 2.5 6.8 2.5 2.6 6.7 2.6 12S6.8 21.5 12 21.5c6.9 0 9.6-4.8 9.6-7.3 0-.5-.1-.9-.2-1.3H12z"
      />
    </svg>
  );
}
