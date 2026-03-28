import { Gift, RefreshCcw, Shield, Truck } from 'lucide-react'
import React from 'react'

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: 'Best prices & offers',
      description: 'Orders $50 or more',
      bgColor: 'bg-[#00C950]',
      cardBg: 'bg-slate-900'
    },
    {
      icon: Truck,
      title: 'Free delivery',
      description: '24/7 amazing services',
      bgColor: 'bg-heading',
      cardBg: 'bg-slate-900'
    },
    {
      icon: Gift,
      title: 'Great daily deal',
      description: 'When you sign up',
      bgColor: 'bg-heading',
      cardBg: 'bg-slate-900'
    },
    {
      icon: RefreshCcw,
      title: 'Easy returns',
      description: 'Within 30 days',
      bgColor: 'bg-[#00C950]',
      cardBg: 'bg-slate-900'
    }
  ]

  return (
    <section className="w-full bg-white px-4 md:px-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`${feature.cardBg} rounded-xl p-6 text-white flex items-start gap-4 hover:shadow-lg transition-shadow`}
            >
              <div className={`${feature.bgColor} rounded-lg w-12 h-12 flex items-center justify-center shrink-0 text-xl font-bold`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold mb-1">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
