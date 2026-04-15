import Link from 'next/link'
import React from 'react'

const statusStyles: Record<Order["status"], string> = {
    Shipped: "bg-emerald-500/15 text-emerald-700",
    Processing: "bg-blue-500/15 text-blue-700",
    Pending: "bg-orange-500/15 text-orange-700",
}

const recentOrders: Order[] = [
    {
        id: "ORD-7721",
        reseller: "John Doe Store",
        total: "$2990",
        status: "Shipped",
        date: "2024-03-18",
    },
    {
        id: "ORD-7722",
        reseller: "Sarah Fashion",
        total: "$2250",
        status: "Processing",
        date: "2024-03-19",
    },
    {
        id: "ORD-7723",
        reseller: "Gadget Hub",
        total: "$445",
        status: "Pending",
        date: "2024-03-20",
    },
]


type Order = {
    id: string
    reseller: string
    total: string
    status: "Shipped" | "Processing" | "Pending"
    date: string
}

const RecentOrders = () => {
    return (
        <article className="overflow-hidden rounded-lg border border-border bg-card xl:col-span-3">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div>
                    <h2 className="text-2xl font-semibold text-title">Recent Orders</h2>
                    <p className="text-sm text-description">Latest sales activity</p>
                </div>
                <Link href={"/wholesaler/recent-orders"} type="button" className="text-sm font-semibold text-main hover:opacity-80">
                    View All
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="px-5 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase whitespace-nowrap">Order ID</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Reseller</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Total</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Status</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order) => (
                            <tr key={order.id} className="border-b border-border/70 last:border-b-0">
                                <td className="px-5 py-4 text-sm font-semibold text-main whitespace-nowrap">{order.id}</td>
                                <td className="px-5 py-4 text-sm text-title whitespace-nowrap">{order.reseller}</td>
                                <td className="px-5 py-4 text-sm font-semibold text-title">{order.total}</td>
                                <td className="px-5 py-4 text-sm">
                                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[order.status]}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-sm text-description whitespace-nowrap">{order.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </article>
    )
}

export default RecentOrders
