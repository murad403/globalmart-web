import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import ProductCard from '../ProductCard'
import { type ProductViewItem } from '../Products'

const relatedProductBlueprints = [
  {
    name: 'BenQ ScreenBar Halo LED Monitor Light',
    price: 125,
    rating: 4.7,
    reviews: 21671,
  },
  {
    name: 'Honeywell Newly Launched 4-in-1 Ultra Slim USB Hub',
    price: 125,
    rating: 4.7,
    reviews: 21671,
  },
  {
    name: 'STRIFF Adjustable Laptop Tablet Stand',
    price: 125,
    rating: 4.7,
    reviews: 21671,
  },
  {
    name: 'Dyazo Water Resistant Laptop Sleeve',
    price: 125,
    rating: 4.7,
    reviews: 21671,
  },
]

const relatedProducts: ProductViewItem[] = Array.from({ length: 12 }, (_, index) => {
  const blueprint = relatedProductBlueprints[index % relatedProductBlueprints.length]

  return {
    id: 5000 + index,
    name: blueprint.name,
    price: blueprint.price,
    rating: blueprint.rating,
    reviews: blueprint.reviews,
    flashLabel: 'Frequently Bought Together',
    category: 'Electronics',
    inStock: true,
    featured: true,
    sourceTags: ['all'],
  }
})

const RelatedProducts = () => {
  return (
    <div className='container mx-auto mt-8 pb-10'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl md:text-3xl font-semibold text-title uppercase'>Frequently bought together</h2>
        <Link href={"/all-products"}>
        <Button>View All</Button>
        </Link>
      </div>

      <div className='grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4'>
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
