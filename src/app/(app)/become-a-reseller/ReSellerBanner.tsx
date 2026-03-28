import React from 'react'
import Image from 'next/image'
import resellerBanner from '@/assets/home/resellerbanner.png'
import { ArrowRight, BadgeCheck, Check, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ReSellerBanner = () => {
  return (
    <section className="w-full bg-[#FCF9F5] px-4 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 text-main text-sm md:text-base font-semibold uppercase tracking-wide">
              <TrendingUp className="h-4 w-4" />
              Empowering New Businesses
            </p>

            <h1 className="text-title text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Start Selling
              <br />
              <span className="text-main">Verified Products</span>
              <br />
              Online Today
            </h1>

            <p className="mt-5 max-w-xl text-description text-base sm:text-lg leading-relaxed">
              Connect with top-tier wholesalers and launch your digital storefront in minutes.
              No inventory needed, just your passion.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <Button>
                Become a Reseller
                <ArrowRight className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-3">
                <div className="flex items-center -space-x-2">
                  <span className="h-10 w-10 rounded-full border-2 border-white bg-slate-200" />
                  <span className="h-10 w-10 rounded-full border-2 border-white bg-slate-300" />
                  <span className="h-10 w-10 rounded-full border-2 border-white bg-slate-500" />
                </div>
                <p className="text-title text-sm sm:text-base leading-tight">
                  <span className="font-bold">6k+ Resellers</span>
                  <br />
                  <span className="text-description">already joined</span>
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-description text-base">
              <p className="inline-flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-4 w-4" />
                </span>
                Verified Wholesalers
              </p>
              <p className="inline-flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-4 w-4" />
                </span>
                High Profit Margin
              </p>
              <p className="inline-flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-4 w-4" />
                </span>
                Zero Inventory Risk
              </p>
            </div>
          </div>

          <div className="relative rounded-3xl bg-white p-3 shadow-xl">
            <div className="relative h-80 sm:h-105 w-full overflow-hidden rounded-2xl">
              <Image
                src={resellerBanner}
                alt="Reseller banner"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                priority
              />
            </div>

            <div className="absolute -right-8 -top-8 translate-x-[-10%] translate-y-[15%] rounded-2xl bg-[#00C950] px-5 py-4 text-white shadow-lg">
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
                <TrendingUp className="h-4 w-4" />
                Net Profit
              </p>
              <p className="text-5xl font-bold leading-none">+124%</p>
            </div>

            <div className="absolute bottom-7 left-6 rounded-2xl bg-main px-5 py-4 text-white shadow-lg">
              <p className="inline-flex items-center gap-2 text-2xl font-semibold uppercase tracking-wide">
                <BadgeCheck className="h-4 w-4" />
                Verified
              </p>
              <p className="text-4xl font-bold leading-none mt-1">Premium</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReSellerBanner
