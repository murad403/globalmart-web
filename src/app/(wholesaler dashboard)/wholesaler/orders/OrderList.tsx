"use client"

import { Eye } from "lucide-react"
import { useMemo, useState } from "react"
import OrderDetailsModal from "@/app/(wholesaler dashboard)/wholesaler/_components/OrderDetailsModal"
import type { OrderRecord, OrderStatus } from "@/types/orders"

type OrderListProps = {
  orders: OrderRecord[]
  onStatusChange: (orderId: string, nextStatus: OrderStatus) => void
}

const statusTabs: Array<{ label: string; value: "All" | OrderStatus }> = [
  { label: "All", value: "All" },
  { label: "Pending", value: "Pending" },
  { label: "Processing", value: "Processing" },
  { label: "Shipped", value: "Shipped" },
  { label: "Delivered", value: "Delivered" },
  { label: "Cancelled", value: "Cancelled" },
]

function statusBadgeClass(status: OrderStatus): string {
  if (status === "Shipped" || status === "Delivered") {
    return "bg-emerald-500/15 text-emerald-700"
  }

  if (status === "Processing") {
    return "bg-blue-500/15 text-blue-700"
  }

  if (status === "Pending") {
    return "bg-orange-500/15 text-orange-700"
  }

  return "bg-red-500/15 text-red-600"
}

function statusDotClass(status: OrderStatus): string {
  if (status === "Shipped" || status === "Delivered") {
    return "bg-emerald-600"
  }

  if (status === "Processing") {
    return "bg-blue-600"
  }

  if (status === "Pending") {
    return "bg-orange-600"
  }

  return "bg-red-500"
}

export default function OrderList({ orders, onStatusChange }: OrderListProps) {
  const [activeTab, setActiveTab] = useState<"All" | OrderStatus>("All")
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null)

  const filteredOrders = useMemo(() => {
    if (activeTab === "All") {
      return orders
    }

    return orders.filter((order) => order.status === activeTab)
  }, [orders, activeTab])

  return (
    <>
      <section className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex flex-wrap gap-1.5 border-b border-border px-4 py-3 sm:px-5">
          {statusTabs.map((tab) => {
            const count = tab.value === "All" ? orders.length : orders.filter((order) => order.status === tab.value).length

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition ${
                  activeTab === tab.value ? "border-b-2 border-main text-main" : "text-description hover:text-title"
                }`}
              >
                {tab.label}
                <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs text-description">{count}</span>
              </button>
            )
          })}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Reseller</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Items</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Total</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-border/70 last:border-0">
                  <td className="px-4 py-4 text-sm font-semibold text-main">{order.id}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid size-8 place-items-center rounded-full bg-blue-100 text-xs font-semibold text-main">{order.initials}</div>
                      <span className="text-sm font-medium text-title">{order.reseller}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-description">{order.itemsCountLabel}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-title">{order.total}</td>
                  <td className="px-4 py-4 text-sm">
                    <div className="inline-flex items-center gap-2">
                      <span className={`size-2 rounded-full ${statusDotClass(order.status)}`} />
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusBadgeClass(order.status)}`}>{order.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-description">{order.date}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="grid size-8 cursor-pointer place-items-center rounded-md text-description transition hover:bg-muted hover:text-title"
                        aria-label={`View details of ${order.id}`}
                      >
                        <Eye className="size-4" />
                      </button>

                      <select
                        value={order.status}
                        onChange={(event) => onStatusChange(order.id, event.target.value as OrderStatus)}
                        className="h-8 rounded-lg border border-input bg-background px-2 text-xs font-medium text-title outline-none focus:border-main"
                        aria-label={`Change status for ${order.id}`}
                      >
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <OrderDetailsModal isOpen={Boolean(selectedOrder)} order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </>
  )
}

