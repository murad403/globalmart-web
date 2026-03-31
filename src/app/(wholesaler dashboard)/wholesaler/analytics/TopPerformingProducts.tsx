type ProductRow = {
  rank: number
  name: string
  units: string
  revenue: string
  growth: string
}

const products: ProductRow[] = [
  { rank: 1, name: "Ultra HD Camera", units: "450 units sold", revenue: "$134,550", growth: "+12.5%" },
  { rank: 2, name: "Gaming Mouse RGB", units: "380 units sold", revenue: "$17,100", growth: "+8.4%" },
  { rank: 3, name: "Mechanical Keyboard", units: "290 units sold", revenue: "$25,810", growth: "+15.2%" },
  { rank: 4, name: "USB-C Hub 7-in-1", units: "240 units sold", revenue: "$8,400", growth: "+5.2%" },
]

export default function TopPerformingProducts() {
  return (
    <article className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <h2 className="text-xl font-semibold text-title">Top Performing Products</h2>
      <p className="text-sm text-description">Based on sales volume</p>

      <div className="mt-4 divide-y divide-border">
        {products.map((product) => (
          <div key={product.rank} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3">
            <div className="grid size-6 place-items-center rounded-md bg-muted text-xs font-semibold text-description">{product.rank}</div>

            <div>
              <p className="text-sm font-medium text-title">{product.name}</p>
              <p className="text-xs text-description">{product.units}</p>
            </div>

            <div className="text-right">
              <p className="text-sm font-semibold text-title">{product.revenue}</p>
              <p className="text-xs font-medium text-emerald-600">{product.growth}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
