'use client'

import Link from 'next/link'
import { CircleCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const ResellerTermsAndConditionsPage = () => {
  const [agreed, setAgreed] = useState(false)

  return (
    <section className="min-h-screen w-full bg-white py-12 flex justify-center items-center">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-8">
          <h1 className="text-center text-4xl font-bold text-title">Reseller Terms & Conditions</h1>
          <p className="mt-3 text-center text-lg text-description">
            Before proceeding with your registration, please review the following key rules and conditions to join our platform as a reseller.
          </p>
        </div>

        <div className="space-y-6 rounded-xl border border-slate-200 p-8 shadow-sm">
          <div className="flex gap-4">
            <CircleCheck className="size-5 text-main" />
            <div>
              <h3 className="text-lg font-bold text-title">1. Product Availability</h3>
              <p className="mt-2 text-description">Resellers can sell only products available on our platform (from approved wholesalers).</p>
            </div>
          </div>

          <div className="flex gap-4">
            <CircleCheck className="size-5 text-main" />
            <div>
              <h3 className="text-lg font-bold text-title">2. Order Fulfillment Process</h3>
              <p className="mt-2 text-description">
                After receiving an order, the reseller must first purchase the product from the wholesaler through the platform. Only after purchasing the product will the reseller be able to withdraw earnings from the platform.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <CircleCheck className="size-5 text-main" />
            <div>
              <h3 className="text-lg font-bold text-title">3. Products Already in Stock</h3>
              <p className="mt-2 text-description">
                If the reseller already has the product in stock, they may proceed to ship it and withdraw earnings after verification.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <CircleCheck className="size-5 text-main" />
            <div>
              <h3 className="text-lg font-bold text-title">4. Platform Benefits</h3>
              <p className="mt-2 text-description">
                These policies are designed for the benefit and protection of all users, ensuring that resellers do not accept orders and then disappear without fulfillment, wholesalers are paid before supply, and buyers receive their products reliably.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="size-4 rounded border-slate-300"
              />
              <span className="text-base font-medium text-title">
                I have read and agree to the above terms and conditions
              </span>
            </label>
          </div>

          <Link href={agreed ? '/auth/reseller-sign-up' : '#'}>
            <Button disabled={!agreed} className="w-full text-base">
              Accept & Continue to Registration
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ResellerTermsAndConditionsPage
