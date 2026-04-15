import Stats from "./overview/Stats"
import RecentOrders from "./overview/RecentOrders"
import WeeklySales from "./overview/WeeklySales"
import WholeSalerPageHeader from "./_components/WholeSalerPageHeader"


export default function WholesalerDashboardPage() {
    return (
        <section className="space-y-5 sm:space-y-6">
            <WholeSalerPageHeader title="Overview" description="Your wholesale performance at a glance" />
            <Stats />
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
                
                <RecentOrders/>
                <WeeklySales/>
            </div>

        </section>
    )
}
