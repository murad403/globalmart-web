import { DollarSign, Package, TrendingUp } from "lucide-react"
import type { OrderRecord } from "@/types/orders"

type OrderStatsProps = {
  orders: OrderRecord[]
}

export default function OrderStats({ orders }: OrderStatsProps) {
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total.replace(/[^0-9.]/g, "")), 0)
  const shippedOrders = orders.filter((order) => order.status === "Shipped").length

  const statCards = [
    {
      label: "Total Orders",
      value: `${totalOrders}`,
      icon: Package,
      iconClassName: "bg-main/10 text-main",
    },
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      iconClassName: "bg-emerald-500/10 text-emerald-600",
    },
    {
      label: "Shipped Orders",
      value: `${shippedOrders}`,
      icon: TrendingUp,
      iconClassName: "bg-indigo-500/10 text-indigo-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 xl:grid-cols-3">
      {statCards.map((stat) => (
        <article key={stat.label} className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-start justify-between">
            <p className="text-sm text-description">{stat.label}</p>
            <div className={`grid size-8 place-items-center rounded-md ${stat.iconClassName}`}>
              <stat.icon className="size-4" />
            </div>
          </div>
          <p className="mt-2 text-3xl leading-none font-semibold text-title">{stat.value}</p>
        </article>
      ))}
    </div>
  )
}

