'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Eye, Filter, MapPin, Search } from 'lucide-react'
import { orderStatusOptions, orderTimeOptions, profileOrders, type OrderStatus } from '../orders-data'

const statusClasses: Record<OrderStatus, string> = {
  Delivered: 'bg-emerald-100 text-emerald-700',
  Shipped: 'bg-violet-100 text-violet-700',
  Processing: 'bg-blue-100 text-blue-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Canceled: 'bg-red-100 text-red-700'
}

const AddressesPage = () => {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<(typeof orderStatusOptions)[number]>('All Status')
  const [timeFilter, setTimeFilter] = useState<(typeof orderTimeOptions)[number]>('All Time')

  const filteredOrders = useMemo(() => {
    const now = new Date('2026-04-13')

    return profileOrders.filter((order) => {
      const text = `${order.id} ${order.products.map((item) => item.name).join(' ')}`.toLowerCase()
      const queryMatch = text.includes(query.toLowerCase())
      const statusMatch = statusFilter === 'All Status' || order.status === statusFilter

      if (timeFilter === 'All Time') {
        return queryMatch && statusMatch
      }

      const orderDate = new Date(order.date)
      const diffDays = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24))

      if (timeFilter === 'Last 7 Days') {
        return queryMatch && statusMatch && diffDays <= 7
      }

      if (timeFilter === 'Last 30 Days') {
        return queryMatch && statusMatch && diffDays <= 30
      }

      return queryMatch && statusMatch && orderDate.getFullYear() === 2026
    })
  }, [query, statusFilter, timeFilter])

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6">
      <h1 className="text-[38px] font-bold text-title">My Orders</h1>
      <p className="mt-1 text-sm text-description">Track and manage all your orders in one place</p>

      <div className="mt-5 rounded-xl border border-slate-200 bg-[#fcfcfd] p-3">
        <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_130px_130px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by Order ID or Product Name..."
              className="h-10 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none"
            />
          </div>

          <div className="relative">
            <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as (typeof orderStatusOptions)[number])}
              className="h-10 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none"
            >
              {orderStatusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <select
            value={timeFilter}
            onChange={(event) => setTimeFilter(event.target.value as (typeof orderTimeOptions)[number])}
            className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none"
          >
            {orderTimeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-4 text-xs text-description">Showing {filteredOrders.length} of {profileOrders.length} orders</p>

      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-250 w-full border-separate border-spacing-0 text-sm">
          <thead className="bg-[#f8fafc] text-[11px] font-semibold uppercase tracking-wide text-description">
            <tr>
              <th className="px-3 py-2 text-left">Order ID</th>
              <th className="px-3 py-2 text-left">Date</th>
              <th className="px-3 py-2 text-left">Products</th>
              <th className="px-3 py-2 text-left">Total</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Shipping</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => {
              const first = order.products[0]
              const extraCount = order.products.length - 1

              return (
                <tr key={order.id} className="border-t border-slate-200 align-top">
                  <td className="px-3 py-3 font-semibold text-[#ff6900]">#{order.id}</td>
                  <td className="px-3 py-3 text-description">{order.date}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-start gap-2">
                      <div className="relative h-9 w-9 overflow-hidden rounded border border-slate-200">
                        <Image src={first.image} alt={first.name} fill className="object-cover" sizes="36px" />
                      </div>
                      <div>
                        <p className="line-clamp-1 text-xs font-medium text-title">{first.name}</p>
                        <p className="mt-0.5 text-[11px] text-description">Qty: {first.qty} • {first.size} • {first.color}</p>
                        {extraCount > 0 && <p className="text-[10px] font-semibold text-[#ff6900]">+ {extraCount} more item</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 font-semibold text-title">${order.total.toFixed(2)}</td>
                  <td className="px-3 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusClasses[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-description">
                    <div className="flex items-center gap-1 text-xs">
                      <MapPin className="h-3.5 w-3.5" />
                      {order.shipping}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <Link
                      href={`/profile/orders/${order.id}`}
                      className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-title hover:bg-slate-50"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-description">
        <button type="button" className="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-slate-100">
          <ChevronLeft className="h-3.5 w-3.5" />
          Previous
        </button>
        <span className="rounded bg-slate-100 px-2 py-1 text-title">1</span>
        <span className="rounded px-2 py-1">2</span>
        <button type="button" className="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-slate-100">
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

export default AddressesPage
