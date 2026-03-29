'use client'

import React, { useState } from 'react'
import { CheckCircle2, Star } from 'lucide-react'

type TabType = 'description' | 'specification' | 'review'

const tabItems: { key: TabType; label: string }[] = [
  { key: 'description', label: 'DESCRIPTION' },
  { key: 'specification', label: 'SPECIFICATION' },
  { key: 'review', label: 'REVIEW' }
]

const featureList = [
  'Free 1 Year Warranty',
  'Free Shipping & Fasted Delivery',
  '100% Money-Back guarantee',
  '24/7 Customer support',
  'Secure payment method'
]

const shippingInfo = [
  'Courier: 2-4 days, free shipping',
  'Local Shipping: 1-6 one week, ৳1,000',
  'UPS Ground Shipping: 4-6 days, ৳2,000',
  'Unishop Global Export: 3-4 days, ৳3,700'
]

const reviewList = [
  {
    name: 'Kristin Watson',
    text: 'Duis ut ullamcorper nulla, at dictum eros.',
    time: '2 min ago',
    rating: 5
  },
  {
    name: 'Jane Cooper',
    text:
      'Really found a product that is totally above my expectation! The quality and finishing is premium, and shipping was super fast too.',
    time: '30 Jul, 2021',
    rating: 5
  },
  {
    name: 'Jacob Jones',
    text: 'I was satisfied with customer support and fast delivery. Packaging was secure and product condition was perfect.',
    time: '2 min ago',
    rating: 4
  },
  {
    name: 'Ralph Edwards',
    text: 'Great value for money. Build quality feels solid and smooth performance for everyday professional use.',
    time: '2 min ago',
    rating: 5
  }
]

const ProductFeatures = () => {
  const [activeTab, setActiveTab] = useState<TabType>('description')

  return (
    <section className="mt-8 border border-slate-200 container mx-auto">
      <div className="flex border-b justify-center gap-20 border-slate-200">
        {tabItems.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`relative px-4 py-3 text-sm font-bold tracking-wide transition sm:px-8 ${
              activeTab === tab.key ? 'text-title' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab.label}
            {activeTab === tab.key && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-heading" />}
          </button>
        ))}
      </div>

      {activeTab === 'description' && (
        <div className="grid gap-6 p-4 md:grid-cols-3 md:p-6">
          <div>
            <h3 className="mb-2 text-lg font-medium uppercase tracking-wide text-title">Description</h3>
            <p className="text-base leading-5 text-description">
              The most impressive MacBook Pro delivers game-changing performance for pro users. The M1 chip brings CPU,
              GPU, and machine learning power into one compact design with better battery life and faster workflows.
              Ideal for editing, coding, design, and multi-tasking.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium uppercase tracking-wide text-title">Feature</h3>
            <div className="space-y-2.5">
              {featureList.map((item) => (
                <p key={item} className="flex items-center gap-2 text-base text-description">
                  <CheckCircle2 className="size-3.5 text-green-600" />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium uppercase tracking-wide text-title">Shipping Information</h3>
            <div className="space-y-2.5">
              {shippingInfo.map((item) => (
                <p key={item} className="text-base text-description">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'specification' && (
        <div className="p-4 md:p-6">
          <div className="grid gap-4 text-base text-description sm:grid-cols-2 lg:grid-cols-3">
            <p>
              Processor: <span className="text-title">Apple M1</span>
            </p>
            <p>
              Display: <span className="text-title">13.3-inch Retina</span>
            </p>
            <p>
              RAM: <span className="text-title">8GB Unified</span>
            </p>
            <p>
              Storage: <span className="text-title">256GB SSD</span>
            </p>
            <p>
              Battery: <span className="text-title">Up to 20 hours</span>
            </p>
            <p>
              Weight: <span className="text-title">1.4 kg</span>
            </p>
          </div>
        </div>
      )}

      {activeTab === 'review' && (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
          <div className="space-y-4">
            {reviewList.map((review) => (
              <article key={`${review.name}-${review.time}`} className="border-b border-slate-100 pb-4 last:border-b-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600">
                      {review.name
                        .split(' ')
                        .map((word) => word[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-title">{review.name}</p>
                      <div className="mt-1 flex items-center gap-0.5 text-heading">
                        {Array.from({ length: 5 }, (_, index) => (
                          <Star
                            key={`${review.name}-${index}`}
                            className={index < review.rating ? 'size-3 fill-current' : 'size-3 text-slate-300'}
                          />
                        ))}
                      </div>
                      <p className="mt-1 text-base leading-5 text-description">{review.text}</p>
                    </div>
                  </div>

                  <p className="whitespace-nowrap text-sm text-slate-400">{review.time}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductFeatures
