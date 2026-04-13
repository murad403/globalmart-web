'use client'
import React from 'react'
import { Box, CheckCheck, ChevronLeft, ClipboardCheck, Handshake, MapPin, Package, ShieldCheck, Truck, UserRound } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { orderActivity } from '../../checkout-data'
import { Button } from '@/components/ui/button'

interface TrackOrderDetailPageProps {
  params: Promise<{
    id: string
  }>
}

const trackSteps = [
  { id: 'placed', label: 'Order Placed', icon: ClipboardCheck },
  { id: 'packaging', label: 'Packaging', icon: Box },
  { id: 'on-road', label: 'On The Road', icon: Truck },
  { id: 'delivered', label: 'Delivered', icon: Handshake }
]

const activityIcons = [CheckCheck, UserRound, MapPin, Truck, ShieldCheck, ClipboardCheck]

const TrackOrderDetailPage = ({ params }: TrackOrderDetailPageProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { id: orderId } = React.use(params)
  const email = searchParams.get('email')

  // Mock order data based on order ID
  const orderData = {
    id: orderId,
    email: email || 'customer@example.com',
    status: 'On The Road',
    totalPrice: 119.00,
    productCount: 4,
    placedDate: '17 Jan, 2021 at 7:32 PM',
    expectedArrival: '23 Jan, 2021',
    currency: 'Rs.',
    completionPercentage: 62
  }

  return (
    <section className="w-full py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="">
          <div className="text-4xl font-bold text-title flex items-center gap-3">
            <button onClick={() => router.push("/track-order")} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white transition hover:bg-slate-50 cursor-pointer">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1>Order Details</h1>
          </div>
          <p className="mt-2 text-lg text-description">Order ID: <span className="font-semibold text-title">#{orderId}</span></p>

          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
            <div className="rounded-lg border border-[#f0ecd5] bg-[#fcf8e8] px-4 py-4 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <p className="font-semibold text-title">Order ID: #{orderId}</p>
                  <p className="text-sm text-description">Email: {orderData.email}</p>
                </div>
                <p className="text-3xl font-bold text-heading">{orderData.currency} {orderData.totalPrice.toFixed(2)}</p>
              </div>
              <p className="text-description text-sm">{orderData.productCount} Products • Order Placed in {orderData.placedDate}</p>
            </div>

            <p className="mt-5 text-sm text-description">Order expected arrival {orderData.expectedArrival}</p>

            <div className="mt-4 p-4">
              <div className="relative mb-6 mt-2 h-1.5 rounded-full bg-[#dbeafe]">
                <div
                  className="absolute left-0 top-0 h-1.5 rounded-full bg-heading transition-all duration-300"
                  style={{ width: `${orderData.completionPercentage}%` }}
                />
              </div>

              <div className="grid gap-4 text-center sm:grid-cols-4">
                {trackSteps.map((step, index) => {
                  const Icon = step.icon
                  const isComplete = index * 33.33 <= orderData.completionPercentage

                  return (
                    <div key={step.id} className="flex flex-col items-center">
                      <span
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-full border ${isComplete ? 'border-heading bg-[#EEF4FF] text-heading' : 'border-slate-300 text-slate-400'
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
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-[#EEF4FF] text-main shrink-0">
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

            <div className="mt-6 border-t border-slate-200 pt-5">
              <Button
                onClick={() => router.push('/track-order')}

              >
                Track Another Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrackOrderDetailPage
