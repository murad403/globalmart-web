'use client'

import Image from 'next/image'
import { ArrowLeft, CheckCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { checkoutProducts, orderSummary } from '../checkout-data'

const formatMoney = (value: number) => `Tk ${value.toFixed(2)}`

const ProductConfirmationPage = () => {
  const router = useRouter()

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

          <h1 className="mt-6 text-4xl font-bold text-title">Product Confirmation</h1>
          <p className="mt-2 text-2xl text-description">Let&apos;s create your account</p>

          <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
              <div className="border-b border-slate-200 pb-4">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-description">Shopping items</p>
              </div>

              <div className="divide-y divide-slate-200">
                {checkoutProducts.map((product) => (
                  <div key={product.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-3 py-4 sm:gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-slate-200">
                      <Image src={product.image} alt={product.name} fill className="object-cover" sizes="64px" />
                    </div>
                    <div>
                      <p className="font-semibold text-title">{product.name}-{product.fit}</p>
                      <p className="text-sm text-description">Color: {product.color}</p>
                      <p className="text-xs text-description">x1</p>
                    </div>
                    <div className="text-right text-sm font-medium text-title">{formatMoney(product.price)}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-4 border-t border-slate-200 pt-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-description">Payment method</p>
                  <p className="mt-2 text-sm font-semibold text-title">Paypal</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-description">Shipping company</p>
                  <p className="mt-2 text-sm font-semibold text-title">RaceCouriers</p>
                </div>
              </div>

              <div className="mt-4 border-t border-slate-200 pt-4 text-sm text-description">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em]">Delivery information</p>
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  <p>
                    Name: <span className="font-medium text-title">Supro Safa</span>
                  </p>
                  <p>
                    Country: <span className="font-medium text-title">India</span>
                  </p>
                  <p>
                    Address: <span className="font-medium text-title">21/3, JR Elegance</span>
                  </p>
                  <p>
                    City: <span className="font-medium text-title">Bangalore</span>
                  </p>
                  <p>
                    Phone: <span className="font-medium text-title">+91 7319265132</span>
                  </p>
                </div>
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
                  onClick={() => router.push('/product-confirmation-success')}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-heading px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                >
                  <CheckCheck className="h-4 w-4" />
                  CONFIRM
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductConfirmationPage
