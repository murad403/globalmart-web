import WholeSalerPageHeader from "../_components/WholeSalerPageHeader"
import FinanceStats from "./FinanceStats"
import TransactionHistory from "./TransactionHistory"
import WithdrawFunds from "./WithdrawFunds"

export default function FinancePage() {
  return (
    <section className="space-y-4 sm:space-y-5">
      <WholeSalerPageHeader title="Finance" description="Revenue, payouts, and financial history"/>

      <FinanceStats />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <TransactionHistory />
        </div>
        <div className="xl:col-span-2">
          <WithdrawFunds />
        </div>
      </div>
    </section>
  )
}
