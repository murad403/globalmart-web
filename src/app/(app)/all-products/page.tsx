'use client'

import React, { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, LayoutGrid } from 'lucide-react'
import product1 from '@/assets/home/product1.png'
import product2 from '@/assets/home/product2.png'
import product3 from '@/assets/home/product3.png'
import Filter from './Filter'
import Products, { type ProductViewItem } from './Products'

type PriceRange = {
  min: number | null
  max: number | null
}

const categoryOptions = [
  'Home, Garden & Furniture',
  'Jewelry & Watches',
  'Home Improvement',
  'Health & Beauty',
  'Home & Garden',
  'Clothing & Apparel',
  'Food & Beverages',
  'Industrial & Business',
  'Automotive',
  'Sports & Outdoors',
  'Muave Orange'
]

const ratingOptions = [5, 4, 3, 2, 1]
const sourceOptions = ['all', 'flash-sales', 'featured', 'new-arrivals', 'product-listings']

const productBlueprints = [
  {
    name: 'Honeywell Newly Launched 4-in-1 Ultra Slim USB Hub',
    basePrice: 125,
    baseRating: 4.7,
    baseReviews: 21671,
    image: product1,
    flashLabel: 'Flash Deal Ends In 5 Hours !'
  },
  {
    name: 'STRIFF Adjustable Laptop Tablet Stand',
    basePrice: 125,
    baseRating: 4.7,
    baseReviews: 21671,
    image: product2,
    flashLabel: 'Flash Deal Ends In 5 Hours !'
  },
  {
    name: 'Dyazo Water Resistant Laptop Sleeve',
    basePrice: 125,
    baseRating: 4.7,
    baseReviews: 21671,
    image: product3,
    flashLabel: 'Flash Deal Ends In 5 Hours !'
  }
]

const allProducts: ProductViewItem[] = Array.from({ length: 145 }, (_, index) => {
  const blueprint = productBlueprints[index % productBlueprints.length]
  const cycle = Math.floor(index / productBlueprints.length)
  const baseSource = sourceOptions[(cycle % (sourceOptions.length - 1)) + 1]

  const sourceTags = new Set<string>(['all', baseSource])
  if (cycle % 2 === 0) sourceTags.add('featured')
  if (cycle % 3 === 0) sourceTags.add('flash-sales')
  if (cycle % 4 === 0) sourceTags.add('new-arrivals')
  if (cycle % 5 === 0) sourceTags.add('product-listings')

  return {
    id: index + 1,
    name: blueprint.name,
    price: blueprint.basePrice + (cycle % 5) * 10,
    rating: Math.max(3.5, Number((blueprint.baseRating - (cycle % 4) * 0.2).toFixed(1))),
    reviews: blueprint.baseReviews + cycle * 2,
    image: blueprint.image,
    flashLabel: blueprint.flashLabel,
    category: categoryOptions[cycle % categoryOptions.length],
    inStock: cycle % 6 !== 0,
    featured: cycle % 5 !== 1,
    sourceTags: Array.from(sourceTags)
  }
})

const sourceCategoryLabel: Record<string, string> = {
  all: 'Electronics',
  featured: 'Electronics',
  'flash-sales': 'Electronics',
  'new-arrivals': 'Electronics',
  'product-listings': 'Electronics'
}

const parsePrice = (value: string) => {
  if (!value.trim()) return null
  const numericValue = Number(value)
  if (!Number.isFinite(numericValue) || numericValue < 0) return null
  return numericValue
}

const getTitleParts = (title: string) => {
  const titleSegments = title.split('!')
  const headingSegment = titleSegments[0]?.trim()
  const heading = headingSegment ? `${headingSegment}!` : 'All Product are Here!'
  const subHeading = titleSegments.slice(1).join('!').trim() || 'Grab It Fast'
  return { heading, subHeading }
}

const AllProductsPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [minPriceInput, setMinPriceInput] = useState('0')
  const [maxPriceInput, setMaxPriceInput] = useState('10000')
  const [appliedPriceRange, setAppliedPriceRange] = useState<PriceRange>({ min: 0, max: 10000 })
  const [inStockOnly, setInStockOnly] = useState(true)
  const [featuredOnly, setFeaturedOnly] = useState(true)
  const [itemsPerPage, setItemsPerPage] = useState(9)
  const [sortBy, setSortBy] = useState('popular')
  const [currentPage, setCurrentPage] = useState(1)
  const [filterOpen, setFilterOpen] = useState(false)

  const source = (searchParams.get('source') ?? 'all').toLowerCase()
  const titleFromQuery = searchParams.get('title')?.trim() || 'Flash Sales are Here! Grab It Fast'
  const searchTerm = searchParams.get('search')?.trim().toLowerCase() || ''

  const filteredProducts = useMemo(() => {
    const selectedRatingFloor = selectedRatings.length > 0 ? Math.min(...selectedRatings) : null
    return allProducts.filter((product) => {
      if (source !== 'all' && !product.sourceTags.includes(source)) return false
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm)) return false
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false
      if (appliedPriceRange.min !== null && product.price < appliedPriceRange.min) return false
      if (appliedPriceRange.max !== null && product.price > appliedPriceRange.max) return false
      if (inStockOnly && !product.inStock) return false
      if (featuredOnly && !product.featured) return false
      if (selectedRatingFloor !== null && product.rating < selectedRatingFloor) return false
      return true
    })
  }, [source, searchTerm, selectedCategories, selectedRatings, appliedPriceRange.min, appliedPriceRange.max, inStockOnly, featuredOnly])

  const sortedProducts = useMemo(() => {
    const copiedProducts = [...filteredProducts]
    switch (sortBy) {
      case 'price-low-to-high': return copiedProducts.sort((a, b) => a.price - b.price)
      case 'price-high-to-low': return copiedProducts.sort((a, b) => b.price - a.price)
      case 'top-rated': return copiedProducts.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
      case 'latest': return copiedProducts.sort((a, b) => b.id - a.id)
      default: return copiedProducts.sort((a, b) => b.reviews - a.reviews)
    }
  }, [filteredProducts, sortBy])

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / itemsPerPage))
  const safeCurrentPage = Math.min(currentPage, totalPages)

  const paginatedProducts = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * itemsPerPage
    return sortedProducts.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedProducts, safeCurrentPage, itemsPerPage])

  const showingFrom = sortedProducts.length === 0 ? 0 : (safeCurrentPage - 1) * itemsPerPage + 1
  const showingTo = Math.min(sortedProducts.length, safeCurrentPage * itemsPerPage)

  const { heading, subHeading } = getTitleParts(titleFromQuery)
  const activeCategory = sourceCategoryLabel[source] ?? sourceCategoryLabel.all

  const handleCategoryToggle = (category: string) => {
    setCurrentPage(1)
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const handleRatingToggle = (rating: number) => {
    setCurrentPage(1)
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    )
  }

  const applyPriceRange = () => {
    setCurrentPage(1)
    setAppliedPriceRange({ min: parsePrice(minPriceInput), max: parsePrice(maxPriceInput) })
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedRatings([])
    setMinPriceInput('0')
    setMaxPriceInput('10000')
    setAppliedPriceRange({ min: 0, max: 10000 })
    setInStockOnly(false)
    setFeaturedOnly(false)
    setSortBy('popular')
    setItemsPerPage(9)
    setCurrentPage(1)
  }

  const filterProps = {
    categories: categoryOptions,
    selectedCategories,
    ratingOptions,
    selectedRatings,
    minPriceInput,
    maxPriceInput,
    inStockOnly,
    featuredOnly,
    onSelectAllCategories: () => { setSelectedCategories([]); setCurrentPage(1) },
    onToggleCategory: handleCategoryToggle,
    onToggleRating: handleRatingToggle,
    onMinPriceChange: setMinPriceInput,
    onMaxPriceChange: setMaxPriceInput,
    onApplyPriceRange: applyPriceRange,
    onInStockChange: (v: boolean) => { setInStockOnly(v); setCurrentPage(1) },
    onFeaturedChange: (v: boolean) => { setFeaturedOnly(v); setCurrentPage(1) },
    onClearAll: clearAllFilters,
  }

  return (
    <div className="bg-white px-4 py-8 md:py-10">
      <div className="container mx-auto">

        {/* Top Bar */}
        <section className="mb-7 grid grid-cols-1 gap-3 border-b border-slate-200 pb-4 md:grid-cols-3 md:items-center">

          {/* Left side */}
          <div className="flex items-center gap-3 md:justify-self-start">
            <button
              type="button"
              onClick={() => router.back()}
              className="grid p-2 cursor-pointer place-items-center rounded-full border border-slate-300 text-slate-500 transition hover:bg-slate-100 shrink-0"
            >
              <ChevronLeft className="size-4.5 text-title" />
            </button>

            <h2 className="text-lg font-bold text-title shrink-0">{activeCategory}</h2>
          </div>

          {/* Middle side */}
          <div className="flex items-center justify-start gap-1.5 text-base text-description md:justify-center">
            <LayoutGrid className="size-5 shrink-0" />
            <p className="whitespace-nowrap">Showing {showingFrom} - {showingTo} of {sortedProducts.length} items</p>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 text-base text-description md:justify-self-end">
            <label htmlFor="to-show" className="font-semibold hidden sm:block whitespace-nowrap">
              To Show:
            </label>

            <select
              id="to-show"
              value={itemsPerPage}
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1) }}
              className="h-9 w-14 rounded-md border border-slate-200 bg-slate-50 px-2 text-sm text-title outline-none"
            >
              <option value={9}>9</option>
              <option value={12}>12</option>
              <option value={15}>15</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1) }}
              className="h-9 w-36 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-title outline-none"
            >
              <option value="popular">Position</option>
              <option value="latest">Latest</option>
              <option value="price-low-to-high">Price: Low to High</option>
              <option value="price-high-to-low">Price: High to Low</option>
              <option value="top-rated">Top Rated</option>
            </select>

            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className="md:hidden inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-slate-50 px-3 h-9 text-xs font-semibold text-title"
            >
              <LayoutGrid className="size-3.5" />
              Filters
            </button>
          </div>
        </section>

        {/* Mobile Filter Drawer */}
        {filterOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setFilterOpen(false)}
            />
            {/* Drawer */}
            <div className="relative ml-auto h-full w-4/5 max-w-xs overflow-y-auto bg-white p-5 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-bold text-title">Filters</span>
                <button
                  type="button"
                  onClick={() => setFilterOpen(false)}
                  className="text-slate-500 hover:text-title text-lg font-bold"
                >
                  ✕
                </button>
              </div>
              <Filter {...filterProps} />
            </div>
          </div>
        )}

        {/* Main Grid */}
        <section className="grid grid-cols-1 gap-8 md:grid-cols-[255px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
          {/* Desktop Filter — hidden on mobile */}
          <div className="hidden md:block max-w-sm">
            <Filter {...filterProps} />
          </div>

          <div className="flex-1 min-w-0">
            <Products
              heading={heading}
              subHeading={subHeading}
              products={paginatedProducts}
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(Math.min(Math.max(page, 1), totalPages))}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

export default AllProductsPage