"use client"
import { useMemo, useState } from 'react'
import TransactionsStats from './TransactionsStats'
import TransactionsFilter from './TransactionsFilter'
import TransactionsTable from './TransactionsTable'
import { methodOptions, statusOptions, timeOptions, transactions } from './transactions-data'



const itemsPerPage = 10

const Page = () => {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<(typeof statusOptions)[number]>('All Status')
  const [methodFilter, setMethodFilter] = useState<(typeof methodOptions)[number]>('All Methods')
  const [timeFilter, setTimeFilter] = useState<(typeof timeOptions)[number]>('All Time')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredTransactions = useMemo(() => {
    const now = new Date('2026-04-13T00:00:00Z')

    return transactions.filter((transaction) => {
      const searchText = `${transaction.id} ${transaction.receiptNumber} ${transaction.linkedOrder ?? ''} ${transaction.paymentMethod} ${transaction.billing} ${transaction.location}`.toLowerCase()
      const matchesQuery = searchText.includes(query.toLowerCase())
      const matchesStatus = statusFilter === 'All Status' || transaction.status === statusFilter
      const matchesMethod = methodFilter === 'All Methods' || transaction.paymentMethod === methodFilter

      let matchesTime = true
      if (timeFilter !== 'All Time') {
        const transactionDate = new Date(transaction.transactionDate)
        const diffDays = Math.floor((now.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24))

        if (timeFilter === 'Last 7 Days') {
          matchesTime = diffDays >= 0 && diffDays <= 7
        }

        if (timeFilter === 'Last 30 Days') {
          matchesTime = diffDays >= 0 && diffDays <= 30
        }

        if (timeFilter === 'This Year') {
          matchesTime = transactionDate.getFullYear() === 2026
        }
      }

      return matchesQuery && matchesStatus && matchesMethod && matchesTime
    })
  }, [query, statusFilter, methodFilter, timeFilter])

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / itemsPerPage))
  const safePage = Math.min(currentPage, totalPages)
  const pageSlice = filteredTransactions.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage)

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-title">Transactions</h1>
        <p className="text-sm text-description">Search, filter, and review your payment history.</p>
      </div>

      <TransactionsStats transactions={transactions} />

      <TransactionsFilter
        query={query}
        statusFilter={statusFilter}
        methodFilter={methodFilter}
        timeFilter={timeFilter}
        onQueryChange={(value) => {
          setQuery(value)
          setCurrentPage(1)
        }}
        onStatusChange={(value) => {
          setStatusFilter(value)
          setCurrentPage(1)
        }}
        onMethodChange={(value) => {
          setMethodFilter(value)
          setCurrentPage(1)
        }}
        onTimeChange={(value) => {
          setTimeFilter(value)
          setCurrentPage(1)
        }}
      />

      <TransactionsTable
        transactions={pageSlice}
        currentPage={safePage}
        totalPages={totalPages}
        totalCount={filteredTransactions.length}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

export default Page
