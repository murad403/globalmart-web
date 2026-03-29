import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import heroImage from '@/assets/home/hero1.png'
import product1 from '@/assets/home/hero2.png'
import product2 from '@/assets/home/hero1.png'

const Hero = () => {
  return (
    <section className="w-full bg-linear-to-br from-[#FAF5FF] to-[#FDF2F8] py-12 md:py-16 lg:py-20 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Content & Center Image */}
          <div className="lg:col-span-2">
            <div className="bg-linear-to-br from-[#FFD6A8] to-[#FFEDD4] rounded-xl p-8 md:p-12 h-full flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Top Content */}
              <div className="space-y-6 flex-1">
                <p className="text-blue-500 font-semibold text-sm uppercase tracking-widest">
                  — HAIR CARE
                </p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
                  Ring Light
                </h1>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md">
                  Ïtaque non voluptatem amet out accumus. Facilis quis dolor atque dolor dolent harum quaelem.
                </p>
                <Button asChild>
                  <Link href="/all-products?source=all&title=All%20Product%20are%20Here!%20Grab%20It%20Fast">
                    Shop Now
                    <span>›</span>
                  </Link>
                </Button>
              </div>

              {/* Center Image */}
              <div className="relative w-full md:w-1/2 h-64 md:h-72 rounded-xl shadow-lg shrink-0">
                <Image
                  src={heroImage}
                  alt="Ring Light"
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
                {/* Price Badge */}
                <div className="absolute -top-2 -right-2 bg-main text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                  $78.52
                </div>
              </div>
            </div>
          </div>

          {/* Right Product Cards */}
          <div className="space-y-6">
            {/* iPhone 16 Pro Max Card */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden h-80">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-heading text-white text-xs font-bold px-3 py-1 rounded-full">
                  SUMMER SALES
                </span>
                <span className="bg-heading text-white text-xs font-bold px-3 py-1 rounded-full">
                  0.00 USD
                </span>
              </div>
              <h3 className="text-xl font-bold mb-4">iPhone 16 Pro Max</h3>
              <div className="relative h-32 mb-4 rounded-xl overflow-hidden">
                <Image
                  src={product1}
                  alt="iPhone 16 Pro Max"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <Button asChild>
                <Link href="/all-products?source=featured&title=Featured%20Products%20are%20Here!%20Grab%20It%20Fast">
                  Shop Now
                  <span>›</span>
                </Link>
              </Button>
            </div>

            {/* Apple VR Pro Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 overflow-hidden h-80">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-heading text-white text-xs font-bold px-3 py-1 rounded-full">
                  EXCLUSIVE OFFER
                </span>
                <span className="bg-heading text-white text-xs font-bold px-3 py-1 rounded-full">
                  0.00 USD
                </span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Apple VR Pro</h4>
              <div className="relative h-32 mb-4 bg-gray-100 rounded-xl overflow-hidden">
                <Image
                  src={product2}
                  alt="Apple VR Pro"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <Button asChild>
                <Link href="/all-products?source=new-arrivals&title=New%20Arrivals%20Products%20are%20Here!%20Grab%20It%20Fast">
                  Shop Now
                  <span>›</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
