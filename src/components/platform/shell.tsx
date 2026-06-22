import { type ReactNode } from "react";
import { Outlet, Link, useRouterState } from "@tanstack/react-router";
import { Bell, Search, LogOut } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
  SidebarFooter, SidebarHeader, useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/brand/theme-toggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useAuthSession } from "@/hooks/use-auth";

export type PlatformNavItem = { to: string; label: string; icon: any; exact?: boolean; badge?: string };
export type PlatformNavGroup = { label: string; items: PlatformNavItem[] };

export function PlatformShell({
  area,
  areaIcon: AreaIcon,
  groups,
  secondary,
  searchPlaceholder = "Поиск…",
  children,
}: {
  area: string;
  areaIcon: any;
  groups: PlatformNavGroup[];
  secondary?: PlatformNavItem[];
  searchPlaceholder?: string;
  children?: ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-surface/40">
        <AppSide groups={groups} secondary={secondary ?? []} area={area} areaIcon={AreaIcon} />
        <div className="flex flex-1 flex-col">
          <Topbar area={area} areaIcon={AreaIcon} searchPlaceholder={searchPlaceholder} />
          <main className="flex-1 p-4 md:p-8">
            <div className="mx-auto max-w-7xl">{children ?? <Outlet />}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function AppSide({ groups, secondary, area, areaIcon: AreaIcon }: { groups: PlatformNavGroup[]; secondary: PlatformNavItem[]; area: string; areaIcon: any }) {
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
        {!collapsed && (
          <div className="mt-1 flex items-center gap-2 rounded-lg border border-sidebar-border bg-sidebar-accent/40 px-2 py-1.5">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-primary/10 text-primary">
              <AreaIcon className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-medium">{area}</div>
              <div className="truncate text-[10px] text-muted-foreground">Раздел платформы</div>
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        {groups.map((g) => (
          <SidebarGroup key={g.label}>
            <SidebarGroupLabel>{g.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {g.items.map((it) => (
                  <SidebarMenuItem key={it.to}>
                    <SidebarMenuButton asChild isActive={isActive(it.to, it.exact)} tooltip={it.label}>
                      <Link to={it.to}>
                        <it.icon className="h-4 w-4" />
                        <span>{it.label}</span>
                        {it.badge && (
                          <Badge variant="outline" className="ml-auto h-5 px-1.5 text-[10px]">{it.badge}</Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {secondary.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Аккаунт</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {secondary.map((it) => (
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
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="px-2 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
          {!collapsed && "Демо · официальные API подключаются позже"}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function Topbar({ area, areaIcon: AreaIcon, searchPlaceholder }: { area: string; areaIcon: any; searchPlaceholder: string }) {
  const { user } = useAuthSession();
  const initials = (user?.email?.[0] ?? "У").toUpperCase();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md">
      <SidebarTrigger />
      <div className="hidden flex-1 max-w-md md:flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-sm text-muted-foreground">
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">{searchPlaceholder}</span>
        <kbd className="hidden lg:inline-flex h-5 items-center rounded border border-border bg-background px-1.5 text-[10px] font-mono">⌘K</kbd>
      </div>
      <div className="flex-1 md:hidden" />
      <Badge variant="outline" className="hidden sm:inline-flex">
        <AreaIcon className="mr-1 h-3 w-3" />
        {area}
      </Badge>
      <ThemeToggle />
      <Button variant="ghost" size="icon" aria-label="Уведомления">
        <Bell className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="text-sm font-medium">{user?.email ?? "Пользователь"}</div>
            <div className="text-xs text-muted-foreground">{area}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild><Link to="/app">Все кабинеты</Link></DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.assign("/auth");
            }}
            className="text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" /> Выйти
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
