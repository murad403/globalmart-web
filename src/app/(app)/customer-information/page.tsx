'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import countryList from 'react-select-country-list'
import { City } from 'country-state-city'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import Image from 'next/image'
import { orderSummary, paymentMethods, shippingMethods, type PaymentMethod, type ShippingMethod } from '../checkout-data'
import VoucherPromoCard from '@/components/shared/VoucherPromoCard'
import { Button } from '@/components/ui/button'
import { customerInfoSchema } from '@/validation/auth.validation'
import Link from 'next/link'


type CountryOption = {
  value: string
  label: string
}


type CustomerInfoFormValues = z.infer<typeof customerInfoSchema>

const CustomerInformationPage = () => {
  const router = useRouter()
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<CustomerInfoFormValues>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      address: '',
      phone: '',
      paymentMethod: paymentMethods[0]?.id ?? '',
      shippingMethod: shippingMethods[0]?.id ?? ''
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
    router.push('/product-confirmation')
  }

  return (
    <section className="w-full py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="">
          <div className="flex items-center gap-2 text-xs text-description">
            <Link href={"/"}>Home</Link>
            <span>›</span>
            <Link href={"/cart"}>Cart</Link>
            <span>›</span>
            <span className="font-medium text-title">Customer Info</span>
          </div>

          <h1 className="mt-6 text-4xl font-bold text-title">Customer Information</h1>
          <p className="mt-2 text-2xl text-description">Let&apos;s create your account</p>

          <form id="customer-form" onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-7">
            <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
                <h2 className="text-base font-semibold text-title">Customer Information</h2>

                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-description">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                    className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-heading"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-description">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      {...register('firstName')}
                      className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-heading"
                    />
                    {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-description">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      {...register('lastName')}
                      className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-heading"
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
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-heading"
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
                        State/Region
                      </label>
                      <select
                        id="city"
                        {...register('city')}
                        disabled={!selectedCountry}
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-heading disabled:cursor-not-allowed disabled:bg-slate-100"
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
                  <label htmlFor="address" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-description">
                    Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Street, area, city"
                    {...register('address')}
                    className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-heading"
                  />
                  {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-description">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="number"
                    placeholder="Phone Number"
                    {...register('phone')}
                    className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-heading"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                </div>
              </div>

              <VoucherPromoCard
                totalProduct={orderSummary.price}
                tax={orderSummary.tax}
                voucher={35}
                totalPayment={orderSummary.total}
                actionLabel="Continue"
                actionType="submit"
                form="customer-form"
                className="lg:sticky lg:top-24"
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Payment Methods Section */}
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-title">Payment</h3>
                <p className="mt-1 text-xs text-description">Please choose a payment method</p>

                <div className="mt-6 space-y-3">
                  {paymentMethods.slice(0, 3).map((method: PaymentMethod) => (
                    <label
                      key={method.id}
                      className="flex cursor-pointer items-center gap-4 rounded-lg bg-[#F8FAFE] px-4 py-3 transition hover:border-slate-300"
                    >
                      {/* Logo on left */}
                      <div className="h-8 w-12 shrink-0 flex items-center justify-center">
                        <Image 
                          src={method.logo} 
                          alt={method.title}
                          className="h-full w-full object-contain"
                          quality={100}
                        />
                      </div>

                      {/* Title and recommendation in middle */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-title">{method.title}</span>
                          {method.recommendation && (
                            <span className="inline-block rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">
                              Recomendation
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Radio button on right */}
                      <input
                        type="radio"
                        value={method.id}
                        {...register('paymentMethod')}
                        className="h-5 w-5 accent-orange-500 shrink-0"
                      />
                    </label>
                  ))}
                </div>
                {errors.paymentMethod && <p className="mt-3 text-xs text-red-500">{errors.paymentMethod.message}</p>}
              </div>

              {/* Shipping Methods Section */}
              <div className=" bg-white">
                <h3 className="text-lg font-semibold text-title">Shipping</h3>
                <p className="mt-1 text-xs text-description">Please choose a shipping company based on your region</p>

                <div className="mt-6 space-y-3">
                  {shippingMethods.map((method: ShippingMethod) => (
                    <label
                      key={method.id}
                      className="flex cursor-pointer items-start justify-between rounded-lg border bg-[#F5F5F5] border-slate-200 px-4 py-3 transition hover:border-slate-300"
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          value={method.id}
                          {...register('shippingMethod')}
                          className="mt-1 h-4 w-4 accent-blue-600"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-title">{method.title}</p>
                          <p className="mt-1 text-xs text-description">Delivery time: {method.deliveryTime}</p>
                          <p className="text-xs text-description">
                            Shipping cost: {typeof method.shippingCost === 'string' ? method.shippingCost : `₹${method.shippingCost}`}
                          </p>
                          <p className={`text-xs font-medium ${method.insurance === 'Available' ? 'text-emerald-600' : 'text-orange-500'}`}>
                            Insurance: {method.insurance}
                          </p>
                        </div>
                      </div>
                      <div className="px-4 py-3 shrink-0 flex items-center justify-center bg-white rounded">
                        <Image src={method.logo} width={50} height={70} alt='method'/>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.shippingMethod && <p className="mt-3 text-xs text-red-500">{errors.shippingMethod.message}</p>}
              </div>
            </div>

            <div className="flex justify-center">
              <Button type="submit" form="customer-form" className="px-10">
                Save Change
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CustomerInformationPage
