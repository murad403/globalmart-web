'use client'

import Link from 'next/link'
import { ArrowLeft, BadgeCheck, CalendarDays, CreditCard, Download, FileText, MapPin, Package, ReceiptText, ShieldCheck, Clock3 } from 'lucide-react'
import { useMemo } from 'react'
import { transactions } from '../transactions-data'

type TransactionPageProps = {
  params: {
    id: string
  }
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

const statusStyles: Record<string, string> = {
  Completed: 'bg-emerald-100 text-emerald-700',
  Processing: 'bg-blue-100 text-blue-700',
  Pending: 'bg-amber-100 text-amber-700',
  Failed: 'bg-red-100 text-red-700',
  Refunded: 'bg-purple-100 text-purple-700'
}

const escapePdf = (value: string) => value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')

const buildPdf = (lines: string[]) => {
  const contentLines = lines
    .map((line, index) => {
      const y = 740 - index * 18
      return `BT /F1 11 Tf 50 ${y} Td (${escapePdf(line)}) Tj ET`
    })
    .join('\n')

  const objects = [
    '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
    '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
    '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj',
    '4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj',
    `5 0 obj << /Length ${contentLines.length} >> stream\n${contentLines}\nendstream endobj`
  ]

  let pdf = '%PDF-1.4\n'
  const offsets: number[] = [0]

  for (const object of objects) {
    offsets.push(pdf.length)
    pdf += `${object}\n`
  }

  const xref = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`

  for (let index = 1; index < offsets.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`
  }

  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`
  return pdf
}

const TransactionDetailPage = ({ params }: TransactionPageProps) => {
  const transaction = useMemo(() => transactions.find((item) => item.id === params.id), [params.id])

  const handleDownload = () => {
    if (!transaction) return

    const pdf = buildPdf([
      'GlobalMart Receipt',
      `Receipt Number: ${transaction.receiptNumber}`,
      `Transaction ID: ${transaction.id}`,
      `Date: ${transaction.transactionDate}`,
      `Time: ${transaction.time}`,
      `Status: ${transaction.status}`,
      `Amount: ${currency.format(transaction.amount)}`,
      `Payment Method: ${transaction.paymentMethod}`,
      `Customer: ${transaction.customerName}`,
      `Billing: ${transaction.addressLine1}`,
      `${transaction.addressLine2}`,
      `Linked Order: ${transaction.linkedOrder ?? 'N/A'}`,
      `Notes: ${transaction.notes}`
    ])

    const blob = new Blob([pdf], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${transaction.id}-receipt.pdf`
    link.click()
    URL.revokeObjectURL(url)
  }

  if (!transaction) {
    return (
      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-title">Transaction not found</h1>
        <p className="text-sm text-description">The transaction you requested does not exist in the current dataset.</p>
        <Link href="/profile/transactions" className="inline-flex items-center gap-2 rounded-md bg-[#155DFC] px-4 py-2 text-sm font-medium text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to transactions
        </Link>
      </div>
    )
  }

  const details = [
    { icon: ReceiptText, label: 'Receipt Number', value: transaction.receiptNumber },
    { icon: CalendarDays, label: 'Transaction Date', value: transaction.transactionDate },
    { icon: Clock3, label: 'Transaction Time', value: transaction.time },
    { icon: CreditCard, label: 'Payment Method', value: transaction.paymentMethod },
    { icon: Package, label: 'Linked Order', value: transaction.linkedOrder ?? '—' },
    { icon: MapPin, label: 'Billing Location', value: transaction.billing }
  ]

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/profile/transactions" className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-[#155DFC] hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to transactions
          </Link>
          <h1 className="text-2xl font-bold text-title">Transaction Details</h1>
          <p className="text-sm text-description">Review the receipt, payment metadata, and billing information.</p>
        </div>

        <button onClick={handleDownload} type="button" className="inline-flex items-center gap-2 rounded-md bg-[#155DFC] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#0f4bce]">
          <Download className="h-4 w-4" />
          Download Receipt
        </button>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.8fr)]">
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-description">Receipt</p>
                <h2 className="mt-1 text-xl font-semibold text-title">{transaction.receiptNumber}</h2>
                <p className="mt-1 text-sm text-description">Transaction ID {transaction.id}</p>
              </div>
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[transaction.status]}`}>
                {transaction.status}
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {details.map((detail) => {
                const Icon = detail.icon
                return (
                  <div key={detail.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-description">
                      <Icon className="h-4 w-4" />
                      {detail.label}
                    </div>
                    <p className="mt-2 text-sm font-semibold text-title">{detail.value}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <div>
                  <p className="text-xs text-description">Amount</p>
                  <p className={`text-2xl font-bold ${transaction.amount < 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                    {transaction.amount < 0 ? '-' : '+'}{currency.format(Math.abs(transaction.amount))}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-description">Type</p>
                  <p className="text-sm font-semibold text-title">{transaction.type}</p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="text-xs text-description">Customer</p>
                  <p className="mt-1 text-sm font-semibold text-title">{transaction.customerName}</p>
                  <p className="text-sm text-description">{transaction.addressLine1}</p>
                  <p className="text-sm text-description">{transaction.addressLine2}</p>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="text-xs text-description">Notes</p>
                  <p className="mt-1 text-sm text-description">{transaction.notes}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <ShieldCheck className="h-5 w-5 text-main" />
              <h3 className="text-base font-semibold text-title">Payment Summary</h3>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-description">Method</p>
                <p className="mt-1 text-sm font-semibold text-title">{transaction.paymentMethod}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-description">Card Ending</p>
                <p className="mt-1 text-sm font-semibold text-title">{transaction.cardEnding ? `**** ${transaction.cardEnding}` : 'N/A'}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-description">Linked Order</p>
                <p className="mt-1 text-sm font-semibold text-title">{transaction.linkedOrder ?? '—'}</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <BadgeCheck className="h-5 w-5 text-emerald-600" />
              <h3 className="text-base font-semibold text-title">Transaction Snapshot</h3>
            </div>

            <div className="mt-4 space-y-4">
              <div className="rounded-xl bg-[#f8fafc] p-4">
                <p className="text-xs text-description">Amount</p>
                <p className={`mt-1 text-3xl font-bold ${transaction.amount < 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                  {transaction.amount < 0 ? '-' : '+'}{currency.format(Math.abs(transaction.amount))}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-title">Current Status</p>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[transaction.status]}`}>{transaction.status}</span>
                </div>
                <p className="mt-2 text-sm text-description">This payment is linked to your order and receipt record.</p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-main" />
                  <p className="text-sm font-medium text-title">Reference</p>
                </div>
                <p className="mt-2 text-sm text-description">{transaction.receiptNumber}</p>
                <p className="text-sm text-description">{transaction.transactionDate}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <Package className="h-5 w-5 text-main" />
              <h3 className="text-base font-semibold text-title">Order Link</h3>
            </div>

            <div className="mt-4 rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-description">Related order</p>
              <p className="mt-1 text-lg font-semibold text-title">{transaction.linkedOrder ?? 'No linked order'}</p>
              <p className="mt-2 text-sm text-description">Review the order page if you need fulfillment or shipping details.</p>
              {transaction.linkedOrder ? (
                <Link href={`/profile/orders/${transaction.linkedOrder.replace('#', '')}`} className="mt-4 inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-[#155DFC] shadow-sm transition hover:bg-slate-100">
                  Open Order
                </Link>
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <MapPin className="h-5 w-5 text-main" />
              <h3 className="text-base font-semibold text-title">Billing Address</h3>
            </div>

            <div className="mt-4 space-y-1 text-sm text-description">
              <p className="font-medium text-title">{transaction.customerName}</p>
              <p>{transaction.addressLine1}</p>
              <p>{transaction.addressLine2}</p>
              <p>{transaction.billing}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default TransactionDetailPage
