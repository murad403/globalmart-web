"use client"

import Link from 'next/link'
import { ArrowLeft, Settings, TicketPercent } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

type NotificationItem = {
    id: number
    type: 'promo' | 'transaction'
    title: string
    description: string
    time: string
}

const Page = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'transaction' | 'promo'>('all')
    const router = useRouter();
    const notifications = useMemo(
        (): NotificationItem[] => [
            {
                id: 1,
                type: 'promo',
                title: 'Welcome Aboard! Claim Your 50% Off First-Time User Promo Now!',
                description:
                    "Welcome! Enjoy an exclusive 50% off as a first-time user. Simply apply the code at checkout. Don't miss out on this limited-time offer. Shop now for quality and savings!",
                time: '8 Sep, 04:00 PM'
            },
            {
                id: 2,
                type: 'transaction',
                title: 'Payment processed for order #12345',
                description:
                    'Your payment has been successfully processed. You can now review tracking updates in your order details.',
                time: '8 Sep, 04:00 PM'
            }
        ],
        []
    )

    const filtered = notifications.filter((item) => {
        if (activeTab === 'all') return true
        if (activeTab === 'transaction') return item.type === 'transaction'
        return item.type === 'promo'
    })

    return (
        <div>
            <div className="mb-5 flex items-center justify-between">

                <h1 className="text-2xl md:text-3xl font-bold text-title">Notifications</h1>

                <Link href="/profile/notifications/notifications-settings" className="text-description hover:text-title">
                    <Settings className="h-6 w-6" />
                </Link>
            </div>

            <div className="mb-4 flex items-center gap-6 border-b border-slate-200 text-sm">
                <button type="button" onClick={() => setActiveTab('all')} className={`pb-2 ${activeTab === 'all' ? 'border-b-2 border-emerald-500 font-semibold text-emerald-600' : 'text-description'}`}>
                    All(1)
                </button>
                <button type="button" onClick={() => setActiveTab('transaction')} className={`pb-2 ${activeTab === 'transaction' ? 'border-b-2 border-emerald-500 font-semibold text-emerald-600' : 'text-description'}`}>
                    Transaction(4)
                </button>
            </div>

            <div className="space-y-3">
                {filtered.map((item, index) => (
                    <article key={item.id} className={`rounded-xl p-4 ${index === 0 ? 'bg-[#F8FAFE]' : 'bg-white'}`}>
                        <div className="flex items-start gap-3">
                            <div className="grid h-8 w-8 place-items-center rounded-full bg-rose-100 text-rose-500">
                                <TicketPercent className="h-4 w-4" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-title">{item.title}</h2>
                                <p className="mt-1 text-sm text-description">{item.description}</p>
                                <p className="mt-2 text-sm text-description">{item.time}</p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default Page
