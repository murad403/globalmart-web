import { AlertTriangle, Boxes, Clock3, DollarSign, LucideIcon, Truck, UsersRound } from 'lucide-react'
import React from 'react'

type Metric = {
  title: string
  value: string
  icon: LucideIcon
  badgeClassName: string
}


const metrics: Metric[] = [
  {
    title: "Total Products",
    value: "5",
    icon: Boxes,
    badgeClassName: "bg-main/10 text-main",
  },
  {
    title: "Active Orders",
    value: "3",
    icon: Truck,
    badgeClassName: "bg-emerald-500/10 text-emerald-600",
  },
  {
    title: "Total Revenue",
    value: "$5,685",
    icon: DollarSign,
    badgeClassName: "bg-fuchsia-500/10 text-fuchsia-600",
  },
  {
    title: "Pending Orders",
    value: "1",
    icon: Clock3,
    badgeClassName: "bg-amber-500/10 text-amber-600",
  },
  {
    title: "Low Stock",
    value: "1",
    icon: AlertTriangle,
    badgeClassName: "bg-rose-500/10 text-rose-600",
  },
  {
    title: "Active Resellers",
    value: "3",
    icon: UsersRound,
    badgeClassName: "bg-orange-500/10 text-orange-600",
  },
]

const Stats = () => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
            {metrics.map((metric) => (
                <article key={metric.title} className="rounded-lg border border-border bg-card p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-description">{metric.title}</p>
                        <div className={`grid size-8 place-items-center rounded-lg ${metric.badgeClassName}`}>
                            <metric.icon className="size-4" />
                        </div>
                    </div>
                    <p className="mt-2 text-4xl leading-none font-semibold text-title">{metric.value}</p>
                </article>
            ))}
        </div>
    )
}

export default Stats
