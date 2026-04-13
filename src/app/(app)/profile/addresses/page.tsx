'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft, CreditCard, MapPin, Plus, Truck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import BillingAddressTab from './BillingAddressTab'
import ShippingAddressTab from './ShippingAddressTab'
import { initialBillingAddresses, initialShippingAddresses, type AddressRecord, type AddressTabKey } from './addresses-data'

const addressSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  streetAddress: z.string().min(5, 'Street address is required'),
  state: z.string().min(2, 'State is required'),
  cityTown: z.string().min(2, 'City / town is required'),
  zipCode: z.string().min(3, 'ZIP / postal code is required'),
  country: z.string().min(2, 'Country is required'),
  phoneNumber: z.string().min(5, 'Phone number is required'),
  setAsDefault: z.boolean().optional(),
  sameAsShipping: z.boolean().optional()
})

type AddressFormValues = z.infer<typeof addressSchema>

type FormMode = 'add' | 'edit' | null

const emptyFormValues: AddressFormValues = {
  fullName: '',
  streetAddress: '',
  state: '',
  cityTown: '',
  zipCode: '',
  country: '',
  phoneNumber: '',
  setAsDefault: false,
  sameAsShipping: false
}

const AddressesPage = () => {
  const [activeTab, setActiveTab] = useState<AddressTabKey>('shipping')
  const [formMode, setFormMode] = useState<FormMode>(null)
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [shippingAddresses, setShippingAddresses] = useState<AddressRecord[]>(initialShippingAddresses)
  const [billingAddresses, setBillingAddresses] = useState<AddressRecord[]>(initialBillingAddresses)
  const [selectedAddressIds, setSelectedAddressIds] = useState<Record<AddressTabKey, string | null>>({
    shipping: initialShippingAddresses[0]?.id ?? null,
    billing: initialBillingAddresses[0]?.id ?? null
  })

  const activeAddresses = activeTab === 'shipping' ? shippingAddresses : billingAddresses
  const selectedAddressId = selectedAddressIds[activeTab]

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: emptyFormValues
  })

  const activeTitle = activeTab === 'shipping' ? 'Shipping Addresses' : 'Billing Addresses'
  const activeDescription = activeTab === 'shipping' ? 'Track your orders and manage delivery addresses.' : 'Update payment methods and review your billing history.'

  const openAddForm = () => {
    setFormMode('add')
    setEditingAddressId(null)
    setOpenMenuId(null)
    reset(emptyFormValues)
  }

  const openEditForm = (address: AddressRecord) => {
    setFormMode('edit')
    setEditingAddressId(address.id)
    setOpenMenuId(null)
    setActiveTab(address.tab)
    reset({
      fullName: address.recipientName,
      streetAddress: address.line1,
      state: 'California',
      cityTown: 'Los Angeles',
      zipCode: '90015',
      country: 'United States',
      phoneNumber: address.phone,
      setAsDefault: address.defaultLabel === 'Default',
      sameAsShipping: false
    })
  }

  const submitAddress = (values: AddressFormValues) => {
    const nextAddress: AddressRecord = {
      id: editingAddressId ?? `${activeTab}-${Date.now()}`,
      title: values.setAsDefault ? 'Home' : 'Office',
      defaultLabel: values.setAsDefault ? 'Default' : undefined,
      recipientName: values.fullName,
      email: activeTab === 'shipping' ? 'Marvinmckinney@mail.com' : 'billing@domain.com',
      phone: values.phoneNumber,
      line1: values.streetAddress,
      line2: `${values.cityTown}, ${values.state}, ${values.zipCode}, ${values.country}`,
      location: `${values.cityTown}, ${values.state}`,
      tab: activeTab
    }

    if (activeTab === 'shipping') {
      setShippingAddresses((prev) => {
        if (editingAddressId) {
          return prev.map((item) => (item.id === editingAddressId ? nextAddress : item))
        }
        return [nextAddress, ...prev]
      })
      setSelectedAddressIds((prev) => ({ ...prev, shipping: nextAddress.id }))
    } else {
      setBillingAddresses((prev) => {
        if (editingAddressId) {
          return prev.map((item) => (item.id === editingAddressId ? nextAddress : item))
        }
        return [nextAddress, ...prev]
      })
      setSelectedAddressIds((prev) => ({ ...prev, billing: nextAddress.id }))
    }

    setFormMode(null)
    setEditingAddressId(null)
    reset(emptyFormValues)
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
    setFormMode(null)
    setEditingAddressId(null)
    reset(emptyFormValues)
  }

  const showEmptyState = activeAddresses.length === 0 && !formMode

  return (
    <div>
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <button
          type="button"
          onClick={() => handleTabChange('shipping')}
          className={`rounded-2xl border p-4 text-left transition ${activeTab === 'shipping' ? 'border-[#ff6900] bg-white' : 'border-slate-200 bg-white'}`}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#EAF1FF] text-main">
              <Truck className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-title">Shipping Address</h2>
              <p className="text-xs text-description">Track your orders and manage delivery addresses.</p>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('billing')}
          className={`rounded-2xl border p-4 text-left transition ${activeTab === 'billing' ? 'border-[#ff6900] bg-white' : 'border-slate-200 bg-white'}`}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#FFF2E8] text-[#ff6900]">
              <CreditCard className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-title">Billing Address</h2>
              <p className="text-xs text-description">Update payment methods and review your billing history.</p>
            </div>
          </div>
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-title">{activeTitle}</h1>
          <p className="mt-1 text-sm text-description">{activeDescription}</p>
        </div>
        <button
          type="button"
          onClick={openAddForm}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff6900]"
        >
          <Plus className="h-4 w-4" />
          Add address
        </button>
      </div>

      {formMode && (
        <form onSubmit={handleSubmit(submitAddress)} className="mb-6 rounded-3xl border border-slate-200 bg-white p-4 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setFormMode(null)
                setEditingAddressId(null)
                reset(emptyFormValues)
              }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h2 className="text-2xl font-semibold text-title">{formMode === 'edit' ? 'Edit Address' : 'Add New Address'}</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold text-title">Full Name</label>
              <input
                {...register('fullName')}
                placeholder="Enter recipient full name"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none"
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-title">Street Address</label>
              <input
                {...register('streetAddress')}
                placeholder="House number, street name"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none"
              />
              {errors.streetAddress && <p className="mt-1 text-xs text-red-500">{errors.streetAddress.message}</p>}
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-title">State</label>
              <input
                {...register('state')}
                placeholder="Enter state/province/region"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none"
              />
              {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state.message}</p>}
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-title">City / Town</label>
              <input
                {...register('cityTown')}
                placeholder="Enter city or town"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none"
              />
              {errors.cityTown && <p className="mt-1 text-xs text-red-500">{errors.cityTown.message}</p>}
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-title">Country</label>
              <input
                {...register('country')}
                placeholder="Select country"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none"
              />
              {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country.message}</p>}
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-title">Phone Number</label>
              <input
                {...register('phoneNumber')}
                placeholder="Enter contact number"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none"
              />
              {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-semibold text-title">ZIP / Postal Code</label>
              <input
                {...register('zipCode')}
                placeholder="Enter postal code"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none"
              />
              {errors.zipCode && <p className="mt-1 text-xs text-red-500">{errors.zipCode.message}</p>}
            </div>
          </div>

          {activeTab === 'shipping' && (
            <div className="mt-4 space-y-3 text-sm text-description">
              <label className="flex items-start gap-2">
                <input type="checkbox" {...register('setAsDefault')} className="mt-1 h-4 w-4 accent-[#ff6900]" />
                <span>
                  <span className="block font-medium text-title">Set as default shipping address</span>
                  <span className="block text-xs">Designate this as your primary delivery location for all your future orders.</span>
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" {...register('sameAsShipping')} className="h-4 w-4 accent-[#ff6900]" />
                <span>Same as Shipping Address</span>
              </label>
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <Button type="submit" className="min-w-40 bg-[#ff6900] hover:bg-[#eb6103]">
              {formMode === 'edit' ? 'Save Changes' : 'Save Address'}
            </Button>
          </div>
        </form>
      )}

      {showEmptyState ? (
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF1E8] text-[#ff6900]">
            <MapPin className="h-8 w-8" />
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-title">You don&apos;t have any added address</h2>
          <p className="mt-2 text-base text-description">Add your address, start shopping!</p>
          <button
            type="button"
            onClick={openAddForm}
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-[#ff6900] px-4 text-sm font-semibold text-white hover:bg-[#eb6103]"
          >
            + Add Address
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-title">{activeTab === 'shipping' ? 'Shipping Addresses' : 'Billing Addresses'}</h2>
          </div>

          {activeTab === 'shipping' ? (
            <ShippingAddressTab
              addresses={shippingAddresses}
              selectedId={selectedAddressId}
              openMenuId={openMenuId}
              onSelect={handleSelect}
              onEdit={openEditForm}
              onDelete={handleDelete}
              onToggleMenu={toggleMenu}
              onAdd={openAddForm}
            />
          ) : (
            <BillingAddressTab
              addresses={billingAddresses}
              selectedId={selectedAddressId}
              openMenuId={openMenuId}
              onSelect={handleSelect}
              onEdit={openEditForm}
              onDelete={handleDelete}
              onToggleMenu={toggleMenu}
              onAdd={openAddForm}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default AddressesPage
