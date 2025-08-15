"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Award,
  BookOpen,
  CreditCard,
  LayoutDashboard,
  ListTodo,
  LogOut,
  TrendingUp,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/expenses",
    label: "Expenses",
    icon: CreditCard,
  },
  {
    href: "/dashboard/tasks",
    label: "Tasks",
    icon: ListTodo,
  },
  {
    href: "/dashboard/portfolio",
    label: "Portfolio",
    icon: TrendingUp,
  },
  {
    href: "/dashboard/reading",
    label: "Reading",
    icon: BookOpen,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  const userLevel = 5;
  const userXP = 450;
  const xpForNextLevel = 1000;
  const xpProgress = (userXP / xpForNextLevel) * 100;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="border-r" variant="sidebar" collapsible="icon">
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <Link href={item.href}>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      tooltip={item.label}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-2 space-y-2 group-data-[collapsible=icon]:hidden">
                <div className="text-center text-sm">
                    Level <Badge variant="secondary">{userLevel}</Badge>
                </div>
                <Progress value={xpProgress} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">{userXP} / {xpForNextLevel} XP</p>
                <div className="flex justify-center gap-2 flex-wrap">
                    <Badge variant="outline" className="flex items-center gap-1 border-yellow-500 text-yellow-500"><Award className="h-3 w-3" /> Task Master</Badge>
                    <Badge variant="outline" className="flex items-center gap-1 border-green-500 text-green-500"><Award className="h-3 w-3" /> Reading Champ</Badge>
                </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors hover:bg-sidebar-accent">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/avatar.jpg"
                      alt="User"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="overflow-hidden group-data-[collapsible=icon]:hidden">
                    <p className="truncate text-sm font-medium">Saravanakumar M</p>
                    <p className="truncate text-xs text-muted-foreground">
                      msaravanakumar2005@gmail.com
                    </p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="max-w-full overflow-x-hidden bg-background">
          <main className="h-full p-4 sm:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
