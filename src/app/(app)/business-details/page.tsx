import { Building2, Hotel } from 'lucide-react'

const BusinessDetailsPage = () => {
  return (
    <section className="w-full py-10">
      <div className="container mx-auto px-4">
    

        <div className="mx-auto max-w-5xl">
          <div className='flex items-center gap-2'>
            <div className='bg-[#DCFCE7] p-2 rounded-full'>
                <Hotel className='size-4 text-green-500'/>
            </div>
            <p className="text-sm font-semibold uppercase tracking-wide text-green-600">Business Settings</p>
          </div>
          <h1 className="mt-2 text-4xl font-bold text-title">
            Manage your <span className="text-green-600">Business Details</span>
          </h1>
          <p className="mt-2 text-description">
            Update your business location information for corporate orders and official correspondence.
          </p>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-6 flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600">
                <Building2 className="h-4 w-4" />
              </span>
              <h2 className="text-2xl font-bold text-title">Business Information</h2>
            </div>

            <form className="space-y-4">
              <div>
                <label className="mb-2 block text-base font-semibold text-description">Street Address *</label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                  <input
                    type="text"
                    placeholder="Business address, street name, area"
                    className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-base font-semibold text-description">Office, floor, suite etc. (Optional)</label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                  <input
                    type="text"
                    placeholder="Office, floor, suite etc."
                    className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-base font-semibold text-description">Country *</label>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                    <input
                      type="text"
                      placeholder=""
                      className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-base font-semibold text-description">Region / State *</label>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                    <input
                      type="text"
                      placeholder="e.g. New York"
                      className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-base font-semibold text-description">City *</label>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                    <input
                      type="text"
                      placeholder="e.g. Manhattan"
                      className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-base font-semibold text-description">Zip Code *</label>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                    <input
                      type="text"
                      placeholder="e.g. 10001"
                      className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-sm font-semibold text-title">Set as default business address</p>
                <p className="text-sm text-description">
                  Designate this as your primary business location for all corporate activities.
                </p>
              </div>

              <button
                type="button"
                className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                Save Business Address
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BusinessDetailsPage
