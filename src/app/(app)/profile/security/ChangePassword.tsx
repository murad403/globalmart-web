"use client"

import { useState } from 'react'
import { Eye, EyeOff, Lock, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ChangePassword = () => {
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNext, setShowNext] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <section>
      <div className="mb-6 text-center">
        <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-main">
          <Shield className="h-3.5 w-3.5" />
          Security Settings
        </p>
        <h2 className="mt-1 text-3xl font-bold text-title">
          Change your <span className="text-main">Password</span>
        </h2>
        <p className="mt-2 text-sm text-description">
          Ensure your account is using a strong, unique password to stay protected.
        </p>
      </div>

      <div className="space-y-4 rounded-xl border border-slate-200 p-4 sm:p-5">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-title">Current Password</span>
          <span className="relative block">
            <Lock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type={showCurrent ? 'text' : 'password'}
              placeholder="Enter Current password"
              className="h-11 w-full rounded-lg border border-slate-200 bg-[#F3F3F5] pr-10 pl-9 text-sm text-title outline-none transition focus:border-heading"
            />
            <button type="button" onClick={() => setShowCurrent((prev) => !prev)} className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-500">
              {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </span>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-title">New Password</span>
          <span className="relative block">
            <Lock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type={showNext ? 'text' : 'password'}
              placeholder="Enter New password"
              className="h-11 w-full rounded-lg border border-slate-200 bg-[#F3F3F5] pr-10 pl-9 text-sm text-title outline-none transition focus:border-heading"
            />
            <button type="button" onClick={() => setShowNext((prev) => !prev)} className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-500">
              {showNext ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </span>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-title">Confirm New Password</span>
          <span className="relative block">
            <Lock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Enter Confirm password"
              className="h-11 w-full rounded-lg border border-slate-200 bg-[#F3F3F5] pr-10 pl-9 text-sm text-title outline-none transition focus:border-heading"
            />
            <button type="button" onClick={() => setShowConfirm((prev) => !prev)} className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-500">
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </span>
        </label>

        <Button type="button" className="mt-2 w-full justify-center py-3 text-sm font-semibold">
          Update Password
          <span aria-hidden>→</span>
        </Button>
      </div>
    </section>
  )
}

export default ChangePassword
