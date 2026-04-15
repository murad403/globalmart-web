"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Box, BriefcaseBusiness, CreditCard, DollarSign, Lock, UserRound } from "lucide-react"
import WholeSalerPageHeader from "../_components/WholeSalerPageHeader"

type SettingsShellProps = {
  title: string
  description: string
  children: React.ReactNode
}

const items = [
  { label: "Business Profile", href: "/wholesaler/settings", icon: UserRound, exact: true },
  { label: "Pricing & Margins", href: "/wholesaler/settings/pricing&-margins", icon: DollarSign },
  { label: "Order Settings", href: "/wholesaler/settings/order-settings", icon: Box },
  { label: "Reseller Management", href: "/wholesaler/settings/reseller-management", icon: BriefcaseBusiness },
  { label: "Notifications", href: "/wholesaler/settings/notifications", icon: Bell },
  { label: "Security", href: "/wholesaler/settings/security", icon: Lock },
  { label: "Payment & Billing", href: "/wholesaler/settings/payment-&-billing", icon: CreditCard },
]

export default function SettingsShell({ title, description, children }: SettingsShellProps) {
  const pathname = usePathname()

  return (
    <section className="space-y-4 sm:space-y-5">
      <WholeSalerPageHeader title="Settings" description="Manage your account settings and preferences"/>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[270px_1fr]">
        <aside className="overflow-hidden rounded-xl border border-border bg-card">
          <nav className="flex flex-col">
            {items.map((item) => {
              const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 border-b border-border px-4 py-3 text-sm font-medium last:border-b-0 ${
                    isActive ? "bg-main text-white" : "text-description hover:bg-muted/40 hover:text-title"
                  }`}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        <article className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <h2 className="text-2xl font-semibold text-title">{title}</h2>
          <p className="mt-1 text-description text-sm">{description}</p>
          <div className="mt-5">{children}</div>
        </article>
      </div>
    </section>
  )
}
