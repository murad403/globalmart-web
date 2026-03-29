'use client'

import Image from 'next/image'
import { ArrowLeft, ArrowRight, Check, ChevronLeft, Layers } from 'lucide-react'
import { useRouter } from 'next/navigation'
import confirm from '@/assets/home/confirm.png'
import { Button } from '@/components/ui/button'

const ProductConfirmationSuccessPage = () => {
  const router = useRouter()

  return (
    <section className="w-full py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-3 text-title cursor-pointer"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white transition hover:bg-slate-50">
              <ChevronLeft className="h-5 w-5" />
            </span>
            <span className="text-xl font-semibold">Back</span>
          </button>

          <h1 className="mt-6 text-4xl font-bold text-title">Product Confirmation</h1>
          <p className="mt-2 text-2xl text-description">Let&apos;s create your account</p>

          <div className="mt-8 grid items-center gap-8 bg-white p-6 md:grid-cols-2">
            <div className="relative mx-auto h-64 w-full max-w-md overflow-hidden rounded-2xl bg-slate-50 md:h-72">
              <Image
                src={confirm}
                alt="Order confirmation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 460px"
              />
            </div>

            <div className="text-center md:text-left">
              <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border-4 border-green-500 bg-green-50 text-green-600 md:mx-0">
                <Check className="h-8 w-8" />
              </span>

              <h2 className="mt-5 text-4xl font-bold text-title">Your order is successfully placed</h2>
              <p className="mt-3 text-lg text-description">
                Thank you for your order. Your order has been confirmed and will be delivered soon.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                <button
                  type="button"
                  onClick={() => router.push('/profile')}
                  className="inline-flex items-center gap-2 rounded-md border border-main px-5 py-3 text-sm font-semibold text-main transition hover:bg-[#EEF4FF] cursor-pointer"
                >
                  <Layers className="h-4 w-4" />
                  GO TO DASHBOARD
                </button>
                <Button
                  type="button"
                  onClick={() => router.push('/track-order')}
                  
                >
                  VIEW ORDER
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductConfirmationSuccessPage
