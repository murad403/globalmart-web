import React from 'react'
import { CreditCard, Shield, TrendingUp } from 'lucide-react'

const features = [
  {
    id: 1,
    title: 'Easy Store Setup',
    description:
      'Get your store up and running in minutes with our intuitive setup process. No technical knowledge required.',
    icon: Shield,
    iconBg: 'bg-main',
    cardBg: 'bg-[#EAF2FF]'
  },
  {
    id: 2,
    title: 'Secure Payments',
    description:
      'Accept payments safely with our secure payment processing. Get paid quickly with multiple payout options.',
    icon: CreditCard,
    iconBg: 'bg-heading',
    cardBg: 'bg-[#FFF2E6]'
  },
  {
    id: 3,
    title: 'Analytics & Insights',
    description:
      'Track your sales, understand your customers, and grow your business with detailed analytics and reports.',
    icon: TrendingUp,
    iconBg: 'bg-[#E636A0]',
    cardBg: 'bg-[#FDEEF8]'
  }
]

const WhyChooseOurPlatform = () => {
  return (
    <section className="w-full bg-[#F4F4F5] px-4 py-12 md:py-16">
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-title text-3xl md:text-4xl font-bold">Why Choose Our Platform?</h2>
          <p className="mt-3 text-description text-sm md:text-base">
            Everything you need to build and grow your online business
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <article
                key={feature.id}
                className={`rounded-2xl border border-slate-200/70 px-6 py-8 text-center ${feature.cardBg}`}
              >
                <div className="mx-auto mb-5 w-fit rounded-xl p-3 text-white shadow-sm">
                  <div className={`rounded-lg p-2 ${feature.iconBg}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="text-title text-xl font-bold">{feature.title}</h3>
                <p className="mt-3 text-description text-sm leading-relaxed">{feature.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseOurPlatform
