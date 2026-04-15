import Image, { type StaticImageData } from 'next/image'

type CatalogCardProps = {
    image: StaticImageData
    name: string
    wholesalePrice: number
    stock: number
    moq: number
}

const CatalogCard = ({ image, name, wholesalePrice, stock, moq }: CatalogCardProps) => {
    return (
        <article className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="relative h-32 w-full bg-slate-50 sm:h-36">
                <span className="absolute top-2 left-2 z-10 rounded bg-main px-2 py-0.5 text-[10px] font-semibold text-white">MOQ: {moq}</span>
                <Image src={image} alt={name} fill className="object-cover" />
            </div>

            <div className="space-y-1.5 p-3">
                <h3 className="text-lg font-semibold text-title sm:text-2xl">{name}</h3>
                <p className="text-xs text-description">Wholesale Price:</p>
                <p className="text-xl font-semibold text-main sm:text-2xl">${wholesalePrice}</p>
                <p className="text-sm text-title">Stock: {stock}</p>

                <button
                    type="button"
                    className="mt-1 h-9 w-full cursor-pointer rounded-md bg-main text-sm font-semibold text-white transition hover:opacity-95"
                >
                    Copy to Store
                </button>
            </div>
        </article>
    )
}

export default CatalogCard
