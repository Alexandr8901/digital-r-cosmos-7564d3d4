import { createFileRoute } from "@tanstack/react-router";
import ogImage from "@/assets/og-image.png";
import { MarketingHeader } from "@/components/marketing/header";
import { HeroSection } from "@/components/marketing/hero";
import { FeatureGrid } from "@/components/marketing/features";
import { RolesSection } from "@/components/marketing/roles";
import { AiSection } from "@/components/marketing/ai-section";
import { IntegrationsSection } from "@/components/marketing/integrations";
import { CtaSection } from "@/components/marketing/cta";
import { MarketingFooter } from "@/components/marketing/footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ЦифроРубль — Единая финансовая экосистема России" },
      {
        name: "description",
        content:
          "Один аккаунт для граждан, самозанятых, бизнеса и разработчиков. Управляйте платежами, документами и финансами через единую платформу.",
      },
      { property: "og:title", content: "ЦифроРубль — Единая финансовая экосистема России" },
      {
        property: "og:description",
        content:
          "Единая платформа цифрового рубля России. Финансы, документы, бизнес и API в одном аккаунте.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: ogImage },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <MarketingHeader />
      <main>
        <HeroSection />
        <FeatureGrid />
        <RolesSection />
        <AiSection />
        <IntegrationsSection />
        <CtaSection />
      </main>
      <MarketingFooter />
    </div>
  );
}
