'use client'
import Image from 'next/image'
import { useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { checkoutProducts, orderSummary, youMayAlsoLike } from '../checkout-data'
import { Button } from '@/components/ui/button'


const formatMoney = (value: number) => `$ ${value.toFixed(2)}`

const CartPage = () => {
    const router = useRouter()
    const suggestionsRef = useRef<HTMLDivElement>(null)
    const [cartItems, setCartItems] = useState(() =>
        checkoutProducts.map((product) => ({ ...product, quantity: 1 }))
    )

    const itemCount = useMemo(
        () => cartItems.reduce((total, item) => total + item.quantity, 0),
        [cartItems]
    )

    const handleQuantity = (id: string, type: 'inc' | 'dec') => {
        setCartItems((prev) =>
            prev.map((item) => {
                if (item.id !== id) {
                    return item
                }

                const nextQty = type === 'inc' ? item.quantity + 1 : item.quantity - 1
                return {
                    ...item,
                    quantity: Math.max(1, nextQty)
                }
            })
        )
    }

    const removeItem = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id))
    }

    const scrollRecommendations = () => {
        suggestionsRef.current?.scrollBy({ left: 320, behavior: 'smooth' })
    }

    const scrollRecommendationsLeft = () => {
        suggestionsRef.current?.scrollBy({ left: -320, behavior: 'smooth' })
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
                        <span className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-slate-300 bg-white transition hover:bg-slate-50">
                            <ChevronLeft className="h-5 w-5" />
                        </span>
                        <span className="text-xl font-semibold">Back</span>
                    </button>

                    <h1 className="mt-6 text-4xl font-bold text-title">My Cart</h1>
                    <p className="mt-2 text-2xl text-description">Let&apos;s create your account</p>

                    <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1fr)_320px]">
                        <div>
                            <p className="mb-4 text-xl font-semibold text-title">
                                Number of Items: <span className="text-description">{itemCount}</span>
                            </p>

                            {cartItems.length > 0 ? (
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-3">
                                            <div className="flex items-start gap-3 sm:hidden">
                                                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-slate-200">
                                                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="line-clamp-1 text-sm font-semibold text-title">{item.name}-{item.fit}</p>
                                                    <p className="text-xs text-description">
                                                        Color: <span className="font-medium text-title">{item.color}</span>
                                                    </p>
                                                    <p className="mt-1 text-sm font-medium text-description">{formatMoney(item.price)}</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-slate-400 transition hover:text-red-500"
                                                    aria-label={`Remove ${item.name}`}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="mt-3 flex items-center justify-between sm:hidden">
                                                <div className="inline-flex items-center rounded-md border border-slate-300 bg-white">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleQuantity(item.id, 'dec')}
                                                        className="px-2 py-2 text-slate-600 transition hover:bg-slate-100"
                                                        aria-label={`Decrease ${item.name} quantity`}
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    <span className="min-w-10 px-2 text-center text-sm font-medium">{item.quantity}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleQuantity(item.id, 'inc')}
                                                        className="px-2 py-2 text-slate-600 transition hover:bg-slate-100"
                                                        aria-label={`Increase ${item.name} quantity`}
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <p className="text-sm font-semibold text-title">{formatMoney(item.price * item.quantity)}</p>
                                            </div>

                                            <div className="hidden sm:grid sm:grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] sm:items-center sm:gap-4">
                                                <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-slate-200">
                                                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-title">{item.name}-{item.fit}</p>
                                                    <p className="text-sm text-description">
                                                        Color: <span className="font-medium text-title">{item.color}</span>
                                                    </p>
                                                </div>

                                                <p className="text-right font-medium text-description sm:text-left">
                                                    {formatMoney(item.price)}
                                                </p>

                                                <div className="inline-flex items-center rounded-md border border-slate-300 bg-white">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleQuantity(item.id, 'dec')}
                                                        className="px-2 py-2 text-slate-600 cursor-pointer transition hover:bg-slate-100"
                                                        aria-label={`Decrease ${item.name} quantity`}
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    <span className="min-w-10 px-2 text-center text-sm font-medium">{item.quantity}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleQuantity(item.id, 'inc')}
                                                        className="px-2 py-2 cursor-pointer text-slate-600 transition hover:bg-slate-100"
                                                        aria-label={`Increase ${item.name} quantity`}
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between gap-3 sm:justify-end">
                                                    <p className="text-sm font-medium text-title">{formatMoney(item.price * item.quantity)}</p>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-slate-400 transition hover:text-red-500 cursor-pointer"
                                                        aria-label={`Remove ${item.name}`}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-8 text-center">
                                    <p className="text-lg font-semibold text-title">Your cart is empty.</p>
                                    <button
                                        type="button"
                                        onClick={() => router.push('/all-products')}
                                        className="mt-3 text-sm font-semibold text-main underline"
                                    >
                                        Continue shopping
                                    </button>
                                </div>
                            )}

                            <div className="mt-10">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-description">
                                        You Might Also Like
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={scrollRecommendationsLeft}
                                            className="inline-flex h-8 w-8 items-center justify-center rounded border border-slate-300 bg-white text-slate-500 transition hover:text-title"
                                            aria-label="Scroll recommended products left"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={scrollRecommendations}
                                            className="inline-flex h-8 w-8 items-center justify-center rounded border border-slate-300 bg-white text-slate-500 transition hover:text-title"
                                            aria-label="Scroll recommended products right"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                <div
                                    ref={suggestionsRef}
                                    className="flex flex-col gap-3 sm:flex-row sm:overflow-x-auto sm:pb-2 sm:[scrollbar-width:none] sm:[&::-webkit-scrollbar]:hidden"
                                >
                                    {youMayAlsoLike.map((product) => (
                                        <article
                                            key={product.id}
                                            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-2 sm:min-w-52 sm:flex-col sm:items-stretch"
                                        >
                                            {/* Image */}
                                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-slate-100 sm:h-28 sm:w-full">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 640px) 80px, 180px"
                                                />
                                            </div>

                                            {/* Details */}
                                            <div className="flex flex-1 flex-col justify-between gap-1 sm:mt-2">
                                                <h3 className="line-clamp-2 text-[11px] font-semibold uppercase text-title sm:line-clamp-1">
                                                    {product.name}
                                                </h3>

                                                <div className="flex items-center gap-1 text-xs flex-wrap">
                                                    <span className="font-bold text-heading">
                                                        {formatMoney(product.currentPrice)}
                                                    </span>
                                                    <span className="text-slate-400 line-through">
                                                        {formatMoney(product.oldPrice)}
                                                    </span>
                                                    <span className="rounded bg-heading px-1 py-0.5 text-[10px] text-white">
                                                        -{product.discount}
                                                    </span>
                                                </div>

                                                <button
                                                    type="button"
                                                    className="mt-1 inline-flex w-full items-center justify-center rounded border border-slate-300 px-2 py-1.5 text-[11px] font-semibold text-title transition hover:border-slate-400 cursor-pointer"
                                                >
                                                    Add to cart
                                                </button>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </div>



                        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-semibold text-title">Order Summary</h2>
                            <div className="mt-4 space-y-2 text-sm text-description">
                                <div className="flex justify-between">
                                    <span>Price</span>
                                    <span className="font-medium text-title">{formatMoney(orderSummary.price)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="font-medium text-title">{formatMoney(orderSummary.shipping)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span className="font-medium text-title">{formatMoney(orderSummary.tax)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Discount price</span>
                                    <span className="font-medium text-title">{formatMoney(orderSummary.discount)}</span>
                                </div>
                                <label className="mt-2 flex items-center gap-2 rounded-md bg-slate-50 p-2 text-xs">
                                    <input type="checkbox" className="h-3.5 w-3.5 accent-main" defaultChecked />
                                    <span>Pack in a Gift Box</span>
                                    <span className="ml-auto font-medium text-title">{formatMoney(orderSummary.giftBox)}</span>
                                </label>
                            </div>

                            <div className="mt-4 border-t border-slate-200 pt-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-description">Total Price</span>
                                    <span className="text-xl font-bold text-title">{formatMoney(orderSummary.total)}</span>
                                </div>
                                <Button
                                    type="button"
                                    onClick={() => router.push('/customer-information')}
                                    disabled={cartItems.length === 0}
                                    className='w-full mt-2'
                                >
                                    <ShoppingBag className="h-4 w-4" />
                                    SHOP NOW
                                </Button>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CartPage
