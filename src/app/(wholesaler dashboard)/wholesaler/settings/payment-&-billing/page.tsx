"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import SettingsShell from "../SettingsShell"

const paymentSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  taxId: z.string().min(3, "Tax ID is required"),
  billingAddress: z.string().min(5, "Billing address is required"),
})

type PaymentValues = z.infer<typeof paymentSchema>

export default function PaymentBillingPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      companyName: "Premium Wholesaler LLC",
      taxId: "XX-XXXXXXX",
      billingAddress: "Billing Address",
    },
  })

  const onSubmit = (values: PaymentValues) => {
    console.log("Payment updated", values)
  }

  return (
    <SettingsShell title="Payment & Billing" description="Manage billing details and payment history">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-title">Payment Method</label>
          <div className="flex items-center justify-between rounded-lg border border-input px-3 py-2.5">
            <div>
              <p className="text-sm font-semibold text-title">VISA •••• •••• •••• 4532</p>
              <p className="text-xs text-description">Expires 12/25</p>
            </div>
            <button type="button" className="text-sm font-medium text-main hover:opacity-80">
              Edit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-title">Billing Name</label>
            <input {...register("companyName")} className="h-11 w-full rounded-lg border border-input px-3 outline-none focus:border-main" />
            {errors.companyName && <p className="mt-1 text-xs text-red-500">{errors.companyName.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-title">Tax ID</label>
            <input {...register("taxId")} className="h-11 w-full rounded-lg border border-input px-3 outline-none focus:border-main" />
            {errors.taxId && <p className="mt-1 text-xs text-red-500">{errors.taxId.message}</p>}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-title">Billing Address</label>
          <textarea {...register("billingAddress")} rows={3} className="w-full rounded-lg border border-input px-3 py-2 outline-none focus:border-main" />
          {errors.billingAddress && <p className="mt-1 text-xs text-red-500">{errors.billingAddress.message}</p>}
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button type="submit" className="h-10 cursor-pointer rounded-lg bg-main px-5 text-sm font-semibold text-white hover:opacity-90">
            Save Changes
          </button>
          <button type="reset" className="text-sm cursor-pointer font-medium text-description hover:text-title">
            Cancel
          </button>
        </div>

        <div className="border-t border-border pt-5">
          <h3 className="text-xl font-semibold text-title">Billing History</h3>
          <div className="mt-3 space-y-2.5">
            {[
              { date: "March 1, 2026", amount: "$299.00" },
              { date: "February 1, 2026", amount: "$299.00" },
              { date: "January 1, 2026", amount: "$299.00" },
            ].map((row) => (
              <div key={row.date} className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
                <div>
                  <p className="text-sm font-medium text-title">{row.date}</p>
                  <p className="text-xs text-description">Monthly Subscription</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-semibold text-title">{row.amount}</p>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-700">Paid</span>
                  <button type="button" className="text-sm cursor-pointer font-medium text-main hover:opacity-80">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </SettingsShell>
  )
}

