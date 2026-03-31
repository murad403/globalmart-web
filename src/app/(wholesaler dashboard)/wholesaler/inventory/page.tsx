"use client"

import { useState } from "react"
import InventoryDeleteModal from "@/components/modal/InventoryDeleteModal"
import InventoryUpdateModal from "@/components/modal/InventoryUpdateModal"
import InventoryList from "./InventoryList"
import InventoryStats from "./InventoryStats"
import type { InventoryItem } from "@/types/inventory"

const initialInventory: InventoryItem[] = [
  { id: 1, name: "Ultra HD Camera", category: "Electronics", sku: "SKU-1001", stock: 45 },
  { id: 2, name: "Gaming Mouse RGB", category: "Electronics", sku: "SKU-1002", stock: 120 },
  { id: 3, name: "Mechanical Keyboard", category: "Electronics", sku: "SKU-1003", stock: 3 },
  { id: 4, name: "USB-C Hub 7-in-1", category: "Electronics", sku: "SKU-1004", stock: 200 },
  { id: 5, name: "Bluetooth Speaker", category: "Electronics", sku: "SKU-1005", stock: 0 },
]

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(initialInventory)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
  const [deletingItem, setDeletingItem] = useState<InventoryItem | null>(null)

  const handleUpdateStock = (itemId: number, newStock: number) => {
    setItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, stock: newStock } : item)))
    setEditingItem(null)
  }

  const handleDeleteItem = (itemId: number) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId))
    setDeletingItem(null)
  }

  return (
    <section className="space-y-4 sm:space-y-5">
      <header>
        <h1 className="text-3xl font-bold text-title">Inventory</h1>
        <p className="mt-1 text-description">Monitor stock levels across your warehouse</p>
      </header>

      <InventoryStats items={items} />

      <InventoryList items={items} onEdit={setEditingItem} onDelete={setDeletingItem} />

      <InventoryUpdateModal
        isOpen={Boolean(editingItem)}
        item={editingItem}
        onClose={() => setEditingItem(null)}
        onUpdate={handleUpdateStock}
      />

      <InventoryDeleteModal
        isOpen={Boolean(deletingItem)}
        item={deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirmDelete={handleDeleteItem}
      />
    </section>
  )
}
