'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Camera, ChevronLeft, CircleUserRound, LogOut, MapPin, ShoppingCart, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import AccountDetails from './AccountDetails'
import Address from './Address'
import OrderHistory from './OrderHistory'
import type { AddressItem, AddressType, AddressValues, ProfileTab, OrderHistoryItem, OrderStatus } from './types'
import { orderStatuses } from './types'
import { Button } from '@/components/ui/button'

const addressSchema = z.object({
  label: z.enum(['Home', 'Office', 'Billing', 'Shipping', 'Other']),
  fullName: z.string().min(2, 'Full name is required'),
  phone: z
    .string()
    .min(8, 'Phone number is required')
    .regex(/^[0-9+\s()-]+$/, 'Phone number contains invalid characters'),
  streetAddress: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  zipCode: z.string().min(4, 'ZIP code is required'),
  country: z.string().min(2, 'Country is required'),
  isDefault: z.boolean()
})

const initialOrderHistory: OrderHistoryItem[] = [
  { id: 'oh-1', numberId: '#3456_768', date: 'October 17, 2023', status: 'Completed', price: 1234 },
  { id: 'oh-2', numberId: '#3456_980', date: 'October 11, 2023', status: 'Completed', price: 345 },
  { id: 'oh-3', numberId: '#3456_120', date: 'August 24, 2023', status: 'Processing', price: 2345 },
  { id: 'oh-4', numberId: '#3456_030', date: 'August 12, 2023', status: 'Cancelled', price: 845 }
]

const initialAddresses: AddressItem[] = [
  {
    id: 'addr-1',
    label: 'Billing',
    fullName: 'Sofia Havertz',
    phone: '(+1) 234 567 890',
    streetAddress: '345 Long Island, NewYork',
    city: 'NewYork',
    zipCode: '10001',
    country: 'United States',
    isDefault: true
  },
  {
    id: 'addr-2',
    label: 'Shipping',
    fullName: 'Sofia Havertz',
    phone: '(+1) 234 567 890',
    streetAddress: '345 Long Island, NewYork',
    city: 'NewYork',
    zipCode: '10001',
    country: 'United States',
    isDefault: false
  }
]


const ProfilePage = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<ProfileTab>('account-details')
  const [activeOrderTab, setActiveOrderTab] = useState<OrderStatus>('Completed')
  const [addresses, setAddresses] = useState<AddressItem[]>(initialAddresses)
  const [orderHistory] = useState<OrderHistoryItem[]>(initialOrderHistory)
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const {
    register: registerAddress,
    handleSubmit: handleAddressSubmit,
    control: addressControl,
    setValue: setAddressValue,
    reset: resetAddressForm,
    formState: { errors: addressErrors }
  } = useForm<AddressValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: 'Home',
      fullName: '',
      phone: '',
      streetAddress: '',
      city: '',
      zipCode: '',
      country: 'United States',
      isDefault: false
    }
  })

  useEffect(() => {
    return () => {
      if (avatarUrl) {
        URL.revokeObjectURL(avatarUrl)
      }
    }
  }, [avatarUrl])

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false)
    router.push('/auth/customer-sign-in')
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (avatarUrl) {
      URL.revokeObjectURL(avatarUrl)
    }

    const previewUrl = URL.createObjectURL(file)
    setAvatarUrl(previewUrl)
  }

  const handleOpenNewAddressModal = () => {
    resetAddressForm({
      label: 'Home',
      fullName: '',
      phone: '',
      streetAddress: '',
      city: '',
      zipCode: '',
      country: 'United States',
      isDefault: false
    })
    setIsAddressModalOpen(true)
  }

  const handleSaveAddress = (id: string, values: Pick<AddressValues, 'fullName' | 'phone' | 'streetAddress' | 'city' | 'country'>) => {
    setAddresses((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              fullName: values.fullName,
              phone: values.phone,
              streetAddress: values.streetAddress,
              city: values.city,
              country: values.country
            }
          : item
      )
    )
  }

  const onAddressSubmit = (values: AddressValues) => {
    setAddresses((prev) => {
      const next = values.isDefault ? prev.map((item) => ({ ...item, isDefault: false })) : prev

      return [
        ...next,
        {
          id: `addr-${Date.now()}`,
          ...values
        }
      ]
    })

    setIsAddressModalOpen(false)
  }

  const filteredOrders = orderHistory.filter((item) => item.status === activeOrderTab)
  const selectedAddressType = useWatch({ control: addressControl, name: 'label' })

  return (
    <section className="w-full py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex cursor-pointer items-center gap-3 text-title"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white transition hover:bg-slate-50">
              <ChevronLeft className="h-5 w-5" />
            </span>
            <span className="text-xl font-semibold">Back</span>
          </button>

          <h1 className="mt-8 text-4xl font-bold text-title md:text-5xl">MY PROFILE</h1>

          <div className="mt-6 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
            <aside className="rounded-2xl border border-slate-200 bg-white p-5">
              <div
                className="relative mx-auto h-28 w-28 rounded-full bg-slate-200 bg-cover bg-center"
                style={avatarUrl ? { backgroundImage: `url(${avatarUrl})` } : undefined}
              >
                {!avatarUrl && (
                  <span className="inline-flex h-full w-full items-center justify-center text-3xl font-semibold text-slate-700">
                    SS
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-title text-white transition hover:opacity-90"
                  aria-label="Change profile photo"
                >
                  <Camera className="h-4 w-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>

              <h2 className="mt-5 text-center text-4xl font-bold text-title">Suprava Saha</h2>

              <nav className="mt-6 space-y-1 rounded-xl border border-slate-200 p-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('account-details')}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium transition ${
                    activeTab === 'account-details' ? 'bg-slate-100 text-title' : 'text-description hover:bg-slate-50'
                  }`}
                >
                  <CircleUserRound className="h-4 w-4" />
                  Account details
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('order-history')}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium transition ${
                    activeTab === 'order-history' ? 'bg-slate-100 text-title' : 'text-description hover:bg-slate-50'
                  }`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  order history
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('address')}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium transition ${
                    activeTab === 'address' ? 'bg-slate-100 text-title' : 'text-description hover:bg-slate-50'
                  }`}
                >
                  <MapPin className="h-4 w-4" />
                  Address
                </button>
              </nav>

              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(true)}
                className="mt-4 text-sm font-medium bg-red-200 text-red-500 transition hover:text-red-600 flex items-center gap-2 cursor-pointer"
              >
                <LogOut className='size-5'/>
                Logout
              </button>
            </aside>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
              {activeTab === 'account-details' && <AccountDetails />}

              {activeTab === 'order-history' && (
                <OrderHistory
                  orderStatuses={orderStatuses}
                  activeOrderTab={activeOrderTab}
                  onTabChange={setActiveOrderTab}
                  orders={filteredOrders}
                />
              )}

              {activeTab === 'address' && (
                <Address
                  addresses={addresses}
                  onAddAddress={handleOpenNewAddressModal}
                  onSaveAddress={handleSaveAddress}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <h3 className="text-2xl font-semibold text-title">Logout Confirmation</h3>
            <p className="mt-2 text-sm text-description">Are you sure you want to logout from your account?</p>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-description transition hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <Button type="button" onClick={handleConfirmLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-title">Add New Address</h3>
              <button
                type="button"
                onClick={() => {
                  setIsAddressModalOpen(false)
                }}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-description transition hover:bg-slate-50"
                aria-label="Close address modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddressSubmit(onAddressSubmit)} className="mt-6 space-y-4">
              <div className="flex flex-wrap gap-3">
                {(['Home', 'Office', 'Billing', 'Shipping', 'Other'] as AddressType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAddressValue('label', type)}
                    className={`rounded-full border px-4 py-1.5 text-base font-medium transition ${
                      selectedAddressType === type
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-300 text-description hover:bg-slate-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <input type="hidden" {...registerAddress('label')} />

              <div>
                <label htmlFor="fullName" className="mb-1 block text-sm uppercase tracking-wide text-title">
                  Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter full name"
                  {...registerAddress('fullName')}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-title outline-none transition focus:border-heading"
                />
                {addressErrors.fullName && <p className="mt-1 text-xs text-red-500">{addressErrors.fullName.message}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="mb-1 block text-sm uppercase tracking-wide text-title">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="text"
                  placeholder="(+1) 000 000 000"
                  {...registerAddress('phone')}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-title outline-none transition focus:border-heading"
                />
                {addressErrors.phone && <p className="mt-1 text-xs text-red-500">{addressErrors.phone.message}</p>}
              </div>

              <div>
                <label htmlFor="streetAddress" className="mb-1 block text-sm uppercase tracking-wide text-title">
                  Street Address *
                </label>
                <input
                  id="streetAddress"
                  type="text"
                  placeholder="House no., Street name"
                  {...registerAddress('streetAddress')}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-title outline-none transition focus:border-heading"
                />
                {addressErrors.streetAddress && <p className="mt-1 text-xs text-red-500">{addressErrors.streetAddress.message}</p>}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="city" className="mb-1 block text-sm uppercase tracking-wide text-title">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    placeholder="City"
                    {...registerAddress('city')}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-title outline-none transition focus:border-heading"
                  />
                  {addressErrors.city && <p className="mt-1 text-xs text-red-500">{addressErrors.city.message}</p>}
                </div>

                <div>
                  <label htmlFor="zipCode" className="mb-1 block text-sm uppercase tracking-wide text-title">
                    Zip Code
                  </label>
                  <input
                    id="zipCode"
                    type="text"
                    placeholder="00000"
                    {...registerAddress('zipCode')}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-title outline-none transition focus:border-heading"
                  />
                  {addressErrors.zipCode && <p className="mt-1 text-xs text-red-500">{addressErrors.zipCode.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="country" className="mb-1 block text-sm uppercase tracking-wide text-title">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  placeholder="United States"
                  {...registerAddress('country')}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-title outline-none transition focus:border-heading"
                />
                {addressErrors.country && <p className="mt-1 text-xs text-red-500">{addressErrors.country.message}</p>}
              </div>

              <div className="flex items-center justify-between rounded-xl border-y border-slate-200 py-4">
                <div>
                  <p className="text-xl font-semibold text-title">Set as Default</p>
                  <p className="text-lg text-description">Use this address by default</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" {...registerAddress('isDefault')} />
                  <span className="h-6 w-12 rounded-full bg-slate-200 transition peer-checked:bg-heading" />
                  <span className="absolute left-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-6" />
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit">
                  Add Address
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddressModalOpen(false)
                  }}
                  className="rounded-lg border border-slate-200 px-4 py-2 cursor-pointer text-base font-medium text-description transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProfilePage
