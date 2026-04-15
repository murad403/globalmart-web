import { ChevronRight, Laptop, MapPin, Smartphone } from 'lucide-react'

const SignInActivity = () => {
  const sessions = [
    {
      device: 'Chrome di Windows 10',
      meta: '103.83.173.120',
      time: 'Recently active',
      active: true,
      icon: Laptop
    },
    {
      device: 'Android',
      meta: '103.83.173.120',
      time: 'Active May 14, 2023 : 12 AM',
      active: false,
      icon: Smartphone
    },
    {
      device: 'Iphone 12',
      meta: '103.83.173.120',
      time: 'Active May 14, 2023 : 12 AM',
      active: false,
      icon: Smartphone
    }
  ]

  return (
    <section>
      <h2 className="mb-4 text-3xl font-semibold text-title">Sign in activity</h2>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(290px,0.95fr)]">
        <div className="space-y-3">
          {sessions.map((session) => {
            const Icon = session.icon
            return (
              <article
                key={session.device}
                className={`flex items-center justify-between gap-3 rounded-xl border p-3 ${session.active ? 'border-emerald-300 bg-[#f5fff7]' : 'border-slate-200 bg-white'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`grid h-8 w-8 place-items-center rounded-full ${session.active ? 'bg-violet-100 text-violet-700' : 'bg-emerald-100 text-emerald-600'}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-title">{session.device}</p>
                    <p className="mt-0.5 text-xs text-description">
                      {session.meta}
                      <span className="mx-1">•</span>
                      {session.active ? <span className="rounded bg-violet-100 px-1.5 py-0.5 text-[10px] font-semibold text-violet-700">Recently active</span> : session.time}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-description" />
              </article>
            )
          })}

          <button type="button" className="mt-2 text-sm font-semibold text-red-500 hover:underline">
            Sign out from all device
          </button>
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="relative h-32 overflow-hidden rounded-2xl bg-slate-100">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,#f8fafc_0%,#eef2f7_55%,#e5e7eb_100%)]" />
            <div className="absolute top-10 left-1/2 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-emerald-500 text-white shadow">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="absolute right-3 bottom-3 grid h-9 w-9 place-items-center rounded-xl bg-emerald-500 text-white">
              <MapPin className="h-4 w-4" />
            </div>
          </div>

          <div className="mt-3 rounded-2xl bg-slate-50 p-4">
            <h3 className="text-2xl font-semibold text-title">Sign in information</h3>
            <div className="mt-3 flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-emerald-600" />
              <div>
                <p className="text-sm font-semibold text-title">Chrome di Windows 10</p>
                <p className="text-xs text-description">103.83.173.120 <span className="rounded bg-violet-100 px-1.5 py-0.5 text-[10px] font-semibold text-violet-700">Recently active</span></p>
                <p className="mt-1 text-xs text-description">7915 N Woodman Ave, Panorama City, CA 91402, USA</p>
              </div>
            </div>

            <button type="button" className="mt-4 w-full rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-100">
              Sign out from device
            </button>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default SignInActivity
