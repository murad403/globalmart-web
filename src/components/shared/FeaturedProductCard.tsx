import React from 'react'
import Image, { type StaticImageData } from 'next/image'
import { Heart, Star } from 'lucide-react'

type ProductCardProps = {
  name: string
  description: string
  price: string
  rating: number
  reviews: number
  image: StaticImageData
  inStock: boolean
}

const FeaturedProductCard = ({
  name,
  description,
  price,
  rating,
  reviews,
  image,
  inStock
}: ProductCardProps) => {
  return (
    <article className="rounded-xl overflow-hidden bg-[#F9FAFB]">
      <div className="relative h-40 sm:h-44 md:h-56 bg-[#DDE4F2] group">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes=""
        />

        {!inStock && (
          <span className="absolute left-2 top-2 rounded bg-white/90 px-2 py-1 text-[11px] font-semibold text-slate-700">
            Out of Stock
          </span>
        )}

        <button
          type="button"
          aria-label={`Add ${name} to wishlist`}
          className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-slate-500 shadow cursor-pointer hover:text-heading transition-colors duration-300"
        >
          <Heart strokeWidth={3} className="h-4 w-4" />
        </button>
      </div>

      <div className="p-3.5 space-y-2">
        <h3 className="text-[22px] sm:text-[23px] font-bold text-title leading-tight line-clamp-1">
          {name}
        </h3>
        <p className="mt-1 text-sm text-description line-clamp-2">{description}</p>

        <div className="flex items-center gap-1 text-xs mt-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={i < rating && reviews > 0 ? 'text-heading' : 'text-slate-300'}
              size={14}
              fill={i < rating && reviews > 0 ? 'currentColor' : 'none'}
            />
          ))}
          <span className="ml-1 text-description">({reviews})</span>
        </div>

        <p className="mt-1.5 text-lg sm:text-[25px] font-extrabold text-title leading-none">{price}</p>
      </div>
    </article>
  )
}

export default FeaturedProductCard
