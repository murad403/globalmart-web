import { ArrowUpRight, Box, ShoppingBag, TrendingUp, UsersRound, type LucideIcon } from "lucide-react"

type Stat = {
  title: string
  value: string
  growth: string
  icon: LucideIcon
  iconClassName: string
}

const stats: Stat[] = [
  {
    title: "Sales Growth",
    value: "+24.5%",
    growth: "+21% from last month",
    icon: TrendingUp,
    iconClassName: "bg-emerald-500/10 text-emerald-600",
  },
  {
    title: "Total Orders",
    value: "1,240",
    growth: "+12.5% from last month",
    icon: ShoppingBag,
    iconClassName: "bg-main/10 text-main",
  },
  {
    title: "New Resellers",
    value: "12",
    growth: "+5.2% from last month",
    icon: UsersRound,
    iconClassName: "bg-violet-500/10 text-violet-600",
  },
  {
    title: "Product Reach",
    value: "45.2K",
    growth: "+8.4% from last month",
    icon: Box,
    iconClassName: "bg-orange-500/10 text-orange-600",
  },
]

export default function AnalyticsStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
      {stats.map((stat) => (
        <article key={stat.title} className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div className={`grid p-2.5 place-items-center rounded-lg ${stat.iconClassName}`}>
              <stat.icon className="size-5" />
            </div>
            <ArrowUpRight className="size-4 text-green-500" />
          </div>
          <p className="mt-4 text-2xl leading-none font-semibold text-title">{stat.value}</p>
          <p className="mt-2 text-sm text-description">{stat.title}</p>
          <p className="mt-1 text-xs font-medium text-green-500">{stat.growth}</p>
        </article>
      ))}
    </div>
  )
}
