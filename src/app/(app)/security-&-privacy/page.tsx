'use client'
import { useState } from 'react'
import { ArrowRight, AtSign, Eye, EyeOff, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'



const SecurityAndPrivacyPage = () => {
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <section className="w-full py-10">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl">
                    <div className='text-center'>
                        <div className='flex items-center justify-center gap-2'>
                            <div className='bg-blue-200 p-2 rounded-full'>
                                <Lock className='size-4 text-main' />
                            </div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-main">SECURITY SETTINGS</p>
                        </div>
                        <h1 className="mt-2 text-4xl font-bold text-title">
                            Change your <span className="text-main">Password</span>
                        </h1>
                        <p className="mt-2 text-description">
                            Ensure your account is using a strong, unique password to stay protected.
                        </p>
                    </div>

                    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
                        <form className="space-y-4">
                            <div>
                                <label className="mb-2 block text-base font-semibold text-description">Registered Email</label>
                                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-[#EEF4FB] px-3">
                                    <AtSign className="h-5 w-5 text-slate-400" />
                                    <input
                                        type="email"
                                        defaultValue="user@example.com"
                                        disabled
                                        className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-base font-semibold text-description">New Password</label>
                                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                                    <Lock className="size-4 text-slate-400" />
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        placeholder="Enter new password"
                                        className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword((prev) => !prev)}
                                        className="text-slate-400 hover:text-slate-600"
                                        aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                                    >
                                        {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-base font-semibold text-description">Confirm New Password</label>
                                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                                    <Lock className="size-4 text-slate-400" />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Repeat new password"
                                        className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className="text-slate-400 hover:text-slate-600"
                                        aria-label={showConfirmPassword ? 'Hide confirm new password' : 'Show confirm new password'}
                                    >
                                        {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="button"
                                className="text-base w-full"
                            >
                                Update Password <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SecurityAndPrivacyPage
