'use client'

import Image from 'next/image'
import { MapPinned, MoreVertical } from 'lucide-react'
import type { AddressRecord } from './addresses-data'
import addressMap from '@/assets/others/address.png'

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
      className={`group relative overflow-visible rounded-2xl border bg-white md:p-6 p-4 transition ${selected ? 'border-[#ff6900] ring-1 ring-[#ff6900]/20' : 'border-slate-200 hover:border-[#D9D9D9]'
        }`}
    >
      <div className={`h-8 w-2  absolute left-0 top-3 rounded-r-xl ${selected ? 'bg-heading' : 'bg-[#D9D9D9]'}`}></div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-56 overflow-hidden rounded-r-2xl">
        <Image src={addressMap} alt="Map background" fill className="object-cover" sizes="224px" />
      </div>

      <div className="absolute right-4 top-4 z-30 flex items-center gap-2">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onToggleMenu(address.id)
          }}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-heading border border-[#ff6900] bg-white text-[#ff6900] shadow-sm transition hover:text-white cursor-pointer"
          aria-label="Open address actions"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      {menuOpen && (
        <div
          onClick={(event) => event.stopPropagation()}
          className="absolute right-4 top-14 z-50 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
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

      <div className="relative z-10 pr-40 space-y-2">
        <h3 className="text-lg font-bold text-title flex gap-2 items-center">
          <span>{address.title}</span>
          {address.defaultLabel && <span className="rounded-lg bg-[#e9e3ff] px-2 py-0.5 text-[10px] font-semibold text-[#6d55ff]">{address.defaultLabel}</span>}
        </h3>
        <p className="mt-2 text-sm text-title font-medium">{address.recipientName}</p>
        <p className="text-sm text-title font-medium">{address.email} • {address.phone}</p>
        <div className="mt-3 flex items-center gap-2 text-xs text-description">
          <MapPinned className="h-3.5 w-3.5 text-[#ff6900]" />
          {address.location}
        </div>
      </div>
    </article>
  )
}

export default AddressCard
