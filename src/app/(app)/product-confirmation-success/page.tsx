'use client'

import Image from 'next/image'
import { ArrowRight, Check, ChevronLeft, Layers } from 'lucide-react'
import { useRouter } from 'next/navigation'
import confirm from '@/assets/home/confirm.png'
import { Button } from '@/components/ui/button'

const ProductConfirmationSuccessPage = () => {
  const router = useRouter()

  return (
    <section className="w-full py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div>


          <h1 className="mt-6 text-4xl font-bold text-title">Product Confirmation</h1>

          <div className="mt-8 grid items-center gap-8 bg-white p-6 md:grid-cols-2">
            <div className="r">
              <Image
                src={confirm}
                alt="Order confirmation"
                width={779}
                height={532}
                className=""
              />
            </div>

            <div className="text-center md:text-left">
              <div className='flex flex-col justify-center items-center'>
                <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border-4 border-green-500 bg-green-50 text-green-600 md:mx-0">
                  <Check className="h-8 w-8" />
                </span>

                <h2 className="mt-5 text-4xl font-bold text-title">Your order is successfully place</h2>
                <p className="mt-3 text-lg text-description text-center">
                  Pellentesque sed lectus nec tortor tristique accumsan quis dictum risus. Donec volutpat mollis nulla non facilisis.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-4">
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
                  onClick={() => router.push('/profile/orders')}

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
