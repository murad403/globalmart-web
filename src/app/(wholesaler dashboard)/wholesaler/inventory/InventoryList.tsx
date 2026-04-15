import { Box, Pencil, Trash2 } from "lucide-react"
import type { InventoryItem } from "@/types/inventory"
import { getInventoryStatus } from "@/types/inventory"

type InventoryListProps = {
  items: InventoryItem[]
  onEdit: (item: InventoryItem) => void
  onDelete: (item: InventoryItem) => void
}

function statusStyles(stock: number): string {
  const status = getInventoryStatus(stock)

  if (status === "Out of Stock") {
    return "bg-red-500/15 text-red-600"
  }

  if (status === "Low Stock") {
    return "bg-orange-500/15 text-orange-600"
  }

  return "bg-emerald-500/15 text-emerald-700"
}

export default function InventoryList({ items, onEdit, onDelete }: InventoryListProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-2xl font-semibold text-title">Inventory List</h2>
        <p className="text-sm text-description">Monitor and manage your warehouse stock</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-border bg-muted/20">
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-title uppercase">Product</th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-title uppercase">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-title uppercase">SKU</th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-title whitespace-nowrap uppercase">Stock Level</th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-title uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-title uppercase">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-border/70 last:border-0">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-9 place-items-center rounded-lg bg-muted text-description">
                      <Box className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-title whitespace-nowrap">{item.name}</p>
                      <p className="text-xs text-description">ID: #{item.id}</p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4 text-sm text-description">{item.category}</td>
                <td className="px-4 py-4 text-sm text-description whitespace-nowrap">{item.sku}</td>

                <td className="px-4 py-4">
                  <p className="text-sm font-semibold text-title">{item.stock}</p>
                  <div className="mt-1 h-1.5 w-21 rounded-full bg-muted">
                    <div
                      className={`h-1.5 rounded-full  ${item.stock <= 0 ? "bg-red-400" : item.stock <= 10 ? "bg-orange-500" : "bg-emerald-500"}`}
                      style={{ width: `${Math.max(Math.min((item.stock / 200) * 100, 100), item.stock > 0 ? 6 : 0)}%` }}
                    />
                  </div>
                </td>

                <td className="px-4 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ${statusStyles(item.stock)}`}>
                    {getInventoryStatus(item.stock)}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="grid size-8 cursor-pointer place-items-center rounded-md text-main transition hover:bg-main/10"
                      aria-label={`Edit ${item.name}`}
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item)}
                      className="grid size-8 cursor-pointer place-items-center rounded-md text-red-500 transition hover:bg-red-500/10"
                      aria-label={`Delete ${item.name}`}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

