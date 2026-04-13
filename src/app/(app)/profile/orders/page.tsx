'use client'

import { useRouter } from 'next/navigation'
import { ReceiptText, ShoppingCart } from 'lucide-react'

const OrdersPage = () => {
  const router = useRouter()

  return (
    <div>
      <h1 className="text-[38px] font-bold text-title">My Orders</h1>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF1E8] text-[#ff6900]">
          <ReceiptText className="h-8 w-8" />
        </div>
        <h2 className="mt-6 text-3xl font-semibold text-title">You Don&apos;t Have any order yet</h2>
        <p className="mt-2 text-base text-description">Explore and place your first order now!</p>

        <button
          type="button"
          onClick={() => router.push('/all-products')}
          className="mt-6 inline-flex h-12 items-center gap-2 rounded-xl bg-[#ff6900] px-6 text-sm font-semibold text-white transition hover:bg-[#eb6103]"
        >
          <ShoppingCart className="h-4 w-4" />
          Start Shopping
        </button>
      </div>
    </div>
  )
}

export default OrdersPage
