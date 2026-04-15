"use client"

import { AlertTriangle, X } from 'lucide-react'

type DeclineOrderModalProps = {
  isOpen: boolean
  orderName: string
  onClose: () => void
  onConfirm: () => void
}

const DeclineOrderModal = ({ isOpen, orderName, onClose, onConfirm }: DeclineOrderModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-4" onClick={onClose}>
      <article className="w-full max-w-md rounded-2xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h2 className="text-lg font-semibold text-title">Decline Order</h2>
          <button type="button" onClick={onClose} className="grid size-8 place-items-center rounded-md text-description hover:bg-slate-100" aria-label="Close">
            <X className="size-4" />
          </button>
        </header>

        <div className="space-y-4 p-4">
          <div className="rounded-lg bg-red-500/8 p-3">
            <div className="mb-2 flex items-center gap-2 text-red-600">
              <AlertTriangle className="size-4" />
              <p className="text-sm font-semibold">Final Confirmation</p>
            </div>
            <p className="text-sm text-title">
              Are you sure you want to decline <span className="font-semibold">{orderName}</span>? This action cannot be undone.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button type="button" onClick={onConfirm} className="h-10 cursor-pointer rounded-lg bg-red-500 text-sm font-semibold text-white hover:bg-red-600">
              Yes, Decline
            </button>
            <button type="button" onClick={onClose} className="h-10 cursor-pointer rounded-lg bg-muted text-sm font-semibold text-description hover:bg-muted/80">
              Cancel
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}

export default DeclineOrderModal
