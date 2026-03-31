"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import SettingsShell from "../SettingsShell"

const orderSettingsSchema = z.object({
  shippingMethod: z.string().min(1, "Select a shipping method"),
  paymentMethod: z.string().min(1, "Select a payment method"),
})

type OrderSettingsValues = z.infer<typeof orderSettingsSchema>

export default function OrderSettingsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderSettingsValues>({
    resolver: zodResolver(orderSettingsSchema),
    defaultValues: {
      shippingMethod: "Standard Shipping",
      paymentMethod: "Card",
    },
  })

  const onSubmit = (values: OrderSettingsValues) => {
    console.log("Order settings updated", values)
  }

  return (
    <SettingsShell title="Order Settings" description="Configure order processing defaults">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-title">Default Shipping Method</label>
          <select {...register("shippingMethod")} className="h-11 w-full rounded-lg border border-input bg-background px-3 outline-none focus:border-main">
            <option>Standard Shipping</option>
            <option>Express Shipping</option>
            <option>Next Day Shipping</option>
          </select>
          {errors.shippingMethod && <p className="mt-1 text-xs text-red-500">{errors.shippingMethod.message}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-title">Default Payment Method</label>
          <select {...register("paymentMethod")} className="h-11 w-full rounded-lg border border-input bg-background px-3 outline-none focus:border-main">
            <option>Card</option>
            <option>Bank Transfer</option>
            <option>Cash on Delivery</option>
          </select>
          {errors.paymentMethod && <p className="mt-1 text-xs text-red-500">{errors.paymentMethod.message}</p>}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="h-10 cursor-pointer rounded-lg bg-main px-5 text-sm font-semibold text-white hover:opacity-90">
            Save Changes
          </button>
          <button type="reset" className="text-sm cursor-pointer font-medium text-description hover:text-title">
            Cancel
          </button>
        </div>
      </form>
    </SettingsShell>
  )
}

