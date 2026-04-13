import React from 'react'
import { Button } from '@/components/ui/button'
import image1 from "@/assets/payments/137711f8afd986860e094b48ab9e48f671ec869e.png"
import image2 from "@/assets/payments/9fee8a76868be811565b3e077a73d36c7247004b.png"
import image3 from "@/assets/payments/Visa.png"
import image4 from "@/assets/payments/be216f0283031cddf7abbb56c2905c781dc33be0.png"
import image5 from "@/assets/payments/e3af8ff701be771d45867b7fbd7e215e12aa386c.png"
import Image from 'next/image'

type VoucherPromoCardProps = {
    totalProduct: number
    tax: number
    voucher: number
    totalPayment: number
    actionLabel?: string
    actionType?: 'button' | 'submit'
    form?: string
    onAction?: () => void
    disabled?: boolean
    className?: string
}

const formatMoney = (value: number) => {
    const absValue = Math.abs(value)
    const sign = value < 0 ? '-' : ''
    return `${sign}$${absValue.toFixed(0)}`
}

const VoucherPromoCard = ({ totalProduct, tax, voucher, totalPayment, actionLabel = 'Continue', actionType = 'button', form, onAction, disabled, className = '' }: VoucherPromoCardProps) => {
    return (
        <div className=''>
            <div className={`h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
                <h2 className="text-lg font-semibold text-title">Voucher & promo</h2>

                <div className="mt-4 space-y-2 text-sm text-description">
                    <div className="flex items-center justify-between">
                        <span>Total product</span>
                        <span className="font-medium text-title">{formatMoney(totalProduct)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Tax</span>
                        <span className="font-medium text-title">{formatMoney(tax)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Voucher & promo</span>
                        <span className="font-medium text-title">{formatMoney(-voucher)}</span>
                    </div>
                </div>

                <div className="mt-4 border-t border-slate-200 pt-4">
                    <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-title">Total payment</span>
                        <span className="text-2xl font-bold text-title">{formatMoney(totalPayment)}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm text-description">
                        <span>Voucher & promo</span>
                        <span className="font-medium text-title">{formatMoney(-voucher)}</span>
                    </div>

                    <Button
                        type={actionType}
                        form={form}
                        onClick={onAction}
                        disabled={disabled}
                        className="mt-4 w-full"
                    >
                        {actionLabel}
                    </Button>
                </div>

            </div>
            <div className="mt-4 border-t border-slate-200 pt-4">
                <p className="text-center text-xs text-description">Accepted payment methods :</p>
                <div className="mt-3 flex items-center justify-center gap-3">
                    <Image src={image1} alt="Payment Method 1" width={40} height={40} />
                    <Image src={image2} alt="Payment Method 2" width={40} height={24} />
                    <Image src={image3} alt="Payment Method 3" width={40} height={24} />
                    <Image src={image4} alt="Payment Method 4" width={40} height={24} />
                    <Image src={image5} alt="Payment Method 5" width={40} height={24} />
                </div>
            </div>
        </div>
    )
}

export default VoucherPromoCard
