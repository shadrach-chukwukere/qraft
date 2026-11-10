import { Link } from 'react-router-dom'
import { wrap } from '../ui'

export type LegalSection = {
  number: string
  title: string
  body?: string
  subsections?: { number: string; title: string; body: string }[]
}

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string
  updated: string
  intro: string[]
  sections: LegalSection[]
}) {
  return (
    <>
      <section className="relative pt-[110px] pb-[40px] text-center overflow-hidden bg-white bg-[radial-gradient(ellipse_70%_60%_at_50%_0%_,#edf2ff_0%_,rgba(255,255,255,0)_72%)]">
        <div className={wrap}>
          <h1 className="font-medium leading-[1.08] tracking-[-0.03em] text-ink text-[clamp(2.75rem,5.6vw,4.75rem)] mb-[12px]">
            {title}
          </h1>
          <p className="mb-[24px] text-[15px] text-blue">{updated}</p>
          <span
            className="block mx-auto w-[64px] h-[2px] bg-navy"
            aria-hidden="true"
          />
        </div>
      </section>

      <div className={`${wrap} max-w-[860px] mx-auto pb-[100px]`}>
        <div className="legal-intro">
          {intro.map((paragraph) => (
            <p key={paragraph} className="text-[16px] leading-[1.8] text-muted">
              {paragraph}
            </p>
          ))}
        </div>

        {sections.map((section) => (
          <section key={section.number} className="mt-[42px]" id={`section-${section.number}`}>
            <h2 className="font-medium leading-[1.08] tracking-[-0.03em] text-ink text-[24px] mb-[14px]">
              {section.number}. {section.title}
            </h2>
            {section.body && (
              <p className="text-[15.5px] leading-[1.8] text-muted">{section.body}</p>
            )}
            {section.subsections?.map((subsection) => (
              <div key={subsection.number} className="mt-[24px]">
                <h3 className="font-medium leading-[1.08] tracking-[-0.03em] text-ink text-[17px] mb-2">
                  {subsection.number} {subsection.title}
                </h3>
                <p className="m-0 text-[15.5px] leading-[1.8] text-muted">
                  {subsection.body}
                </p>
              </div>
            ))}
          </section>
        ))}

        <div className="mt-[64px] pt-[32px] border-t border-line">
          <p className="m-0 text-[15.5px] leading-[1.8] text-muted">
            This page describes the current studio. It will be updated if the product changes.
          </p>
          <Link to="/studio" className="inline-flex items-center gap-1.5 mt-[32px] text-[14.5px] font-medium text-blue hover:underline">
            Open the studio
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </>
  )
}
