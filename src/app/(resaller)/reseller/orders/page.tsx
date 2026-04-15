"use client"

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { CheckCircle2, Clock3 } from 'lucide-react'
import SellerPageHeader from '@/components/shared/SellerPageHeader'
import product1 from '@/assets/home/product1.png'
import product2 from '@/assets/home/product2.png'
import DeclineOrderModal from './DeclineOrderModal'

type OrderStatus = 'Pending' | 'Accepted' | 'Completed'

type ResellerOrder = {
    id: string
    productName: string
    orderNo: string
    customer: string
    quantity: number
    sellPrice: number
    total: number
    moqUnits: number
    moqCost: number
    potentialProfit: number
    status: OrderStatus
    note?: string
    image: typeof product1
}

const orderItems: ResellerOrder[] = [
    {
        id: 'order-1',
        productName: 'Wireless Bluetooth Headphones',
        orderNo: '#order-1',
        customer: 'Sarah Johnson',
        quantity: 2,
        sellPrice: 79.99,
        total: 159.98,
        moqUnits: 50,
        moqCost: 2250,
        potentialProfit: 69.98,
        status: 'Pending',
        note: '-1 days',
        image: product1
    },
    {
        id: 'order-2',
        productName: 'Smart Watch Pro',
        orderNo: '#order-2',
        customer: 'Sarah Johnson',
        quantity: 2,
        sellPrice: 149.99,
        total: 149.99,
        moqUnits: 30,
        moqCost: 2670,
        potentialProfit: 60.99,
        status: 'Accepted',
        image: product2
    }
]

const tabs: Array<'All' | OrderStatus> = ['All', 'Pending', 'Accepted', 'Completed']

const Page = () => {
    const [orders, setOrders] = useState(orderItems)
    const [activeTab, setActiveTab] = useState<'All' | OrderStatus>('All')
    const [declineId, setDeclineId] = useState<string | null>(null)

    const visibleOrders = useMemo(() => {
        if (activeTab === 'All') return orders
        return orders.filter((order) => order.status === activeTab)
    }, [activeTab, orders])

    const decliningOrder = orders.find((order) => order.id === declineId)

    return (
        <div className="space-y-5">
            <SellerPageHeader title="My Orders (2)" description="Manage your incoming orders" />

            <div className="flex flex-wrap items-center gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`h-10 rounded-lg px-4 text-sm font-medium transition ${activeTab === tab ? 'bg-main text-white' : 'border border-slate-300 bg-white text-title hover:bg-slate-50'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
                {visibleOrders.map((order) => (
                    <article
                        key={order.id}
                        className={`rounded-xl border p-5 ${order.status === 'Pending' ? 'border-yellow-300 bg-yellow-50/80' : 'border-emerald-300 bg-emerald-50/70'
                            }`}
                    >
                        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex items-start gap-2.5">
                                <Image src={order.image} alt={order.productName} width={44} height={44} className="h-11 w-11 rounded-lg object-cover" />
                                <div>
                                    <p className="text-lg font-semibold text-title sm:text-2xl">{order.productName}</p>
                                    <p className="text-sm text-description">Order {order.orderNo}</p>
                                </div>
                            </div>

                            <span className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-title sm:self-auto">
                                {order.status === 'Pending' ? <Clock3 className="h-4 w-4 text-amber-500" /> : <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                                {order.status}
                            </span>
                        </div>

                        <div className="grid gap-3 text-sm text-title sm:grid-cols-2">
                            <div>
                                <p className="text-description">Customer</p>
                                <p className="font-semibold">{order.customer}</p>
                            </div>
                            <div>
                                <p className="text-description">Quantity</p>
                                <p className="font-semibold">{order.quantity} units</p>
                            </div>
                            <div>
                                <p className="text-description">Selling Price</p>
                                <p className="font-semibold">${order.sellPrice}</p>
                            </div>
                            <div>
                                <p className="text-description">Total Amount</p>
                                <p className="font-semibold text-emerald-700">${order.total}</p>
                            </div>
                        </div>

                        <div className="mt-3 rounded-lg bg-white/65 p-3">
                            <div className="mb-1 flex items-center justify-between">
                                <p className="text-sm font-semibold text-description">MOQ Requirement</p>
                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${order.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                    {order.status === 'Pending' ? 'Required' : 'Purchased'}
                                </span>
                            </div>
                            <p className="text-sm text-description">You must purchase <span className="font-semibold text-title">{order.moqUnits} units</span> from Global Suppliers Co.</p>
                            <p className="text-sm text-description">MOQ Cost: <span className="font-semibold text-red-500">${order.moqCost}</span></p>
                            <p className="text-sm text-description">Potential Profit: <span className="font-semibold text-emerald-600">${order.potentialProfit}</span></p>
                        </div>

                        {order.status === 'Pending' ? (
                            <>
                                <p className="mt-3 text-right text-sm font-semibold text-red-500">{order.note}</p>
                                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setOrders((prev) => prev.map((entry) => (entry.id === order.id ? { ...entry, status: 'Accepted' } : entry)))
                                        }}
                                        className="h-10 rounded-lg bg-[#00A63E] text-sm font-semibold text-white hover:bg-[#00A63E]/90 cursor-pointer"
                                    >
                                        Accept Order
                                    </button>
                                    <button type="button" onClick={() => setDeclineId(order.id)} className="h-10 rounded-lg bg-red-500 text-sm font-semibold text-white hover:bg-red-600 cursor-pointer">
                                        Decline
                                    </button>
                                </div>
                            </>
                        ) : (
                            <button type="button" className="mt-3 h-10 w-full rounded-lg bg-main text-sm font-semibold text-white hover:opacity-95 cursor-pointer">
                                Purchase MOQ (${order.moqCost.toFixed(2)})
                            </button>
                        )}
                    </article>
                ))}
            </div>

            {visibleOrders.length === 0 ? (
                <p className="rounded-lg border border-slate-200 bg-white px-4 py-5 text-center text-sm text-description">No orders found for this tab.</p>
            ) : null}

            <DeclineOrderModal
                isOpen={Boolean(decliningOrder)}
                orderName={decliningOrder?.productName ?? ''}
                onClose={() => setDeclineId(null)}
                onConfirm={() => {
                    if (!declineId) return
                    setOrders((prev) => prev.filter((order) => order.id !== declineId))
                    setDeclineId(null)
                }}
            />
        </div>
    )
}

export default Page
