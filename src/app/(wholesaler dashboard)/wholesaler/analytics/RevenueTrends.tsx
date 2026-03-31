const points = [4000, 3000, 2100, 2800, 1900, 2400, 3500]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]

function buildPolyline(values: number[]) {
  const max = 4000
  const width = 520
  const height = 256
  const step = width / (values.length - 1)

  return values
    .map((value, index) => {
      const x = index * step
      const y = height - (value / max) * height
      return `${x},${y}`
    })
    .join(" ")
}

export default function RevenueTrends() {
  const polylinePoints = buildPolyline(points)

  return (
    <article className="rounded-lg border border-border bg-card p-4 sm:p-5">
      <h2 className="text-xl font-semibold text-title">Revenue Trends</h2>
      <p className="text-sm text-description">Monthly performance overview</p>

      <div className="mt-4">
        <div className="grid grid-cols-[36px_1fr] gap-3">
          <div className="flex h-64 flex-col justify-between text-[11px] text-description">
            <span>4000</span>
            <span>3000</span>
            <span>2000</span>
            <span>1000</span>
            <span>0</span>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-0 grid grid-rows-4 border-b border-border">
              {[1, 2, 3, 4].map((line) => (
                <div key={line} className="border-t border-border" />
              ))}
            </div>

            <svg viewBox="0 0 520 256" className="relative z-10 h-64 w-full" preserveAspectRatio="none" aria-label="Revenue chart">
              <polyline points={polylinePoints} fill="none" stroke="var(--color-main)" strokeWidth="2.5" />
              {points.map((value, index) => {
                const x = (index * 520) / (points.length - 1)
                const y = 256 - (value / 4000) * 256
                return <circle key={`${months[index]}-${value}`} cx={x} cy={y} r="3.5" fill="var(--color-main)" />
              })}
            </svg>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-7 text-center text-[11px] text-description">
          {months.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>
    </article>
  )
}
