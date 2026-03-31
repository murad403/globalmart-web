import React from 'react'

const ImportHistory = () => {
    return (
        <article className="rounded-lg border border-border bg-card p-5">
            <h3 className="text-xl font-semibold text-title">Import History</h3>
            <p className="mt-1 text-description text-sm">Your recent bulk uploads</p>

            <div className="mt-4 space-y-2.5">
                {[
                    { name: "winter_collection.xlsx", date: "Oct 12, 2023" },
                    { name: "electronics_update.csv", date: "Oct 08, 2023" },
                ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2.5">
                        <div>
                            <p className="text-sm font-semibold text-title">{item.name}</p>
                            <p className="text-xs text-description">{item.date}</p>
                        </div>
                        <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-700">Success</span>
                    </div>
                ))}
            </div>
        </article>
    )
}

export default ImportHistory
