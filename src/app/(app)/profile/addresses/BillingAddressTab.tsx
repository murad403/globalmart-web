'use client'

import { CreditCard } from 'lucide-react'
import AddressCard from './AddressCard'
import type { AddressRecord } from './addresses-data'

type BillingAddressTabProps = {
  addresses: AddressRecord[]
  selectedId: string | null
  openMenuId: string | null
  onSelect: (id: string) => void
  onEdit: (address: AddressRecord) => void
  onDelete: (id: string) => void
  onToggleMenu: (id: string) => void
  onAdd: () => void
}

const BillingAddressTab = ({ addresses, selectedId, openMenuId, onSelect, onEdit, onDelete, onToggleMenu, onAdd }: BillingAddressTabProps) => {
  if (addresses.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF1E8] text-[#ff6900]">
          <CreditCard className="h-8 w-8" />
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-title">You don&apos;t have any added address</h2>
        <p className="mt-2 text-base text-description">Add your address, start shopping!</p>
        <button
          type="button"
          onClick={onAdd}
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-[#ff6900] px-4 text-sm font-semibold text-white hover:bg-[#eb6103]"
        >
          + Add Address
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          selected={selectedId === address.id}
          menuOpen={openMenuId === address.id}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleMenu={onToggleMenu}
        />
      ))}
    </div>
  )
}

export default BillingAddressTab
