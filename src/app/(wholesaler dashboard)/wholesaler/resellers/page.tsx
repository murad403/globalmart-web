import ResellerNetwork from "./ResellerNetwork"
import ResellersStats from "./ResellersStats"

export default function ResellersPage() {
  return (
    <section className="space-y-4 sm:space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-title">Resellers</h1>
        <p className="mt-1 text-description">Manage your distribution network</p>
      </header>

      <ResellersStats />

      <ResellerNetwork />
    </section>
  )
}
