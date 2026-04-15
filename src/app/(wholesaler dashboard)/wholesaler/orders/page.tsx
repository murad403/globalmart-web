"use client"

import { useState } from "react"
import OrderList from "./OrderList"
import OrderStats from "./OrderStats"
import type { OrderRecord, OrderStatus } from "@/types/orders"
import SellerPageHeader from "@/components/shared/SellerPageHeader"

const initialOrders: OrderRecord[] = [
  {
    id: "ORD-7721",
    reseller: "John Doe Store",
    initials: "J",
    itemsCountLabel: "items",
    total: "$2990.00",
    status: "Shipped",
    date: "2024-03-18",
    items: [{ title: "Bulk Order Item", sku: "WH-10293", qtyLabel: "$NaN x", total: "$2990.00" }],
  },
  {
    id: "ORD-7722",
    reseller: "Sarah Fashion",
    initials: "S",
    itemsCountLabel: "items",
    total: "$2250.00",
    status: "Processing",
    date: "2024-03-19",
    items: [{ title: "Fashion Mixed Bundle", sku: "WH-10502", qtyLabel: "15 x", total: "$2250.00" }],
  },
  {
    id: "ORD-7723",
    reseller: "Gadget Hub",
    initials: "G",
    itemsCountLabel: "items",
    total: "$445.00",
    status: "Pending",
    date: "2024-03-20",
    items: [{ title: "Smart Accessories Pack", sku: "WH-10611", qtyLabel: "5 x", total: "$445.00" }],
  },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderRecord[]>(initialOrders)

  const handleStatusChange = (orderId: string, nextStatus: OrderStatus) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: nextStatus } : order)))
  }

  return (
    <section className="space-y-4 sm:space-y-5">
      <SellerPageHeader title="Orders" description="Track and process incoming wholesale orders"/>

      <OrderStats orders={orders} />

      <OrderList orders={orders} onStatusChange={handleStatusChange} />
    </section>
  )
}
