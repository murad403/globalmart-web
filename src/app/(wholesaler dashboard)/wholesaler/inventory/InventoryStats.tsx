import { AlertTriangle, Boxes, Layers3 } from "lucide-react"
import type { InventoryItem } from "@/types/inventory"
import { getInventoryStatus } from "@/types/inventory"

type InventoryStatsProps = {
  items: InventoryItem[]
}

export default function InventoryStats({ items }: InventoryStatsProps) {
  const totalStockUnits = items.reduce((sum, item) => sum + item.stock, 0)
  const lowStockAlerts = items.filter((item) => getInventoryStatus(item.stock) === "Low Stock").length
  const outOfStock = items.filter((item) => getInventoryStatus(item.stock) === "Out of Stock").length

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-3">
      <article className="rounded-lg bg-linear-to-r from-[#2B7FFF] to-[#155DFC] p-5 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-white/85">Total Stock Units</p>
            <p className="mt-2 text-3xl leading-none font-semibold">{totalStockUnits}</p>
          </div>
          <div className="grid size-10 place-items-center rounded-lg bg-white/15">
            <Boxes className="size-5" />
          </div>
        </div>
      </article>

      <article className="rounded-lg bg-linear-to-r from-[#FF6900] to-button-end p-5 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-white/85">Low Stock Alerts</p>
            <p className="mt-2 text-3xl leading-none font-semibold">{lowStockAlerts}</p>
          </div>
          <div className="grid size-10 place-items-center rounded-lg bg-white/20">
            <AlertTriangle className="size-5" />
          </div>
        </div>
      </article>

      <article className="rounded-lg bg-linear-to-r from-[#F6339A] to-[#E60076] p-5 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-white/85">Out of Stock</p>
            <p className="mt-2 text-3xl leading-none font-semibold">{outOfStock}</p>
          </div>
          <div className="grid size-10 place-items-center rounded-lg bg-white/20">
            <Layers3 className="size-5" />
          </div>
        </div>
      </article>
    </div>
  )
}

