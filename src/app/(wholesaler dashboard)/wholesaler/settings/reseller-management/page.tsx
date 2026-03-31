"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import SettingsShell from "../SettingsShell"

const resellerSchema = z.object({
  resellerName: z.string().min(2, "Reseller name is required"),
  resellerContact: z.string().min(2, "Contact is required"),
  resellerEmail: z.string().email("Enter a valid email"),
  resellerPhone: z.string().min(7, "Phone is required"),
  resellerAddress: z.string().min(5, "Address is required"),
})

type ResellerValues = z.infer<typeof resellerSchema>

export default function ResellerManagementPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResellerValues>({
    resolver: zodResolver(resellerSchema),
    defaultValues: {
      resellerName: "Tech Solutions",
      resellerContact: "Jane Doe",
      resellerEmail: "reseller@techsolutions.com",
      resellerPhone: "+1 (555) 987-6543",
      resellerAddress: "Address",
    },
  })

  const onSubmit = (values: ResellerValues) => {
    console.log("Reseller management updated", values)
  }

  return (
    <SettingsShell title="Reseller Management" description="Manage partner profile and contact information">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-title">Reseller Name</label>
          <input {...register("resellerName")} className="h-11 w-full rounded-lg border border-input px-3 outline-none focus:border-main" />
          {errors.resellerName && <p className="mt-1 text-xs text-red-500">{errors.resellerName.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-title">Reseller Contact</label>
          <input {...register("resellerContact")} className="h-11 w-full rounded-lg border border-input px-3 outline-none focus:border-main" />
          {errors.resellerContact && <p className="mt-1 text-xs text-red-500">{errors.resellerContact.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-title">Reseller Email</label>
          <input {...register("resellerEmail")} className="h-11 w-full rounded-lg border border-input px-3 outline-none focus:border-main" />
          {errors.resellerEmail && <p className="mt-1 text-xs text-red-500">{errors.resellerEmail.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-title">Reseller Phone</label>
          <input {...register("resellerPhone")} className="h-11 w-full rounded-lg border border-input px-3 outline-none focus:border-main" />
          {errors.resellerPhone && <p className="mt-1 text-xs text-red-500">{errors.resellerPhone.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-title">Reseller Address</label>
          <textarea {...register("resellerAddress")} rows={4} className="w-full rounded-lg border border-input px-3 py-2 outline-none focus:border-main" />
          {errors.resellerAddress && <p className="mt-1 text-xs text-red-500">{errors.resellerAddress.message}</p>}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="h-10 cursor-pointer rounded-lg bg-main px-5 text-sm font-semibold text-white hover:opacity-90">
            Add Reseller
          </button>
          <button type="reset" className="text-sm cursor-pointer font-medium text-description hover:text-title">
            Cancel
          </button>
        </div>
      </form>
    </SettingsShell>
  )
}

