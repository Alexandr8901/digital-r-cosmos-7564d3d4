import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader, SectionCard } from "@/components/citizen/kit";
import { supabase } from "@/integrations/supabase/client";
import { useAuthSession } from "@/hooks/use-auth";

export const Route = createFileRoute("/_authenticated/citizen/profile")({
  head: () => ({ meta: [{ title: "Профиль · ЦифроРубль" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuthSession();
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user!.id).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const [form, setForm] = useState({ first_name: "", last_name: "", middle_name: "", phone: "", address: "" });
  const ready = !isLoading && data;
  if (ready && !form.first_name && !form.last_name && (data.first_name || data.last_name)) {
    setForm({
      first_name: data.first_name ?? "",
      last_name: data.last_name ?? "",
      middle_name: data.middle_name ?? "",
      phone: data.phone ?? "",
      address: data.address ?? "",
    });
  }

  async function save() {
    if (!user) return;
    const { error } = await supabase.from("profiles").update(form).eq("id", user.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Сохранено");
    qc.invalidateQueries({ queryKey: ["profile", user.id] });
  }

  const initials = `${form.first_name?.[0] ?? ""}${form.last_name?.[0] ?? ""}`.toUpperCase() || (user?.email?.[0] ?? "У").toUpperCase();

  return (
    <div className="space-y-6">
      <PageHeader title="Профиль" description="Личные данные и настройки аккаунта" />

      <Card className="flex items-center gap-5 p-6">
        <Avatar className="h-20 w-20"><AvatarFallback className="bg-primary text-primary-foreground text-2xl">{initials}</AvatarFallback></Avatar>
        <div className="min-w-0">
          <div className="font-display text-xl font-semibold">{form.first_name || "Имя"} {form.last_name || "Фамилия"}</div>
          <div className="text-sm text-muted-foreground">{user?.email}</div>
          <div className="mt-2 flex gap-2">
            <Badge variant="outline">Гражданин</Badge>
            <Badge variant="outline" className="bg-success/10 text-success">Email подтверждён</Badge>
          </div>
        </div>
      </Card>

      <SectionCard title="Личные данные">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Имя" value={form.first_name} onChange={(v) => setForm({ ...form, first_name: v })} />
          <Field label="Фамилия" value={form.last_name} onChange={(v) => setForm({ ...form, last_name: v })} />
          <Field label="Отчество" value={form.middle_name} onChange={(v) => setForm({ ...form, middle_name: v })} />
          <Field label="Телефон" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+7 900 000-00-00" />
          <div className="sm:col-span-2">
            <Field label="Адрес" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={save}>Сохранить</Button>
        </div>
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Активные сессии">
          <div className="space-y-3">
            {[
              { device: "Chrome на macOS", location: "Москва", current: true },
              { device: "Safari на iPhone", location: "Москва", current: false },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-border p-3">
                <div>
                  <div className="text-sm font-medium">{s.device}</div>
                  <div className="text-xs text-muted-foreground">{s.location}</div>
                </div>
                {s.current ? <Badge variant="outline" className="bg-success/10 text-success">Текущая</Badge> : <Button variant="outline" size="sm">Выйти</Button>}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="История входов">
          <div className="space-y-2 text-sm">
            {[
              "Сегодня, 14:23 · Москва · Chrome",
              "Вчера, 09:11 · Москва · Safari iPhone",
              "20 мая, 22:48 · Санкт-Петербург · Chrome",
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg p-2 hover:bg-muted/40">
                <span>{s}</span>
                <Badge variant="outline" className="bg-success/10 text-success">OK</Badge>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input className="mt-1.5 h-11" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}
