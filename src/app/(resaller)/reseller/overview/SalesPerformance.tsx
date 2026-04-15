const yLabels = [4000, 3000, 2000, 1000, 0]
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']

const SalesPerformance = () => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 xl:col-span-2">
      <h2 className="text-xl font-semibold text-title sm:text-3xl">Sales Performance</h2>
      <p className="mt-1 text-sm text-description">Revenue over time</p>

      <div className="mt-4">
        <svg viewBox="0 0 700 300" className="h-56 w-full sm:h-70" role="img" aria-label="Sales trend chart">
          <g stroke="#E5E7EB" strokeDasharray="2 4">
            <line x1="60" y1="20" x2="660" y2="20" />
            <line x1="60" y1="80" x2="660" y2="80" />
            <line x1="60" y1="140" x2="660" y2="140" />
            <line x1="60" y1="200" x2="660" y2="200" />
            <line x1="60" y1="260" x2="660" y2="260" />

            <line x1="60" y1="20" x2="60" y2="260" />
            <line x1="160" y1="20" x2="160" y2="260" />
            <line x1="260" y1="20" x2="260" y2="260" />
            <line x1="360" y1="20" x2="360" y2="260" />
            <line x1="460" y1="20" x2="460" y2="260" />
            <line x1="560" y1="20" x2="560" y2="260" />
            <line x1="660" y1="20" x2="660" y2="260" />
          </g>

          <path
            d="M60 20 C95 40, 130 60, 160 80 C195 110, 220 140, 260 140 C300 140, 330 80, 360 80 C390 80, 420 140, 460 150 C500 160, 530 140, 560 125 C590 110, 625 85, 660 50"
            fill="none"
            stroke="#155DFC"
            strokeWidth="2.5"
          />

          {yLabels.map((value, index) => (
            <text key={value} x="54" y={24 + index * 60} textAnchor="end" className="fill-slate-400 text-[11px]">
              {value}
            </text>
          ))}

          {monthLabels.map((month, index) => (
            <text key={month} x={60 + index * 100} y="276" textAnchor="middle" className="fill-slate-400 text-[11px]">
              {month}
            </text>
          ))}
        </svg>
      </div>
    </section>
  )
}

export default SalesPerformance
