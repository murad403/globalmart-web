"use client"

import { BarChart3, Box, CheckCircle2, Mail, Star, X } from "lucide-react"

export type ResellerModalData = {
  name: string
  email: string
  initials: string
  status: "Active" | "Suspended"
  joinedDate: string
  totalOrders: number
  totalRevenue: string
}

type ResellerDetailsModalProps = {
  isOpen: boolean
  reseller: ResellerModalData | null
  onClose: () => void
}

export default function ResellerDetailsModal({ isOpen, reseller, onClose }: ResellerDetailsModalProps) {
  if (!isOpen || !reseller) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-4" onClick={onClose}>
      <article
        className="w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
          <h2 className="text-2xl font-semibold text-title">Reseller Details</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid size-9 place-items-center rounded-full text-description transition hover:bg-muted cursor-pointer"
            aria-label="Close reseller details"
          >
            <X className="size-5" />
          </button>
        </header>

        <div className="max-h-[calc(100svh-7rem)] space-y-5 overflow-y-auto p-5 sm:p-6">
          <div className="rounded-lg bg-muted/40 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="grid place-items-center rounded-lg bg-main font-semibold text-white size-10">
                {reseller.initials}
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-title">{reseller.name}</h3>
                <p className="mt-1 text-base md:text-lg text-description">{reseller.email}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-sm font-medium ${
                      reseller.status === "Active" ? "bg-emerald-500/20 text-emerald-700" : "bg-amber-500/25 text-amber-700"
                    }`}
                  >
                    {reseller.status}
                  </span>
                  <span className="text-xs text-description">Partner since {reseller.joinedDate}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border p-4 sm:p-5">
              <p className="flex items-center gap-2 text-xs font-medium tracking-wide text-description uppercase">
                <Box className="size-4" />
                Total Orders
              </p>
              <p className="mt-2 text-3xl leading-none font-semibold text-title">{reseller.totalOrders}</p>
            </div>
            <div className="rounded-2xl border border-border p-4 sm:p-5">
              <p className="flex items-center gap-2 text-xs font-medium tracking-wide text-description uppercase">
                <Star className="size-4" />
                Total Revenue
              </p>
              <p className="mt-2 text-3xl leading-none font-semibold text-emerald-600">{reseller.totalRevenue}</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-title uppercase">Management Actions</h4>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button type="button" className="flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-500/15 text-sm font-semibold text-emerald-700">
                <CheckCircle2 className="size-4" />
                Approve Partner
              </button>
              <button type="button" className="flex h-11 items-center justify-center gap-2 rounded-lg bg-main/10 text-sm font-semibold text-main">
                <Mail className="size-4" />
                Send Message
              </button>
              <button type="button" className="flex h-11 items-center justify-center gap-2 rounded-lg bg-muted text-sm font-semibold text-title">
                <BarChart3 className="size-4" />
                View Reports
              </button>
              <button type="button" className="flex h-11 items-center justify-center gap-2 rounded-lg bg-muted text-sm font-semibold text-title">
                <Box className="size-4" />
                Custom Pricing
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4">
            <p className="flex items-center gap-2 text-base font-semibold text-amber-900">
              <Star className="size-4" />
              Partner Performance Note
            </p>
            <p className="mt-1 text-sm text-amber-800">
              This reseller has shown 15% growth in the last 30 days. Consider offering a volume discount to encourage larger orders.
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
