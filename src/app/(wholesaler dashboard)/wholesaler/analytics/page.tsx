import AnalyticsStats from "./AnalyticsStats"
import OrderVolume from "./OrderVolume"
import RegionalDistribution from "./RegionalDistribution"
import RevenueTrends from "./RevenueTrends"
import TopPerformingProducts from "./TopPerformingProducts"

export default function AnalyticsPage() {
  return (
    <section className="space-y-4 sm:space-y-5">
      <header>
        <h1 className="text-3xl font-bold text-title">Analytics</h1>
        <p className="mt-1 text-description">Deep dive into your sales data</p>
      </header>

      <AnalyticsStats />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <RevenueTrends />
        <OrderVolume />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <TopPerformingProducts />
        </div>
        <RegionalDistribution />
      </div>
    </section>
  )
}
