import Stats from "./overview/Stats"
import RecentOrders from "./overview/RecentOrders"
import WeeklySales from "./overview/WeeklySales"


export default function WholesalerDashboardPage() {
    return (
        <section className="space-y-5 sm:space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-title">Overview</h1>
                <p className="mt-1 text-description">Your wholesale performance at a glance</p>
            </header>


            <Stats />
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
                
                <RecentOrders/>
                <WeeklySales/>
            </div>

        </section>
    )
}
