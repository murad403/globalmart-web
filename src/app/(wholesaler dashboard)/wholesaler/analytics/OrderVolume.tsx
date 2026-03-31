const data = [4200, 3300, 2400, 3000, 2100, 2500, 3600]
const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]

export default function OrderVolume() {
  return (
    <article className="rounded-lg border border-border bg-card p-4 sm:p-5">
      <h2 className="text-xl font-semibold text-title">Order Volume</h2>
      <p className="text-sm text-description">Number of orders processed per month</p>

      <div className="mt-4 grid grid-cols-[36px_1fr] gap-3">
        <div className="flex h-64 flex-col justify-between text-[11px] text-description">
          <span>6000</span>
          <span>4500</span>
          <span>3000</span>
          <span>1500</span>
          <span>0</span>
        </div>

        <div className="relative h-64">
          <div className="pointer-events-none absolute inset-0 grid grid-rows-4 border-b border-border">
            {[1, 2, 3, 4].map((line) => (
              <div key={line} className="border-t border-border" />
            ))}
          </div>

          <div className="relative z-10 flex h-full items-end justify-between gap-2">
            {data.map((value, index) => (
              <div key={`${labels[index]}-${value}`} className="flex h-full flex-1 flex-col items-center justify-end">
                <div className="w-full max-w-10 rounded-t-sm bg-emerald-500" style={{ height: `${Math.max((value / 6000) * 100, 8)}%` }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-7 pl-12 text-center text-[11px] text-description">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </article>
  )
}
