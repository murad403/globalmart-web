'use client'

import { CreditCard, MapPin, Plus, Truck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import BillingAddressTab from './BillingAddressTab'
import ShippingAddressTab from './ShippingAddressTab'
import { initialBillingAddresses, initialShippingAddresses, type AddressRecord, type AddressTabKey } from './addresses-data'
import { Button } from '@/components/ui/button'

const AddressesPage = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<AddressTabKey>('shipping')
    const [openMenuId, setOpenMenuId] = useState<string | null>(null)
    const [shippingAddresses, setShippingAddresses] = useState<AddressRecord[]>(initialShippingAddresses)
    const [billingAddresses, setBillingAddresses] = useState<AddressRecord[]>(initialBillingAddresses)
    const [selectedAddressIds, setSelectedAddressIds] = useState<Record<AddressTabKey, string | null>>({
        shipping: initialShippingAddresses[0]?.id ?? null,
        billing: initialBillingAddresses[0]?.id ?? null
    })

    const activeAddresses = activeTab === 'shipping' ? shippingAddresses : billingAddresses
    const selectedAddressId = selectedAddressIds[activeTab]
    const activeTitle = activeTab === 'shipping' ? 'Shipping Addresses' : 'Billing Addresses'
    const showEmptyState = activeAddresses.length === 0

    const openAddPage = () => {
        router.push(`/profile/addresses/add-address?tab=${activeTab}`)
    }

    const openEditPage = (address: AddressRecord) => {
        router.push(`/profile/addresses/edit-address?id=${address.id}&tab=${address.tab}`)
    }

    const handleDelete = (id: string) => {
        if (activeTab === 'shipping') {
            setShippingAddresses((prev) => {
                const nextAddresses = prev.filter((item) => item.id !== id)
                setSelectedAddressIds((current) => ({
                    ...current,
                    shipping: current.shipping === id ? nextAddresses[0]?.id ?? null : current.shipping
                }))
                return nextAddresses
            })
        } else {
            setBillingAddresses((prev) => {
                const nextAddresses = prev.filter((item) => item.id !== id)
                setSelectedAddressIds((current) => ({
                    ...current,
                    billing: current.billing === id ? nextAddresses[0]?.id ?? null : current.billing
                }))
                return nextAddresses
            })
        }

        setOpenMenuId(null)
    }

    const handleSelect = (id: string) => {
        setSelectedAddressIds((prev) => ({ ...prev, [activeTab]: id }))
    }

    const toggleMenu = (id: string) => {
        setOpenMenuId((current) => (current === id ? null : id))
    }

    const handleTabChange = (nextTab: AddressTabKey) => {
        setActiveTab(nextTab)
        setOpenMenuId(null)
    }

    return (
        <div className='min-h-screen'>
            <div className="mb-6 grid gap-4 md:grid-cols-2">
                <button
                    type="button"
                    onClick={() => handleTabChange('shipping')}
                    className={`rounded-2xl border p-4 text-left transition ${activeTab === 'shipping' ? 'border-[#ff6900] bg-white' : 'border-slate-200 bg-white'}`}
                >
                    <div className="p-4 space-y-2">
                        <div className="inline-flex p-3 items-center justify-center rounded-md bg-[#DBEAFE] text-main">
                            <Truck className="size-6" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-base font-semibold text-title">Shipping Address</h2>
                            <p className="text-sm text-description max-w-xs">Track your orders and manage delivery addresses.</p>
                        </div>
                    </div>
                </button>

                <button
                    type="button"
                    onClick={() => handleTabChange('billing')}
                    className={`rounded-2xl border p-4 text-left transition ${activeTab === 'billing' ? 'border-[#ff6900] bg-white' : 'border-slate-200 bg-white'}`}
                >
                    <div className="p-4 space-y-2">
                        <div className="inline-flex p-3 items-center justify-center rounded-md bg-[#FFF2E8] text-[#ff6900]">
                            <CreditCard className="size-6" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-base font-semibold text-title">Billing Address</h2>
                            <p className="text-sm text-description max-w-xs">Update payment methods and review your billing history.</p>
                        </div>
                    </div>
                </button>
            </div>

            <div className="mb-4 flex items-center justify-between gap-3">
                <h1 className="text-2xl font-bold text-title">{activeTitle}</h1>
                <button
                    type="button"
                    onClick={openAddPage}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff6900] cursor-pointer"
                >
                    <Plus className="h-4 w-4" />
                    Add address
                </button>
            </div>

            {showEmptyState ? (
                <div className="rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF1E8] text-[#ff6900]">
                        <MapPin className="h-8 w-8" />
                    </div>
                    <h2 className="mt-6 text-2xl font-semibold text-title">You don&apos;t have any added address</h2>
                    <p className="mt-2 text-base text-description">Add your address, start shopping!</p>
                    <Button
                        className='mt-4'
                        type="button"
                        onClick={openAddPage}
                    >
                        + Add Address
                    </Button>
                </div>
            ) : activeTab === 'shipping' ? (
                <ShippingAddressTab
                    addresses={shippingAddresses}
                    selectedId={selectedAddressId}
                    openMenuId={openMenuId}
                    onSelect={handleSelect}
                    onEdit={openEditPage}
                    onDelete={handleDelete}
                    onToggleMenu={toggleMenu}
                    onAdd={openAddPage}
                />
            ) : (
                <BillingAddressTab
                    addresses={billingAddresses}
                    selectedId={selectedAddressId}
                    openMenuId={openMenuId}
                    onSelect={handleSelect}
                    onEdit={openEditPage}
                    onDelete={handleDelete}
                    onToggleMenu={toggleMenu}
                    onAdd={openAddPage}
                />
            )}
        </div>
    )
}

export default AddressesPage
