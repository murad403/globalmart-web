export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"

export type OrderItem = {
  title: string
  sku: string
  qtyLabel: string
  total: string
}

export type OrderRecord = {
  id: string
  reseller: string
  initials: string
  itemsCountLabel: string
  total: string
  status: OrderStatus
  date: string
  items: OrderItem[]
}
