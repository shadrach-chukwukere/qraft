import Link from 'next/link'
import { FAQItem } from '../components/FAQAccordion'
import {
  wrap,
  h1,
  h2,
  sectionKicker,
  buttonPrimary,
} from '../ui'

const included = [
  'Unlimited QR code creation in the browser',
  '9 content types',
  '6 dot styles and custom colors',
  'Add your own logo',
  'PNG, SVG, JPEG, and WebP export',
  'Local projects and scan testing',
]

const pricingFaqs = [
  {
    question: 'Is Qraft free to use?',
    answer:
      'Yes. The current studio can be used without payment or an account.',
  },
  {
    question: 'Are there paid plans?',
    answer:
      'There are no paid plans or recurring billing published in this project today.',
  },
  {
    question: 'Do I need to enter billing details?',
    answer:
      'No. There is no billing flow in the current project, so no card or payment details are collected.',
  },
  {
    question: 'Will my QR codes expire?',
    answer:
      'Qraft creates downloadable QR images from the content you enter. The destination or content itself is not hosted by Qraft.',
  },
]

const comparison = [
  ['QR code creation', 'Unlimited'],
  ['Content types', '9'],
  ['Dot styles', '6'],
  ['Custom colors', 'Included'],
  ['Logo upload', 'Included'],
  ['Scan testing', 'Included'],
  ['Local project saving', 'Included'],
  ['Export formats', 'PNG, SVG, JPEG, WebP'],
  ['Account required', 'No'],
  ['Recurring billing', 'None'],
]

const sectionHeadCenter = (kicker: string, title: string, description: string) => (
  <div className="mx-auto mb-12 max-w-[680px] text-center">
    <p className={sectionKicker}>{kicker}</p>
    <h2 className={h2}>{title}</h2>
    <p className="mx-auto mt-3 max-w-[580px] text-[15px] leading-7 text-muted">
      {description}
    </p>
  </div>
)

export function Pricing() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,#edf2ff_0%,rgba(255,255,255,0)_72%)] px-5 pb-14 pt-28 text-center sm:pt-32">
        <div className={wrap}>
          <p className={sectionKicker}>Simple by nature</p>

          <h1 className={`${h1} mx-auto max-w-[850px]`}>
            Simple, transparent <span className="accent-word">pricing.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-[620px] text-base leading-7 text-muted sm:text-lg sm:leading-8">
            One studio. Every tool included. No account, subscription, or
            billing details required.
          </p>
        </div>
      </section>

      {/* Main plan */}
      <section className="px-5 pb-20 pt-8 sm:pb-24">
        <div className={`${wrap} max-w-[1000px]`}>
          <div className="grid overflow-hidden rounded-[24px] bg-navy text-white md:grid-cols-[1fr_0.9fr]">
            <div className="flex flex-col items-start p-7 sm:p-10 lg:p-12">
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#9db4e8]">
                The Qraft Studio
              </span>

              <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                Everything. For free.
              </h2>

              <p className="mt-3 max-w-[380px] text-[15px] leading-7 text-white/65">
                Everything currently available in the QR studio, ready when
                you are.
              </p>

              <div className="mb-7 mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-6xl font-medium leading-none tracking-[-0.06em]">
                  $0
                </span>
                <span className="text-sm text-white/60">
                  to get started
                </span>
              </div>

              <Link href="/studio" className={buttonPrimary}>
                Open the studio
              </Link>

              <p className="mt-4 text-xs leading-5 text-white/50">
                No account, subscription, or billing details required.
              </p>
            </div>

            <div className="border-t border-white/15 p-7 sm:p-10 md:border-l md:border-t-0 lg:p-12">
              <span className="mb-6 block text-xs font-medium uppercase tracking-[0.14em] text-[#9db4e8]">
                What's included
              </span>

              <ul className="m-0 flex list-none flex-col gap-4 p-0">
                {included.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-white/85"
                  >
                    <span className="mt-0.5 text-[#8fd19e]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-5 py-20 sm:py-24">
        <div className={wrap}>
          {sectionHeadCenter(
            'Available today',
            'Everything you need to create.',
            'Explore the tools included in the current Qraft studio.'
          )}

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                number: '01',
                title: 'Create',
                body:
                  'Build codes for websites, text, email, phone, SMS, Wi-Fi, vCards, WhatsApp, and locations.',
              },
              {
                number: '02',
                title: 'Design',
                body:
                  'Customize dot styles, foreground and background colors, and add a logo that makes your code yours.',
              },
              {
                number: '03',
                title: 'Export',
                body:
                  'Test your result and download PNG, SVG, JPEG, or WebP files ready for print or digital use.',
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[18px] border border-line bg-white p-6 sm:p-8"
              >
                <span className="text-xs font-medium tracking-[0.12em] text-blue">
                  {item.number}
                </span>

                <h3 className="mb-2 mt-4 text-xl font-medium tracking-tight text-ink">
                  {item.title}
                </h3>

                <p className="m-0 text-sm leading-7 text-muted">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-off-white px-5 py-20 sm:py-24">
        <div className={`${wrap} mx-auto max-w-[900px]`}>
          <div className="mb-9">
            <p className={sectionKicker}>Plan details</p>
            <h2 className={h2}>What you get, plainly.</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              No hidden tiers. These are the current studio capabilities.
            </p>
          </div>

          <div className="overflow-hidden rounded-[16px] border border-line bg-white">
            <div className="grid grid-cols-2 gap-4 bg-navy px-5 py-4 text-sm font-medium text-white sm:px-6">
              <span>Feature</span>
              <span className="text-[#9db4e8]">Qraft Studio</span>
            </div>

            {comparison.map(([feature, value]) => (
              <div
                key={feature}
                className="grid grid-cols-2 gap-4 border-b border-line px-5 py-4 text-sm last:border-0 sm:px-6"
              >
                <span className="text-muted">{feature}</span>
                <span className="font-medium text-ink">{value}</span>
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs leading-6 text-muted">
            Qraft does not currently publish paid plans or recurring billing.
            If that changes, details will be updated here before anything is
            offered.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-5 py-20 sm:py-24">
        <div className={`${wrap} mx-auto max-w-[800px]`}>
          {sectionHeadCenter(
            'Pricing notes',
            'Plain answers.',
            'A few things worth knowing before you get started.'
          )}

          <div className="flex flex-col gap-3">
            {pricingFaqs.map((faq) => (
              <FAQItem key={faq.question} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-off-white px-5 py-20 text-center sm:py-24">
        <div className={wrap}>
          <p className={sectionKicker}>Ready when you are</p>

          <h2 className={h2}>Start with a blank canvas.</h2>

          <p className="mx-auto mb-8 mt-3 max-w-[520px] text-sm leading-7 text-muted sm:text-base">
            Create your code, customize its appearance, and make it yours.
          </p>

          <Link href="/studio" className={buttonPrimary}>
            Open the studio
          </Link>
        </div>
      </section>
    </>
  )
}
