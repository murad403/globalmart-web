import { Heart, ShoppingCart, Star } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'
import { Button } from '../ui/button'

type PopularProduct = {
    title: string
    description: string
    price: string
    badge: string
    image: StaticImageData
    rating?: number
    reviews?: number
}

const ProductCard = ({ product, list = false }: { product: PopularProduct; list?: boolean }) => {
    const rating = product.rating ?? 4.7
    const reviews = product.reviews ?? 21671

    return (
        <article
            className={`group overflow-hidden rounded-2xl border hover:border-heading border-slate-200 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06)] transition-transform duration-300 hover:-translate-y-0.5 ${
                list ? '' : 'min-w-[85%] sm:min-w-[48%] lg:min-w-[24%]'
            }`}
        >
            <div className={list ? 'flex flex-col sm:flex-row sm:items-stretch' : 'relative'}>
                <div className={`relative overflow-hidden bg-slate-100 ${list ? 'h-52 w-full sm:min-h-59 sm:w-1/2' : 'h-56 w-full sm:h-60'}`}>
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes={list ? '(max-width: 640px) 100vw, 260px' : '(max-width: 640px) 85vw, (max-width: 1024px) 48vw, 24vw'}
                    />

                    <span className="absolute left-2 top-2 rounded-md bg-[#E11D48] px-2 py-1 text-[11px] font-medium text-white">
                        {product.badge}
                    </span>

                    <button
                        type="button"
                        aria-label={`Add ${product.title} to wishlist`}
                        className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-slate-500 shadow cursor-pointer hover:text-heading transition-colors duration-300"
                    >
                        <Heart strokeWidth={3} className="h-4 w-4" />
                    </button>
                </div>

                <div className={`flex h-full flex-col ${list ? 'flex-1 p-4' : 'p-3 md:p-4'}`}>
                    <h3 className={`line-clamp-2 font-medium text-title ${list ? 'text-base leading-7' : 'text-[15px] leading-6 md:text-base'}`}>
                        {product.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-description">
                        {product.description}
                    </p>

                    <div className="mt-3 flex items-center gap-1">
                        <div className="flex items-center gap-0.5 text-[#F59E0B]">
                            {Array.from({ length: 5 }, (_, starIndex) => (
                                <Star key={starIndex} className="size-4 fill-current" />
                            ))}
                        </div>
                        <span className="ml-1 text-sm font-semibold text-title">{rating.toFixed(1)}</span>
                        <span className="text-sm text-description">({reviews.toLocaleString()} Ratings)</span>
                    </div>

                    <Button
                        className='mt-4'
                        type="button"
                    >
                        <ShoppingCart className="size-4" />
                        Add to Cart
                    </Button>
                </div>
            </div>
        </article>
    )
}

export default ProductCard
