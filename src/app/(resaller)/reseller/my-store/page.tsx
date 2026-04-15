"use client"

import Image, { type StaticImageData } from 'next/image'
import { Check, Pencil, Search, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import SellerPageHeader from '@/components/shared/SellerPageHeader'
import Pagination from '@/components/shared/Pagination'
import MyStoreDeleteModal from '../_components/MyStoreDeleteModal'
import product1 from '@/assets/home/product1.png'
import product2 from '@/assets/home/product2.png'
import product3 from '@/assets/home/product3.png'

type StoreItem = {
  id: number
  name: string
  image: StaticImageData
  wholesalePrice: number
  yourPrice: number
  status: 'Active' | 'Draft'
}

const initialItems: StoreItem[] = [
  { id: 1, name: 'Premium Leather Wallet', image: product1, wholesalePrice: 350, yourPrice: 500, status: 'Active' },
  { id: 2, name: 'Wireless Earbuds Pro', image: product2, wholesalePrice: 420, yourPrice: 500, status: 'Active' },
  { id: 3, name: 'Smart Water Bottle', image: product3, wholesalePrice: 520, yourPrice: 700, status: 'Draft' },
  { id: 4, name: 'Travel Laptop Bag', image: product1, wholesalePrice: 230, yourPrice: 340, status: 'Active' },
  { id: 5, name: 'Desk Light Pro', image: product2, wholesalePrice: 180, yourPrice: 260, status: 'Draft' }
]

const Page = () => {
  const [items, setItems] = useState(initialItems)
  const [searchText, setSearchText] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editPrice, setEditPrice] = useState('')

  const pageSize = 4

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase())
      const matchesStatus = filterStatus === 'All' || item.status === filterStatus
      return matchesSearch && matchesStatus
    })
  }, [filterStatus, items, searchText])

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize))
  const pageItems = filteredItems.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const targetDeleteItem = items.find((item) => item.id === deleteItemId)

  const startEdit = (item: StoreItem) => {
    setEditingId(item.id)
    setEditPrice(String(item.yourPrice))
  }

  const saveEdit = (itemId: number) => {
    const nextPrice = Number(editPrice)
    if (!Number.isFinite(nextPrice) || nextPrice <= 0) return

    setItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, yourPrice: nextPrice } : item)))
    setEditingId(null)
    setEditPrice('')
  }

  const deleteItem = () => {
    if (!deleteItemId) return
    setItems((prev) => prev.filter((item) => item.id !== deleteItemId))
    setDeleteItemId(null)
  }

  return (
    <div className="space-y-5">
      <SellerPageHeader title="My Store" description="Manage your curated product selection." />

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative w-full md:max-w-xl">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value)
              setCurrentPage(1)
            }}
            placeholder="Search product"
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-title outline-none focus:border-main"
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <select
            value={filterStatus}
            onChange={(event) => {
              setFilterStatus(event.target.value)
              setCurrentPage(1)
            }}
            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-title outline-none sm:w-auto"
          >
            <option>All</option>
            <option>Active</option>
            <option>Draft</option>
          </select>
        </div>
      </div>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-180 sm:min-w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/60">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase text-slate-500">Product</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase text-slate-500">Wholesale Price</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase text-slate-500">Your Price</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase text-slate-500">Profit</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase text-slate-500">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((item) => {
                const profit = item.yourPrice - item.wholesalePrice
                const isEditing = editingId === item.id

                return (
                  <tr key={item.id} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Image src={item.image} alt={item.name} width={26} height={26} className="h-6.5 w-6.5 rounded object-cover" />
                        <span className="text-sm font-medium text-title sm:text-base">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-main">${item.wholesalePrice}</td>
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <input
                            value={editPrice}
                            onChange={(event) => setEditPrice(event.target.value)}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter') saveEdit(item.id)
                            }}
                            className="h-8 w-24 rounded-md border border-slate-300 px-2 text-sm outline-none focus:border-main"
                          />
                          <button type="button" onClick={() => saveEdit(item.id)} className="grid size-8 place-items-center rounded text-emerald-600 hover:bg-emerald-50" aria-label="Save price">
                            <Check className="size-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm font-medium text-title">${item.yourPrice}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-emerald-600">+${profit}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-2 text-sm text-description">
                        <span className={`h-2.5 w-2.5 rounded-full ${item.status === 'Active' ? 'bg-pink-300' : 'bg-slate-300'}`} />
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={() => startEdit(item)} className="grid size-8 place-items-center rounded text-main hover:bg-main/10" aria-label={`Edit ${item.name}`}>
                          <Pencil className="size-4" />
                        </button>
                        <button type="button" onClick={() => setDeleteItemId(item.id)} className="grid size-8 place-items-center rounded text-red-500 hover:bg-red-500/10" aria-label={`Delete ${item.name}`}>
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {pageItems.length === 0 ? (
        <p className="rounded-lg border border-slate-200 bg-white px-4 py-5 text-center text-sm text-description">No products found for this filter.</p>
      ) : null}

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} className="mt-2" />

      <MyStoreDeleteModal
        isOpen={Boolean(targetDeleteItem)}
        productName={targetDeleteItem?.name ?? ''}
        onClose={() => setDeleteItemId(null)}
        onConfirm={deleteItem}
      />
    </div>
  )
}

export default Page
