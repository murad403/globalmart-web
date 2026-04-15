const yLabels = [4000, 3000, 2000, 1000, 0]
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

const RevenueGrowth = () => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <h3 className="text-xl font-semibold text-title sm:text-2xl">Revenue Growth</h3>
      <p className="mt-1 text-sm text-description">Monthly performance overview</p>

      <div className="mt-4">
        <svg viewBox="0 0 700 300" className="h-56 w-full sm:h-70" role="img" aria-label="Revenue growth line chart">
          <g stroke="#E5E7EB" strokeDasharray="2 4">
            <line x1="60" y1="20" x2="660" y2="20" />
            <line x1="60" y1="80" x2="660" y2="80" />
            <line x1="60" y1="140" x2="660" y2="140" />
            <line x1="60" y1="200" x2="660" y2="200" />
            <line x1="60" y1="260" x2="660" y2="260" />

            <line x1="60" y1="20" x2="60" y2="260" />
            <line x1="180" y1="20" x2="180" y2="260" />
            <line x1="300" y1="20" x2="300" y2="260" />
            <line x1="420" y1="20" x2="420" y2="260" />
            <line x1="540" y1="20" x2="540" y2="260" />
            <line x1="660" y1="20" x2="660" y2="260" />
          </g>

          <path
            d="M60 20 C95 45, 130 70, 180 95 C220 130, 255 150, 300 140 C340 130, 380 75, 420 100 C465 130, 500 165, 540 150 C580 135, 620 125, 660 108"
            fill="none"
            stroke="#155DFC"
            strokeWidth="2.5"
          />

          {[
            { x: 60, y: 20 },
            { x: 180, y: 95 },
            { x: 300, y: 140 },
            { x: 420, y: 100 },
            { x: 540, y: 150 },
            { x: 660, y: 108 }
          ].map((point, index) => (
            <circle key={index} cx={point.x} cy={point.y} r="4" fill="#155DFC" />
          ))}

          {yLabels.map((value, index) => (
            <text key={value} x="54" y={24 + index * 60} textAnchor="end" className="fill-slate-400 text-[11px]">
              {value}
            </text>
          ))}

          {monthLabels.map((month, index) => (
            <text key={month} x={60 + index * 120} y="276" textAnchor="middle" className="fill-slate-400 text-[11px]">
              {month}
            </text>
          ))}
        </svg>
      </div>
    </section>
  )
}

export default RevenueGrowth
