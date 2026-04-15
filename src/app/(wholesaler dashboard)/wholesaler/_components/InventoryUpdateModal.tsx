"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Box, Sparkles, X } from "lucide-react"
import type { InventoryItem } from "@/types/inventory"

type InventoryUpdateModalProps = {
  isOpen: boolean
  item: InventoryItem | null
  onClose: () => void
  onUpdate: (itemId: number, newStock: number) => void
}

type UpdateStockForm = {
  stock: number
}

export default function InventoryUpdateModal({ isOpen, item, onClose, onUpdate }: InventoryUpdateModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateStockForm>({
    defaultValues: {
      stock: item?.stock ?? 0,
    },
  })

  useEffect(() => {
    if (item) {
      reset({ stock: item.stock })
    }
  }, [item, reset])

  if (!isOpen || !item) {
    return null
  }

  const onSubmit = (values: UpdateStockForm) => {
    onUpdate(item.id, values.stock)
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-4" onClick={onClose}>
      <article className="w-full max-w-md rounded-2xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <header className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="text-base font-semibold text-title">Update Stock Level</h2>
          <button type="button" onClick={onClose} className="grid size-8 place-items-center rounded-md text-description hover:bg-muted" aria-label="Close">
            <X className="size-4" />
          </button>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-muted/40 p-3">
            <div className="grid size-8 place-items-center rounded-md bg-muted text-description">
              <Box className="size-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-title">{item.name}</p>
              <p className="text-xs text-description">Current Stock: {item.stock}</p>
            </div>
          </div>

          <div>
            <label htmlFor="stockQuantity" className="mb-1.5 block text-xs font-semibold text-title">
              New Stock Quantity
            </label>
            <input
              id="stockQuantity"
              type="number"
              min={0}
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-title outline-none focus:border-main"
              {...register("stock", {
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Stock can't be negative",
                },
                required: "Stock is required",
              })}
            />
            {errors.stock?.message && <p className="mt-1 text-xs text-red-500">{errors.stock.message}</p>}
          </div>

          <div className="flex items-start gap-2 rounded-lg bg-main/8 px-3 py-2">
            <Sparkles className="mt-0.5 size-3.5 shrink-0 text-main" />
            <p className="text-[11px] leading-relaxed text-main/90">
              Updating stock will automatically update the product status for resellers.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button type="submit" className="h-10 rounded-lg bg-main text-sm font-semibold text-white hover:opacity-90 cursor-pointer">
              Update Stock
            </button>
            <button type="button" onClick={onClose} className="h-10 rounded-lg bg-muted text-sm font-semibold text-description hover:bg-muted/80 cursor-pointer">
              Cancel
            </button>
          </div>
        </form>
      </article>
    </div>
  )
}

