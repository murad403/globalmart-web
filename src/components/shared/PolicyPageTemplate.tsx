import Link from 'next/link'
import { UserRound } from 'lucide-react'

type PolicySection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

type PolicyPageTemplateProps = {
  title: string
  intro: string[]
  sections: PolicySection[]
}

const PolicyPageTemplate = ({ title, intro, sections }: PolicyPageTemplateProps) => {
  return (
    <section className="w-full py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mt-10 max-w-5xl pb-10 md:mt-12">
            <h1 className="text-4xl font-bold text-black md:text-5xl">{title}</h1>

            <article className="mt-8 space-y-3 text-base leading-6 text-slate-600 md:text-[13px]">
              {intro.map((paragraph) => (
                <p className='text-base text-description' key={paragraph}>{paragraph}</p>
              ))}

              {sections.map((section) => (
                <section key={section.heading} className="pt-2">
                  <h2 className="text-lg font-bold uppercase tracking-wide text-title md:text-[13px]">
                    {section.heading}
                  </h2>
                  <div className="mt-1 space-y-2">
                    {section.paragraphs.map((paragraph) => (
                      <p className='text-base text-description' key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PolicyPageTemplate