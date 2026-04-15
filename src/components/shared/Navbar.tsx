'use client'
import React, { useRef, useState } from 'react'
import { ShoppingCart, Heart, Menu, X, Search, Camera } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const Navbar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchImage, setSearchImage] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSearchClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSearchImage(file)
    }
  }

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const term = searchValue.trim()

    if (!term) {
      router.push('/all-products?source=all&title=All%20Product%20are%20Here!%20Grab%20It%20Fast')
      return
    }

    router.push(
      `/all-products?source=all&search=${encodeURIComponent(term)}&title=${encodeURIComponent('Search Results are Here! Grab It Fast')}`
    )
    setIsMobileMenuOpen(false)
    setIsSearchOpen(false)
  }

  const isActive = (path: string) => pathname === path

  return (
    <>
      <div className="sticky top-0 z-50">
        {/* Main Navbar */}
        <nav className="w-full bg-main text-white py-3 md:py-4 px-4 shadow-lg">
          <div className="container mx-auto">

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between gap-6">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 min-w-fit">
              <div className="bg-heading text-white p-2 rounded-lg font-bold">
                <ShoppingCart />
              </div>
              <span className="text-2xl font-bold">Wobuy</span>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="flex flex-1 max-w-2xl overflow-hidden rounded-xl border border-button-start bg-white">
              <input
                type="text"
                placeholder="Search products..."
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                className="min-w-0 flex-1 px-4 py-2.5 text-sm text-title placeholder:text-gray-400 focus:outline-none"
              />

              <button
                type="button"
                onClick={handleImageSearchClick}
                className="flex shrink-0 items-center gap-1.5 border-l border-gray-200 px-4 text-sm text-title hover:text-main transition"
                aria-label="Image Search"
                title={searchImage ? `Selected: ${searchImage.name}` : 'Image Search'}
              >
                <Camera size={14} />
                Image Search
              </button>

              <button type="submit" className="flex shrink-0 items-center gap-1.5 bg-button-start px-6 text-sm font-medium text-white hover:bg-button-end transition">
                <Search size={18} />
                Search
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSearchChange}
                className="hidden"
              />
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-4 shrink-0 whitespace-nowrap">
              <Link
                href="/"
                className={`transition font-medium text-sm ${isActive('/') ? 'text-heading' : 'hover:text-gray-200'}`}
              >
                Home
              </Link>
              <Link
                href="/all-products?source=all&title=All%20Product%20are%20Here!%20Grab%20It%20Fast"
                className={`transition font-medium text-sm ${isActive('/all-products') ? 'text-heading' : 'hover:text-gray-200'}`}
              >
                All Products
              </Link>

              <Link
                href="/wishlist"
                className={`p-2 rounded-lg transition ${isActive('/wishlist') ? 'bg-white/25 text-heading' : 'hover:bg-white/20'}`}
              >
                <Heart size={20} />
              </Link>

              <Link
                href={"/cart"}
                className={`relative p-2 rounded-lg transition ${isActive('/cart') ? 'bg-white/25 text-heading' : 'hover:bg-white/20'}`}
              >
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-heading text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>

              <Link href="/auth/customer-sign-in" className="bg-white text-main hover:bg-gray-100 font-semibold px-6 py-2.5 rounded-lg text-sm">
                Login
              </Link>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex items-center justify-between gap-3">

            {/* Mobile Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="bg-heading text-white p-1.5 rounded-lg font-bold">
                <ShoppingCart size={18} />
              </div>
              <span className="text-lg font-bold">Wobuy</span>
            </Link>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 shrink-0">

              

              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <Search size={18} />
              </button>

              <Link href="/wishlist" className="p-2 hover:bg-white/20 rounded-lg transition">
                <Heart size={18} />
              </Link>

              <Link href="/cart" className="relative p-2 hover:bg-white/20 rounded-lg transition">
                <ShoppingCart size={18} />
                <span className="absolute -top-1 -right-1 bg-heading text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  0
                </span>
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <form onSubmit={handleSearchSubmit} className="md:hidden mt-3 relative">
              <input
                type="text"
                placeholder="Search..."
                autoFocus
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                className="w-full px-3 py-2.5 pl-4 pr-10 rounded-lg bg-white/10 border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70">
                <Search size={16} />
              </button>
            </form>
          )}

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-3 bg-main rounded-lg border border-white/20 p-4 space-y-3">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 px-3 rounded-lg transition font-medium ${isActive('/') ? ' text-heading' : 'hover:bg-white/20'}`}
              >
                Home
              </Link>
              <Link
                href="/all-products?source=all&title=All%20Product%20are%20Here!%20Grab%20It%20Fast"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 px-3 rounded-lg transition font-medium ${isActive('/all-products') ? 'text-heading' : 'hover:bg-white/20'}`}
              >
                All Products
              </Link>
              <Link href={'/auth/customer-sign-in'} className="w-full px-10 bg-white text-main hover:bg-gray-100 font-semibold py-2.5 rounded-lg transition text-sm">
                Login
              </Link>
            </div>
          )}
          </div>
        </nav>

        {/* Secondary Navigation */}
        <div className="w-full bg-white text-description text-xs md:text-sm py-2 px-4 border-b border-gray-200">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <Link href="/customer-support" className={`transition ${isActive('/customer-support') ? 'text-heading font-semibold' : 'hover:text-main'}`}>
                Customer Support
              </Link>
            </div>
            <div className="flex gap-4 md:gap-6">
              <Link href="/become-a-wholesaler" className={`transition ${isActive('/become-a-wholesaler') ? 'text-heading font-semibold underline' : 'text-main hover:underline'}`}>
                Become a Wholesaler
              </Link>
              <Link href="/become-a-reseller" className={`transition ${isActive('/become-a-reseller') ? 'text-heading font-semibold underline' : 'text-main hover:underline'}`}>
                Become a Reseller
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar