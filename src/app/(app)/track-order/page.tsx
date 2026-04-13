'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'

const trackOrderSchema = z.object({
  orderId: z.string().min(5, 'Order ID is required'),
  billingEmail: z.email('Enter a valid billing email')
})

type TrackOrderValues = z.infer<typeof trackOrderSchema>

const TrackOrderPage = () => {
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<TrackOrderValues>({
    resolver: zodResolver(trackOrderSchema),
    defaultValues: {
      orderId: '',
      billingEmail: ''
    }
  })

  const onSubmit = (data: TrackOrderValues) => {
    // Navigate to the dynamic track order page with ID and email
    router.push(`/track-order/${data.orderId}?email=${encodeURIComponent(data.billingEmail)}`)
  }

  return (
    <section className="w-full py-8 md:py-10 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="">

          <div className="text-4xl font-bold text-title flex items-center gap-3">
            <button onClick={() => router.push("/")} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white transition hover:bg-slate-50 cursor-pointer">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1>Track Order</h1>
          </div>

          <div className="mt-5">
            <p className="max-w-4xl text-2xl text-description">
              To track your order please enter your order ID in the input field below and press the
              &quot;Track Order&quot; button. This was given to you on your receipt and in the confirmation email you should have received.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="orderId" className="mb-2 block text-sm font-semibold text-title">
                    Order ID
                  </label>
                  <input
                    id="orderId"
                    type="text"
                    placeholder="ID..."
                    {...register('orderId')}
                    className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-heading"
                  />
                  {errors.orderId && <p className="mt-1 text-xs text-red-500">{errors.orderId.message}</p>}
                </div>
                <div>
                  <label htmlFor="billingEmail" className="mb-2 block text-sm font-semibold text-title">
                    Billing Email
                  </label>
                  <input
                    id="billingEmail"
                    type="email"
                    placeholder="Email address"
                    {...register('billingEmail')}
                    className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-heading"
                  />
                  {errors.billingEmail && <p className="mt-1 text-xs text-red-500">{errors.billingEmail.message}</p>}
                </div>
              </div>

              <p className="text-sm text-description">Order ID that we sent to your in your email address.</p>

              <Button
                type="submit"
              >
                TRACK ORDER
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrackOrderPage
