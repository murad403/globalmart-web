import React from 'react'
import { Button } from '@/components/ui/button'
import { Shield, Wallet, BarChart3, Zap, Globe, Headphones, ArrowRight } from 'lucide-react'

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: 'Easy Store Setup',
      description: 'Get your store up and running in minutes with our intuitive setup process. No technical knowledge required.',
      bgColor: 'bg-[#DBEAFE]',
      iconBg: 'bg-blue-500'
    },
    {
      icon: Wallet,
      title: 'Secure Payments',
      description: 'Accept payments safely with our secure payment processing. Get paid quickly with multiple payout options.',
      bgColor: 'bg-[#FFEDD4]',
      iconBg: 'bg-orange-500'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Track your sales, understand your customers, and grow your business with detailed analytics and reports.',
      bgColor: 'bg-[#FCE7F3]',
      iconBg: 'bg-pink-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Experience blazing-fast performance with optimized infrastructure. Your customers will love the speed.',
      bgColor: 'bg-[#FEF9C2]',
      iconBg: 'bg-yellow-500'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Sell to customers worldwide with our international shipping and multi-currency support.',
      bgColor: 'bg-[#DCFCE7]',
      iconBg: 'bg-green-500'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Get help whenever you need it with our round-the-clock customer support team.',
      bgColor: 'bg-[#F3E8FF]',
      iconBg: 'bg-purple-500'
    }
  ]

  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="container mx-auto space-y-12">
        <div className="text-center">
          <div className="inline-block bg-blue-100 text-main px-4 py-2 rounded-full mb-3">
            <p className="font-semibold text-sm">Why Choose Us</p>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-title mb-3">
            Everything You Need to Succeed
          </h2>
          <p className="text-description text-base md:text-lg">
            Powerful features designed to help you build, grow, and scale your online business effortlessly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div 
                key={index}
                className={`${feature.bgColor} p-8 rounded-xl hover:shadow-lg transition-shadow`}
              >
                <div className={`${feature.iconBg} size-12 rounded-xl flex items-center justify-center mb-6`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-title mb-3">
                  {feature.title}
                </h3>
                <p className="text-description text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center">
          <Button className='flex items-center gap-2'>
            Explore All Features
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
