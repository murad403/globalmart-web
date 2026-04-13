'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Send, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

type CancelOrderModalProps = {
  open: boolean
  onClose: () => void
}

const reasonOptions = [
  'Changed My Mind',
  'Shipping Time Too Long',
  'The Delivery Time is Too Late',
  'Other'
]

const CancelOrderModal = ({ open, onClose }: CancelOrderModalProps) => {
  const router = useRouter()
  const [selectedReason, setSelectedReason] = useState('')
  const [otherReason, setOtherReason] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  if (!open) {
    return null
  }

  const closeAll = () => {
    setSelectedReason('')
    setOtherReason('')
    setShowSuccess(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/35 p-4">
      {!showSuccess ? (
        <div className="w-full max-w-xl rounded-4xl bg-white shadow-2xl ">
          <div className="flex items-start justify-between border-b border-slate-200 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-title">Why do you want to cancel the order?</h2>
            <button
              type="button"
              onClick={closeAll}
              className="rounded-md p-1 text-description hover:bg-slate-100"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4 p-6 md:p-8">
            {reasonOptions.map((reason) => {
              const isActive = selectedReason === reason
              return (
                <label key={reason} className="flex cursor-pointer font-semibold items-center gap-2 text-base md:text-lg text-title">
                  <input
                    type="radio"
                    value={reason}
                    checked={isActive}
                    onChange={() => setSelectedReason(reason)}
                    className="sr-only"
                  />
                  <span className={`inline-flex size-4 rounded-full border ${isActive ? 'border-[#ff6900]' : 'border-slate-300'} items-center justify-center`}>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#ff6900]" />}
                  </span>
                  {reason}
                </label>
              )
            })}

            {selectedReason === 'Other' && (
              <textarea
                value={otherReason}
                onChange={(event) => setOtherReason(event.target.value)}
                placeholder="Write a reason"
                className="mt-2 min-h-30 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm outline-none"
              />
            )}
          </div>

          {selectedReason && (
            <div className="flex items-center gap-3 px-5 pb-5 pt-1">
              <button
                type="button"
                onClick={closeAll}
                className="h-10 flex-1 rounded-lg border border-slate-300 bg-white text-sm cursor-pointer font-semibold text-title hover:bg-slate-50"
              >
                No, I Need the Order
              </button>
              <button
                type="button"
                onClick={() => setShowSuccess(true)}
                className="h-10 flex-1 rounded-lg bg-[#ff6900] cursor-pointer text-sm font-semibold text-white hover:bg-[#eb6103]"
              >
                Yes, Cancel the order
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full max-w-xl rounded-4xl bg-white p-6 md:p-8 text-center shadow-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF1E8] text-[#ff6900]">
            <Send className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-3xl font-semibold text-title">Order Canceled Successfully!</h2>
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={closeAll}
              className="h-11 flex-1 cursor-pointer rounded-lg border border-[#ff6900] bg-white text-sm font-semibold text-title hover:bg-slate-50"
            >
              Close
            </button>
            <Button
            className='w-1/2'
              type="button"
              onClick={() => {
                closeAll()
                router.push('/')
              }}
              
            >
              Back Home
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CancelOrderModal
