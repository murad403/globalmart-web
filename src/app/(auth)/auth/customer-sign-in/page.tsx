'use client'

import Link from 'next/link'
import { ArrowRight, AtSign, Eye, EyeOff, Lock, PackageCheck, TrendingUp, UserCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import AuthLeftBanner from '@/components/shared/AuthLeftBanner'
import {
  customerSignInSchema,
  type CustomerSignInValues
} from '@/validation/auth.validation'



const CustomerSignInPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<CustomerSignInValues>({
    resolver: zodResolver(customerSignInSchema)
  })

  const onSubmit = async (values: CustomerSignInValues) => {
    console.log(values)
  }

  return (
    <section className="min-h-screen w-full bg-white">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        <AuthLeftBanner eyebrow="Welcome back to Gulu" />

        <main className="flex items-center justify-center px-5 py-10 sm:px-10">
          <div className="w-full max-w-140">
            <h1 className="text-center text-3xl font-bold text-title md:text-4xl">
              Sign in as a <span className="text-main">Customer</span>
            </h1>
            <p className="mt-2 text-center text-xl text-description">
              Please enter your details to access your account
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-4">
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
                  <Link href="/" className="text-base font-medium text-main hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                  <Lock className="size-4 text-slate-400" />
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
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {errors.password?.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <Button type="submit" disabled={isSubmitting} className='w-full text-lg'>
                {isSubmitting ? 'Signing In...' : 'Sign In'}
                {!isSubmitting &&  <ArrowRight className='size-4' />}
              </Button>
            </form>

            <p className="mt-5 text-center text-lg text-description">OR LOGIN WITH</p>
            <p className="mt-4 text-lg font-semibold text-description">I want to login as</p>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link
                href="/auth/wholesaler-sign-in"
                className="rounded-xl border-2 border-[#A855F7] bg-[#F8F0FF] px-4 py-5 text-center"
              >
                <span className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#A855F7] text-white">
                  <PackageCheck className="h-5 w-5" />
                </span>
                <p className="mt-2 text-xl font-bold text-title">Wholesaler</p>
                <p className="text-sm text-description">Sell products in bulk to resellers</p>
              </Link>

              <Link
                href="/auth/reseller-sign-in"
                className="rounded-xl border-2 border-[#14B8A6] bg-[#EEFFFC] px-4 py-5 text-center"
              >
                <span className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#14B8A6] text-white">
                  <UserCircle2 className="h-5 w-5" />
                </span>
                <p className="mt-2 text-xl font-bold text-title">Reseller</p>
                <p className="text-sm text-description">Buy from wholesalers, sell to customers</p>
              </Link>
            </div>

            <p className="mt-4 text-center text-lg text-description">
              Don&apos;t have an account?{' '}
              <Link href="/" className="font-semibold text-main hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </main>
      </div>
    </section>
  )
}

export default CustomerSignInPage
