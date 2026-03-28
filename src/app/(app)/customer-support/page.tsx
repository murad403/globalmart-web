import Link from 'next/link'
import {
  ArrowRight,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  Shield,
  Truck,
  UserCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const supportCards = [
  {
    title: 'Security & Privacy',
    description: 'Manage your account security and password settings.',
    icon: Shield,
    iconClass: 'bg-blue-100 text-main',
    href: '/security-&-privacy'
  },
  {
    title: 'Billing & Payments',
    description: 'Update payment method and review your billing history.',
    icon: CreditCard,
    iconClass: 'bg-orange-100 text-heading',
    href: '/billing-&-payments'
  },
  {
    title: 'Shipping Details',
    description: 'Track your orders and manage delivery addresses.',
    icon: Truck,
    iconClass: 'bg-blue-100 text-main',
    href: '/shipping-details'
  },
  {
    title: 'Business Details',
    description: 'Track your orders and manage delivery addresses.',
    icon: UserCircle2,
    iconClass: 'bg-green-100 text-green-600',
    href: '/business-details'
  }
] as const

const CustomerSupportPage = () => {
  return (
    <section className="w-full py-10">
      <div className="container mx-auto px-4">

        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="inline-flex rounded-full bg-[#FFEBD8] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-heading">
              Support Center
            </p>
            <h1 className="mt-4 text-3xl font-bold text-title md:text-4xl">
              How can we <span className="text-heading">help you</span> today?
            </h1>
            <p className="mt-2 text-description">
              Whether you have a question about our products, orders, or just want to say hi, we are here to assist you.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {supportCards.map((card) => {
              const CardIcon = card.icon
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-heading/60 hover:shadow-sm"
                >
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${card.iconClass}`}
                  >
                    <CardIcon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-3 text-base font-bold text-title">{card.title}</h3>
                  <p className="mt-1 text-sm text-description">{card.description}</p>
                </Link>
              )
            })}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-2xl font-bold text-title">Get in Touch</h2>
              <p className="mt-2 text-description">Contact us directly via email or visit our office.</p>

              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-main">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-main">Email us</p>
                    <p className="text-title">support@wobuy.com</p>
                    <p className="text-sm text-description">24/7 Response Time</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-600">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-green-600">Call anywhere</p>
                    <p className="text-title">+1 (555) 987-6543</p>
                    <p className="text-sm text-description">Call us</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-purple-600">Visit office</p>
                    <p className="text-title">Seattle, WA 98101</p>
                    <p className="text-sm text-description">Visit us</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-2xl font-bold text-title">Send a Message</h2>
              <p className="mt-2 text-description">Fill out the form below and we will get back to you within 24 hours.</p>

              <form className="mt-5 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-base font-semibold text-description">Full Name</label>
                    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                      <input
                        type="text"
                        placeholder="e.g., John Doe"
                        className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-base font-semibold text-description">Registered Email</label>
                    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-base font-semibold text-description">Phone Number</label>
                    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-base font-semibold text-description">Subject</label>
                    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                      <input
                        type="text"
                        placeholder="What can we help you with?"
                        className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-base font-semibold text-description">Your Message</label>
                  <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                    <textarea
                      placeholder="Share your detailed inquiry here..."
                      className="h-24 w-full resize-none border-none bg-transparent text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  className='w-full text-base'
                >
                  Send Message <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-title p-7 text-white">
            <h2 className="text-2xl font-bold">Need Quick Answers?</h2>
            <p className="mt-2 text-slate-300">Check our Knowledge Base for immediate solutions to common problems.</p>
            <button
              type="button"
              className="mt-4 rounded-lg bg-white px-5 py-2 text-sm font-semibold text-title transition hover:bg-slate-100"
            >
              View FAQs
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerSupportPage
