"use client"

import Link from 'next/link'
import { Eye } from 'lucide-react'
import Pagination from '@/components/shared/Pagination'
import type { TransactionRecord } from './transactions-data'

type TransactionsTableProps = {
  transactions: TransactionRecord[]
  currentPage: number
  totalPages: number
  totalCount: number
  onPageChange: (page: number) => void
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

const statusStyles: Record<TransactionRecord['status'], string> = {
  Completed: 'bg-emerald-100 text-emerald-700',
  Processing: 'bg-blue-100 text-blue-700',
  Pending: 'bg-amber-100 text-amber-700',
  Failed: 'bg-red-100 text-red-700',
  Refunded: 'bg-purple-100 text-purple-700'
}

const methodStyles: Record<TransactionRecord['paymentMethod'], string> = {
  'Credit Card': 'bg-slate-100 text-title',
  PayPal: 'bg-[#EAF2FF] text-main',
  'Apple Pay': 'bg-slate-900 text-white',
  'Google Pay': 'bg-[#E8F8EF] text-emerald-700',
  'Bank Transfer': 'bg-[#FFF4E8] text-[#ff6900]',
  'Amazon Pay': 'bg-[#FFF7EA] text-[#ff9900]'
}

const TransactionsTable = ({ transactions, currentPage, totalPages, totalCount, onPageChange }: TransactionsTableProps) => {
  const startIndex = totalCount === 0 ? 0 : (currentPage - 1) * 10 + 1
  const endIndex = Math.min(currentPage * 10, totalCount)

  return (
    <div>
      <p className="text-xs md:text-sm mb-2 text-description">
        Showing {startIndex}-{endIndex} of {totalCount} transactions
      </p>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-275 w-full border-separate border-spacing-0 text-sm">
            <thead className="bg-[#f8fafc] text-xs font-semibold uppercase tracking-wide text-description">
              <tr>
                <th className="px-4 py-4 text-left">Transaction ID</th>
                <th className="px-4 py-4 text-left">Date & Time</th>
                <th className="px-4 py-4 text-left">Amount</th>
                <th className="px-4 py-4 text-left">Payment Method</th>
                <th className="px-4 py-4 text-left">Status</th>
                <th className="px-4 py-4 text-left">Linked Order</th>
                <th className="px-4 py-4 text-left">Billing</th>
                <th className="px-4 py-4 text-left">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-t border-slate-200 align-top hover:bg-slate-50/60">
                  <td className="px-4 py-4">
                    <div className="font-semibold text-main">{transaction.id}</div>
                    <div className="text-xs text-description">{transaction.receiptNumber}</div>
                  </td>
                  <td className="px-4 py-4 text-xs text-description">
                    <div>{transaction.date}</div>
                    <div>{transaction.time}</div>
                  </td>
                  <td className={`px-4 py-4 text-sm font-semibold ${transaction.amount < 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                    {transaction.amount < 0 ? '-' : '+'}{currency.format(Math.abs(transaction.amount))}
                    <div className="text-[10px] font-normal text-description">{transaction.type}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${methodStyles[transaction.paymentMethod]}`}>
                      {transaction.paymentMethod}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[transaction.status]}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs text-description">{transaction.linkedOrder ?? '—'}</td>
                  <td className="px-4 py-4 text-xs text-description">
                    <div>{transaction.billing}</div>
                    <div>{transaction.location}</div>
                  </td>
                  <td className="px-4 py-4">
                    <Link href={`/profile/transactions/${transaction.id}`} className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-title transition hover:border-[#155DFC] hover:text-heading">
                      <Eye className="h-3.5 w-3.5" />
                      View Receipt
                    </Link>
                  </td>
                </tr>
              ))}

              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-sm text-description">
                    No transactions found for the selected filters.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-200 px-4 py-4">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} className="mt-0" />
        </div>
      </div>
    </div>
  )
}

export default TransactionsTable
