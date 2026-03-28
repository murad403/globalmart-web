'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, AtSign, Eye, EyeOff, Lock, PackageCheck, ShoppingCart, User, UserCircle2} from 'lucide-react'
import AuthLeftBanner from '@/components/shared/AuthLeftBanner'
import { Button } from '@/components/ui/button'
import { customerSignUpSchema } from '@/validation/auth.validation'

const roleOptions = [
  {
    id: 'wholesaler',
    label: 'Wholesaler',
    description: 'Sell products in bulk to resellers',
    note: 'Review terms first',
    icon: PackageCheck,
    activeClass: 'border-[#A855F7] bg-[#F8F0FF]',
    iconClass: 'bg-[#A855F7] text-white'
  },
  {
    id: 'reseller',
    label: 'Reseller',
    description: 'Buy products and sell to customers',
    note: 'Review terms first',
    icon: UserCircle2,
    activeClass: 'border-[#14B8A6] bg-[#EEFFFC]',
    iconClass: 'bg-[#14B8A6] text-white'
  },
  {
    id: 'customer',
    label: 'Customer',
    description: 'Shop products from resellers',
    note: '',
    icon: ShoppingCart,
    activeClass: 'border-heading bg-[#FFF1E8]',
    iconClass: 'bg-heading text-white'
  }
] as const

type CustomerSignUpValues = z.infer<typeof customerSignUpSchema>

const CustomerSignUpPage = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState<CustomerSignUpValues['role']>('customer')

  const { register, setValue, handleSubmit, formState: { errors, isSubmitting }} = useForm<CustomerSignUpValues>({
    resolver: zodResolver(customerSignUpSchema),
    defaultValues: {
      role: 'customer',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (values: CustomerSignUpValues) => {
    console.log('Customer sign up submitted:', values)
    router.push('/auth/customer-sign-in')
  }

  return (
    <section className="min-h-screen w-full bg-white">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        <AuthLeftBanner eyebrow="Welcome back to Gulu" />

        <main className="flex items-center justify-center px-5 py-10 sm:px-10">
          <div className="w-full max-w-140">
            <h1 className="text-center text-3xl font-bold text-title md:text-5xl">Create your account</h1>
            <p className="mt-2 text-center text-lg text-description">Choose your role and get started in minutes</p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-4">
              <div>
                <p className="mb-3 text-base font-semibold text-description">I want to join as</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {roleOptions.map((role) => {
                    const RoleIcon = role.icon
                    const isActive = selectedRole === role.id

                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => {
                          if (role.id === 'wholesaler') {
                            router.push('/auth/wholesaler-terms-and-conditions')
                            return
                          }

                          if (role.id === 'reseller') {
                            router.push('/auth/reseller-terms-and-conditions')
                            return
                          }

                          setSelectedRole(role.id)
                          setValue('role', role.id, { shouldValidate: true })
                        }}
                        className={`relative rounded-xl border-2 px-3 py-5 text-center transition ${
                          isActive ? role.activeClass : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        {isActive && <span className="absolute inset-x-0 -top-2 mx-auto h-2 w-2/3 rounded-full bg-heading" />}
                        <span
                          className={`mx-auto inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                            isActive ? role.iconClass : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <RoleIcon className="h-5 w-5" />
                        </span>
                        <p className="mt-2 text-lg font-bold text-title">{role.label}</p>
                        <p className="text-sm leading-5 text-description">{role.description}</p>
                        {role.note && <p className="mt-1 text-sm font-semibold text-slate-400">→{role.note}</p>}
                      </button>
                    )
                  })}
                </div>
                {errors.role?.message && <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-base font-semibold text-description">First Name</label>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                    <User className="h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="John"
                      className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                      {...register('firstName')}
                    />
                  </div>
                  {errors.firstName?.message && <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-base font-semibold text-description">Last Name</label>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                    <User className="h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Doe"
                      className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                      {...register('lastName')}
                    />
                  </div>
                  {errors.lastName?.message && <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-base font-semibold text-description">Email Address</label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                  <AtSign className="h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                    {...register('email')}
                  />
                </div>
                {errors.email?.message && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label className="mb-2 block text-base font-semibold text-description">Password</label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                  <Lock className="size-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {errors.password?.message && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
              </div>

              <div>
                <label className="mb-2 block text-base font-semibold text-description">Confirm Password</label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                  <Lock className="size-4 text-slate-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Enter confirm password"
                    className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                    {...register('confirmPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="text-slate-400 hover:text-slate-600"
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {errors.confirmPassword?.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>

              <p className="px-1 text-center text-base text-description">
                By creating an account, you agree to our{' '}
                <Link href="/" className="font-medium text-heading hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/" className="font-medium text-heading hover:underline">
                  Privacy Policy
                </Link>
              </p>

              <Button type="submit" disabled={isSubmitting} className="w-full text-lg">
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
                {!isSubmitting && <ArrowRight className="size-4" />}
              </Button>
            </form>

            <p className="mt-4 text-center text-lg text-description">
              Already have an account?{' '}
              <Link href="/auth/customer-sign-in" className="font-semibold text-heading hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </main>
      </div>
    </section>
  )
}

export default CustomerSignUpPage
