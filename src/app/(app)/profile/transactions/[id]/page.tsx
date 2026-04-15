'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, CreditCard, Download, FileText, HelpCircle, MapPin, Package } from 'lucide-react'
import { useMemo } from 'react'
import { transactions } from '../transactions-data'
import { useParams } from 'next/navigation'

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

const TransactionDetailPage = () => {
  const params = useParams<{ id: string | string[] }>()
  const routeId = Array.isArray(params.id) ? params.id[0] : params.id

  const transaction = useMemo(
    () => transactions.find((item) => item.id === routeId),
    [routeId]
  )

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
      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-bold text-title">Transaction not found</h1>
        <p className="text-sm text-description">The transaction you requested does not exist in the current dataset.</p>
        <Link href="/profile/transactions" className="inline-flex items-center gap-2 rounded-md bg-main px-4 py-2 text-sm font-medium text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to transactions
        </Link>
      </div>
    )
  }

  const subtotal = Math.abs(transaction.amount)
  const shipping = 29.99
  const processingFee = 2.75

  return (
    <div className="space-y-4">
      <Link href="/profile/transactions" className="inline-flex items-center gap-2 text-sm font-medium text-title hover:text-main">
        <ArrowLeft className="h-4 w-4" />
        Back to Transactions
      </Link>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-4xl font-semibold text-title">{transaction.id}</h1>
              <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${statusStyles[transaction.status]}`}>
                {transaction.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-description">{transaction.date} at {transaction.time}</p>
            <p className="mt-1 text-xs text-description">Receipt: {transaction.receiptNumber}</p>
          </div>

          <button onClick={handleDownload} type="button" className="inline-flex items-center gap-2 rounded-md bg-title px-4 py-2 text-xs font-medium text-white transition hover:opacity-90">
            <Download className="h-3.5 w-3.5" />
            Download Receipt
          </button>
        </div>

        <div className="mt-4 rounded-md bg-red-50 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-red-400">Payment Made</p>
              <p className="text-3xl font-semibold text-red-500">-{currency.format(Math.abs(transaction.amount))}</p>
            </div>
            <span className="rounded bg-white px-2 py-0.5 text-[10px] font-medium text-title">{transaction.type}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.95fr)]">
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-title">
              <FileText className="h-4 w-4 text-description" />
              Charges Breakdown
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between text-description">
                <span>Subtotal</span>
                <span>{currency.format(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-description">
                <span>Shipping</span>
                <span>{currency.format(shipping)}</span>
              </div>
              <div className="flex items-center justify-between text-description">
                <span>Processing Fee</span>
                <span>{currency.format(processingFee)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-2">
                <span className="font-medium text-title">Total Amount</span>
                <span className="font-semibold text-red-500">-{currency.format(Math.abs(transaction.amount))}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-title">
              <Package className="h-4 w-4 text-description" />
              Linked Order
            </h3>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-[#EFF6FF] p-3">
              <div>
                <p className="text-xs text-description">Order Number</p>
                <p className="text-lg font-semibold text-title">{transaction.linkedOrder ?? 'N/A'}</p>
              </div>
              {transaction.linkedOrder ? (
                <Link href={`/profile/orders/${transaction.linkedOrder.replace('#', '')}`} className="inline-flex items-center gap-2 rounded-md bg-title px-4 py-2 text-xs font-medium text-white">
                  View Order
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ) : null}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-title">
              <FileText className="h-4 w-4 text-description" />
              Notes
            </h3>
            <p className="text-sm text-description">{transaction.notes}</p>
          </div>
        </div>

        <aside className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-title">
              <CreditCard className="h-4 w-4 text-description" />
              Payment Method
            </h3>
            <div className="flex items-center gap-3 rounded-md bg-slate-100 p-3">
              <div className="grid h-8 w-8 place-items-center rounded-md bg-main text-white">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-description">{transaction.paymentMethod}</p>
                <p className="text-sm font-medium text-title">{transaction.cardEnding ? `Visa ending in ${transaction.cardEnding}` : 'Card details unavailable'}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-title">
              <MapPin className="h-4 w-4 text-description" />
              Billing Address
            </h3>
            <div className="space-y-1 text-sm text-description">
              <p className="font-medium text-title">{transaction.customerName}</p>
              <p>{transaction.addressLine1}</p>
              <p>{transaction.addressLine2}</p>
              <p>{transaction.billing}, {transaction.location}</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="mb-3 text-xl font-semibold text-title">Transaction Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="border-b border-slate-200 pb-2">
                <p className="text-xs text-description">Transaction ID</p>
                <p className="font-medium text-title">{transaction.id}</p>
              </div>
              <div className="border-b border-slate-200 pb-2">
                <p className="text-xs text-description">Receipt Number</p>
                <p className="font-medium text-title">{transaction.receiptNumber}</p>
              </div>
              <div className="border-b border-slate-200 pb-2">
                <p className="text-xs text-description">Transaction Date</p>
                <p className="font-medium text-title">{transaction.transactionDate}</p>
              </div>
              <div className="border-b border-slate-200 pb-2">
                <p className="text-xs text-description">Transaction Type</p>
                <p className="font-medium text-title">{transaction.type}</p>
              </div>
              <div>
                <p className="text-xs text-description">Status</p>
                <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${statusStyles[transaction.status]}`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-main">
              <HelpCircle className="h-4 w-4" />
              Need Help?
            </h3>
            <p className="text-xs text-description">If you have questions about this transaction, our support team is here to help.</p>
            <button type="button" className="mt-3 w-full rounded-md bg-white px-3 py-2 text-xs font-medium text-title transition hover:bg-slate-100">
              Contact Support
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default TransactionDetailPage
