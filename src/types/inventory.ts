export type InventoryStatus = "Active" | "Low Stock" | "Out of Stock"

export type InventoryItem = {
  id: number
  name: string
  category: string
  sku: string
  stock: number
}

export function getInventoryStatus(stock: number): InventoryStatus {
  if (stock <= 0) {
    return "Out of Stock"
  }

  if (stock <= 10) {
    return "Low Stock"
  }

  return "Active"
}
