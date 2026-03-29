'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowLeft,
  ArrowRight,
  Box,
  CheckCheck,
  ClipboardCheck,
  HandHeart,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
  UserRound
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { orderActivity } from '../checkout-data'

const trackOrderSchema = z.object({
  orderId: z.string().min(5, 'Order ID is required'),
  billingEmail: z.email('Enter a valid billing email')
})

type TrackOrderValues = z.infer<typeof trackOrderSchema>

const trackSteps = [
  { id: 'placed', label: 'Order Placed', icon: ClipboardCheck },
  { id: 'packaging', label: 'Packaging', icon: Box },
  { id: 'on-road', label: 'On The Road', icon: Truck },
  { id: 'delivered', label: 'Delivered', icon: HandHeart }
]

const activityIcons = [CheckCheck, UserRound, MapPin, Truck, ShieldCheck, ClipboardCheck]

const TrackOrderPage = () => {
  const router = useRouter()
  const [showOrderDetails, setShowOrderDetails] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TrackOrderValues>({
    resolver: zodResolver(trackOrderSchema),
    defaultValues: {
      orderId: '',
      billingEmail: ''
    }
  })

  const onSubmit = () => {
    setShowOrderDetails(true)
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
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white transition hover:bg-slate-50">
              <ArrowLeft className="h-5 w-5" />
            </span>
            <span className="text-xl font-semibold">Back</span>
          </button>

          <h1 className="mt-6 text-4xl font-bold text-title">Track Order</h1>

          {!showOrderDetails ? (
            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 sm:p-8">
              <p className="max-w-4xl text-2xl text-description">
                To track your order please enter your order ID in the input field below and press the
                &quot;Track Order&quot; button. This was given to you on your receipt and in the confirmation email you should have received.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="orderId" className="mb-2 block text-sm font-semibold text-title">
                      Order ID
                    </label>
                    <input
                      id="orderId"
                      type="text"
                      placeholder="ID..."
                      {...register('orderId')}
                      className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-main"
                    />
                    {errors.orderId && <p className="mt-1 text-xs text-red-500">{errors.orderId.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="billingEmail" className="mb-2 block text-sm font-semibold text-title">
                      Billing Email
                    </label>
                    <input
                      id="billingEmail"
                      type="email"
                      placeholder="Email address"
                      {...register('billingEmail')}
                      className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-main"
                    />
                    {errors.billingEmail && <p className="mt-1 text-xs text-red-500">{errors.billingEmail.message}</p>}
                  </div>
                </div>

                <p className="text-sm text-description">Order ID that we sent to your in your email address.</p>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-md bg-heading px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                >
                  TRACK ORDER
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          ) : (
            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
              <div className="rounded-lg border border-[#f0ecd5] bg-[#fcf8e8] px-4 py-4 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-title">#96459761</p>
                  <p className="text-3xl font-bold text-main">Rs. 119.00</p>
                </div>
                <p className="mt-1 text-description">4 Products • Order Placed in 17 Jan, 2021 at 7:32 PM</p>
              </div>

              <p className="mt-5 text-sm text-description">Order expected arrival 23 Jan, 2021</p>

              <div className="mt-4 rounded-lg border border-slate-200 p-4">
                <div className="relative mb-6 mt-2 h-1.5 rounded-full bg-[#dbeafe]">
                  <div className="absolute left-0 top-0 h-1.5 w-[62%] rounded-full bg-main" />
                </div>

                <div className="grid gap-4 text-center sm:grid-cols-4">
                  {trackSteps.map((step, index) => {
                    const Icon = step.icon
                    const isComplete = index <= 1

                    return (
                      <div key={step.id} className="flex flex-col items-center">
                        <span
                          className={`inline-flex h-9 w-9 items-center justify-center rounded-full border ${
                            isComplete ? 'border-main bg-[#EEF4FF] text-main' : 'border-slate-300 text-slate-400'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <p className="mt-2 text-xs font-semibold text-title">{step.label}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <h2 className="text-lg font-semibold text-title">Order Activity</h2>
                <div className="mt-4 space-y-2">
                  {orderActivity.map((activity, index) => {
                    const Icon = activityIcons[index] ?? Package

                    return (
                      <div key={activity.id} className="flex items-start gap-3 rounded-md border border-slate-100 bg-slate-50 p-3">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-[#EEF4FF] text-main">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-title">{activity.title}</p>
                          <p className="text-xs text-description">{activity.date}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default TrackOrderPage
