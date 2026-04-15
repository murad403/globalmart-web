"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import SettingsShell from "../SettingsShell"

const notificationsSchema = z.object({
  orderUpdates: z.boolean(),
  newResellerRegistration: z.boolean(),
  lowStockAlerts: z.boolean(),
  weeklyReports: z.boolean(),
  marketingUpdates: z.boolean(),
})

type NotificationsValues = z.infer<typeof notificationsSchema>

const notificationItems: Array<{ key: keyof NotificationsValues; title: string; subtitle: string }> = [
  { key: "orderUpdates", title: "Order Updates", subtitle: "Receive notifications about order status changes" },
  { key: "newResellerRegistration", title: "New Reseller Registration", subtitle: "Get notified when a new reseller joins your network" },
  { key: "lowStockAlerts", title: "Low Stock Alerts", subtitle: "Receive alerts when product inventory is running low" },
  { key: "weeklyReports", title: "Weekly Reports", subtitle: "Receive weekly performance and sales reports" },
  { key: "marketingUpdates", title: "Marketing Updates", subtitle: "Receive promotional offers and marketing updates" },
]

export default function NotificationsPage() {
  const defaultValues: NotificationsValues = {
    orderUpdates: true,
    newResellerRegistration: true,
    lowStockAlerts: true,
    weeklyReports: false,
    marketingUpdates: false,
  }

  const { handleSubmit, setValue } = useForm<NotificationsValues>({
    resolver: zodResolver(notificationsSchema),
    defaultValues,
  })

  const [toggleValues, setToggleValues] = useState<NotificationsValues>(defaultValues)

  const onSubmit = (formValues: NotificationsValues) => {
    console.log("Notifications updated", formValues)
  }

  return (
    <SettingsShell title="Notifications" description="Choose which updates you receive">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {notificationItems.map((item) => (
          <div key={item.key} className="flex items-start justify-between gap-4">
            <div>
              <p className="text-base font-medium text-title">{item.title}</p>
              <p className="text-xs text-description">{item.subtitle}</p>
            </div>

            <button
              type="button"
              onClick={() => {
                const nextValue = !toggleValues[item.key]
                setToggleValues((prev) => ({ ...prev, [item.key]: nextValue }))
                setValue(item.key, nextValue, { shouldValidate: true })
              }}
              className={`relative h-6 w-10 rounded-full transition ${toggleValues[item.key] ? "bg-main" : "bg-muted"}`}
              aria-label={`Toggle ${item.title}`}
            >
              <span
                className={`absolute top-1 size-4 rounded-full bg-white transition ${toggleValues[item.key] ? "right-1" : "left-1"}`}
              />
            </button>
          </div>
        ))}

        <div className="pt-2">
          <button type="submit" className="h-10 rounded-lg bg-main px-5 text-sm font-semibold text-white hover:opacity-90 cursor-pointer">
            Save Changes
          </button>
        </div>
      </form>
    </SettingsShell>
  )
}

