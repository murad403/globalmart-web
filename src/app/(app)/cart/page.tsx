'use client'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Heart, Trash2, X } from 'lucide-react'
import { checkoutProducts, orderSummary } from '../checkout-data'
import VoucherPromoCard from '@/components/shared/VoucherPromoCard'
import Link from 'next/link'


const formatMoney = (value: number) => `$ ${value.toFixed(2)}`

const CartPage = () => {
    const router = useRouter()
    const [cartItems, setCartItems] = useState(() =>
        checkoutProducts.map((product) => ({ ...product, quantity: 1 }))
    )

    const itemCount = useMemo(
        () => cartItems.reduce((total, item) => total + item.quantity, 0),
        [cartItems]
    )

    const handleQuantity = (id: string, quantity: number) => {
        setCartItems((prev) =>
            prev.map((item) => {
                if (item.id !== id) {
                    return item
                }
                return {
                    ...item,
                    quantity: Math.max(1, quantity)
                }
            })
        )
    }

    const removeItem = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id))
    }

    const removeAllItems = () => {
        setCartItems([])
    }

    const totalProduct = useMemo(
        () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        [cartItems]
    )
    const taxAmount = orderSummary.tax
    const voucherAmount = 35
    const totalPayment = Math.max(0, totalProduct + taxAmount - voucherAmount)

    return (
        <section className="w-full py-8 md:py-10 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="">
                    <div className="flex items-center gap-2 text-xs text-description">
                        <Link href={"/"}>Home</Link>
                        <span>›</span>
                        <span className="font-medium text-title">Cart</span>
                    </div>

                    <h1 className="mt-6 text-4xl font-bold text-title">My Cart</h1>
                    <p className="mt-2 text-2xl text-description">Let&apos;s create your account</p>

                    <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1fr)_370px]">
                        <div>
                            {cartItems.length > 0 ? (
                                <>
                                    <div className="space-y-3 border border-slate-200 p-5 rounded-xl">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="border-b pb-2 border-slate-200 bg-white">
                                                <div className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-start gap-3 sm:grid-cols-[68px_minmax(0,1fr)_auto_auto]">
                                                    <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-slate-200">
                                                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="68px" />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="line-clamp-1 text-sm font-semibold text-title">Great product name goes here</p>
                                                        <p className="text-[13px] text-description">Color: {item.color}</p>
                                                        <p className="text-[13px] text-description">Size: {item.fit}</p>
                                                        <p className="text-[13px] text-description">Price: {formatMoney(item.price)} / per item</p>
                                                    </div>

                                                    <div className="space-y-1 text-right">
                                                        <p className="text-xs font-semibold text-title">{formatMoney(item.price * item.quantity)}</p>
                                                        <div className='flex items-center gap-2'>
                                                            <select
                                                                value={item.quantity}
                                                                onChange={(e) => handleQuantity(item.id, Number(e.target.value))}
                                                                className="h-7 rounded border border-slate-300 bg-white px-2 text-xs text-title outline-none"
                                                                aria-label={`Select quantity for ${item.name}`}
                                                            >
                                                                {Array.from({ length: 10 }, (_, index) => (
                                                                    <option key={index + 1} value={index + 1}>Qty: {index + 1}</option>
                                                                ))}
                                                            </select>
                                                            <button
                                                                type="button"
                                                                className="text-slate-400 transition hover:text-red-500 bg-[#EDF0F2] p-2 rounded-lg cursor-pointer"
                                                                aria-label={`Remove ${item.name}`}
                                                            >
                                                                <Heart className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeItem(item.id)}
                                                                className="text-slate-400 transition hover:text-red-500 bg-[#EDF0F2] p-2 rounded-lg cursor-pointer"
                                                                aria-label={`Remove ${item.name}`}
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={removeAllItems}
                                        className="mt-3 text-xs font-medium text-description underline"
                                    >
                                        Remove all from cart
                                    </button>
                                </>
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
                        </div>
                        <VoucherPromoCard
                            totalProduct={totalProduct}
                            tax={taxAmount}
                            voucher={voucherAmount}
                            totalPayment={totalPayment}
                            actionLabel="Continue"
                            onAction={() => router.push('/customer-information')}
                            disabled={cartItems.length === 0}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CartPage
