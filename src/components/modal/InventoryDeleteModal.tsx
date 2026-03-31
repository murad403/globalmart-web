"use client"

import { AlertTriangle, X } from "lucide-react"
import type { InventoryItem } from "@/types/inventory"

type InventoryDeleteModalProps = {
  isOpen: boolean
  item: InventoryItem | null
  onClose: () => void
  onConfirmDelete: (itemId: number) => void
}

export default function InventoryDeleteModal({ isOpen, item, onClose, onConfirmDelete }: InventoryDeleteModalProps) {
  if (!isOpen || !item) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-4" onClick={onClose}>
      <article className="w-full max-w-sm rounded-2xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <header className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="text-base font-semibold text-title">Delete Inventory Item</h2>
          <button type="button" onClick={onClose} className="grid size-8 place-items-center rounded-md text-description hover:bg-muted" aria-label="Close">
            <X className="size-4" />
          </button>
        </header>

        <div className="space-y-4 p-4">
          <div className="flex items-start gap-3 rounded-lg bg-red-500/8 p-3">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-red-500" />
            <p className="text-sm text-title">
              Are you sure you want to delete <span className="font-semibold">{item.name}</span>? This action cannot be undone.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onConfirmDelete(item.id)}
              className="h-10 rounded-lg bg-red-500 text-sm font-semibold text-white hover:bg-red-600"
            >
              Confirm Delete
            </button>
            <button type="button" onClick={onClose} className="h-10 rounded-lg bg-muted text-sm font-semibold text-description hover:bg-muted/80">
              Cancel
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}

