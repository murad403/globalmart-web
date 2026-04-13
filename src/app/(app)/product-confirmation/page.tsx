'use client'

import { Heart, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { checkoutProducts, orderSummary, paymentMethods, shippingMethods, type CheckoutProduct, type PaymentMethod, type ShippingMethod } from '../checkout-data'
import VoucherPromoCard from '@/components/shared/VoucherPromoCard'
import Image from 'next/image'
import Link from 'next/link'

const formatMoney = (value: number) => `$ ${value.toFixed(2)}`

const ProductConfirmationPage = () => {
    const router = useRouter()
    const [cartItems, setCartItems] = useState<Array<CheckoutProduct & { quantity: number }>>(() =>
        checkoutProducts.map((product) => ({ ...product, quantity: 1 }))
    )
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0]?.id ?? '')
    const [selectedShippingMethod, setSelectedShippingMethod] = useState(shippingMethods[0]?.id ?? '')

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
        <section className="w-full py-8 md:py-10">
            <div className="container mx-auto px-4">
                <div>
                    <div className="flex items-center gap-2 text-xs text-description">
                        <Link href={"/"}>Home</Link>
                        <span>›</span>
                        <Link href={"/cart"}>Cart</Link>
                        <span>›</span>
                        <Link href={"/customer-information"}>Customer Info</Link>
                        <span>›</span>
                        <span className="font-medium text-title">Product Confirmation</span>
                    </div>

                    <h1 className="mt-6 text-4xl font-bold text-title">Product Confirmation</h1>
                    <p className="mt-2 text-2xl text-description">Let&apos;s create your account</p>

                    <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1fr)_320px]">
                        <div className="space-y-6">
                            <div className="grid gap-6 lg:grid-cols-2">
                                {/* Payment Methods Section */}
                                <div className="rounded-xl border border-slate-200 bg-white p-6">
                                    <h3 className="text-lg font-semibold text-title">Payment</h3>
                                    <p className="mt-1 text-xs text-description">Please choose a payment method</p>

                                    <div className="mt-6 space-y-3">
                                        {paymentMethods.slice(0, 3).map((method: PaymentMethod) => (
                                            <label
                                                key={method.id}
                                                className="flex cursor-pointer items-center gap-4 rounded-lg bg-[#F8FAFE] px-4 py-3 transition hover:border-slate-300"
                                            >
                                                {/* Logo on left */}
                                                <div className="h-8 w-12 shrink-0 flex items-center justify-center">
                                                    <Image
                                                        src={method.logo}
                                                        alt={method.title}
                                                        className="h-full w-full object-contain"
                                                        quality={100}
                                                    />
                                                </div>

                                                {/* Title and recommendation in middle */}
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-medium text-title">{method.title}</span>
                                                        {method.recommendation && (
                                                            <span className="inline-block rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">
                                                                Recomendation
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Radio button on right */}
                                                <input
                                                    type="radio"
                                                    value={method.id}
                                                    checked={selectedPaymentMethod === method.id}
                                                    onChange={() => setSelectedPaymentMethod(method.id)}
                                                    className="h-5 w-5 accent-orange-500 shrink-0"
                                                />
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Shipping Methods Section */}
                                <div className=" bg-white">
                                    <h3 className="text-lg font-semibold text-title">Shipping</h3>
                                    <p className="mt-1 text-xs text-description">Please choose a shipping company based on your region</p>

                                    <div className="mt-6 space-y-3">
                                        {shippingMethods.map((method: ShippingMethod) => (
                                            <label
                                                key={method.id}
                                                className="flex cursor-pointer items-start justify-between rounded-lg border bg-[#F5F5F5] border-slate-200 px-4 py-3 transition hover:border-slate-300"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <input
                                                        type="radio"
                                                        value={method.id}
                                                        checked={selectedShippingMethod === method.id}
                                                        onChange={() => setSelectedShippingMethod(method.id)}
                                                        className="mt-1 h-4 w-4 accent-blue-600"
                                                    />
                                                    <div className="flex-1">
                                                        <p className="text-sm font-semibold text-title">{method.title}</p>
                                                        <p className="mt-1 text-xs text-description">Delivery time: {method.deliveryTime}</p>
                                                        <p className="text-xs text-description">
                                                            Shipping cost: {typeof method.shippingCost === 'string' ? method.shippingCost : `₹${method.shippingCost}`}
                                                        </p>
                                                        <p className={`text-xs font-medium ${method.insurance === 'Available' ? 'text-emerald-600' : 'text-orange-500'}`}>
                                                            Insurance: {method.insurance}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="px-4 py-3 shrink-0 flex items-center justify-center bg-white rounded">
                                                    <Image src={method.logo} width={50} height={70} alt='method' />
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

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
                        </div>

                        <VoucherPromoCard
                            totalProduct={totalProduct}
                            tax={taxAmount}
                            voucher={voucherAmount}
                            totalPayment={totalPayment}
                            actionLabel="Continue"
                            onAction={() => router.push('/product-confirmation-success')}
                            disabled={cartItems.length === 0}
                            className="lg:sticky lg:top-24"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductConfirmationPage
