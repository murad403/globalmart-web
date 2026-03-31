import { Star, TrendingUp, UsersRound } from "lucide-react"

const stats = [
  {
    title: "Active Resellers",
    value: "32",
    icon: UsersRound,
    cardClassName: "bg-gradient-to-r from-[#AD46FF] to-[#9810FA]",
  },
  {
    title: "Avg. Monthly Sales",
    value: "$12,450",
    icon: TrendingUp,
    cardClassName: "bg-gradient-to-r from-[#00C950] to-[#00A63E]",
  },
  {
    title: "Top Performer",
    value: "Gadget Hub",
    icon: Star,
    cardClassName: "bg-gradient-to-r from-[#FF6900] to-[#F54900]",
  },
]

export default function ResellersStats() {
  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-3">
      {stats.map((stat) => (
        <article key={stat.title} className={`${stat.cardClassName} rounded-xl p-5 text-white`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-white/85">{stat.title}</p>
              <p className="mt-2 text-3xl leading-none font-semibold">{stat.value}</p>
            </div>
            <div className="grid size-10 place-items-center rounded-lg bg-white/20">
              <stat.icon className="size-5" />
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
