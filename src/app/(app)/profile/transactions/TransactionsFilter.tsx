"use client"

import { Filter, Search } from 'lucide-react'
import { methodOptions, statusOptions, timeOptions } from './transactions-data'

type TransactionsFilterProps = {
  query: string
  statusFilter: (typeof statusOptions)[number]
  methodFilter: (typeof methodOptions)[number]
  timeFilter: (typeof timeOptions)[number]
  onQueryChange: (value: string) => void
  onStatusChange: (value: (typeof statusOptions)[number]) => void
  onMethodChange: (value: (typeof methodOptions)[number]) => void
  onTimeChange: (value: (typeof timeOptions)[number]) => void
}

const TransactionsFilter = ({ query, statusFilter, methodFilter, timeFilter, onQueryChange, onStatusChange, onMethodChange, onTimeChange }: TransactionsFilterProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="grid gap-2 lg:grid-cols-[minmax(0,1.25fr)_180px_180px_160px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search transaction ID, receipt, or order..."
            className="h-10 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-[#155DFC]"
          />
        </div>

        <div className="relative">
          <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(event) => onStatusChange(event.target.value as (typeof statusOptions)[number])}
            className="h-10 w-full appearance-none rounded-md border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-[#155DFC]"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <select
          value={methodFilter}
          onChange={(event) => onMethodChange(event.target.value as (typeof methodOptions)[number])}
          className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-[#155DFC]"
        >
          {methodOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={timeFilter}
          onChange={(event) => onTimeChange(event.target.value as (typeof timeOptions)[number])}
          className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-[#155DFC]"
        >
          {timeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default TransactionsFilter
