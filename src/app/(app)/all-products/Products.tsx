import React, { useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './ProductCard'


export type ProductViewItem = {
    id: number
    name: string
    price: number
    rating: number
    reviews: number
    flashLabel: string
    category: string
    inStock: boolean
    featured: boolean
    sourceTags: string[]
}

type ProductsProps = {
    heading: string
    subHeading: string
    products: ProductViewItem[]
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

const Products = ({ heading, subHeading, products, currentPage, totalPages, onPageChange }: ProductsProps) => {
    const paginationItems = useMemo(() => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)

        const pages = new Set<number>([1, totalPages, currentPage, currentPage - 1, currentPage + 1])
        const validPages = Array.from(pages).filter((p) => p > 0 && p <= totalPages).sort((a, b) => a - b)

        const items: Array<number | 'ellipsis'> = []
        validPages.forEach((page, index) => {
            items.push(page)
            const next = validPages[index + 1]
            if (next && next - page > 1) items.push('ellipsis')
        })
        return items
    }, [currentPage, totalPages])

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
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <nav className="mt-10 flex items-center justify-center gap-1">
                            <button
                                type="button"
                                onClick={() => onPageChange(currentPage - 1)}
                                disabled={currentPage <= 1}
                                className="grid p-1 place-items-center rounded border border-slate-300 bg-slate-100 text-slate-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <ChevronLeft className="size-3.5" />
                            </button>

                            {paginationItems.map((item, index) =>
                                item === 'ellipsis' ? (
                                    <span key={`e-${index}`} className="grid h-7 min-w-7 place-items-center text-sm text-description">
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => onPageChange(item)}
                                        className={`grid px-2.5 py-1.5 place-items-center rounded border text-sm font-medium transition ${item === currentPage
                                                ? 'border-heading bg-white text-heading'
                                                : 'border-slate-300 bg-slate-100 text-description hover:bg-white'
                                            }`}
                                    >
                                        {item}
                                    </button>
                                )
                            )}

                            <button
                                type="button"
                                onClick={() => onPageChange(currentPage + 1)}
                                disabled={currentPage >= totalPages}
                                className="grid p-1 place-items-center rounded border border-slate-300 bg-slate-100 text-slate-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <ChevronRight className="size-3.5" />
                            </button>
                        </nav>
                    )}
                </>
            )}
        </section>
    )
}

export default Products