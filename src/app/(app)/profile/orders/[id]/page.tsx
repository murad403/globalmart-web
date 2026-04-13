import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CircleAlert, Download, Eye, LocateFixed, MapPin, Package, ReceiptText, RefreshCcw, RotateCcw, Truck } from 'lucide-react'
import { notFound } from 'next/navigation'
import { profileOrders } from '../../orders-data'

const badgeClass: Record<string, string> = {
  Delivered: 'bg-emerald-100 text-emerald-700',
  Shipped: 'bg-violet-100 text-violet-700',
  Processing: 'bg-blue-100 text-blue-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Canceled: 'bg-red-100 text-red-700'
}

type PageProps = {
  params: Promise<{ id: string }>
}

const OrderDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params
  const order = profileOrders.find((item) => item.id === id)

  if (!order) {
    notFound()
  }

  const productTotal = order.products.reduce((sum, item) => sum + item.price, 0)
  const shippingAmount = order.status === 'Canceled' ? 29.99 : 29.99
  const taxAmount = order.status === 'Canceled' ? 0 : 20

  return (
    <div>
      <Link href="/profile/addresses" className="inline-flex items-center gap-2 text-sm font-medium text-title hover:text-[#ff6900]">
        <ArrowLeft className="h-4 w-4" />
        Back to Orders
      </Link>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-[38px] font-bold text-title">Order #{order.id}</h1>
            <p className="mt-1 text-sm text-description">Placed on {order.date}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeClass[order.status]}`}>
              {order.status}
            </span>

            <button type="button" className="inline-flex h-9 items-center gap-1 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-title hover:bg-slate-50">
              <Download className="h-3.5 w-3.5" />
              Download Invoice
            </button>

            {order.status !== 'Canceled' && (
              <>
                <button type="button" className="inline-flex h-9 items-center gap-1 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-title hover:bg-slate-50">
                  <RotateCcw className="h-3.5 w-3.5" />
                  Return Product
                </button>
                <button type="button" className="inline-flex h-9 items-center gap-1 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-title hover:bg-slate-50">
                  <RefreshCcw className="h-3.5 w-3.5" />
                  Reorder
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {order.status === 'Canceled' && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <div className="flex items-start gap-2">
            <CircleAlert className="mt-0.5 h-4 w-4" />
            <div>
              <p className="text-sm font-semibold">Order Canceled</p>
              <p className="text-xs">This order was canceled on {order.cancellationDate} by {order.canceledBy}.</p>
              <p className="text-xs">Reason: {order.cancellationReason}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="text-2xl font-semibold text-title">Products Ordered</h2>

            <div className="mt-2 divide-y divide-slate-200">
              {order.products.map((product) => (
                <div key={`${order.id}-${product.name}`} className="flex items-start justify-between gap-3 py-3">
                  <div className="flex items-start gap-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-slate-200">
                      <Image src={product.image} alt={product.name} fill className="object-cover" sizes="64px" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-title">{product.name}</p>
                      <p className="text-xs text-description">Size: {product.size}, Color: {product.color}</p>
                      <p className="text-xs text-description">Quantity: {product.qty}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-title">${product.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 space-y-1 border-t border-slate-200 pt-3 text-sm">
              <div className="flex items-center justify-between text-description">
                <span>Subtotal</span>
                <span>${productTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-description">
                <span>Shipping</span>
                <span>${shippingAmount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-description">
                <span>Tax</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between pt-1 text-base font-semibold text-title">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {order.status !== 'Canceled' && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-title">
                <Truck className="h-4 w-4" />
                Tracking Information
              </h2>

              <div className="mt-3 rounded-lg bg-[#f3f8ff] px-3 py-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-description">Courier</p>
                    <p className="text-sm font-semibold text-title">{order.courier}</p>
                  </div>
                  <LocateFixed className="h-4 w-4 text-main" />
                </div>
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-description">Tracking ID</p>
                  <p className="text-sm font-semibold text-main">{order.trackingId}</p>
                </div>
                <div>
                  <p className="text-xs text-description">Estimated Delivery</p>
                  <p className="text-sm font-semibold text-title">{order.estimatedDelivery}</p>
                </div>
              </div>

              <button type="button" className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-md border border-slate-200 text-xs font-semibold text-title hover:bg-slate-50">
                Track Package
              </button>
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-title">
              <ReceiptText className="h-4 w-4" />
              Related Transactions
            </h2>

            <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-3">
              <div>
                <p className="text-xs text-description">TXN-2026-00{order.id}</p>
                <p className="text-sm font-semibold text-title">Payment • ${order.total.toFixed(2)}</p>
              </div>
              <Eye className="h-4 w-4 text-main" />
            </div>
          </div>

          {order.status !== 'Canceled' && (
            <div className="grid gap-3 sm:grid-cols-2">
              <button type="button" className="h-11 rounded-xl bg-[#db524d] text-sm font-semibold text-white hover:bg-[#c94742]">
                Cancel Order
              </button>
              <button type="button" className="h-11 rounded-xl bg-slate-100 text-sm font-semibold text-title hover:bg-slate-200">
                Keep My Order
              </button>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="flex items-center gap-2 text-2xl font-semibold text-title">
              <MapPin className="h-4 w-4" />
              Shipping Address
            </h3>
            <div className="mt-3 text-sm text-description">
              <p className="font-medium text-title">{order.customerName}</p>
              <p>{order.addressLine1}</p>
              <p>{order.addressLine2}</p>
              <p>United States</p>
              <div className="mt-2 border-t border-slate-200 pt-2">
                <p>{order.phone}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="flex items-center gap-2 text-2xl font-semibold text-title">
              <MapPin className="h-4 w-4" />
              Billing Address
            </h3>
            <div className="mt-3 text-sm text-description">
              <p className="font-medium text-title">{order.customerName}</p>
              <p>{order.addressLine1}</p>
              <p>{order.addressLine2}</p>
              <p>United States</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="flex items-center gap-2 text-2xl font-semibold text-title">
              <Package className="h-4 w-4" />
              Payment Method
            </h3>
            <div className="mt-3 flex items-center gap-2 rounded-md bg-slate-50 p-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-main text-xs text-white">💳</span>
              <span className="text-sm text-title">{order.paymentMethod}</span>
            </div>
          </div>

          {order.status === 'Canceled' && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <h3 className="flex items-center gap-2 text-2xl font-semibold text-[#c8332c]">
                <CircleAlert className="h-4 w-4" />
                Cancellation Details
              </h3>
              <div className="mt-3 space-y-2 text-xs text-[#c8332c]">
                <div>
                  <p className="text-[11px] uppercase">Canceled By</p>
                  <p className="text-sm font-medium">{order.canceledBy}</p>
                </div>
                <div className="border-t border-red-200 pt-2">
                  <p className="text-[11px] uppercase">Cancellation Date</p>
                  <p className="text-sm font-medium">{order.cancellationDate}</p>
                </div>
                <div className="border-t border-red-200 pt-2">
                  <p className="text-[11px] uppercase">Reason</p>
                  <p className="text-sm font-medium">{order.cancellationReason}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsPage
