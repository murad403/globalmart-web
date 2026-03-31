"use client"
import DownloadTemplate from "./DownloadTemplate"
import ImportHistory from "./ImportHistory"
import ImportProducts from "./ImportProducts"


export default function ImportProductsPage() {
  

  
  return (
    <section className="space-y-4 sm:space-y-5">
      <header>
        <h1 className="text-3xl font-bold text-title">Import</h1>
        <p className="mt-1 text-description">Bulk upload products to the marketplace</p>
      </header>

      <ImportProducts/>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <DownloadTemplate/>
        <ImportHistory/>
      </div>
    </section>
  )
}
