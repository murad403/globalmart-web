'use client'

import Link from 'next/link'
import { CheckCircle2, AlertCircle, Info, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const WholesalerTermsAndConditionsPage = () => {
  const [agreed, setAgreed] = useState(false)

  return (
    <section className="min-h-screen w-full bg-slate-50 py-12">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-title">Become a Wholesaler / Full-Seller</h1>
          <p className="mt-3 text-lg text-description">
            Before proceeding with your application, please review the eligibility requirements and important information below.
          </p>
        </div>

        <div className="space-y-6">
          {/* Eligibility Requirements Section */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-8">
            <div className="mb-6 flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-main" />
              <h2 className="text-2xl font-bold text-title">Eligibility Requirements</h2>
            </div>
            <p className="mb-6 text-base text-description">
              Our primary goal is to encourage users to become traders, not wholesalers. Therefore, only the following types of businesses are eligible to become wholesalers:
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-main text-white text-sm font-bold">✓</div>
                </div>
                <div>
                  <h3 className="font-semibold text-title">Manufacturers</h3>
                  <p className="text-sm text-description">Companies that produce and manufacture products</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-main text-white text-sm font-bold">✓</div>
                </div>
                <div>
                  <h3 className="font-semibold text-title">Verified Suppliers</h3>
                  <p className="text-sm text-description">Authorized suppliers with verified credentials</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-main text-white text-sm font-bold">✓</div>
                </div>
                <div>
                  <h3 className="font-semibold text-title">Registered Companies</h3>
                  <p className="text-sm text-description">Companies registered for at least 5 years (verifiable)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Information Section */}
          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-8">
            <div className="mb-6 flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
              <h2 className="text-2xl font-bold text-title">Important Information</h2>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg bg-white p-4">
                <h3 className="font-semibold text-title">Limited Approval</h3>
                <p className="mt-2 text-sm text-description">
                  Only a limited number of wholesalers will be approved on our platform. Your application may be rejected even without specific explanation.
                </p>
              </div>

              <div className="rounded-lg bg-white p-4">
                <h3 className="font-semibold text-title">Exclusive Approval Process</h3>
                <p className="mt-2 text-sm text-description">
                  Approval is done exclusively by the Super Admin (our team). The review process may take time.
                </p>
              </div>

              <div className="rounded-lg bg-white p-4">
                <h3 className="font-semibold text-title">Recommendation</h3>
                <p className="mt-2 text-sm text-description">
                  If you are not a manufacturer or supplier, we strongly recommend you apply as a reseller instead.
                </p>
              </div>
            </div>
          </div>

          {/* Not Eligible Sections */}
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="flex items-start gap-3">
                <Info className="mt-1 h-5 w-5 text-slate-600" />
                <div>
                  <h3 className="font-semibold text-title">Not Eligible? Consider Becoming a Reseller</h3>
                  <p className="mt-2 text-sm text-description">
                    If you do not meet the above criteria, we strongly recommend choosing Reseller instead. As a reseller, you can sell products on our platform by sourcing from approved wholesalers.
                  </p>
                  <Link href="/auth/reseller-terms-and-conditions">
                    <span className="mt-3 inline-flex items-center text-sm font-semibold text-main hover:text-main/80 cursor-pointer">
                      Learn More About Becoming a Reseller
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="flex items-start gap-3">
                <Info className="mt-1 h-5 w-5 text-slate-600" />
                <div>
                  <h3 className="font-semibold text-title">Not Eligible? Consider Becoming a Reseller</h3>
                  <p className="mt-2 text-sm text-description">
                    If you do not meet the above criteria, we strongly recommend choosing Reseller instead. As a reseller, you can sell products on our platform by sourcing from approved wholesalers.
                  </p>
                  <Link href="/auth/reseller-terms-and-conditions">
                    <span className="mt-3 inline-flex items-center text-sm font-semibold text-main hover:text-main/80 cursor-pointer">
                      Learn More About Becoming a Reseller
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Agreement Checkbox & Buttons */}
          <div className="rounded-xl border border-slate-200 bg-white p-8">
            <label className="mb-6 flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-main"
              />
              <span className="text-base font-medium text-title">
                I have read and understood the eligibility requirements and important information above. I confirm that I meet the criteria to become a wholesaler. I understand that my application may be rejected without specific explanation. I agree to proceed with the wholesaler registration.
              </span>
            </label>

            <div className="flex gap-4">
              <Link href="/auth/wholesaler-sign-in" className="flex-1">
                <button className="w-full rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-medium text-title hover:bg-slate-50 transition">
                  Cancel
                </button>
              </Link>
              <Link href={agreed ? '/auth/wholesaler-sign-up' : '#'} className="flex-1">
                <button
                  disabled={!agreed}
                  className="w-full rounded-lg bg-heading px-6 py-3 text-base font-medium text-white hover:bg-heading/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Accept & Continue to Registration
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WholesalerTermsAndConditionsPage
