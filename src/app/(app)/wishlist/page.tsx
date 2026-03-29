'use client'

import Image from 'next/image'
import { ArrowLeft, ShoppingCart, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { initialWishlistItems } from '../checkout-data'

const formatMoney = (value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const WishlistPage = () => {
  const router = useRouter()
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)

  const handleRemove = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <section className="w-full py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-3 text-title"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white transition hover:bg-slate-50">
              <ArrowLeft className="h-5 w-5" />
            </span>
            <span className="text-xl font-semibold">Back</span>
          </button>

          <h1 className="mt-6 text-4xl font-bold text-title">Wishlist</h1>

          <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="min-w-215 w-full text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.08em] text-description">
                <tr>
                  <th className="px-4 py-3 font-semibold">Products</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Stock Status</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                  <th className="px-4 py-3 font-semibold text-right">Remove</th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-md border border-slate-200">
                          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                        </div>
                        <div className="max-w-90">
                          <p className="text-sm font-medium text-title">{item.name}</p>
                          <p className="line-clamp-2 text-xs text-description">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-title">
                      <div className="flex items-center gap-2">
                        {item.oldPrice ? (
                          <span className="text-xs text-slate-400 line-through">{formatMoney(item.oldPrice)}</span>
                        ) : null}
                        <span>{formatMoney(item.price)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                      <span className={item.inStock ? 'text-green-600' : 'text-red-500'}>
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => item.inStock && router.push('/cart')}
                        disabled={!item.inStock}
                        className="inline-flex items-center gap-2 rounded-md bg-heading px-4 py-2 text-xs font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:bg-slate-300"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        ADD TO CART
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleRemove(item.id)}
                        className="text-slate-400 transition hover:text-red-500"
                        aria-label={`Remove ${item.name} from wishlist`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {wishlistItems.length === 0 && (
              <div className="px-5 py-10 text-center">
                <p className="text-lg font-semibold text-title">Your wishlist is empty.</p>
                <button
                  type="button"
                  onClick={() => router.push('/all-products')}
                  className="mt-3 text-sm font-semibold text-main underline"
                >
                  Browse products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WishlistPage
