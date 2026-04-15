"use client"

import { LogOut, X } from 'lucide-react'

type LogoutModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
}

const LogoutModal = ({ isOpen, onClose, onConfirm }: LogoutModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <article className="w-full max-w-sm rounded-2xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>

        <div className="space-y-4 p-5">
          <div className="flex justify-center items-center flex-col gap-3 rounded-xl bg-red-500/8 p-4">
            <div className='p-4 bg-gray-50 rounded-xl'>
                <LogOut className="mt-0.5 size-7 shrink-0 text-red-500" />
            </div>
            <div className='text-center'>
              <p className="text-lg md:text-xl font-semibold text-title">Are you sure you want to logout?</p>
              <p className="mt-1 text-base text-description">You will need to sign in again to access your account.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                onConfirm?.()
                onClose()
              }}
              className="h-10 rounded-lg bg-red-500 text-sm font-semibold text-white hover:bg-red-600 cursor-pointer"
            >
              Logout
            </button>
            <button type="button" onClick={onClose} className="h-10 cursor-pointer rounded-lg bg-muted text-sm font-semibold text-description hover:bg-muted/80">
              Cancel
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}

export default LogoutModal
