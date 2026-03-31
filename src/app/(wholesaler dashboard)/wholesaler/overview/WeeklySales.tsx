import React from 'react'


const weeklySales = [
    { month: "Jan", value: 4000 },
    { month: "Feb", value: 3000 },
    { month: "Mar", value: 2000 },
    { month: "Apr", value: 2800 },
    { month: "May", value: 1900 },
    { month: "Jun", value: 2400 },
    { month: "Jul", value: 3800 },
]


const chartMax = 4000

const WeeklySales = () => {
    return (
        <article className="rounded-lg border border-border bg-card p-5 xl:col-span-2">
            <header>
                <h2 className="text-2xl font-semibold text-title">Weekly Sales</h2>
                <p className="text-sm text-description">Performance over last 7 days</p>
            </header>

            <div className="mt-4 h-80">
                <div className="relative flex h-full items-end justify-between gap-2">
                    <div className="pointer-events-none absolute inset-0 grid grid-rows-4">
                        {[0, 1, 2, 3].map((line) => (
                            <div key={line} className="border-t border-border" />
                        ))}
                    </div>

                    {weeklySales.map((item) => (
                        <div key={item.month} className="relative z-10 flex h-full flex-1 flex-col items-center justify-end gap-3">
                            <div
                                className="w-full max-w-12 rounded-t-md bg-emerald-500"
                                style={{ height: `${Math.max((item.value / chartMax) * 100, 8)}%` }}
                                aria-label={`${item.month} sales ${item.value}`}
                            />
                            <span className="text-xs text-description">{item.month}</span>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}

export default WeeklySales
