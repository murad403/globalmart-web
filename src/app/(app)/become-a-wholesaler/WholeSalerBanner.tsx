import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import wholesalerBanner from '@/assets/home/wholesallerbanner.png'
import { ArrowRight, Box, ShoppingCart, TrendingUp, UserRound } from 'lucide-react'
import Link from 'next/link'

const stats = [
  {
    id: 1,
    value: '10K+',
    label: 'Active Sellers',
    icon: UserRound,
    iconColor: 'text-main'
  },
  {
    id: 2,
    value: '50K+',
    label: 'Products',
    icon: Box,
    iconColor: 'text-heading'
  },
  {
    id: 3,
    value: '98%',
    label: 'Satisfaction',
    icon: TrendingUp,
    iconColor: 'text-[#00C950]'
  }
]

const WholeSalerBanner = () => {
  return (
    <section className="w-full bg-[#F4F4F5] px-4 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 text-sm md:text-base text-description font-semibold">
              <ShoppingCart className="h-4 w-4 text-heading" />
              Join 10,000+ Successful Wholesalers
            </p>

            <h1 className="text-title text-4xl sm:text-5xl lg:text-6xl max-w-sm font-bold leading-tight">
              Start Selling <span className="text-main">Verified</span>
              
              Wholesalers&apos; Products
           
              <span className="text-heading">Online Today</span>
            </h1>

            <p className="mt-5 max-w-xl text-description text-base sm:text-lg leading-relaxed">
              Build your business by selling verified wholesalers&apos; products individually.
              Join our platform and start growing your revenue today.
            </p>

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {stats.map((stat) => {
                const Icon = stat.icon

                return (
                  <div
                    key={stat.id}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-xs"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${stat.iconColor}`} />
                      <p className={`text-4xl font-bold leading-none ${stat.iconColor}`}>{stat.value}</p>
                    </div>
                    <p className="text-description font-medium">{stat.label}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link href="/auth/wholesaler-terms-and-conditions">
                <Button>
                  Become a Wholesaler
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href={"/wholesaler"}
                className="border-slate-300 bg-white px-6 py-2.5 rounded-lg border text-title hover:bg-slate-200"
              >
                View Dashboard
              </Link>
            </div>
          </div>

          <div className="relative rounded-3xl bg-white p-3 shadow-xl">
            <div className="relative h-80 sm:h-105 w-full overflow-hidden rounded-2xl">
              <Image
                src={wholesalerBanner}
                alt="Wholesaler success banner"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                priority
              />
            </div>

            <div className="absolute right-8 top-6 rounded-full bg-[#00C950] px-4 py-2 text-sm sm:text-lg font-bold text-white shadow-md">
              Live Now
            </div>

            <div className="absolute bottom-6 right-6 rounded-2xl bg-heading px-6 py-4 text-white shadow-lg">
              <p className="text-4xl font-bold leading-none">$2M+</p>
              <p className="mt-1 text-lg">Monthly Sales</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WholeSalerBanner
