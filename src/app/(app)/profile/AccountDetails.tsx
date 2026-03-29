'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'

const infoSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  displayName: z.string().min(2, 'Display name is required'),
  email: z.string().email('Invalid email address')
})

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, 'Old password is required'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    repeatNewPassword: z.string().min(6, 'Repeat password is required')
  })
  .refine((values) => values.newPassword === values.repeatNewPassword, {
    message: 'Passwords do not match',
    path: ['repeatNewPassword']
  })

type InfoFormValues = z.infer<typeof infoSchema>
type PasswordFormValues = z.infer<typeof changePasswordSchema>

const AccountDetails = () => {
  const {
    register: registerInfo,
    handleSubmit: handleInfoSubmit,
    formState: { errors: infoErrors }
  } = useForm<InfoFormValues>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      firstName: 'Sofia',
      lastName: 'Havertz',
      displayName: 'Sofia',
      email: 'sofiahavertz@gmail.com'
    }
  })

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors }
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      repeatNewPassword: ''
    }
  })

  const onSubmitInformation = () => {
    // Persist profile information with API integration.
  }

  const onSubmitChangePassword = () => {
    // Persist password change with API integration.
    resetPasswordForm()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-title">Account Details</h2>

      <form onSubmit={handleInfoSubmit(onSubmitInformation)} className="space-y-5 rounded-xl border border-slate-200 p-4">
        <div>
          <label htmlFor="firstName" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-description">
            First Name *
          </label>
          <input
            id="firstName"
            type="text"
            {...registerInfo('firstName')}
            className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-main"
          />
          {infoErrors.firstName && <p className="mt-1 text-xs text-red-500">{infoErrors.firstName.message}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-description">
            Last Name *
          </label>
          <input
            id="lastName"
            type="text"
            {...registerInfo('lastName')}
            className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-main"
          />
          {infoErrors.lastName && <p className="mt-1 text-xs text-red-500">{infoErrors.lastName.message}</p>}
        </div>

        <div>
          <label htmlFor="displayName" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-description">
            Display Name *
          </label>
          <input
            id="displayName"
            type="text"
            {...registerInfo('displayName')}
            className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-main"
          />
          <p className="mt-1 text-xs text-description">This will be how your name will be displayed.</p>
          {infoErrors.displayName && <p className="mt-1 text-xs text-red-500">{infoErrors.displayName.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-description">
            Email
          </label>
          <input
            id="email"
            type="email"
            readOnly
            {...registerInfo('email')}
            className="w-full cursor-not-allowed rounded-md border border-slate-200 bg-slate-100 px-3 py-2.5 text-sm text-description outline-none"
          />
          {infoErrors.email && <p className="mt-1 text-xs text-red-500">{infoErrors.email.message}</p>}
        </div>

        <Button type="submit" className="mt-1">
          Save details
        </Button>
      </form>

      <form onSubmit={handlePasswordSubmit(onSubmitChangePassword)} className="space-y-4 rounded-xl border border-slate-200 p-4">
        <h3 className="text-lg font-semibold text-title">Password</h3>

        <div>
          <label htmlFor="oldPassword" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-description">
            Old Password
          </label>
          <input
            id="oldPassword"
            type="password"
            placeholder="Old password"
            {...registerPassword('oldPassword')}
            className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-main"
          />
          {passwordErrors.oldPassword && <p className="mt-1 text-xs text-red-500">{passwordErrors.oldPassword.message}</p>}
        </div>

        <div>
          <label htmlFor="newPassword" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-description">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            placeholder="New password"
            {...registerPassword('newPassword')}
            className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-main"
          />
          {passwordErrors.newPassword && <p className="mt-1 text-xs text-red-500">{passwordErrors.newPassword.message}</p>}
        </div>

        <div>
          <label htmlFor="repeatNewPassword" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-description">
            Repeat New Password
          </label>
          <input
            id="repeatNewPassword"
            type="password"
            placeholder="Repeat new password"
            {...registerPassword('repeatNewPassword')}
            className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-main"
          />
          {passwordErrors.repeatNewPassword && (
            <p className="mt-1 text-xs text-red-500">{passwordErrors.repeatNewPassword.message}</p>
          )}
        </div>

        <Button type="submit">Change password</Button>
      </form>
    </div>
  )
}

export default AccountDetails