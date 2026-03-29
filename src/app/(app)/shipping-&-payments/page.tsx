'use client'

import { ArrowLeft, ArrowRight, CircleDot, CreditCard, Truck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { orderSummary, paymentMethods, shippingMethods } from '../checkout-data'

const formatMoney = (value: number) => `Tk ${value.toFixed(2)}`

const ShippingAndPaymentsPage = () => {
  const router = useRouter()
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]?.id ?? '')
  const [selectedShipping, setSelectedShipping] = useState(shippingMethods[1]?.id ?? shippingMethods[0]?.id ?? '')

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

          <h1 className="mt-6 text-4xl font-bold text-title">Shipping &amp; Payments</h1>
          <p className="mt-2 text-2xl text-description">Let&apos;s create your account</p>

          <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-title">
                  <CreditCard className="h-5 w-5 text-main" />
                  Payment
                </h2>
                <p className="text-sm text-description">Please choose a payment method</p>

                {paymentMethods.map((method) => {
                  const isSelected = selectedPayment === method.id

                  return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedPayment(method.id)}
                    className={`w-full rounded-md border p-3 text-left transition ${
                      isSelected
                        ? 'border-main bg-[#EEF4FF]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isSelected ? (
                        <CircleDot className="h-4 w-4 text-main" />
                      ) : (
                        <span className="h-4 w-4 rounded-full border border-slate-300" />
                      )}
                      <p className="text-sm font-semibold text-title">{method.title}</p>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-description">{method.description}</p>
                  </button>
                  )
                })}
              </div>

              <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-title">
                  <Truck className="h-5 w-5 text-main" />
                  Shipping
                </h2>
                <p className="text-sm text-description">Please choose a shipping company based on your region</p>

                {shippingMethods.map((method) => {
                  const isSelected = selectedShipping === method.id

                  return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedShipping(method.id)}
                    className={`w-full rounded-md border p-3 text-left transition ${
                      isSelected
                        ? 'border-main bg-[#EEF4FF]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {isSelected ? (
                          <CircleDot className="h-4 w-4 text-main" />
                        ) : (
                          <span className="h-4 w-4 rounded-full border border-slate-300" />
                        )}
                        <p className="text-sm font-semibold text-title">{method.title}</p>
                      </div>
                    </div>

                    <div className="mt-2 space-y-1 text-xs text-description">
                      <p>
                        Delivery time: <span className="font-medium text-title">{method.deliveryTime}</span>
                      </p>
                      <p>
                        Shipping cost: <span className="font-medium text-title">{formatMoney(method.shippingCost)}</span>
                      </p>
                      <p>
                        Insurance:{' '}
                        <span className={method.insurance === 'Available' ? 'font-medium text-green-600' : 'font-medium text-red-500'}>
                          {method.insurance}
                        </span>
                      </p>
                    </div>
                  </button>
                  )
                })}
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
                <button
                  type="button"
                  onClick={() => router.push('/product-confirmation')}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-heading px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                >
                  NEXT
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShippingAndPaymentsPage
