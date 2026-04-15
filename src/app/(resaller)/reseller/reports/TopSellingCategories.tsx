const categories = [
  { label: 'Electronics', value: 42 },
  { label: 'Fashion', value: 30 },
  { label: 'Home', value: 15 },
  { label: 'Beauty', value: 10 }
]

const TopSellingCategories = () => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <h3 className="text-xl font-semibold text-title sm:text-2xl">Top Selling Categories</h3>
      <p className="mt-1 text-sm text-description">Sales distribution by category</p>

      <div className="mt-4 h-56 sm:h-70">
        <div className="relative h-full rounded-lg border border-dashed border-slate-200 p-3">
          <div className="absolute inset-3 grid grid-cols-4 items-end gap-3">
            {categories.map((category) => (
              <div key={category.label} className="flex h-full flex-col items-center justify-end gap-2">
                <div className="w-full rounded-t-md bg-main/80" style={{ height: `${category.value}%` }} />
                <p className="text-[10px] text-slate-500 sm:text-xs">{category.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TopSellingCategories
