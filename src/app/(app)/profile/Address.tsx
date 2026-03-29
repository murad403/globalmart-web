import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil, Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { AddressItem } from './types'
import { Button } from '@/components/ui/button'

const editAddressSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z
    .string()
    .min(8, 'Phone number is required')
    .regex(/^[0-9+\s()-]+$/, 'Phone number contains invalid characters'),
  streetAddress: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  country: z.string().min(2, 'Country is required')
})

type EditAddressValues = z.infer<typeof editAddressSchema>

type AddressProps = {
  addresses: AddressItem[]
  onAddAddress: () => void
  onSaveAddress: (id: string, values: EditAddressValues) => void
}

const inputClassName =
  'w-full rounded-md border border-slate-300 bg-slate-50 px-2 py-1.5 text-sm text-title outline-none transition focus:border-main'

const Address = ({ addresses, onAddAddress, onSaveAddress }: AddressProps) => {
  const [editingId, setEditingId] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EditAddressValues>({
    resolver: zodResolver(editAddressSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      streetAddress: '',
      city: '',
      country: ''
    }
  })

  const handleStartEdit = (address: AddressItem) => {
    setEditingId(address.id)
    reset({
      fullName: address.fullName,
      phone: address.phone,
      streetAddress: address.streetAddress,
      city: address.city,
      country: address.country
    })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  const handleSaveEdit = (values: EditAddressValues) => {
    if (!editingId) {
      return
    }

    onSaveAddress(editingId, values)
    setEditingId(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-title">Address</h2>
        <button
          type="button"
          onClick={onAddAddress}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-title transition hover:bg-slate-50"
          aria-label="Add new address"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {addresses.map((address) => (
          <article key={address.id} className="rounded-lg border border-slate-200 p-4">
            <form onSubmit={handleSubmit(handleSaveEdit)} className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-title">{address.label} Address</p>
                {editingId === address.id ? (
                  <div className="flex items-center gap-1">
                    <Button type="submit" className="px-3 py-1 text-xs">
                      Save Change
                    </Button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="rounded-md border border-slate-300 px-3 py-1 text-xs font-medium text-description transition hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleStartEdit(address)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-description transition hover:text-title"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                )}
              </div>

              <div>
                <p className="font-semibold uppercase tracking-wide text-description">Full Name</p>
                {editingId === address.id ? (
                  <>
                    <input type="text" {...register('fullName')} className={inputClassName} />
                    {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
                  </>
                ) : (
                  <p className="rounded bg-slate-50 px-2 py-1.5 text-sm text-title">{address.fullName}</p>
                )}
              </div>

              <div>
                <p className="font-semibold uppercase tracking-wide text-description">Phone</p>
                {editingId === address.id ? (
                  <>
                    <input type="text" {...register('phone')} className={inputClassName} />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                  </>
                ) : (
                  <p className="rounded bg-slate-50 px-2 py-1.5 text-sm text-title">{address.phone}</p>
                )}
              </div>

              <div>
                <p className="font-semibold uppercase tracking-wide text-description">Address</p>
                {editingId === address.id ? (
                  <div className="space-y-2">
                    <input type="text" {...register('streetAddress')} className={inputClassName} />
                    {errors.streetAddress && <p className="text-xs text-red-500">{errors.streetAddress.message}</p>}
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div>
                        <input type="text" {...register('city')} className={inputClassName} placeholder="City" />
                        {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>}
                      </div>
                      <div>
                        <input type="text" {...register('country')} className={inputClassName} placeholder="Country" />
                        {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country.message}</p>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="rounded bg-slate-50 px-2 py-1.5 text-sm text-title">
                    {address.streetAddress}, {address.city}, {address.country}
                  </p>
                )}
              </div>
            </form>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Address
