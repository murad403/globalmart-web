import Link from 'next/link'

const orders = [
  { id: 'RS-9901', customer: 'Alice Smith (AI)', total: '$35', status: 'New' },
  { id: 'RS-9902', customer: 'Bob Johnson', total: '$120', status: 'Shipped' },
  { id: 'RS-9903', customer: 'Charlie Brow(AI)', total: '$55', status: 'Buying from Wholesaler' }
]

function statusStyles(status: string): string {
  if (status === 'New') return 'bg-amber-100 text-amber-700'
  if (status === 'Shipped') return 'bg-orange-100 text-orange-700'
  return 'bg-violet-100 text-violet-700'
}

const RecentCustomerOrders = () => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-xl md:text-2xl font-semibold text-title">Recent Customer Orders</h2>
        <Link href="/reseller/orders" className="text-sm font-semibold text-main hover:underline">
          View All
        </Link>
      </div>

      <p className="mb-3 text-sm text-description">Latest sales from your store</p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-70">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-2 text-left text-[11px] font-semibold text-slate-500 uppercase">Order ID</th>
              <th className="py-2 text-left text-[11px] font-semibold text-slate-500 uppercase">Customer</th>
              <th className="py-2 text-left text-[11px] font-semibold text-slate-500 uppercase">Total</th>
              <th className="py-2 text-left text-[11px] font-semibold text-slate-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-slate-100 last:border-b-0">
                <td className="py-2 text-sm font-semibold text-main">{order.id}</td>
                <td className="py-2 text-sm text-title">{order.customer}</td>
                <td className="py-2 text-sm font-semibold text-title">{order.total}</td>
                <td className="py-2">
                  <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${statusStyles(order.status)}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default RecentCustomerOrders
