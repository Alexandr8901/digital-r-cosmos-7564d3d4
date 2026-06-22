import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/brand/logo";

export const Route = createFileRoute("/auth/reset-password")({
  head: () => ({
    meta: [
      { title: "Новый пароль · ЦифроРубль" },
      { name: "description", content: "Установите новый пароль для аккаунта ЦифроРубль." },
    ],
  }),
  component: ResetPasswordPage,
});

const pwSchema = z.string().min(8, "Минимум 8 символов").max(72);

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Supabase populates session via hash fragment on recovery link.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = pwSchema.safeParse(password);
    if (!r.success) {
      toast.error(r.error.issues[0].message);
      return;
    }
    if (password !== confirm) {
      toast.error("Пароли не совпадают");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error("Не удалось обновить пароль", { description: error.message });
      return;
    }
    setDone(true);
    setTimeout(() => navigate({ to: "/app" }), 1200);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 inline-block">
          <Logo />
        </Link>
        {done ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-card">
            <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
            <h1 className="mt-4 font-display text-2xl font-semibold">Пароль обновлён</h1>
            <p className="mt-1 text-sm text-muted-foreground">Перенаправляем в кабинет…</p>
          </div>
        ) : (
          <>
            <h1 className="font-display text-3xl font-semibold tracking-tight">Новый пароль</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {ready ? "Установите новый пароль для входа" : "Открываем сессию восстановления…"}
            </p>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <Label className="text-sm">Новый пароль</Label>
                <Input
                  type="password"
                  className="mt-1.5 h-11"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label className="text-sm">Подтвердите пароль</Label>
                <Input
                  type="password"
                  className="mt-1.5 h-11"
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="h-11 w-full" disabled={loading || !ready}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Сохранить пароль
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
