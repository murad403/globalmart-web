"use client"

import type { TransactionRecord } from './transactions-data'

type TransactionsStatsProps = {
  transactions: TransactionRecord[]
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

const TransactionsStats = ({ transactions }: TransactionsStatsProps) => {
  const totalSpent = transactions.filter((item) => item.amount < 0).reduce((sum, item) => sum + Math.abs(item.amount), 0)
  const totalCredits = transactions.filter((item) => item.amount > 0).reduce((sum, item) => sum + item.amount, 0)
  const pendingCount = transactions.filter((item) => item.status === 'Pending' || item.status === 'Processing').length

  const cards = [
    { label: 'Total Spent', value: currency.format(totalSpent), helper: 'Across completed payments', accent: 'text-title' },
    { label: 'Credits & Refunds', value: currency.format(totalCredits), helper: 'Refunds and adjustments', accent: 'text-main' },
    { label: 'Pending Items', value: String(pendingCount), helper: 'Awaiting confirmation', accent: 'text-amber-600' }
  ]

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {cards.map((card) => (
        <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-description">{card.label}</p>
          <p className={`mt-2 text-2xl font-semibold ${card.accent}`}>{card.value}</p>
          <p className="mt-1 text-[11px] text-description">{card.helper}</p>
        </div>
      ))}
    </div>
  )
}

export default TransactionsStats
