import WholeSalerPageHeader from "../../../../components/shared/SellerPageHeader"
import ResellerNetwork from "./ResellerNetwork"
import ResellersStats from "./ResellersStats"

export default function ResellersPage() {
  return (
    <section className="space-y-4 sm:space-y-6">
      <WholeSalerPageHeader title="Resellers" description="Manage your distribution network" />

      <ResellersStats />

      <ResellerNetwork />
    </section>
  )
}
