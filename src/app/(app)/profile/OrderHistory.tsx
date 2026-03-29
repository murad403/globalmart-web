import type { OrderHistoryItem, OrderStatus } from './types'

type OrderHistoryProps = {
  orderStatuses: readonly OrderStatus[]
  activeOrderTab: OrderStatus
  onTabChange: (status: OrderStatus) => void
  orders: OrderHistoryItem[]
}

const OrderHistory = ({ orderStatuses, activeOrderTab, onTabChange, orders }: OrderHistoryProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-title">Orders History</h2>

      <div className="mt-5 flex flex-wrap gap-2 rounded-lg bg-slate-100 p-2">
        {orderStatuses.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => onTabChange(status)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              activeOrderTab === status ? 'bg-heading text-white shadow' : 'bg-transparent text-description hover:bg-white'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-description">
            <tr>
              <th className="px-4 py-3">Number ID</th>
              <th className="px-4 py-3">Dates</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="border-t border-slate-200">
                  <td className="px-4 py-3 font-medium text-title">{order.numberId}</td>
                  <td className="px-4 py-3 text-description">{order.date}</td>
                  <td className="px-4 py-3 text-description">{order.status}</td>
                  <td className="px-4 py-3 text-title">${order.price.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-description">
                  No orders in this tab.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderHistory
