"use client"

import { useState } from "react"
import { Eye } from "lucide-react"
import ResellerDetailsModal, { type ResellerModalData } from "@/components/modal/ResellerDetailsModal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ResellerRow = ResellerModalData & {
  id: string
  totalOrdersLabel: string
}

const resellers: ResellerRow[] = [
  {
    id: "1",
    initials: "J",
    name: "John Doe Store",
    email: "john@resell.com",
    joinedDate: "2023-12-01",
    totalOrders: 142,
    totalOrdersLabel: "68",
    totalRevenue: "$3746.04",
    status: "Suspended",
  },
  {
    id: "2",
    initials: "S",
    name: "Sarah Fashion",
    email: "sarah@fashion.com",
    joinedDate: "2024-02-10",
    totalOrders: 184,
    totalOrdersLabel: "102",
    totalRevenue: "$5137.52",
    status: "Active",
  },
  {
    id: "3",
    initials: "G",
    name: "Gadget Hub",
    email: "info@gadgethub.com",
    joinedDate: "2023-09-25",
    totalOrders: 131,
    totalOrdersLabel: "31",
    totalRevenue: "$4544.48",
    status: "Active",
  },
  {
    id: "4",
    initials: "O",
    name: "Organic Living",
    email: "contact@organic.com",
    joinedDate: "2023-07-14",
    totalOrders: 126,
    totalOrdersLabel: "84",
    totalRevenue: "$5880.18",
    status: "Suspended",
  },
  {
    id: "5",
    initials: "M",
    name: "Minimalist Home",
    email: "sales@minimal.com",
    joinedDate: "2023-11-05",
    totalOrders: 140,
    totalOrdersLabel: "40",
    totalRevenue: "$3601.46",
    status: "Active",
  },
]

export default function ResellerNetwork() {
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "suspended">("all")
  const [selectedReseller, setSelectedReseller] = useState<ResellerModalData | null>(null)

  const filteredResellers = resellers.filter((reseller) => {
    if (statusFilter === "all") {
      return true
    }

    return statusFilter === "active" ? reseller.status === "Active" : reseller.status === "Suspended"
  })

  return (
    <>
      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex flex-col gap-3 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <h2 className="text-xl font-semibold text-title">Reseller Network</h2>
            <p className="text-sm text-description">Monitor and manage your distribution partners</p>
          </div>

          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as "all" | "active" | "suspended")}>
            <SelectTrigger className="h-9 min-w-28 rounded-lg bg-background">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Reseller</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Joined Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Total Orders</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Total Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredResellers.map((reseller) => (
                <tr key={reseller.id} className="border-b border-border/80 last:border-0">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid size-9 place-items-center rounded-full bg-violet-100 text-sm font-semibold text-violet-600">{reseller.initials}</div>
                      <span className="text-sm font-semibold text-title">{reseller.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-description">{reseller.email}</td>
                  <td className="px-4 py-4 text-sm text-description">{reseller.joinedDate}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-title">{reseller.totalOrdersLabel}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-green-500">{reseller.totalRevenue}</td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        reseller.status === "Active" ? "bg-emerald-500/15 text-green-500" : "bg-red-500/15 text-red-600"
                      }`}
                    >
                      {reseller.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      className="grid size-8 place-items-center rounded-lg text-description transition hover:bg-muted hover:text-title cursor-pointer"
                      aria-label={`View ${reseller.name} details`}
                      onClick={() => setSelectedReseller(reseller)}
                    >
                      <Eye className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <ResellerDetailsModal
        isOpen={Boolean(selectedReseller)}
        reseller={selectedReseller}
        onClose={() => setSelectedReseller(null)}
      />
    </>
  )
}
