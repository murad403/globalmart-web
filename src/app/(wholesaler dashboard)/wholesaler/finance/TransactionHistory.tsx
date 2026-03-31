type TransactionStatus = "Completed" | "Processing"

type Transaction = {
  id: string
  type: "Order Payment" | "Withdrawal"
  amount: string
  isPositive: boolean
  status: TransactionStatus
  date: string
}

const transactions: Transaction[] = [
  { id: "TRX-9482", type: "Order Payment", amount: "+$1240.00", isPositive: true, status: "Completed", date: "Oct 14, 2023" },
  { id: "TRX-9481", type: "Withdrawal", amount: "$5000.00", isPositive: false, status: "Processing", date: "Oct 13, 2023" },
  { id: "TRX-9480", type: "Order Payment", amount: "+$850.50", isPositive: true, status: "Completed", date: "Oct 12, 2023" },
  { id: "TRX-9479", type: "Order Payment", amount: "+$2100.00", isPositive: true, status: "Completed", date: "Oct 12, 2023" },
  { id: "TRX-9478", type: "Withdrawal", amount: "$2500.00", isPositive: false, status: "Completed", date: "Oct 10, 2023" },
]

const statusClass: Record<TransactionStatus, string> = {
  Completed: "bg-emerald-500/15 text-emerald-700",
  Processing: "bg-orange-500/15 text-orange-700",
}

export default function TransactionHistory() {
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="px-4 py-4 sm:px-5">
        <h2 className="text-xl font-semibold text-title">Transaction History</h2>
        <p className="text-sm text-description">Your recent financial activity</p>
      </div>

      <div className="overflow-x-auto border-t border-border">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-border bg-muted/20">
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Transaction ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-description uppercase">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-border/80 last:border-0">
                <td className="px-4 py-4 text-sm font-semibold text-title">{transaction.id}</td>
                <td className="px-4 py-4 text-sm text-description">{transaction.type}</td>
                <td className={`px-4 py-4 text-sm font-semibold ${transaction.isPositive ? "text-emerald-600" : "text-red-500"}`}>
                  {transaction.amount}
                </td>
                <td className="px-4 py-4 text-sm">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass[transaction.status]}`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-description">{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}
