'use client'

import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Pencil } from 'lucide-react'
import authImage from '@/assets/auth/auth.png'
import { Button } from '@/components/ui/button'

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.email('Enter a valid email'),
  phone: z.string().min(7, 'Phone number is required'),
  birthDate: z.string().min(1, 'Birth date is required'),
  gender: z.string().min(1, 'Gender is required')
})

type ProfileFormValues = z.infer<typeof profileSchema>

const ProfilePage = () => {
  const { register, handleSubmit, formState: { errors }, setFocus } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: 'Marvin',
      lastName: 'McKinney',
      email: 'Marvinmckinney@mail.com',
      phone: '+11762396',
      birthDate: '2000-01-01',
      gender: 'Male'
    }
  })

  const [isEditing, setIsEditing] = useState(false)

  const onSubmit = (values: ProfileFormValues) => {
    console.log('Profile updated', values)
    setIsEditing(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setTimeout(() => setFocus('firstName'), 0)
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-title">My profile</h1>

      <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4 flex-col md:flex-row">
            <div className="relative h-22 w-22 overflow-hidden rounded-full border-6 border-emerald-100">
              <Image src={authImage} alt="Profile" fill className="object-cover" sizes="88px" />
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-title">Marvin McKinney</h2>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-description">
                <span>Marvinmckinney@mail.com</span>
                <span className="rounded bg-indigo-600 px-2 py-0.5 text-xs text-white">verified</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-description">
                <span>+11762396</span>
                <span className="rounded bg-indigo-600 px-2 py-0.5 text-xs text-white">verified</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleEdit}
            className="flex gap-2 text-sm font-semibold text-heading cursor-pointer"
          >
            <Pencil className="h-3.5 w-3.5 mt-1" />
           <span>Edit</span>
          </button>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold text-title mt-6">Personal information</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 rounded-3xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-description">Fast Name</label>
            <input
              {...register('firstName')}
              disabled={!isEditing}
              className="h-11 w-full rounded-md border border-slate-200 bg-slate-100 px-3 text-sm text-title outline-none disabled:opacity-100"
            />
            {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm text-description">Last Name</label>
            <input
              {...register('lastName')}
              disabled={!isEditing}
              className="h-11 w-full rounded-md border border-slate-200 bg-slate-100 px-3 text-sm text-title outline-none disabled:opacity-100"
            />
            {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm text-description">Email</label>
            <input
              {...register('email')}
              disabled
              className="h-11 w-full rounded-md border border-slate-200 bg-slate-100 px-3 text-sm text-title outline-none opacity-100"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm text-description">Phone number</label>
            <input
              {...register('phone')}
              disabled={!isEditing}
              className="h-11 w-full rounded-md border border-slate-200 bg-slate-100 px-3 text-sm text-title outline-none disabled:opacity-100"
            />
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm text-description">Date of birth</label>
            <input
              type="date"
              {...register('birthDate')}
              disabled={!isEditing}
              className="h-11 w-full rounded-md border border-slate-200 bg-slate-100 px-3 text-sm text-title outline-none disabled:opacity-100"
            />
            {errors.birthDate && <p className="mt-1 text-xs text-red-500">{errors.birthDate.message}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm text-description">Gender</label>
            <select
              {...register('gender')}
              disabled={!isEditing}
              className="h-11 w-full rounded-md border border-slate-200 bg-slate-100 px-3 text-sm text-title outline-none disabled:opacity-100"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender.message}</p>}
          </div>
        </div>

        <div className="mt-7 flex justify-center">
          <Button type="submit">
            Save changes
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProfilePage
