"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Star } from 'lucide-react'

import product1 from '@/assets/home/product1.png'
import product2 from '@/assets/home/product2.png'
import product3 from '@/assets/home/product3.png'
import product4 from '@/assets/home/product1.png'
import ProductCard from '@/components/shared/ProductCard'

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
                        <ProductCard key={index} product={product} />
                    ))}
                </div>



                <div className="mt-6 flex items-center max-w-lg justify-between mx-auto gap-3 md:mt-8">
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
