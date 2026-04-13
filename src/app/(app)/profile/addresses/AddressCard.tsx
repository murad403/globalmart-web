'use client'

import { MapPin, MoreVertical } from 'lucide-react'
import type { AddressRecord } from './addresses-data'

type AddressCardProps = {
  address: AddressRecord
  selected: boolean
  onSelect: (id: string) => void
  onEdit: (address: AddressRecord) => void
  onDelete: (id: string) => void
  onToggleMenu: (id: string) => void
  menuOpen: boolean
}

const AddressCard = ({ address, selected, onSelect, onEdit, onDelete, onToggleMenu, menuOpen }: AddressCardProps) => {
  return (
    <article
      onClick={() => onSelect(address.id)}
      className={`group relative overflow-hidden rounded-2xl border bg-white p-4 transition ${
        selected ? 'border-[#ff6900] ring-1 ring-[#ff6900]/20' : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="absolute right-0 top-0 h-full w-32 bg-[linear-gradient(135deg,rgba(255,105,0,0.08),rgba(255,105,0,0.02))]" />
      <div className="absolute right-4 top-4 flex items-center gap-2">
        {address.defaultLabel && <span className="rounded-full bg-[#e9e3ff] px-2 py-0.5 text-[10px] font-semibold text-[#6d55ff]">{address.defaultLabel}</span>}
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onToggleMenu(address.id)
          }}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-[#ff6900] shadow-sm transition hover:bg-slate-50"
          aria-label="Open address actions"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      {menuOpen && (
        <div
          onClick={(event) => event.stopPropagation()}
          className="absolute right-4 top-14 z-20 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
        >
          <button
            type="button"
            onClick={() => onEdit(address)}
            className="block w-full px-4 py-2.5 text-left text-sm font-medium text-title hover:bg-slate-50"
          >
            Edit Address
          </button>
          <button
            type="button"
            onClick={() => onDelete(address.id)}
            className="block w-full px-4 py-2.5 text-left text-sm font-medium text-red-500 hover:bg-red-50"
          >
            Delete Address
          </button>
        </div>
      )}

      <div className="relative z-10 pr-24">
        <h3 className="text-lg font-bold text-title">{address.title}</h3>
        <p className="mt-2 text-sm text-title">{address.recipientName}</p>
        <p className="text-sm text-description">{address.email} • {address.phone}</p>
        <p className="mt-2 text-sm text-description">{address.line1}</p>
        <p className="text-sm text-description">{address.line2}</p>
        <div className="mt-3 flex items-center gap-2 text-xs text-description">
          <MapPin className="h-3.5 w-3.5 text-[#ff6900]" />
          {address.location}
        </div>
      </div>
    </article>
  )
}

export default AddressCard
