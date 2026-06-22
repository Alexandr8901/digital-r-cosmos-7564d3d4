import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-dashboard.png";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32 gradient-hero">
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-4 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent shadow-glow" />
            Готовность к официальным интеграциям с банками и государственными сервисами
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-6 font-display text-5xl font-semibold tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl"
          >
            ЦифроРубль —{" "}
            <span className="text-gradient">единая финансовая экосистема</span> России
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            Один аккаунт для граждан, самозанятых, бизнеса и разработчиков. Управляйте
            платежами, документами и финансами через единую платформу.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg" className="h-12 px-6 text-base shadow-elegant">
              <Link to="/auth" search={{ mode: "signup" }}>
                Начать бесплатно
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-6 text-base">
              <a href="#features">Посмотреть возможности</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Шифрование и RBAC
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              Встроенный AI-ассистент
            </span>
            <span className="hidden items-center gap-2 sm:inline-flex">
              <span className="inline-flex h-1 w-1 rounded-full bg-muted-foreground" />
              API First · Mobile First
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-tr from-primary/15 via-transparent to-accent/20 blur-3xl" />
          <img
            src={heroImage}
            alt="Интерфейс ЦифроРубль: баланс, аналитика, QR-платёж и список операций"
            width={1280}
            height={1024}
            className="h-auto w-full select-none"
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
