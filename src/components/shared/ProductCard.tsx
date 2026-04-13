import { Heart, ShoppingCart, Star } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'
import { Button } from '../ui/button'

type PopularProduct = {
    title: string
    description: string
    price: string
    badge: string
    image: StaticImageData
}

const ProductCard = ({ product }: { product: PopularProduct }) => {
    return (
        <article
            
            className="group min-w-[85%] sm:min-w-[48%] lg:min-w-[24%] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06)] transition-transform duration-300 hover:-translate-y-0.5"
        >
            <div className="relative">
                <div className="relative h-56 w-full overflow-hidden bg-slate-100 sm:h-60">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, 24vw"
                    />
                </div>

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

            <div className="flex h-full flex-col p-3 md:p-4">
                <h3 className="line-clamp-2 text-[15px] font-medium leading-6 text-title md:text-base">
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
                    <span className="ml-1 text-sm font-semibold text-title">4.7</span>
                    <span className="text-sm text-description">(21,671 Ratings)</span>
                </div>

                <Button
                    className='mt-4'
                    type="button"
                >
                    <ShoppingCart className="size-4" />
                    Add to Cart
                </Button>
            </div>
        </article>
    )
}

export default ProductCard
