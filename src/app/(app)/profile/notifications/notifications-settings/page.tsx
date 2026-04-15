"use client"

import Link from 'next/link'
import { ArrowLeft, BellRing, CircleDollarSign, ShieldCheck, Wallet } from 'lucide-react'
import { useState } from 'react'

const Page = () => {
    const [settings, setSettings] = useState({
        general: true,
        transaction: true,
        promo: false
    })

    const items = [
        {
            key: 'general' as const,
            title: 'General',
            desc: 'Expect to be notified about common features such as live chat from our customer service',
            icon: BellRing,
            iconClass: 'bg-emerald-100 text-emerald-600'
        },
        {
            key: 'transaction' as const,
            title: 'Transaction',
            desc: 'Keep an eye out for a notification about your transaction process update',
            icon: Wallet,
            iconClass: 'bg-violet-100 text-violet-600'
        },
        {
            key: 'promo' as const,
            title: 'Promo',
            desc: 'Expect to get a notification regarding the promo',
            icon: CircleDollarSign,
            iconClass: 'bg-rose-100 text-rose-500'
        }
    ]

    return (
        <div>
            <div className="mb-4 flex items-center gap-2">
                <Link href="/profile/notifications" className="text-description hover:text-title">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold text-title">Notification settings</h1>
            </div>

            <div className="divide-y divide-slate-200">
                {items.map((item) => {
                    const Icon = item.icon
                    const enabled = settings[item.key]

                    return (
                        <article key={item.key} className="flex items-center justify-between gap-3 py-5">
                            <div className="flex items-start gap-3">
                                <div className={`mt-0.5 grid size-10 place-items-center rounded-xl ${item.iconClass}`}>
                                    <Icon className="h-4 w-4" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-title">{item.title}</h2>
                                    <p className="mt-1 text-sm text-description">{item.desc}</p>
                                </div>
                            </div>

                            <button
                                type="button"
                                aria-label={`${item.title} notifications`}
                                onClick={() => setSettings((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                                className={`relative h-6 w-10.5 rounded-full transition ${enabled ? 'bg-green-500' : 'bg-slate-200'}`}
                            >
                                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${enabled ? 'left-5' : 'left-0.5'}`} />
                            </button>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Page
