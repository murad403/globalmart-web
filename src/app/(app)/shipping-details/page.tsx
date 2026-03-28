import { MapPin } from 'lucide-react'

const ShippingDetailsPage = () => {
  return (
    <section className="w-full py-10">
      <div className="container mx-auto px-4">
      

        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-main">Secure Settings</p>
          <h1 className="mt-2 text-4xl font-bold text-title">
            Manage your <span className="text-main">Shipping Address</span>
          </h1>
          <p className="mt-2 text-description">
            Update your primary delivery location for a faster and more consistent shopping experience.
          </p>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-6 flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-main">
                <MapPin className="h-4 w-4" />
              </span>
              <h2 className="text-2xl font-bold text-title">Shipping Information</h2>
            </div>

            <form className="space-y-4">
              <div>
                <label className="mb-2 block text-base font-semibold text-description">Street Address</label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                  <input
                    type="text"
                    placeholder="House no, street name, area"
                    className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-base font-semibold text-description">Apartment, suite, unit etc. (Optional)</label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                  <input
                    type="text"
                    placeholder="Apartment, suite, unit etc."
                    className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-base font-semibold text-description">Country</label>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                    <input
                      type="text"
                      placeholder="e.g. Bangladesh"
                      className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-base font-semibold text-description">Region / State</label>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                    <input
                      type="text"
                      placeholder="e.g. California"
                      className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-base font-semibold text-description">City</label>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                    <input
                      type="text"
                      placeholder="e.g. San Francisco"
                      className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-base font-semibold text-description">Zip Code</label>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                    <input
                      type="text"
                      placeholder="e.g. 94103"
                      className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-sm font-semibold text-title">Set as default shipping address</p>
                <p className="text-sm text-description">
                  Designate this as your primary delivery location for all your future orders.
                </p>
              </div>

              <button
                type="button"
                className="rounded-lg bg-heading px-6 py-3 font-semibold text-white transition hover:bg-heading/90"
              >
                Save Shipping Address
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShippingDetailsPage
