import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import product1 from '@/assets/home/product1.png'
import product2 from '@/assets/home/product2.png'

const FlashSales = () => {
  const products = [
    {
      id: 1,
      badge: 'NEW ARRIVAL',
      name: 'Hollee Caldwell',
      description: 'Cupidististe facere au',
      image: product1
    },
    {
      id: 2,
      badge: 'NEW ARRIVAL',
      name: 'Dear Person Behind Me, the World Is A Better Place with You In It love the...',
      description: 'Product information\\Style: Pullover\\Sleeve length: Long sleeve\\Color type—',
      image: product2
    }
  ]

  return (
    <section className="w-full bg-white py-12 md:py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-8 border-l-4 border-heading pl-4">
          Flash Sales
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-[#F9FAFB] rounded-lg overflow-hidden flex items-center"
            >
              {/* Left: Image */}
              <div className="w-40 h-40 md:w-48 md:h-48 bg-slate-700 rounded-lg overflow-hidden relative shrink-0 m-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100px, 150px"
                />
              </div>

              {/* Right: Content */}
              <div className="flex-1 pr-6 py-6 flex flex-col justify-between">
                <div>
                  <span className=" text-main text-xs font-bold px-2 py-1 rounded mb-3">
                    — {product.badge}
                  </span>
                  <h3 className="font-bold text-title text-base md:text-lg line-clamp-2 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-description text-xs md:text-sm line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <Button asChild className="max-w-25 mt-4">
                  <Link href="/all-products?source=flash-sales&title=Flash%20Sales%20are%20Here!%20Grab%20It%20Fast">
                    Shop Now
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FlashSales
