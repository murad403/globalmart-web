"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import SettingsShell from "./SettingsShell"
import { useRef, useState } from "react"
import Image from "next/image"

const businessProfileSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  contactPerson: z.string().min(2, "Contact person is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Phone is required"),
  address: z.string().min(5, "Address is required"),
})

type BusinessProfileValues = z.infer<typeof businessProfileSchema>

export default function SettingsPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessProfileValues>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: {
      businessName: "Premium Wholesaler",
      contactPerson: "John Smith",
      email: "admin@globalmart.com",
      phone: "+1 (555) 123-4567",
      address: "Address",
    },
  })

  const onSubmit = (values: BusinessProfileValues) => {
    console.log("Business profile updated", values, { image: uploadedImage })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setUploadedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <SettingsShell title="Business Profile" description="Update your company profile details">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[72px_1fr] sm:items-center">
          <div className="relative grid size-16 place-items-center rounded-full bg-main text-3xl font-semibold text-white overflow-hidden">
            {uploadedImage ? (
              <Image 
                src={uploadedImage} 
                alt="Profile" 
                fill
                className="object-cover"
              />
            ) : (
              "P"
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button 
              type="button" 
              onClick={() => fileInputRef.current?.click()}
              className="h-10 rounded-lg bg-main px-4 cursor-pointer text-sm font-semibold text-white hover:opacity-90"
            >
              Upload New Photo
            </button>
            {uploadedImage && (
              <button 
                type="button" 
                onClick={handleRemoveImage}
                className="text-sm font-medium text-description hover:text-title"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-title">Business Name</label>
            <input {...register("businessName")} className="h-11 w-full rounded-lg border border-input px-3 outline-none focus:border-main" />
            {errors.businessName && <p className="mt-1 text-xs text-red-500">{errors.businessName.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-title">Contact Person</label>
            <input {...register("contactPerson")} className="h-11 w-full rounded-lg border border-input px-3 outline-none focus:border-main" />
            {errors.contactPerson && <p className="mt-1 text-xs text-red-500">{errors.contactPerson.message}</p>}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-title">Email Address</label>
          <input {...register("email")} className="h-11 w-full rounded-lg border border-input px-3 outline-none focus:border-main" />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-title">Phone Number</label>
          <input {...register("phone")} className="h-11 w-full rounded-lg border border-input px-3 outline-none focus:border-main" />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-title">Business Address</label>
          <textarea {...register("address")} rows={4} className="w-full rounded-lg border border-input px-3 py-2 outline-none focus:border-main" />
          {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="h-10 cursor-pointer rounded-lg bg-main px-5 text-sm font-semibold text-white hover:opacity-90">
            Save Changes
          </button>
          <button type="reset" className="text-sm font-medium cursor-pointer text-description hover:text-title">
            Cancel
          </button>
        </div>
      </form>
    </SettingsShell>
  )
}

