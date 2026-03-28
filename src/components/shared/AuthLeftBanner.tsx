'use client'
import { Check, PackageCheck, TrendingUp } from 'lucide-react'
import authBg from '@/assets/auth/auth.png'

type AuthLeftBannerProps = {
  eyebrow: string
  variant?: 'default' | 'wholesaler'
}

const sharedHighlights = [
  'Real-time order tracking',
  'Advanced analytics dashboard',
  'Secure payment integration'
]

const AuthLeftBanner = ({ eyebrow, variant = 'default' }: AuthLeftBannerProps) => {
  return (
    <aside
      className="relative w-full overflow-hidden px-6 py-10 sm:px-10 lg:px-12 lg:py-14"
      style={{
        backgroundImage: `url(${authBg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="relative z-10 flex min-h-[800px] items-center justify-center">
        <div className="w-full max-w-xl">
          <p className="inline-flex rounded-full border border-white/20 bg-white/12 px-6 py-2 text-sm font-semibold text-slate-100 backdrop-blur-sm">
            {eyebrow}
          </p>

          {variant === 'wholesaler' ? (
            <>
              <h2 className="mt-5 text-5xl md:text-6xl font-bold leading-tight text-white">
                Welcome
                <br />
                Back!
              </h2>
              <p className="mt-3 max-w-lg text-3xl md:text-4xl leading-relaxed text-slate-300 ">
                Your one-stop marketplace for wholesalers, resellers, and shoppers.
              </p>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-white/18 bg-white/10 px-3 py-3 backdrop-blur-sm">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#A855F7] text-white">
                    <PackageCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-white">Wholesalers</p>
                    <p className="text-sm text-slate-300">Sell in bulk and reach resellers</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/18 bg-white/10 px-3 py-3 backdrop-blur-sm">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#14B8A6] text-white">
                    <TrendingUp className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-white">Resellers</p>
                    <p className="text-sm text-slate-300">Source products and grow business</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="mt-4 text-5xl md:text-6xl font-bold leading-tight text-white">
                Manage Your
                <br />
                <span className="bg-linear-to-r from-[#569FFF] via-[#7B88FF] to-[#16B3BA] bg-clip-text text-transparent">
                  Business Growth
                </span>
              </h2>

              <p className="mt-3 max-w-lg text-3xl md:text-4xl leading-relaxed text-slate-300 ">
                Access your dashboard, manage orders, and connect with your business partners effortlessly.
              </p>

              <ul className="mt-4 space-y-2.5">
                {sharedHighlights.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-lg text-slate-200">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-main text-white">
                      <Check className="h-4 w-4" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}

export default AuthLeftBanner