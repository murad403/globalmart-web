"use client"

import { Box, X } from "lucide-react"
import type { OrderRecord } from "@/types/orders"

type OrderDetailsModalProps = {
  isOpen: boolean
  order: OrderRecord | null
  onClose: () => void
}

function statusBadgeClass(status: OrderRecord["status"]): string {
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

export default function OrderDetailsModal({ isOpen, order, onClose }: OrderDetailsModalProps) {
  if (!isOpen || !order) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-4" onClick={onClose}>
      <article className="w-full max-w-md rounded-xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg font-semibold text-title">Order Details: {order.id}</h2>
          <button type="button" onClick={onClose} className="grid size-8 place-items-center rounded-md text-description hover:bg-muted" aria-label="Close">
            <X className="size-4" />
          </button>
        </header>

        <div className="space-y-4 p-5">
          <div className="grid grid-cols-2 gap-4 rounded-xl bg-muted/35 p-4">
            <div>
              <p className="text-xs font-semibold tracking-wide text-description uppercase">Reseller</p>
              <p className="mt-1 text-sm font-semibold text-title">{order.reseller}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold tracking-wide text-description uppercase">Order Date</p>
              <p className="mt-1 text-sm font-semibold text-title">{order.date}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-title uppercase">Order Items</h3>
            <div className="mt-2 space-y-2">
              {order.items.map((item) => (
                <div key={`${item.sku}-${item.title}`} className="flex items-center justify-between rounded-xl bg-muted/35 p-3">
                  <div className="flex items-center gap-2.5">
                    <div className="grid size-8 place-items-center rounded-md bg-muted text-description">
                      <Box className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-title">{item.title}</p>
                      <p className="text-xs text-description">SKU: {item.sku}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-title">{item.qtyLabel}</p>
                    <p className="text-xs text-description">Total: {item.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-main/10 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-main">Current Status</p>
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusBadgeClass(order.status)}`}>{order.status}</span>
            </div>
            <p className="mt-1 text-xs text-main/80">Order has been dispatched and is on its way to the reseller.</p>
          </div>

          <button type="button" onClick={onClose} className="h-10 w-full rounded-lg bg-muted text-sm font-semibold text-title hover:bg-muted/80 cursor-pointer">
            Close
          </button>
        </div>
      </article>
    </div>
  )
}

