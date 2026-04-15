import React from 'react'
import { type StaticImageData } from 'next/image'
import ProductCard from '@/components/shared/ProductCard'
import Pagination from '@/components/shared/Pagination'


export type ProductViewItem = {
    id: number
    title: string
    description: string
    price: string
    priceValue: number
    badge: string
    image: StaticImageData
    rating: number
    reviews: number
    category: string
    inStock: boolean
    featured: boolean
    sourceTags: string[]
}

type ProductsProps = {
    heading: string
    subHeading: string
    products: ProductViewItem[]
    viewMode: 'grid' | 'list'
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

const Products = ({ heading, subHeading, products, viewMode, currentPage, totalPages, onPageChange }: ProductsProps) => {
    return (
        <section>
            {/* Heading */}
            <header className="mb-6">
                <h1 className="text-3xl font-bold leading-tight text-title md:text-5xl">
                    {heading}{' '}
                </h1>
                <h3 className="font-bold text-2xl md:text-4xl">{subHeading}</h3>
            </header>

            {products.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-description">
                    No products match your current filters.
                </div>
            ) : (
                <>
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} href={`/all-products/${product.id}`} />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} list href={`/all-products/${product.id}`} />
                            ))}
                        </div>
                    )}

                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                </>
            )}
        </section>
    )
}

export default Products