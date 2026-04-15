"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, LayoutGrid, LogOut, ShoppingCart, UserRound, Settings, MessageSquareText, Search, Store, School, Wallet } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react"


const menuItems = [
  { label: "Overview", href: "/reseller", icon: LayoutGrid },
  { label: "Catalog", href: "/reseller/my-products", icon: Search },
  { label: "My Store", href: "/reseller/import-products", icon: Store },
  { label: "Storefront", href: "/reseller/orders", icon: School },
  { label: "Orders", href: "/reseller/orders", icon: ShoppingCart },
  { label: "Message", href: "/reseller/message", icon: MessageSquareText },
  { label: "Finance", href: "/reseller/finance", icon: ShoppingCart },
  { label: "Reports", href: "/reseller/finance", icon: Wallet },
  { label: "Notifications", href: "/reseller/finance", icon: Bell },
  { label: "Settings", href: "/reseller/finance", icon: Settings },
]

export default function ResellerLayout({ children }: {children: React.ReactNode}) {
  const pathname = usePathname()

  const isMenuActive = (href: string) => {
    if (href === "/reseller") {
      return pathname === href
    }

    return pathname.startsWith(href)
  }

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider
        defaultOpen
        style={{
          ["--sidebar-width-icon" as string]: "4.25rem",
        }}
      >
        <Sidebar
          collapsible="icon"
          className="border-r border-sidebar-border"
          style={{
            ["--sidebar" as string]: "var(--color-title)",
            ["--sidebar-foreground" as string]: "oklch(0.95 0 0)",
            ["--sidebar-accent" as string]: "color-mix(in oklab, var(--color-main) 80%, black)",
            ["--sidebar-accent-foreground" as string]: "white",
            ["--sidebar-border" as string]: "color-mix(in oklab, var(--color-title) 75%, white)",
          }}
        >
          <SidebarHeader className="px-3 py-4 group-data-[collapsible=icon]:px-2">
            <div className="flex items-center gap-3 group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:justify-center">
              <div className="grid size-9 place-items-center rounded-lg bg-main font-semibold text-white">M</div>
              <div className="group-data-[collapsible=icon]:hidden">
                <p className="text-base font-semibold text-white">GlobalMart</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-2 group-data-[collapsible=icon]:px-1">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.label} className="mb-2">
                      <SidebarMenuButton
                        asChild
                        isActive={isMenuActive(item.href)}
                        tooltip={item.label}
                        className="h-10 rounded-lg px-3 text-sm font-medium data-[active=true]:bg-main data-[active=true]:text-white group-data-[collapsible=icon]:mx-auto text-gray-300 group-data-[collapsible=icon]:justify-center"
                      >
                        <Link href={item.href}>
                          <item.icon className="size-4" />
                          <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="px-3 pb-4 group-data-[collapsible=icon]:px-2">
            <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3 group-data-[collapsible=icon]:hidden">
              <p className="text-xs uppercase tracking-wide text-white/50">Logged in as</p>
              <p className="text-sm font-medium text-white">Reseller</p>
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="h-10 rounded-xl text-red-200 hover:bg-red-500/20 hover:text-red-100 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:justify-center" tooltip="Logout">
                  <LogOut className="size-4" />
                  <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset className="bg-background">
          <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/75">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="relative grid size-9 place-items-center rounded-full border border-border bg-card text-description"
                >
                  <Bell className="size-4" />
                  <span className="absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-heading text-[10px] font-semibold text-white">
                    5
                  </span>
                </button>
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-title">Premium Reseller</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-main">Reseller</p>
                </div>
                <div className="grid size-9 place-items-center rounded-full bg-main text-sm font-semibold text-white">
                  <UserRound className="size-4" />
                </div>
              </div>
            </div>
          </header>

          <main className="min-h-[calc(100svh-5rem)] p-4 sm:p-6 bg-[#F9FAFB]">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
