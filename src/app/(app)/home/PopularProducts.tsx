"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Star } from 'lucide-react'

import product1 from '@/assets/home/product1.png'
import product2 from '@/assets/home/product2.png'
import product3 from '@/assets/home/product3.png'
import product4 from '@/assets/home/product1.png'
import { Button } from '@/components/ui/button'

type PopularProduct = {
    title: string
    description: string
    price: string
    badge: string
    image: StaticImageData
}

const PopularProducts = () => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const products: PopularProduct[] = useMemo(
        () => [
            {
                title: 'Wireless Earphones Smartphone',
                description: 'Premium noise-cancelling headphones with 30-hour battery life and crystal-clear audio quality.',
                price: '$47.00',
                badge: 'Best Seller',
                image: product1,
            },
            {
                title: 'Wireless earbuds',
                description: 'Premium noise-cancelling headphones with 30-hour battery life and crystal-clear audio quality.',
                price: '$47.00',
                badge: 'New Seller',
                image: product2,
            },
            {
                title: 'Wireless Earphones Smartphone',
                description: 'Premium noise-cancelling headphones with 30-hour battery life and crystal-clear audio quality.',
                price: '$47.00',
                badge: 'New',
                image: product3,
            },
            {
                title: 'Young Plus Face Wash',
                description: 'Premium noise-cancelling headphones with 30-hour battery life and crystal-clear audio quality.',
                price: '$47.00',
                badge: '-25%',
                image: product4,
            },
            {
                title: 'Smart Headphones Pro',
                description: 'Premium noise-cancelling headphones with 30-hour battery life and crystal-clear audio quality.',
                price: '$47.00',
                badge: 'Hot',
                image: product2,
            },
        ],
        []
    )

    const updateScrollState = () => {
        const el = scrollRef.current
        if (!el) return

        setCanScrollLeft(el.scrollLeft > 0)
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2)
    }

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        updateScrollState()
        const onScroll = () => updateScrollState()
        const onResize = () => updateScrollState()

        el.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onResize)

        const observer = new ResizeObserver(() => updateScrollState())
        observer.observe(el)

        return () => {
            el.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onResize)
            observer.disconnect()
        }
    }, [])

    const handleArrowClick = (direction: 'prev' | 'next') => {
        const el = scrollRef.current
        if (!el) return

        const slideAmount = Math.round(el.clientWidth * 0.92)
        el.scrollBy({
            left: direction === 'prev' ? -slideAmount : slideAmount,
            behavior: 'smooth',
        })
    }

    return (
        <section className="w-full px-4 py-12 md:py-16">
            <div className="container mx-auto">
                <div className="mb-8 flex items-center justify-between gap-4 md:mb-10">
                    <h2 className="border-l-4 border-heading pl-4 text-2xl font-bold text-title md:text-3xl lg:text-4xl">
                        Popular Products
                    </h2>
                </div>

                <div
                    ref={scrollRef}
                    className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-2"
                >
                    {products.map((product, index) => (
                        <article
                            key={`${product.title}-${index}`}
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
                                    aria-label="Add to wishlist"
                                    className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-white/90 text-[#E11D48] shadow-sm transition hover:bg-white"
                                >
                                    <Heart className="size-4 fill-current" />
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
                    ))}
                </div>

                <div className="mt-6 flex items-center justify-center gap-3 md:mt-8 md:justify-end">
                    <button
                        type="button"
                        onClick={() => handleArrowClick('prev')}
                        disabled={!canScrollLeft}
                        className="grid size-8 place-items-center rounded-md border border-slate-200 bg-white text-slate-400 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Previous products"
                    >
                        <ChevronLeft className="size-4" />
                    </button>

                    <button
                        type="button"
                        onClick={() => handleArrowClick('next')}
                        disabled={!canScrollRight}
                        className="grid size-8 place-items-center rounded-md bg-button-start text-white shadow-sm transition hover:bg-button-end disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Next products"
                    >
                        <ChevronRight className="size-4" />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default PopularProducts
