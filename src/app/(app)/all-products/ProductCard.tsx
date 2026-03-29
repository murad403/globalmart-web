/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import product1 from '@/assets/home/product1.png'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ProductCard = ({ product }: { product: any }) => {
    return (
        <article className="group flex flex-col rounded-xl bg-slate-100 p-2">
            {/* Image box */}

            <Link href={`/all-products/${product.id}`} className='block overflow-hidden rounded-lg'>
                <Image
                    src={product1}
                    alt={product.name}
                    width={500}
                    height={500}
                    className='h-56 w-full transform-gpu object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-110'
                />
            </Link>
            {/* Product info */}
            <div className="mt-3 flex flex-col flex-1">
                <h3 className="line-clamp-2 text-lg md:text-xl font-bold leading-snug text-title">
                    {product.name}
                </h3>

                {/* Stars */}
                <div className="mt-1.5 flex items-center gap-1">
                    <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }, (_, i) => (
                            <Star
                                key={i}
                                className={i < Math.round(product.rating) ? 'size-4 text-yellow-400' : 'size-4 text-slate-300'}
                                fill={i < Math.round(product.rating) ? 'currentColor' : 'none'}
                            />
                        ))}
                    </div>
                    <span className="text-xs font-semibold text-title">{product.rating.toFixed(1)}</span>
                    <span className="text-[11px] text-description">({product.reviews.toLocaleString()} Ratings)</span>
                </div>

                {/* Buy button */}
                <Button
                    type="button"
                    className='mt-4 w-full'
                >
                    BUY NOW - ${product.price}
                </Button>
            </div>
        </article>
    )
}

export default ProductCard
