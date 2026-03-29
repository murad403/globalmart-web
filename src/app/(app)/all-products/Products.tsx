import React, { useMemo } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

export type ProductViewItem = {
  id: number
  name: string
  price: number
  rating: number
  reviews: number
  image: StaticImageData
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
        <h1 className="text-3xl font-extrabold leading-tight text-title md:text-[40px]">
          {heading}{' '}
          <span className="font-bold text-2xl md:text-[34px]">{subHeading}</span>
        </h1>
      </header>

      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-description">
          No products match your current filters.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="group flex flex-col">
                {/* Image box */}
                <div className="relative overflow-hidden rounded-xl bg-[#ECEDEF] p-3">
                  <div className="relative h-48 w-full overflow-hidden rounded-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Flash label — bottom of image box */}
                  <div className="mt-2 flex items-center gap-2 rounded-full bg-[#152B52] px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                    <p className="text-[10px] font-medium text-[#65A8FF] truncate">
                      {product.flashLabel}
                    </p>
                  </div>
                </div>

                {/* Product info */}
                <div className="mt-3 flex flex-col flex-1">
                  <h3 className="line-clamp-2 text-lg font-bold leading-snug text-title">
                    {product.name}
                  </h3>

                  {/* Stars */}
                  <div className="mt-1.5 flex items-center gap-1">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={i < Math.round(product.rating) ? 'size-3.5 text-heading' : 'size-3.5 text-slate-300'}
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
                    className="mt-3 h-9 w-full rounded-md text-[11px] font-bold uppercase tracking-widest"
                  >
                    BUY NOW — ₹{product.price}
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-10 flex items-center justify-center gap-1">
              <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="grid size-7 place-items-center rounded border border-slate-300 bg-slate-100 text-slate-500 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="size-3.5" />
              </button>

              {paginationItems.map((item, index) =>
                item === 'ellipsis' ? (
                  <span key={`e-${index}`} className="grid h-7 min-w-7 place-items-center text-[11px] text-description">
                    ...
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    onClick={() => onPageChange(item)}
                    className={`grid h-7 min-w-7 place-items-center rounded border text-[11px] font-medium transition ${
                      item === currentPage
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
                className="grid size-7 place-items-center rounded border border-slate-300 bg-slate-100 text-slate-500 disabled:opacity-40 disabled:cursor-not-allowed"
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