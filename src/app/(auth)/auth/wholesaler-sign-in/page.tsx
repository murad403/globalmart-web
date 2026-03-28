'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, AtSign, Eye, EyeOff, Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import AuthLeftBanner from '@/components/shared/AuthLeftBanner'
import {
  wholesalerSignInSchema,
  type WholesalerSignInValues
} from '@/validation/auth.validation'

const WholesalerSignInPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<WholesalerSignInValues>({
    resolver: zodResolver(wholesalerSignInSchema),
  })

  const onSubmit = async (values: WholesalerSignInValues) => {
    console.log(values)
  }

  return (
    <section className="min-h-screen w-full bg-white">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        <AuthLeftBanner eyebrow="Welcome to Gulu" variant="wholesaler" />

        <main className="flex items-center justify-center px-5 py-10 sm:px-10">
          <div className="w-full max-w-140">
            <h1 className="text-center text-3xl font-bold text-title md:text-4xl">
              Sign in as a <span className="text-heading">Wholesaler</span>
            </h1>
            <p className="mt-2 text-center text-xl text-description">Enter your credentials to continue</p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-base font-semibold text-description">Email Address</label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                  <AtSign className="h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="h-full w-full border-none py-3 bg-transparent text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                    {...register('email')}
                  />
                </div>
                {errors.email?.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-base font-semibold text-description">Password</label>
                  <Link href="/" className="text-base font-medium text-heading hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                  <Lock className="h-5 w-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="h-full w-full border-none py-3 bg-transparent text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password?.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <Button type="submit" disabled={isSubmitting} className="text-lg w-full">
                {isSubmitting ? 'Signing In...' : 'Sign In'}
                {!isSubmitting && <ArrowRight className="size-4" />}
              </Button>
            </form>

            <p className="mt-4 text-center text-lg text-description">
              Don&apos;t have an account?{' '}
              <Link href="/" className="font-semibold text-heading hover:underline">
                Create one now
              </Link>
            </p>
          </div>
        </main>
      </div>
    </section>
  )
}

export default WholesalerSignInPage
