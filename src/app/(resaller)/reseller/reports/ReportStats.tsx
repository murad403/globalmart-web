import { DollarSign, ShoppingCart, UserRoundPlus, TrendingUp } from 'lucide-react'

const stats = [
  {
    id: 'revenue',
    title: 'Total Revenue',
    value: '$45,230',
    change: '+15.2% from last month',
    changeColor: 'text-emerald-600',
    icon: DollarSign,
    iconStyle: 'bg-blue-100 text-main'
  },
  {
    id: 'orders',
    title: 'Total Orders',
    value: '1,240',
    change: '+8.4% from last month',
    changeColor: 'text-emerald-600',
    icon: ShoppingCart,
    iconStyle: 'bg-orange-100 text-orange-600'
  },
  {
    id: 'customers',
    title: 'New Customers',
    value: '342',
    change: '-12.5% from last month',
    changeColor: 'text-red-500',
    icon: UserRoundPlus,
    iconStyle: 'bg-emerald-100 text-emerald-600'
  },
  {
    id: 'conversion',
    title: 'Conversion Rate',
    value: '3.2%',
    change: '+2.1% from last month',
    changeColor: 'text-emerald-600',
    icon: TrendingUp,
    iconStyle: 'bg-violet-100 text-violet-600'
  }
]

const ReportStats = () => {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article key={stat.id} className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-description">{stat.title}</p>
              <p className="mt-1 text-xl md:text-2xl font-semibold text-title">{stat.value}</p>
              <p className={`mt-1 text-xs ${stat.changeColor}`}>{stat.change}</p>
            </div>

            <div className={`grid h-7 w-7 place-items-center rounded-md ${stat.iconStyle}`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}

export default ReportStats
