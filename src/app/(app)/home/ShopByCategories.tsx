'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import product1 from '@/assets/home/product1.png'
import product2 from '@/assets/home/product2.png'
import product3 from '@/assets/home/product3.png'

const ShopByCategories = () => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const categories = [
    { name: 'Verges', image: product1 },
    { name: 'Industrial & Business', image: product2 },
    { name: 'Toys & Games', image: product3 },
    { name: 'Pet Supplies', image: product1 },
    { name: 'Garden & Furniture', image: product2 },
    { name: 'Table', image: product3 },
    { name: 'Lamp', image: product3 },
    { name: 'Toy', image: product3 }
  ]

  const handleScroll = (direction: 'left' | 'right') => {
    const node = scrollRef.current
    if (!node) return

    const amount = Math.max(220, Math.floor(node.clientWidth * 0.7))
    node.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth'
    })
  }

  return (
    <section className="w-full bg-[#F9FAFB] py-12 md:py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-title mb-8 border-l-4 border-heading pl-4">
          Shop by Categories
        </h2>

        <div className="relative">
          <button
            type="button"
            aria-label="Scroll categories left"
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-1/2 md:-translate-x-3 bg-heading text-white rounded-full p-1.5 shadow"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1 md:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category, index) => (
              <div
                key={index}
                className="group cursor-pointer snap-start shrink-0 w-44 sm:w-48 lg:w-52"
              >
                <div className="bg-white rounded-xl p-3 md:p-4 transition-all">
                  <div className="relative h-20 sm:h-24 md:h-28 rounded-xl overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                      sizes=""
                    />
                  </div>
                  <div className="pt-3 md:pt-4 text-center">
                    <p className="text-sm md:text-base font-semibold text-title line-clamp-2">
                      {category.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Scroll categories right"
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 md:translate-x-3 bg-heading text-white rounded-full p-1.5 shadow"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default ShopByCategories
