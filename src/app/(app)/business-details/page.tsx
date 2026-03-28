import { Building2 } from 'lucide-react'

const BusinessDetailsPage = () => {
  return (
    <section className="w-full bg-slate-50 py-10">
      <div className="container mx-auto px-4">
        <p className="mb-8 text-sm text-description">Customer Support</p>

        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-600">Business Settings</p>
          <h1 className="mt-2 text-4xl font-bold text-title">
            Manage your <span className="text-green-600">Business Details</span>
          </h1>
          <p className="mt-2 text-description">
            Keep your business profile up to date for invoices, legal verification, and communication.
          </p>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-6 flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600">
                <Building2 className="h-4 w-4" />
              </span>
              <h2 className="text-2xl font-bold text-title">Business Information</h2>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-base font-semibold text-description">Business Name</label>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                    <input
                      type="text"
                      placeholder="Enter business name"
                      className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-base font-semibold text-description">Trade License Number</label>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                    <input
                      type="text"
                      placeholder="Enter trade license number"
                      className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-base font-semibold text-description">Business Email</label>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                    <input
                      type="email"
                      placeholder="business@company.com"
                      className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-base font-semibold text-description">Business Phone</label>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                    <input
                      type="tel"
                      placeholder="+880 1XXX-XXXXXX"
                      className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-base font-semibold text-description">Business Address</label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                  <input
                    type="text"
                    placeholder="Enter full business address"
                    className="h-full w-full border-none bg-transparent py-3 text-md rounded-lg text-title outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <button
                type="button"
                className="rounded-lg bg-heading px-6 py-3 font-semibold text-white transition hover:bg-heading/90"
              >
                Save Business Details
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BusinessDetailsPage
