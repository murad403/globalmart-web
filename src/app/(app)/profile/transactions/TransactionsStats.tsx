"use client"

import { TrendingUp } from 'lucide-react'
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
    { label: 'Total Spent', value: currency.format(totalSpent), accent: 'text-green-600' },
    { label: 'Credits & Refunds', value: currency.format(totalCredits), accent: 'text-blue-600' },
    { label: 'Pending Items', value: String(pendingCount), accent: 'text-amber-600' }
  ]

  return (
    <div className="grid gap-4 md:gap-6 md:grid-cols-3">
      {cards.map((card) => (
        <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs md:text-sm text-description flex justify-between items-center">{card.label} <TrendingUp size={20} className='text-green-500'/></p>
          <p className={`mt-2 text-2xl md:text-3xl font-semibold ${card.accent}`}>{card.value}</p>
        </div>
      ))}
    </div>
  )
}

export default TransactionsStats
