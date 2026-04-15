import { Building2, CircleCheckBig, Wallet } from "lucide-react"

export default function WithdrawFunds() {
  return (
    <article className="rounded-lg border border-border bg-card p-4 sm:p-5">
      <h2 className="text-xl font-semibold text-title">Withdraw Funds</h2>
      <p className="text-sm text-description">Transfer your earnings</p>

      <div className="mt-5 rounded-lg bg-[#EFF6FF] p-4">
        <p className="text-sm font-semibold tracking-wide text-main uppercase">Available for withdrawal</p>
        <p className="mt-1 text-3xl leading-none font-semibold text-[#1C398E]">$42,180.50</p>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="withdrawAmount" className="mb-2 block text-sm font-medium text-title">
            Amount to withdraw
          </label>
          <div className="flex items-center rounded-lg border border-input bg-background px-3">
            <Wallet className="size-4 text-description" />
            <input
              id="withdrawAmount"
              type="text"
              placeholder="$ 0.00"
              className="h-10 w-full bg-transparent px-2 text-sm text-title outline-none placeholder:text-description"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-title">Withdraw to</p>
          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
            <div className="flex items-center gap-3">
              <div className="grid size-8 place-items-center rounded-md bg-main/10 text-main">
                <Building2 className="size-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-title">Bank of America</p>
                <p className="text-xs text-description">Ending in ****4920</p>
              </div>
            </div>
            <CircleCheckBig className="size-4 text-main" />
          </div>
        </div>

        <button type="button" className="h-11 w-full rounded-lg bg-main text-sm font-semibold text-white transition hover:opacity-90 cursor-pointer">
          Request Withdrawal
        </button>
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <h3 className="text-base font-semibold text-title">Financial Summary</h3>
        <p className="mt-1 text-sm text-description">Performance metrics</p>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-description">Average Order Value</span>
          <span className="font-semibold text-title">$482.50</span>
        </div>
      </div>
    </article>
  )
}
