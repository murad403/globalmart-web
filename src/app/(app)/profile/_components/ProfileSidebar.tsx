'use client'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Bell, CreditCard, Lock, LogOut, MapPinned, ShoppingBag, User } from 'lucide-react'
import LogoutModal from '@/components/modal/LogoutModal'

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
    const [isLogoutOpen, setIsLogoutOpen] = useState(false)

    return (
        <>
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
                                className={`relative flex items-center gap-2.5 rounded-xl px-3 py-3 text-sm font-semibold transition ${isActive
                                    ? 'bg-[#FFF1E8] text-heading font-semibold'
                                    : 'text-title hover:bg-slate-50'
                                    }`}
                            >
                                <Icon className="size-5" />
                                <span>{item.label}</span>
                                <div className={`absolute left-0 h-6 w-1 rounded-xl bg-heading ${isActive ? 'block' : 'hidden'}`} />
                            </Link>
                        )
                    })}
                </nav>

                <button
                    type="button"
                    onClick={() => setIsLogoutOpen(true)}
                    className="mt-20 flex w-full cursor-pointer items-center gap-2.5 rounded-2xl border border-red-500 px-4 py-3 text-left text-base font-semibold text-red-500 transition hover:bg-red-50"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </aside>

            <LogoutModal isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} />
        </>
    )
}

export default ProfileSidebar
