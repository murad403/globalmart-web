"use client"

import { Trash2, X } from 'lucide-react'

type MyStoreDeleteModalProps = {
  isOpen: boolean
  productName: string
  onClose: () => void
  onConfirm: () => void
}

const MyStoreDeleteModal = ({ isOpen, productName, onClose, onConfirm }: MyStoreDeleteModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-4" onClick={onClose}>
      <article className="w-full max-w-sm rounded-2xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <header className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="text-base font-semibold text-title">Delete Product</h2>
          <button type="button" onClick={onClose} className="grid size-8 place-items-center rounded-md text-description hover:bg-muted" aria-label="Close">
            <X className="size-4" />
          </button>
        </header>

        <div className="space-y-4 p-4">
          <div className="rounded-lg bg-red-500/8 p-3 text-center">
            <div className="mx-auto mb-2 grid size-10 place-items-center rounded-full bg-white">
              <Trash2 className="size-5 text-red-500" />
            </div>
            <p className="text-sm text-title">
              Are you sure you want to delete <span className="font-semibold">{productName}</span> from your store?
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={onConfirm} className="h-10 cursor-pointer rounded-lg bg-red-500 text-sm font-semibold text-white hover:bg-red-600">
              Yes, Delete
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

export default MyStoreDeleteModal
