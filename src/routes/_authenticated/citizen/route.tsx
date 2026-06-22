import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import {
  Home, Wallet, CreditCard, ArrowLeftRight, QrCode, History, PieChart,
  Repeat, FileText, Bell, Sparkles, User, Settings, LifeBuoy, Search, LogOut,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
  SidebarFooter, SidebarHeader, useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/brand/theme-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useAuthSession } from "@/hooks/use-auth";

export const Route = createFileRoute("/_authenticated/citizen")({
  component: CitizenLayout,
});

type NavItem = { to: string; label: string; icon: typeof Home; exact?: boolean };

const ITEMS: NavItem[] = [
  { to: "/citizen", label: "Главная", icon: Home, exact: true },
  { to: "/citizen/wallet", label: "Кошелёк", icon: Wallet },
  { to: "/citizen/payments", label: "Платежи", icon: CreditCard },
  { to: "/citizen/transfers", label: "Переводы", icon: ArrowLeftRight },
  { to: "/citizen/qr", label: "QR", icon: QrCode },
  { to: "/citizen/history", label: "История", icon: History },
  { to: "/citizen/analytics", label: "Аналитика", icon: PieChart },
  { to: "/citizen/subscriptions", label: "Подписки", icon: Repeat },
  { to: "/citizen/documents", label: "Документы", icon: FileText },
  { to: "/citizen/notifications", label: "Уведомления", icon: Bell },
  { to: "/citizen/ai", label: "AI", icon: Sparkles },
];

const SECONDARY: NavItem[] = [
  { to: "/citizen/profile", label: "Профиль", icon: User },
  { to: "/citizen/settings", label: "Настройки", icon: Settings },
  { to: "/citizen/support", label: "Поддержка", icon: LifeBuoy },
];

function CitizenLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-surface/40">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Topbar />
          <main className="flex-1 p-4 md:p-8">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center px-2 py-1.5">
          {collapsed ? (
            <div className="grid h-8 w-8 place-items-center rounded-lg brand-deep text-on-brand">
              <span className="font-display text-sm font-bold">Ц</span>
            </div>
          ) : (
            <Logo />
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Основное</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ITEMS.map((it) => (
                <SidebarMenuItem key={it.to}>
                  <SidebarMenuButton asChild isActive={isActive(it.to, it.exact)} tooltip={it.label}>
                    <Link to={it.to}>
                      <it.icon className="h-4 w-4" />
                      <span>{it.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Аккаунт</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SECONDARY.map((it) => (
                <SidebarMenuItem key={it.to}>
                  <SidebarMenuButton asChild isActive={isActive(it.to)} tooltip={it.label}>
                    <Link to={it.to}>
                      <it.icon className="h-4 w-4" />
                      <span>{it.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="px-2 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
          {!collapsed && "Демо-данные"}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function Topbar() {
  const { user } = useAuthSession();
  const initials = (user?.email?.[0] ?? "У").toUpperCase();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md">
      <SidebarTrigger />
      <div className="relative hidden flex-1 max-w-md md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Поиск операций, документов, контактов…" className="h-9 pl-9" />
      </div>
      <div className="flex-1 md:hidden" />
      <Badge variant="outline" className="hidden sm:inline-flex">Кабинет гражданина</Badge>
      <ThemeToggle />
      <Button asChild variant="ghost" size="icon" aria-label="Уведомления">
        <Link to="/citizen/notifications">
          <Bell className="h-4 w-4" />
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="text-sm font-medium">{user?.email ?? "Пользователь"}</div>
            <div className="text-xs text-muted-foreground">Гражданин</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild><Link to="/citizen/profile">Профиль</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link to="/citizen/settings">Настройки</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link to="/app">Все кабинеты</Link></DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.assign("/auth");
            }}
            className="text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Выйти
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
