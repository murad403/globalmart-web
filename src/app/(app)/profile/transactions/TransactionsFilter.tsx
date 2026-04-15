"use client"

import { Filter, Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
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
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-4">
      <div className="grid gap-2 lg:grid-cols-[minmax(0,1.25fr)_180px_180px_160px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search transaction ID, receipt, or order..."
            className="h-12 w-full rounded-md border border-slate-200 bg-[#F3F3F5] pl-9 pr-3 text-sm outline-none transition focus:border-heading"
          />
        </div>

        <div className="relative">
          <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Select value={statusFilter} onValueChange={(value) => onStatusChange(value as (typeof statusOptions)[number])}>
            <SelectTrigger className="w-full border-slate-200 bg-[#F3F3F5] pl-9 text-sm text-title hover:border-heading focus-visible:border-heading focus-visible:ring-0 data-[size=default]:h-12">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option} value={option} className="cursor-pointer focus:bg-slate-100 focus:text-heading">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Select value={methodFilter} onValueChange={(value) => onMethodChange(value as (typeof methodOptions)[number])}>
          <SelectTrigger className="w-full border-slate-200 bg-[#F3F3F5] px-3 text-sm text-title hover:border-heading focus-visible:border-heading focus-visible:ring-0 data-[size=default]:h-12">
            <SelectValue placeholder="All Methods" />
          </SelectTrigger>
          <SelectContent>
            {methodOptions.map((option) => (
              <SelectItem key={option} value={option} className="cursor-pointer focus:bg-slate-100 focus:text-heading">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={timeFilter} onValueChange={(value) => onTimeChange(value as (typeof timeOptions)[number])}>
          <SelectTrigger className="w-full border-slate-200 bg-[#F3F3F5] px-3 text-sm text-title hover:border-heading focus-visible:border-heading focus-visible:ring-0 data-[size=default]:h-12">
            <SelectValue placeholder="All Time" />
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((option) => (
              <SelectItem key={option} value={option} className="cursor-pointer focus:bg-slate-100 focus:text-heading">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default TransactionsFilter
