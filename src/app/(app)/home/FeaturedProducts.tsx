import React from 'react'
import Link from 'next/link'
import product1 from '@/assets/home/product1.png'
import product2 from '@/assets/home/product2.png'
import product3 from '@/assets/home/product3.png'
import FeaturedProductCard from '@/components/shared/FeaturedProductCard'

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Hollee Caldwell',
      description: 'Cupidististe facere au',
      price: '$1114.10',
      rating: 5,
      reviews: 0,
      image: product1,
      inStock: true
    },
    {
      id: 2,
      name: 'Cailin Gates',
      description: 'Voluptilbous voluptit',
      price: '$831.00',
      rating: 5,
      reviews: 0,
      image: product2,
      inStock: true
    },
    {
      id: 3,
      name: 'Ring Light',
      description: 'Nicerosit recursandae possimus quae tectarium...',
      price: '$78.52',
      rating: 5,
      reviews: 6,
      image: product3,
      inStock: true
    },
    {
      id: 4,
      name: 'Leather Wallet',
      description: 'Error architecto tempore sis temptoribs...',
      price: '$145.13',
      rating: 5,
      reviews: 6,
      image: product1,
      inStock: false
    }
  ]

  return (
    <section className="w-full py-12 md:py-16 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8 md:mb-10 gap-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-title border-l-4 border-heading pl-4">
            Featured Products
          </h2>
          <Link
            href="/all-products?source=featured&title=Featured%20Products%20are%20Here!%20Grab%20It%20Fast"
            className="text-heading font-semibold text-sm md:text-base hover:underline whitespace-nowrap"
          >
            Browse All Products ›
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <FeaturedProductCard
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              rating={product.rating}
              reviews={product.reviews}
              image={product.image}
              inStock={product.inStock}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
