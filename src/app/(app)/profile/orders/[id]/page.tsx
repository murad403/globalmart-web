"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, CircleAlert, Download, LocateFixed, MapPin, Package, ReceiptText, RefreshCcw, RotateCcw, Truck } from 'lucide-react'
import { notFound, useParams, useRouter } from 'next/navigation'
import { profileOrders } from '../../orders-data'
import CancelOrderModal from './CancelOrderModal'

const badgeClass: Record<string, string> = {
    Delivered: 'bg-emerald-100 text-emerald-700',
    Shipped: 'bg-violet-100 text-violet-700',
    Processing: 'bg-blue-100 text-blue-700',
    Pending: 'bg-yellow-100 text-yellow-700',
    Canceled: 'bg-red-100 text-red-700'
}

type ToastVariant = 'success' | 'info'

type ToastState = {
    message: string
    variant: ToastVariant
}

const escapePdfText = (value: string) => value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')

const buildInvoicePdf = (order: (typeof profileOrders)[number]) => {
    const lines = [
        'GlobalMart Invoice',
        `Order #: ${order.id}`,
        `Date: ${order.date}`,
        `Customer: ${order.customerName}`,
        `Shipping: ${order.shipping}`,
        `Payment: ${order.paymentMethod}`,
    ]

    const productLines = order.products.flatMap((product) => [
        `Product: ${product.name}`,
        `Qty: ${product.qty} | Size: ${product.size} | Color: ${product.color}`,
        `Price: $${product.price.toFixed(2)}`,
        ''
    ])

    const summaryLines = [
        `Subtotal: $${order.products.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`,
        `Shipping: $29.99`,
        `Tax: $20.00`,
        `Total: $${order.total.toFixed(2)}`
    ]

    const contentLines = [...lines, ...productLines, ...summaryLines].map((line, index) => {
        const y = 760 - index * 20
        return line ? `BT /F1 12 Tf 72 ${y} Td (${escapePdfText(line)}) Tj ET` : ''
    })

    const contentStream = contentLines.filter(Boolean).join('\n')

    const pdfParts = [
        '%PDF-1.4\n',
        '1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj\n',
        '2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj\n',
        '3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>endobj\n',
        '4 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj\n',
        `5 0 obj<< /Length ${contentStream.length} >>stream\n${contentStream}\nendstream endobj\n`
    ]

    const offsets: number[] = []
    let output = ''
    for (const part of pdfParts) {
        offsets.push(output.length)
        output += part
    }

    const xrefOffset = output.length
    output += `xref\n0 ${pdfParts.length + 1}\n0000000000 65535 f \n`
    for (const offset of offsets) {
        output += `${offset.toString().padStart(10, '0')} 00000 n \n`
    }
    output += `trailer<< /Size ${pdfParts.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`

    return new Blob([output], { type: 'application/pdf' })
}


const OrderDetailsPage = () => {
    const params = useParams<{ id: string | string[] }>()
    const id = Array.isArray(params.id) ? params.id[0] : params.id
    const order = profileOrders.find((item) => item.id === id)
    const router = useRouter();
    const [toast, setToast] = useState<ToastState | null>(null)
    const [cancelModalOpen, setCancelModalOpen] = useState(false)

    const showToast = (message: string, variant: ToastVariant = 'success') => {
        setToast({ message, variant })
        window.setTimeout(() => setToast(null), 2200)
    }

    const handleDownloadInvoice = () => {
        if (!order) {
            return
        }

        const blob = buildInvoicePdf(order)
        const url = URL.createObjectURL(blob)
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.download = `invoice-${order.id}.pdf`
        document.body.appendChild(anchor)
        anchor.click()
        anchor.remove()
        URL.revokeObjectURL(url)
        showToast('Invoice PDF downloaded successfully')
    }

    const handleReturnProduct = () => {
        showToast('Return request sent successfully')
    }

    const handleReorder = () => {
        showToast('Reorder placed successfully')
    }

    if (!order) {
        notFound()
    }

    const productTotal = order.products.reduce((sum, item) => sum + item.price, 0)
    const shippingAmount = order.status === 'Canceled' ? 29.99 : 29.99
    const taxAmount = order.status === 'Canceled' ? 0 : 20

    return (
        <div>
            {toast && (
                <div className="fixed right-4 top-4 z-50 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
                    <p className={`text-sm font-semibold ${toast.variant === 'success' ? 'text-emerald-600' : 'text-main'}`}>
                        {toast.message}
                    </p>
                </div>
            )}

            <Link href="/profile/orders" className="inline-flex items-center gap-2 text-sm font-medium text-title hover:text-[#ff6900]">
                <ArrowLeft className="h-4 w-4" />
                Back to Orders
            </Link>

            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <div className='flex items-center gap-2'>
                            <h1 className="text-[38px] font-bold text-title">Order #{order.id}</h1>
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeClass[order.status]}`}>
                                {order.status}
                            </span>
                        </div>

                        <p className="mt-1 text-sm text-description">Placed on {order.date}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">


                        <button
                            type="button"
                            onClick={handleDownloadInvoice}
                            className="inline-flex h-9 items-center gap-1 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-title hover:bg-slate-50"
                        >
                            <Download className="h-3.5 w-3.5" />
                            Download Invoice
                        </button>

                        {order.status !== 'Canceled' && (
                            <>
                                <button
                                    type="button"
                                    onClick={handleReturnProduct}
                                    className="inline-flex h-9 items-center gap-1 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-title hover:bg-slate-50"
                                >
                                    <RotateCcw className="h-3.5 w-3.5" />
                                    Return Product
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReorder}
                                    className="inline-flex h-9 items-center gap-1 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-title hover:bg-slate-50"
                                >
                                    <RefreshCcw className="h-3.5 w-3.5" />
                                    Reorder
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {order.status === 'Canceled' && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                    <div className="flex items-start gap-2">
                        <CircleAlert className="mt-0.5 h-4 w-4" />
                        <div>
                            <p className="text-sm font-semibold">Order Canceled</p>
                            <p className="text-xs">This order was canceled on {order.cancellationDate} by {order.canceledBy}.</p>
                            <p className="text-xs">Reason: {order.cancellationReason}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
                <div className="space-y-4">
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <div className='flex items-center gap-2'>
                            <Package className='size-6'/>
                            <h2 className="text-2xl font-semibold text-title">Products Ordered</h2>
                        </div>

                        <div className="mt-2 divide-y divide-slate-200">
                            {order.products.map((product) => (
                                <div key={`${order.id}-${product.name}`} className="flex items-start justify-between gap-3 py-3">
                                    <div className="flex items-start gap-3">
                                        <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-slate-200">
                                            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="64px" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-title">{product.name}</p>
                                            <p className="text-xs text-description">Size: {product.size}, Color: {product.color}</p>
                                            <p className="text-xs text-description">Quantity: {product.qty}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-semibold text-title">${product.price.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-3 space-y-1 border-t border-slate-200 pt-3 text-sm">
                            <div className="flex items-center justify-between text-description">
                                <span>Subtotal</span>
                                <span>${productTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between text-description">
                                <span>Shipping</span>
                                <span>${shippingAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between text-description">
                                <span>Tax</span>
                                <span>${taxAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between pt-1 text-base font-semibold text-title">
                                <span>Total</span>
                                <span>${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {order.status !== 'Canceled' && (
                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                            <h2 className="flex items-center gap-2 text-2xl font-semibold text-title">
                                <Truck className="h-4 w-4" />
                                Tracking Information
                            </h2>

                            <div className="mt-3 rounded-lg bg-[#f3f8ff] px-3 py-2">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-description">Courier</p>
                                        <p className="text-sm font-semibold text-title">{order.courier}</p>
                                    </div>
                                    <LocateFixed className="h-4 w-4 text-main" />
                                </div>
                            </div>

                            <div className="mt-3 grid gap-2 sm:grid-cols-2">
                                <div>
                                    <p className="text-xs text-description">Tracking ID</p>
                                    <p className="text-sm font-semibold text-main">{order.trackingId}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-description">Estimated Delivery</p>
                                    <p className="text-sm font-semibold text-title">{order.estimatedDelivery}</p>
                                </div>
                            </div>

                            <button onClick={() => router.push("/track-order")} type="button" className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-md border border-slate-200 text-xs font-semibold text-title hover:bg-slate-50 cursor-pointer">
                                Track Order
                            </button>
                        </div>
                    )}

                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <h2 className="flex items-center gap-2 text-2xl font-semibold text-title">
                            <ReceiptText className="h-4 w-4" />
                            Related Transactions
                        </h2>

                        <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-3">
                            <div>
                                <p className="text-xs text-description">TXN-2026-00{order.id}</p>
                                <p className="text-sm font-semibold text-title">Payment • ${order.total.toFixed(2)}</p>
                            </div>
                            <ArrowUpRight className="h-4 w-4 text-main" />
                        </div>
                    </div>

                    {order.status !== 'Canceled' && (
                        <div className="grid gap-3 sm:grid-cols-2">
                            <button
                                type="button"
                                onClick={() => setCancelModalOpen(true)}
                                className="h-11 rounded-xl bg-[#db524d] text-sm font-semibold text-white hover:bg-[#c94742] cursor-pointer"
                            >
                                Cancel Order
                            </button>
                            <button type="button" className="h-11 rounded-xl bg-slate-100 text-sm font-semibold text-title hover:bg-slate-200 cursor-pointer">
                                Keep My Order
                            </button>
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <h3 className="flex items-center gap-2 text-2xl font-semibold text-title">
                            <MapPin className="h-4 w-4" />
                            Shipping Address
                        </h3>
                        <div className="mt-3 text-sm text-description">
                            <p className="font-medium text-title">{order.customerName}</p>
                            <p>{order.addressLine1}</p>
                            <p>{order.addressLine2}</p>
                            <p>United States</p>
                            <div className="mt-2 border-t border-slate-200 pt-2">
                                <p>{order.phone}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <h3 className="flex items-center gap-2 text-2xl font-semibold text-title">
                            <MapPin className="h-4 w-4" />
                            Billing Address
                        </h3>
                        <div className="mt-3 text-sm text-description">
                            <p className="font-medium text-title">{order.customerName}</p>
                            <p>{order.addressLine1}</p>
                            <p>{order.addressLine2}</p>
                            <p>United States</p>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <h3 className="flex items-center gap-2 text-2xl font-semibold text-title">
                            <Package className="h-4 w-4" />
                            Payment Method
                        </h3>
                        <div className="mt-3 flex items-center gap-2 rounded-md bg-slate-50 p-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded bg-main text-xs text-white">💳</span>
                            <span className="text-sm text-title">{order.paymentMethod}</span>
                        </div>
                    </div>

                    {order.status === 'Canceled' && (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                            <h3 className="flex items-center gap-2 text-2xl font-semibold text-[#c8332c]">
                                <CircleAlert className="h-4 w-4" />
                                Cancellation Details
                            </h3>
                            <div className="mt-3 space-y-2 text-xs text-[#c8332c]">
                                <div>
                                    <p className="text-[11px] uppercase">Canceled By</p>
                                    <p className="text-sm font-medium">{order.canceledBy}</p>
                                </div>
                                <div className="border-t border-red-200 pt-2">
                                    <p className="text-[11px] uppercase">Cancellation Date</p>
                                    <p className="text-sm font-medium">{order.cancellationDate}</p>
                                </div>
                                <div className="border-t border-red-200 pt-2">
                                    <p className="text-[11px] uppercase">Reason</p>
                                    <p className="text-sm font-medium">{order.cancellationReason}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <CancelOrderModal
                open={cancelModalOpen}
                onClose={() => setCancelModalOpen(false)}
            />
        </div>
    )
}

export default OrderDetailsPage
