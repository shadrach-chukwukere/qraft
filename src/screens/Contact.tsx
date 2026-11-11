import Link from 'next/link'
import { FAQItem } from '../components/FAQAccordion'
import {
  wrap,
  h1,
  h2,
  sectionKicker,
  buttonPrimary,
} from '../ui'

const contactFaqs = [
  {
    question: 'How do I get in touch with Qraft?',
    answer:
      'Use the contact details below. There is no support form or ticket system in the current project.',
  },
  {
    question: 'Is there a customer support email?',
    answer:
      'No official support email is published in the current project. Reach out through the channels listed on this page.',
  },
  {
    question: 'Do you have a phone number?',
    answer:
      'No phone number is published for this project. All contact information is listed below.',
  },
  {
    question: 'Can I request a new feature?',
    answer:
      'Bulk QR codes, a brand kit, and scan insights are on the roadmap. More tools will be added as they are ready.',
  },
]

export function Contact() {
  return (
    <>
      <section className="relative pt-[110px] pb-[60px] text-center overflow-hidden bg-white bg-[radial-gradient(ellipse_70%_60%_at_50%_0%_,#edf2ff_0%_,rgba(255,255,255,0)_72%)]">
        <div className={wrap}>
          <p className={sectionKicker}>Get in touch</p>
          <h1 className={h1}>Contact Qraft</h1>
          <p className="max-w-[620px] mx-auto mb-[40px] mt-0 text-[17px] leading-[1.75] text-muted">
            No form, no ticket system — just the details you need to reach us.
          </p>
        </div>
      </section>

      <section className="py-[100px]">
        <div className={wrap}>
          <div className="grid grid-cols-2 gap-[60px] items-start max-[900px]:grid-cols-1 max-[900px]:gap-[40px]">
            <div className="space-y-[32px]">
              <div className="flex flex-col gap-[16px]">
                <div className="flex items-start gap-[16px]">
                  <div className="flex-shrink-0 grid place-items-center h-[10px] w-[10px] rounded-full bg-blue text-blue" />
                  <div>
                    <h3 className="m-0 text-[17px] font-medium text-ink">Email</h3>
                    <p className="m-0 text-[15px] text-muted">
                      hello@qraft.studio
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-[16px]">
                  <div className="flex-shrink-0 grid place-items-center h-[10px] w-[10px] rounded-full bg-blue text-blue" />
                  <div>
                    <h3 className="m-0 text-[17px] font-medium text-ink">
                      Location
                    </h3>
                    <p className="m-0 text-[15px] text-muted">
                      Qraft · Browser-based studio
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-[16px]">
                  <div className="flex-shrink-0 grid place-items-center h-[10px] w-[10px] rounded-full bg-blue text-blue" />
                  <div>
                    <h3 className="m-0 text-[17px] font-medium text-ink">
                      Website
                    </h3>
                    <p className="m-0 text-[15px] text-muted">
                      qraft.studio
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-[32px] border-t border-line">
                <p className="m-0 mb-[16px] text-[15px] font-medium text-ink">
                  Stay connected
                </p>
                <div className="flex gap-[12px]">
                  <Link
                    href="/"
                    className="h-[44px] w-[44px] flex items-center justify-center rounded-full border border-line bg-white text-ink hover:border-navy hover:text-navy transition-colors duration-200"
                    aria-label="Qraft home"
                  >
                    ←
                  </Link>
                  <Link
                    href="/studio"
                    className={buttonPrimary}
                    aria-label="Open the studio"
                  >
                    Open the studio
                  </Link>
                </div>
              </div>
            </div>

            <div className="max-w-[620px]">
              <h2 className={`${h2} mb-[24px]`}>
                Frequently asked questions
              </h2>
              <div className="flex flex-col gap-3">
                {contactFaqs.map((faq) => (
                  <FAQItem key={faq.question} {...faq} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
