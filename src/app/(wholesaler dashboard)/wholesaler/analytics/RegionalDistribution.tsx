type Region = {
  name: string
  value: number
  color: string
}

const regions: Region[] = [
  { name: "North America", value: 45, color: "bg-main" },
  { name: "Europe", value: 30, color: "bg-emerald-500" },
  { name: "Asia Pacific", value: 15, color: "bg-main/50" },
  { name: "Others", value: 10, color: "bg-muted-foreground/60" },
]

export default function RegionalDistribution() {
  return (
    <article className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <h2 className="text-xl font-semibold text-title">Regional Distribution</h2>
      <p className="text-sm text-description">Sales by geographic area</p>

      <div className="mt-4 space-y-3">
        {regions.map((region) => (
          <div key={region.name}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-title">{region.name}</span>
              <span className="font-medium text-title">{region.value}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted">
              <div className={`h-1.5 rounded-full ${region.color}`} style={{ width: `${region.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
