import { AlertCircle, Banknote, Box, CircleDollarSign, ShoppingBasket, Wallet } from 'lucide-react'

const stats = [
  {
    id: 'products',
    label: 'My Products',
    value: '18',
    icon: Box,
    iconStyle: 'bg-blue-100 text-main'
  },
  {
    id: 'active-orders',
    label: 'Active Orders',
    value: '12',
    icon: ShoppingBasket,
    iconStyle: 'bg-emerald-100 text-emerald-600'
  },
  {
    id: 'escrow',
    label: 'Escrow Balance',
    value: '$4,500',
    icon: Wallet,
    iconStyle: 'bg-violet-100 text-violet-600'
  },
  {
    id: 'profit',
    label: 'Total Profit',
    value: '$12,800',
    icon: CircleDollarSign,
    iconStyle: 'bg-orange-100 text-orange-600'
  },
  {
    id: 'withdrawals',
    label: 'Pending Withdrawals',
    value: '$1,200',
    icon: AlertCircle,
    iconStyle: 'bg-red-100 text-red-500'
  },
  {
    id: 'ai-orders',
    label: 'AI Orders',
    value: '24',
    icon: Banknote,
    iconStyle: 'bg-amber-100 text-amber-600'
  }
]

const ResellerOverviewStats = () => {
  return (
    <section className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
      {stats.map((item) => (
        <article key={item.id} className="rounded-xl border border-slate-200 bg-white p-4 md:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-description">{item.label}</p>
              <p className="mt-1 text-2xl md:text-3xl font-semibold text-title">{item.value}</p>
            </div>
            <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-md ${item.iconStyle}`}>
              <item.icon className="h-4 w-4" />
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}

export default ResellerOverviewStats
