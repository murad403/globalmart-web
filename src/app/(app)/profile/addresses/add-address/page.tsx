'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'

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

const labelStyle = "mb-2 block text-sm md:text-base font-semibold text-title"
const inputStyle = "h-11 w-full rounded-md bg-slate-50 px-3 text-sm outline-none"

const AddAddressPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const tab = searchParams.get('tab') ?? 'shipping'

    const { register, handleSubmit, formState: { errors } } = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
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
    })

    const onSubmit = () => {
        router.push('/profile/addresses')
    }

    return (
        <div className='min-h-screen'>
            <div className="mb-5 flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => router.push('/profile/addresses')}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-50"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
                <h1 className="text-2xl font-bold text-title">Add New Address</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className={labelStyle}>Full Name</label>
                        <input {...register('fullName')} placeholder="Enter recipient full name" className={inputStyle} />
                        {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
                    </div>
                    <div>
                        <label className={labelStyle}>State</label>
                        <input {...register('state')} placeholder="Enter state/province/region" className={inputStyle} />
                        {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state.message}</p>}
                    </div>
                    <div>
                        <label className={labelStyle}>Country</label>
                        <input {...register('country')} placeholder="Select country" className={inputStyle} />
                        {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country.message}</p>}
                    </div>
                    <div>
                        <label className={labelStyle}>City / Town</label>
                        <input {...register('cityTown')} placeholder="Enter city or town" className={inputStyle} />
                        {errors.cityTown && <p className="mt-1 text-xs text-red-500">{errors.cityTown.message}</p>}
                    </div>
                    <div>
                        <label className={labelStyle}>Phone Number</label>
                        <input {...register('phoneNumber')} placeholder="Enter contact number" className={inputStyle} />
                        {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber.message}</p>}
                    </div>
                    <div>
                        <label className={labelStyle}>ZIP / Postal Code</label>
                        <input {...register('zipCode')} placeholder="Enter postal code" className={inputStyle} />
                        {errors.zipCode && <p className="mt-1 text-xs text-red-500">{errors.zipCode.message}</p>}
                    </div>
                    <div className='md:col-span-2'>
                        <label className={labelStyle}>Street Address</label>
                        <input {...register('streetAddress')} placeholder="House number, street name" className={inputStyle} />
                        {errors.streetAddress && <p className="mt-1 text-xs text-red-500">{errors.streetAddress.message}</p>}
                    </div>
                </div>

                {tab === 'shipping' && (
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
                        Save Address
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddAddressPage
