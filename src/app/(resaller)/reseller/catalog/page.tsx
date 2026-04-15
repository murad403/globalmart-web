"use client"
import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, Filter, Search } from 'lucide-react'
import SellerPageHeader from '@/components/shared/SellerPageHeader'
import Pagination from '@/components/shared/Pagination'
import CatalogCard from './CatalogCard'
import product1 from '@/assets/home/product1.png'
import product2 from '@/assets/home/product2.png'
import product3 from '@/assets/home/product3.png'
import hero2 from '@/assets/home/hero2.png'

const products = [
    { id: 1, name: 'Ultra HD Camera', wholesalePrice: 359, stock: 45, moq: 5, category: 'Electronics', image: product1 },
    { id: 2, name: 'Ultra HD Camera', wholesalePrice: 369, stock: 45, moq: 5, category: 'Electronics', image: product2 },
    { id: 3, name: 'Ultra HD Camera', wholesalePrice: 359, stock: 45, moq: 5, category: 'Photography', image: hero2 },
    { id: 4, name: 'Ultra HD Camera', wholesalePrice: 349, stock: 45, moq: 5, category: 'Electronics', image: product3 },
    { id: 5, name: 'Smart Light Camera', wholesalePrice: 289, stock: 22, moq: 3, category: 'Electronics', image: product1 },
    { id: 6, name: '4K Action Camera', wholesalePrice: 399, stock: 31, moq: 8, category: 'Photography', image: product2 },
    { id: 7, name: 'Lens Bundle Pack', wholesalePrice: 219, stock: 20, moq: 10, category: 'Photography', image: hero2 },
    { id: 8, name: 'Pocket Cam Mini', wholesalePrice: 199, stock: 53, moq: 4, category: 'Accessories', image: product3 }
]

const Page = () => {
    const [searchText, setSearchText] = useState('')
    const [activeCategory, setActiveCategory] = useState('All Categories')
    const [currentPage, setCurrentPage] = useState(1)
    const [toastMessage, setToastMessage] = useState('')

    const pageSize = 6

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase())
            const matchesCategory = activeCategory === 'All Categories' || product.category === activeCategory
            return matchesSearch && matchesCategory
        })
    }, [activeCategory, searchText])

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
    const startIndex = (currentPage - 1) * pageSize
    const visibleProducts = filteredProducts.slice(startIndex, startIndex + pageSize)

    useEffect(() => {
        if (!toastMessage) return

        const timer = setTimeout(() => setToastMessage(''), 1800)
        return () => clearTimeout(timer)
    }, [toastMessage])

    const handleCopyToStore = (productName: string) => {
        setToastMessage(`${productName} copied to store successfully.`)
    }

    return (
        <div className="space-y-5">
            <SellerPageHeader title="Catalog" description="Discover products to add to your store" />

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="relative w-full md:max-w-xl">
                    <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        value={searchText}
                        onChange={(event) => {
                            setSearchText(event.target.value)
                            setCurrentPage(1)
                        }}
                        placeholder="Search wholesaler catalog..."
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-title outline-none focus:border-main"
                    />
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <button type="button" className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-title sm:w-auto">
                        <Filter className="h-3.5 w-3.5" />
                        Filters
                    </button>

                    <div className="relative w-full sm:w-auto">
                        <select
                            value={activeCategory}
                            onChange={(event) => {
                                setActiveCategory(event.target.value)
                                setCurrentPage(1)
                            }}
                            className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-11 text-sm text-title outline-none sm:min-w-40"
                        >
                            <option>All Categories</option>
                            <option>Electronics</option>
                            <option>Photography</option>
                            <option>Accessories</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    </div>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {visibleProducts.map((product) => (
                    <CatalogCard
                        key={product.id}
                        image={product.image}
                        name={product.name}
                        wholesalePrice={product.wholesalePrice}
                        stock={product.stock}
                        moq={product.moq}
                        onCopyToStore={() => handleCopyToStore(product.name)}
                    />
                ))}
            </div>

            {visibleProducts.length === 0 ? (
                <p className="rounded-lg border border-slate-200 bg-white px-4 py-5 text-center text-sm text-description">No catalog products found.</p>
            ) : null}

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} className="mt-2" />

            {toastMessage ? (
                <div className="fixed right-4 bottom-4 z-50 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg">
                    {toastMessage}
                </div>
            ) : null}
        </div>
    )
}

export default Page
