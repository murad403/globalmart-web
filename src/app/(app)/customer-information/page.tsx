'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import countryList from 'react-select-country-list'
import { City } from 'country-state-city'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { orderSummary } from '../checkout-data'
import { Button } from '@/components/ui/button'

const formatMoney = (value: number) => `$ ${value.toFixed(2)}`

type CountryOption = {
  value: string
  label: string
}

const customerInfoSchema = z.object({
  email: z.email('Enter a valid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  country: z.string().min(1, 'Please select a country'),
  city: z.string().min(1, 'Please select a city'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  phone: z
    .string()
    .min(8, 'Phone number must be at least 8 digits')
    .regex(/^[0-9+\s()-]+$/, 'Phone number contains invalid characters')
})

type CustomerInfoFormValues = z.infer<typeof customerInfoSchema>

const CustomerInformationPage = () => {
  const router = useRouter()
  const { register, handleSubmit, control, setValue, formState: { errors }} = useForm<CustomerInfoFormValues>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      address: '',
      phone: ''
    }
  })

  const countryOptions = useMemo<CountryOption[]>(() => countryList().getData() as CountryOption[], [])
  const selectedCountry = useWatch({ control, name: 'country' })
  const cityOptions = useMemo(() => {
    if (!selectedCountry) {
      return []
    }

    return City.getCitiesOfCountry(selectedCountry) ?? []
  }, [selectedCountry])

  const onSubmit = () => {
    router.push('/shipping-&-payments')
  }

  return (
    <section className="w-full py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-3 text-title"
          >
            <span className="inline-flex h-11 cursor-pointer w-11 items-center justify-center rounded-full border border-slate-300 bg-white transition hover:bg-slate-50">
              <ChevronLeft className="h-5 w-5" />
            </span>
            <span className="text-xl font-semibold">Back</span>
          </button>

          <h1 className="mt-6 text-4xl font-bold text-title">Customer Information</h1>
          <p className="mt-2 text-2xl text-description">Let&apos;s create your account</p>

          <form id="customer-form" onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-title">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register('email')}
                  className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-main"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-2 block text-sm font-semibold text-title">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    {...register('firstName')}
                    className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-main"
                  />
                  {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="mb-2 block text-sm font-semibold text-title">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    {...register('lastName')}
                    className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-main"
                  />
                  {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-title">Shipping Address</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="country" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-description">
                      Country
                    </label>
                    <select
                      id="country"
                      {...register('country', {
                        onChange: () => setValue('city', '')
                      })}
                      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-main"
                    >
                      <option value="">Select country</option>
                      {countryOptions.map((country) => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                    {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="city" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-description">
                      City
                    </label>
                    <select
                      id="city"
                      {...register('city')}
                      disabled={!selectedCountry}
                      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-main disabled:cursor-not-allowed disabled:bg-slate-100"
                    >
                      <option value="">Select city</option>
                      {cityOptions.map((city) => (
                        <option key={`${city.countryCode}-${city.name}`} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>}
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="address" className="mb-2 block text-sm font-semibold text-title">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="Street, area, city"
                  {...register('address')}
                  className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-main"
                />
                {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-title">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Phone Number"
                  {...register('phone')}
                  className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-main"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
              </div>
            </div>

            <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold text-title">Order Summary</h2>
              <div className="mt-4 space-y-2 text-sm text-description">
                <div className="flex justify-between">
                  <span>Price</span>
                  <span className="font-medium text-title">{formatMoney(orderSummary.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-title">{formatMoney(orderSummary.shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-medium text-title">{formatMoney(orderSummary.tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount price</span>
                  <span className="font-medium text-title">{formatMoney(orderSummary.discount)}</span>
                </div>
                <label className="mt-2 flex items-center gap-2 rounded-md bg-slate-50 p-2 text-xs">
                  <input type="checkbox" className="h-3.5 w-3.5 accent-main" defaultChecked />
                  <span>Pack in a Gift Box</span>
                  <span className="ml-auto font-medium text-title">{formatMoney(orderSummary.giftBox)}</span>
                </label>
              </div>

              <div className="mt-4 border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-description">Total Price</span>
                  <span className="text-xl font-bold text-title">{formatMoney(orderSummary.total)}</span>
                </div>
                <Button
                  type="submit"
                  form="customer-form"
                  className='mt-2 w-full'
                >
                  NEXT
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </aside>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CustomerInformationPage
