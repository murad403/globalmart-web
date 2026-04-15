import { ArrowDownRight, ArrowUpRight, CreditCard, DollarSign, Wallet } from "lucide-react"

type FinanceStat = {
  title: string
  value: string
  trend: string
  trendUp: boolean
  icon: React.ComponentType<{ className?: string }>
  iconWrapClass: string
}

const stats: FinanceStat[] = [
  {
    title: "Total Revenue",
    value: "$124,592.00",
    trend: "+12.5% from last month",
    trendUp: true,
    icon: DollarSign,
    iconWrapClass: "bg-main/10 text-main",
  },
  {
    title: "Available Balance",
    value: "$42,180.50",
    trend: "+5.2% from last month",
    trendUp: true,
    icon: Wallet,
    iconWrapClass: "bg-emerald-500/10 text-emerald-600",
  },
  {
    title: "Pending Payouts",
    value: "$8,420.00",
    trend: "-2.1% from last month",
    trendUp: false,
    icon: CreditCard,
    iconWrapClass: "bg-orange-500/10 text-orange-600",
  },
]

export default function FinanceStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <article key={stat.title} className="rounded-lg border border-border bg-card p-4 sm:p-5">
          <div className="flex items-start justify-between">
            <p className="text-sm text-description">{stat.title}</p>
            <div className={`grid size-8 place-items-center rounded-lg ${stat.iconWrapClass}`}>
              <stat.icon className="size-4" />
            </div>
          </div>

          <p className="mt-3 text-2xl leading-none font-semibold text-title">{stat.value}</p>

          <p className={`mt-3 flex items-center gap-1 text-sm font-medium ${stat.trendUp ? "text-emerald-600" : "text-red-500"}`}>
            {stat.trendUp ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {stat.trend}
          </p>
        </article>
      ))}
    </div>
  )
}
