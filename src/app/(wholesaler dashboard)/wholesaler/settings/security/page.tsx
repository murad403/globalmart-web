"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import SettingsShell from "../SettingsShell"

const securitySchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

type SecurityValues = z.infer<typeof securitySchema>

export default function SecurityPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SecurityValues>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (values: SecurityValues) => {
    console.log("Security updated", values)
  }

  return (
    <SettingsShell title="Security" description="Manage password and account protection">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-title">Current Password</label>
          <input type="password" placeholder="Enter current password" {...register("currentPassword")} className="h-11 w-full rounded-lg border border-input px-3 outline-none focus:border-main" />
          {errors.currentPassword && <p className="mt-1 text-xs text-red-500">{errors.currentPassword.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-title">New Password</label>
          <input type="password" placeholder="Enter new password" {...register("newPassword")} className="h-11 w-full rounded-lg border border-input px-3 outline-none focus:border-main" />
          {errors.newPassword && <p className="mt-1 text-xs text-red-500">{errors.newPassword.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-title">Confirm New Password</label>
          <input type="password" placeholder="Confirm new password" {...register("confirmPassword")} className="h-11 w-full rounded-lg border border-input px-3 outline-none focus:border-main" />
          {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="h-10 cursor-pointer rounded-lg bg-main px-5 text-sm font-semibold text-white hover:opacity-90">
            Update Password
          </button>
          <button type="reset" className="text-sm cursor-pointer font-medium text-description hover:text-title">
            Cancel
          </button>
        </div>
      </form>
    </SettingsShell>
  )
}

