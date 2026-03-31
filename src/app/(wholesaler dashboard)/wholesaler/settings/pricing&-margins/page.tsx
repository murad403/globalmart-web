"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import SettingsShell from "../SettingsShell"

const pricingSchema = z.object({
  basePrice: z.number().positive("Base price must be greater than 0"),
  marginPercent: z.number().min(0, "Margin can't be negative").max(100, "Margin max 100"),
})

type PricingValues = z.infer<typeof pricingSchema>

export default function PricingMarginsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PricingValues>({
    resolver: zodResolver(pricingSchema),
    defaultValues: {
      basePrice: 100,
      marginPercent: 20,
    },
  })

  const onSubmit = (values: PricingValues) => {
    console.log("Pricing updated", values)
  }

  return (
    <SettingsShell title="Pricing & Margins" description="Configure default pricing values">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-title">Base Price</label>
          <input type="number" {...register("basePrice", { valueAsNumber: true })} className="h-11 w-full rounded-lg border border-input px-3 outline-none focus:border-main" />
          {errors.basePrice && <p className="mt-1 text-xs text-red-500">{errors.basePrice.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-title">Margin Percentage</label>
          <input type="number" {...register("marginPercent", { valueAsNumber: true })} className="h-11 w-full rounded-lg border border-input px-3 outline-none focus:border-main" />
          {errors.marginPercent && <p className="mt-1 text-xs text-red-500">{errors.marginPercent.message}</p>}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="h-10 cursor-pointer rounded-lg bg-main px-5 text-sm font-semibold text-white hover:opacity-90">
            Update Pricing
          </button>
          <button type="reset" className="text-sm  cursor-pointer font-medium text-description hover:text-title">
            Cancel
          </button>
        </div>
      </form>
    </SettingsShell>
  )
}

