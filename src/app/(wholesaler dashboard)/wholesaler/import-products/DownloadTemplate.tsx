import { Download, FileText } from 'lucide-react'
import React from 'react'

const DownloadTemplate = () => {
    const handleDownload = () => {
        // Create CSV template content
        const csvContent = `Product ID,Product Name,Category,Description,Price,Stock Quantity,SKU,Weight,Dimensions,Image URL
1,Sample Product 1,Electronics,A high-quality sample product,29.99,100,SPP001,2.5kg,10x10x5cm,https://example.com/image1.jpg
2,Sample Product 2,Clothing,Premium quality clothing item,49.99,75,SPP002,0.5kg,M,https://example.com/image2.jpg
3,Sample Product 3,Home & Garden,Multi-purpose home item,19.99,150,SPP003,1.2kg,30x20x15cm,https://example.com/image3.jpg`

        // Create a blob from the content
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        
        link.setAttribute('href', url)
        link.setAttribute('download', 'product_template.csv')
        link.style.visibility = 'hidden'
        
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <article className="rounded-lg border border-border bg-card p-5">
            <h3 className="text-xl font-semibold text-title">Download Template</h3>
            <p className="mt-1 text-description text-sm">Use our template for best results</p>

            <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/40 px-3 py-3">
                <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-lg bg-main/10 text-main">
                        <FileText className="size-5" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-title">product_template.csv</p>
                        <p className="text-xs text-description">CSV Format • 12 KB</p>
                    </div>
                </div>
                <button 
                    type="button" 
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1 text-sm font-medium text-main hover:opacity-80 transition-opacity"
                >
                    <Download className="size-4" /> Download
                </button>
            </div>
        </article>

    )
}

export default DownloadTemplate
