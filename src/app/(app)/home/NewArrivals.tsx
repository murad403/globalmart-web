import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import arrivalsBanner from '@/assets/home/arrivalsbanner.png'
import arrivals1 from '@/assets/home/arrivals1.png'
import arrivals2 from '@/assets/home/arrivals2.png'
import arrivals3 from '@/assets/home/arrivals3.png'
import arrivals4 from '@/assets/home/arrivals4.png'
import { Heart } from 'lucide-react'

const NewArrivals = () => {
  const products = [
    {
      id: 1,
      badge: 'FEATURED',
      name: 'Air Fryer',
      description: 'Norum elited ut fuse ut. Commodo como aliquet maxim incidunt adipiqu congue.',
      price: '$214.27',
      image: arrivalsBanner
    },
    {
      id: 2,
      category: 'Clothing & Apparel',
      name: 'Microwave Oven',
      price: '$188.27',
      image: arrivals1
    },
    {
      id: 3,
      category: 'Laptops & Computers',
      name: 'Perfume',
      price: '$102.01',
      image: arrivals2
    },
    {
      id: 4,
      category: 'Outdoor Recreation',
      name: 'Polo Shirt',
      price: '$61.95',
      image: arrivals3
    },
    {
      id: 5,
      category: 'Outdoor Recreation',
      name: 'Sunglasses',
      price: '$45.99',
      image: arrivals4
    }
  ]

  return (
    <section className="w-full bg-white py-12 md:py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-title mb-8 border-l-4 border-heading pl-4">
          New Arrivals
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured Product */}
          <div className="lg:col-span-1 bg-[#0D1B2A] rounded-lg overflow-hidden text-white p-6 md:p-8 flex items-center">
            <div className="w-1/2 pr-4">
              <span className="inline-block bg-main text-white text-xs font-bold px-3 py-1 rounded mb-4">
                FEATURED
              </span>
              <h3 className="text-3xl md:text-4xl font-bold mb-3">Air Fryer</h3>
              <p className="text-white/80 text-sm mb-6">
                Norum eleifend ut faue out. Commodo porro adipisci blanditim incididunt aspor consqu. Expedura eu vitae rutis...
              </p>
              <div className="text-4xl font-bold mb-6">$214.27</div>
              <Link
                href="/all-products?source=new-arrivals&title=New%20Arrivals%20Products%20are%20Here!%20Grab%20It%20Fast"
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white px-4 py-2 font-semibold text-black hover:bg-gray-200"
              >
                Shop Now <span>→</span>
              </Link>
            </div>
            <div className="w-1/2 h-full relative">
              <Image
                src={products[0].image}
                alt="Air Fryer"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>

          {/* Other Products Grid */}
          <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.slice(1).map((product) => (
              <div
                key={product.id}
                className="bg-[#F9FAFB] border border-gray-100 rounded-lg p-4 hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="w-full h-40 bg-gray-100 rounded-lg shrink-0 overflow-hidden relative mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-gray-500 text-xs md:text-sm font-semibold uppercase mb-1">
                      {product.category}
                    </p>
                    <h3 className="font-bold text-gray-800 text-sm md:text-base mb-2">
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-heading flex items-center">
                      {product.price}
                    </span>
                      <Heart className='text-heading size-4'/>
                  </div>
                  <Button asChild>
                    <Link href="/all-products?source=new-arrivals&title=New%20Arrivals%20Products%20are%20Here!%20Grab%20It%20Fast">
                      View Product
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewArrivals
