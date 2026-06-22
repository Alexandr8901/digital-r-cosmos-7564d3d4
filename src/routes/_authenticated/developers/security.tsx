import { createFileRoute } from "@tanstack/react-router";
import { PlatformPage, IntegrationStatus, EmptyState, StatCard, SectionCard, ListRow, DataTable, Tag, Money, StatusBadge, Sparkline, MiniBar, Donut, FeatureGrid, Pill } from "@/components/platform/kit";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Download, Filter, Sparkles, ShieldCheck, Plug, Inbox, ArrowUpRight } from "lucide-react";
import * as mock from "@/lib/mock/platform";

export const Route = createFileRoute("/_authenticated/developers/security")({
  head: () => ({ meta: [{ title: "Безопасность · ЦифроРубль" }] }),
  component: Page,
});

function Page() {
  return (
    <PlatformPage
      title="Безопасность"
      description="JWT, OAuth, API Signature, аудит"
      action={
        <>
          <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />Экспорт</Button>
          <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Добавить</Button>
        </>
      }
      integration={<IntegrationStatus />}
    >
      <FeatureGrid items={[
          { icon: Sparkles, title: "JWT", description: "Подпись токенов" },
          { icon: Sparkles, title: "OAuth 2.1 + PKCE", description: "Авторизация" },
          { icon: Sparkles, title: "Passkeys", description: "Архитектура" },
          { icon: Sparkles, title: "Webhook Signature", description: "HMAC" },
          { icon: Sparkles, title: "IP Allow List", description: "Ограничение" },
          { icon: Sparkles, title: "Secret Rotation", description: "Ротация секретов" }
        ]} />
    </PlatformPage>
  );
}
