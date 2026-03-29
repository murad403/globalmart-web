import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import product1 from '@/assets/home/product1.png'
import product2 from '@/assets/home/product2.png'
import product3 from '@/assets/home/product3.png'
import Features from './Features'
import { Star } from 'lucide-react'

const listings = {
  bestSeller: [
    { name: 'Leather Jacket', rating: 5, reviews: 1, price: '$145.13', image: product1 },
    { name: 'Smart TV', rating: 5, reviews: 1, price: '$132.80', image: product2 },
    { name: 'Formal Shirt', rating: 5, reviews: 1, price: '$141.43', image: product3 }
  ],
  trending: [
    { name: 'Microwave Oven', rating: 5, reviews: 5, price: '$188.27', image: product2 },
    { name: 'Perfume', rating: 5, reviews: 5, price: '$102.01', image: product3 },
    { name: 'Ring Light', rating: 5, reviews: 5, price: '$78.52', image: product1 }
  ],
  topRated: [
    { name: 'Evening Gown', rating: 5, reviews: 5, price: '$33.45', image: product3 },
    { name: 'Track Suit', rating: 5, reviews: 5, price: '$231.23', image: product1 },
    { name: 'DSLR Camera', rating: 5, reviews: 5, price: '$33.58', image: product2 }
  ]
}

const StarRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
  <div className="flex items-center gap-1 mb-2">
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={i < rating && reviews > 0 ? 'text-heading' : 'text-slate-300'}
          size={14}
          fill={i < rating && reviews > 0 ? 'currentColor' : 'none'}
        />
      ))}
    </div>
    <span className="text-description font-semibold text-xs">({reviews})</span>
  </div>
)

const ProductColumn = ({ title, products }: { title: string; products: typeof listings.bestSeller }) => (
  <div>
    <h3 className="font-bold text-title text-base md:text-lg mb-4">
      {title}
    </h3>
    <div className="space-y-4">
      {products.map((product, index) => (
        <div key={index} className="flex gap-3 bg-white rounded-xl p-2">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl shrink-0 overflow-hidden relative">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80px, 100px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-title font-semibold text-xs md:text-sm line-clamp-2 mb-1">
              {product.name}
            </p>
            <StarRating rating={product.rating} reviews={product.reviews} />
            <p className="text-heading font-bold text-sm md:text-base">
              {product.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const ProductListings = () => {
  return (
    <section className="w-full bg-[#F9FAFB] py-12 md:py-16 px-4">
      <div className="container mx-auto">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="border-l-4 border-heading pl-4 text-2xl font-bold text-title md:text-3xl">Product Listings</h2>
          <Link
            href="/all-products?source=product-listings&title=Product%20Listings%20are%20Here!%20Grab%20It%20Fast"
            className="text-sm font-semibold text-heading hover:underline md:text-base"
          >
            See all products ›
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-6 md:mb-8">
          <ProductColumn title="Best Seller" products={listings.bestSeller} />
          <ProductColumn title="Trending Products" products={listings.trending} />
          <ProductColumn title="Top Rated" products={listings.topRated} />
        </div>

        {/* Features Bar */}
        <Features />
      </div>
    </section>
  )
}

export default ProductListings
