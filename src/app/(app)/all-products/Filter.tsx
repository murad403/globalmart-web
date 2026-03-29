import React from 'react'
import { Star, RotateCcw } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

type FilterProps = {
  categories: string[]
  selectedCategories: string[]
  ratingOptions: number[]
  selectedRatings: number[]
  minPriceInput: string
  maxPriceInput: string
  inStockOnly: boolean
  featuredOnly: boolean
  onSelectAllCategories: () => void
  onToggleCategory: (category: string) => void
  onToggleRating: (rating: number) => void
  onMinPriceChange: (value: string) => void
  onMaxPriceChange: (value: string) => void
  onApplyPriceRange: () => void
  onInStockChange: (value: boolean) => void
  onFeaturedChange: (value: boolean) => void
  onClearAll: () => void
}

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <h2 className="mb-3 border-l-2 border-heading pl-2 text-sm font-bold text-title">
      {title}
    </h2>
  )
}

const Toggle = ({
  checked,
  onChange
}: {
  checked: boolean
  onChange: (value: boolean) => void
}) => {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 rounded-full transition ${checked ? 'bg-main' : 'bg-slate-300'}`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition ${checked ? 'left-4' : 'left-0.5'}`}
      />
    </button>
  )
}

const Filter = ({
  categories,
  selectedCategories,
  ratingOptions,
  selectedRatings,
  minPriceInput,
  maxPriceInput,
  inStockOnly,
  featuredOnly,
  onSelectAllCategories,
  onToggleCategory,
  onToggleRating,
  onMinPriceChange,
  onMaxPriceChange,
  onApplyPriceRange,
  onInStockChange,
  onFeaturedChange,
  onClearAll
}: FilterProps) => {
  return (
    <aside className="space-y-7 text-sm text-description">
      <section>
        <SectionTitle title="Categories" />

        <div className="space-y-2.5">
          <label className="flex items-center gap-2 text-[13px] text-description">
            <Checkbox
              checked={selectedCategories.length === 0}
              onCheckedChange={(checked) => {
                if (checked) {
                  onSelectAllCategories()
                }
              }}
              className="border-slate-300"
            />
            <span>All Products</span>
          </label>

          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 text-[13px] text-description">
              <Checkbox
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => onToggleCategory(category)}
                className="border-slate-300"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Price Range" />

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={minPriceInput}
              onChange={(event) => onMinPriceChange(event.target.value)}
              placeholder="0"
              className="h-8 rounded-md border border-slate-200 px-2 text-xs text-title outline-none focus:border-main"
            />

            <input
              type="number"
              value={maxPriceInput}
              onChange={(event) => onMaxPriceChange(event.target.value)}
              placeholder="10000"
              className="h-8 rounded-md border border-slate-200 px-2 text-xs text-title outline-none focus:border-main"
            />
          </div>

          <Button
            type="button"
            onClick={onApplyPriceRange}
            className="h-8 w-full rounded-md px-2 text-[11px] font-semibold uppercase tracking-wide"
          >
            Apply Range
          </Button>
        </div>
      </section>

      <section>
        <SectionTitle title="Availability" />

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[13px] text-description">In Stock Only</span>
            <Toggle checked={inStockOnly} onChange={onInStockChange} />
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-[13px] text-description">Featured Products</span>
            <Toggle checked={featuredOnly} onChange={onFeaturedChange} />
          </div>
        </div>
      </section>

      <section>
        <SectionTitle title="Customer Rating" />

        <div className="space-y-2.5">
          {ratingOptions.map((rating) => (
            <label key={rating} className="flex items-center gap-2 text-[13px] text-description">
              <Checkbox
                checked={selectedRatings.includes(rating)}
                onCheckedChange={() => onToggleRating(rating)}
                className="border-slate-300"
              />

              <div className="flex items-center gap-1">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={`${rating}-${index}`}
                      className={index < rating ? 'size-3 text-heading' : 'size-3 text-slate-300'}
                      fill={index < rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <span>&amp; up</span>
              </div>
            </label>
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={onClearAll}
        className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 transition hover:text-red-600"
      >
        <RotateCcw className="size-3.5" />
        <span>Clear All Filters</span>
      </button>
    </aside>
  )
}

export default Filter
