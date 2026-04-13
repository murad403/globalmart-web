import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { type ProductViewItem } from '../Products'
import ProductCard from '@/components/shared/ProductCard'
import product1 from '@/assets/home/product1.png'
import product2 from '@/assets/home/product2.png'
import product3 from '@/assets/home/product3.png'

const relatedProductBlueprints = [
  {
    title: 'BenQ ScreenBar Halo LED Monitor Light',
    description: 'Eye-care monitor light with wireless controller for focused work sessions.',
    price: 125,
    rating: 4.7,
    reviews: 21671,
    badge: 'Popular',
    image: product1,
  },
  {
    title: 'Honeywell Newly Launched 4-in-1 Ultra Slim USB Hub',
    description: 'Slim USB hub with multiple ports for high-speed data and charging.',
    price: 125,
    rating: 4.7,
    reviews: 21671,
    badge: 'Top Pick',
    image: product2,
  },
  {
    title: 'STRIFF Adjustable Laptop Tablet Stand',
    description: 'Sturdy foldable stand for better posture and improved airflow.',
    price: 125,
    rating: 4.7,
    reviews: 21671,
    badge: 'Best Seller',
    image: product3,
  },
  {
    title: 'Dyazo Water Resistant Laptop Sleeve',
    description: 'Protective laptop sleeve built with water-resistant fabric and soft interior.',
    price: 125,
    rating: 4.7,
    reviews: 21671,
    badge: 'New',
    image: product1,
  },
]

const relatedProducts: ProductViewItem[] = Array.from({ length: 12 }, (_, index) => {
  const blueprint = relatedProductBlueprints[index % relatedProductBlueprints.length]

  return {
    id: 5000 + index,
    title: blueprint.title,
    description: blueprint.description,
    price: `$${blueprint.price.toFixed(2)}`,
    priceValue: blueprint.price,
    badge: blueprint.badge,
    image: blueprint.image,
    rating: blueprint.rating,
    reviews: blueprint.reviews,
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
