'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, CreditCard, Lock, LogOut, MapPinned, ShoppingBag, User } from 'lucide-react'

const navItems = [
    { label: 'Profile', href: '/profile', icon: User },
    { label: 'Orders', href: '/profile/orders', icon: ShoppingBag },
    { label: 'Addresses', href: '/profile/addresses', icon: MapPinned },
    { label: 'Transactions', href: '/profile/transactions', icon: CreditCard },
    { label: 'Notifications', href: '/profile/notifications', icon: Bell },
    { label: 'Security', href: '/profile/security', icon: Lock }
]

const ProfileSidebar = () => {
    const pathname = usePathname()

    return (
        <aside className="rounded-2xl border border-slate-200 bg-white p-3 md:p-4 lg:sticky lg:top-24">
            <nav className="space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = item.href === '/profile'
                        ? pathname === item.href
                        : pathname.startsWith(item.href)

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-2.5 rounded-xl px-3 py-3 text-sm font-semibold transition ${isActive
                                    ? 'bg-[#FFF1E8] text-heading border-l-4 border-heading font-semibold'
                                    : 'text-title hover:bg-slate-50'
                                }`}
                        >
                            <Icon className={`size-5`} />
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            <button
                type="button"
                className="mt-20 flex w-full items-center gap-2.5 rounded-2xl border border-red-500 px-4 py-3 text-left text-base font-semibold text-red-500 transition hover:bg-red-50"
            >
                <LogOut className="h-4 w-4" />
                Logout
            </button>
        </aside>
    )
}

export default ProfileSidebar
