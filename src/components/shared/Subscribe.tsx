import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const Subscribe = () => {
  return (
    <section className="w-full bg-main py-12 md:py-16 lg:py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
          Subscribe to our newsletter
        </h2>
        <p className="text-sm md:text-base text-white/90 mb-8">
          Praesent fringilla erat a lacinia egestas. Donec vehicula tempor libero et cursus. <br /> Donec non quam urna. Quisque vitae porta ipsum.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 px-4 py-2.5 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-heading"
          />
          <Button className='flex gap-2 items-center'>
            SUBSCRIBE
    <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Subscribe
