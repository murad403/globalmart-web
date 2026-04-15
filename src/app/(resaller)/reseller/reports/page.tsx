import { Download } from 'lucide-react'
import SellerPageHeader from '@/components/shared/SellerPageHeader'
import ReportStats from './ReportStats'
import RevenueGrowth from './RevenueGrowth'
import TopSellingCategories from './TopSellingCategories'

const Page = () => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <SellerPageHeader title="Reports" description="Sales analytics and business reports" />

        <button
          type="button"
          className="inline-flex h-9 w-fit items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-title hover:bg-slate-50"
        >
          <Download className="h-3.5 w-3.5" />
          Export Data
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-title">Analytics & Reports</h2>
        <ReportStats />

        <div className="grid gap-4 xl:grid-cols-2">
          <RevenueGrowth />
          <TopSellingCategories />
        </div>
      </div>
    </div>
  )
}

export default Page
