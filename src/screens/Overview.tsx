import { QRVisual } from '../components/QRVisual'
import { ProductFrame } from '../components/ProductFrame'
import { FAQItem } from '../components/FAQAccordion'
import {
  wrap,
  h1,
  h2,
  h3,
  textLink,
  sectionKicker,
  buttonPrimary,
  buttonOutline,
  buttonLight,
} from '../ui'

const faqs = [
  {
    question: 'Do I need an account to use Qraft?',
    answer:
      'No. You can create, style, test, and download QR codes in your browser without signing in. Nothing is stored behind a login.',
  },
  {
    question: 'What can I put in a QR code?',
    answer:
      'The studio supports URLs, plain text, email details, phone numbers, SMS, Wi-Fi details, vCards, WhatsApp numbers, and locations.',
  },
  {
    question: 'Can I customize the design?',
    answer:
      'Yes. Choose from six dot styles, set foreground and background colors, and add a logo image. The live canvas keeps every change visible.',
  },
  {
    question: 'Does Qraft upload my content?',
    answer:
      'QR generation and project saving happen in your browser. This project does not include an account system or cloud sync service.',
  },
  {
    question: 'Which formats can I export?',
    answer:
      'The editor offers PNG, SVG, JPEG, and WebP downloads, ready for print or digital use.',
  },
  {
    question: 'Will my QR codes expire?',
    answer:
      'Qraft creates downloadable QR images from the content you enter. The destination is not hosted by Qraft, so codes do not expire on our side.',
  },
]

const features = [
  {
    icon: '✦',
    title: 'Instant QR creation',
    body: 'Type your content and watch a finished QR code appear in the live canvas — no setup, no account.',
  },
  {
    icon: '⌘',
    title: 'Local-first generation',
    body: 'Codes and logos are generated in your browser. Your content never has to leave your device.',
  },
  {
    icon: '◉',
    title: 'Expressive design controls',
    body: 'Six dot styles, custom colors, and a logo upload make each code unmistakably yours.',
  },
  {
    icon: '✓',
    title: 'Built-in scan testing',
    body: 'Decode the generated image in the editor before you print, share, or ship it.',
  },
  {
    icon: '▣',
    title: 'Templates to start from',
    body: 'Six considered starting points for business, restaurant, events, social, and minimal looks.',
  },
  {
    icon: '↓',
    title: 'Four export formats',
    body: 'Download PNG, SVG, JPEG, or WebP files that are ready for whatever comes next.',
  },
]

const contentTypes = [
  'URL',
  'Text',
  'Email',
  'Phone',
  'SMS',
  'Wi-Fi',
  'vCard',
  'WhatsApp',
  'Location',
]

const sectionHeadCenter = (kicker: string, heading: string, description: string) => (
  <div className="mx-auto mb-12 max-w-[740px] text-center md:mb-[54px]">
    <p className={sectionKicker}>{kicker}</p>
    <h2 className={h2}>{heading}</h2>
    {description && (
      <p className="mx-auto max-w-[620px] text-[15px] leading-7 text-muted md:text-base">
        {description}
      </p>
    )}
  </div>
)

const featurePoints = [
  'Website links and landing pages',
  'Messages, email, phone, SMS, and WhatsApp',
  'Wi-Fi networks, vCards, and locations',
]

const designPoints = [
  'Six dot shapes for a different tone',
  'Custom foreground and background colors',
  'PNG, JPG, WebP, or SVG logo uploads',
]

const testingPoints = [
  'In-browser decode test',
  'High error-correction setting',
  'PNG, SVG, JPEG, and WebP export',
]

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-3 p-0 text-[14px] text-ink-soft sm:text-[15px]">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-7 before:absolute before:left-0 before:top-0 before:font-medium before:text-blue before:content-['✓']"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

function ShowcaseVisual({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-[320px] place-items-center rounded-[20px] border border-line bg-gradient-to-br from-[#f8faff] to-[#eef2fb] p-6 sm:min-h-[380px] sm:rounded-[24px] sm:p-10">
      {children}
    </div>
  )
}

export function Overview() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white bg-[radial-gradient(ellipse_72%_58%_at_50%_0%,#edf2ff_0%,rgba(255,255,255,0)_72%)] pb-14 pt-28 text-center sm:pb-[70px] sm:pt-[110px]">
        <div className={wrap}>
          <h1 className={h1}>
            Design QR codes that{' '}
            <span className="accent-word">look like you.</span>
          </h1>

          <p className="mx-auto mb-8 mt-0 max-w-[660px] text-[16px] leading-7 text-muted sm:mb-[34px] sm:text-[clamp(1.1rem,1.5vw,1.25rem)] sm:leading-[1.75]">
            Turn any link, note, or contact detail into a considered QR code.
            Designed in your browser, tested before you share.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a href="/studio" className={buttonPrimary}>
              Open the studio
            </a>
            <a href="/pricing" className={buttonOutline}>
              See pricing <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Product preview */}
      <section className="pb-16 pt-6 sm:pb-[100px] sm:pt-[30px]">
        <div className={wrap}>
          <ProductFrame />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-[100px]">
        <div className={wrap}>
          {sectionHeadCenter(
            'A simpler kind of studio',
            'Everything you need to make a code worth scanning.',
            'Qraft keeps the process close at hand. Add your content, shape the look, test that it scans, and take the file with you.'
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-[16px] border border-line bg-white p-6 transition-colors duration-200 hover:border-line-strong sm:rounded-[18px] sm:p-7"
              >
                <span
                  className="mb-5 inline-grid h-11 w-11 place-items-center rounded-[12px] bg-blue-soft text-lg text-blue"
                  aria-hidden="true"
                >
                  {feature.icon}
                </span>
                <h3 className={h3}>{feature.title}</h3>
                <p className="m-0 text-[14px] leading-[1.7] text-muted sm:text-[14.5px]">
                  {feature.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase 01 */}
      <section className="py-16 sm:py-[80px]">
        <div className={wrap}>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-[72px]">
            <div className="showcase-copy">
              <p className={sectionKicker}>Start with what matters</p>
              <h2 className={h2}>Nine ways to say the next thing.</h2>
              <p className="mb-6 text-[15px] leading-7 text-muted">
                Choose the content type that fits the moment. Each one produces
                a scannable code with the details people need.
              </p>

              <FeatureList items={featurePoints} />

              <a href="/studio" className={`${textLink} mt-7 inline-flex`}>
                Start with your content <span aria-hidden="true">→</span>
              </a>
            </div>

            <ShowcaseVisual>
              <div className="flex max-w-[380px] flex-wrap justify-center gap-2.5">
                {contentTypes.map((type) => (
                  <span
                    key={type}
                    className="rounded-full border border-line bg-white px-4 py-2.5 text-[13px] font-medium text-ink-soft sm:text-[14px]"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </ShowcaseVisual>
          </div>
        </div>
      </section>

      {/* Showcase 02 */}
      <section className="bg-off-white py-16 sm:py-[80px]">
        <div className={wrap}>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-[72px]">
            <div className="showcase-copy lg:order-2">
              <p className={sectionKicker}>Make it unmistakably yours</p>
              <h2 className={h2}>Six dot styles. Your colors. Your mark.</h2>
              <p className="mb-6 text-[15px] leading-7 text-muted">
                Move between square, rounded, dots, and classy shapes. Set both
                colors, add a logo, and keep the preview in view the whole time.
              </p>

              <FeatureList items={designPoints} />

              <a href="/studio" className={`${textLink} mt-7 inline-flex`}>
                Explore the design tools <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="lg:order-1">
              <ShowcaseVisual>
                <div className="flex flex-col items-center gap-6">
                  <QRVisual
                    size={180}
                    className="border border-line"
                    data="https://qraft.studio/style"
                  />

                  <div className="flex gap-3" aria-hidden="true">
                    <span className="h-7 w-7 rounded-full border border-line bg-navy" />
                    <span className="h-7 w-7 rounded-full border border-line bg-[#2a56c6]" />
                    <span className="h-7 w-7 rounded-full border border-line bg-[#c7d6f5]" />
                    <span className="h-7 w-7 rounded-full border border-line bg-white" />
                  </div>

                  <div className="flex items-center gap-3" aria-hidden="true">
                    <span className="h-8 w-8 rounded-[4px] bg-navy" />
                    <span className="h-8 w-8 rounded-full bg-navy" />
                    <span className="h-8 w-8 rounded-full border-[6px] border-dotted border-navy" />
                    <span className="h-8 w-8 rounded-[3px_10px_3px_10px] bg-navy" />
                  </div>
                </div>
              </ShowcaseVisual>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase 03 */}
      <section className="py-16 sm:py-[80px]">
        <div className={wrap}>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-[72px]">
            <div className="showcase-copy">
              <p className={sectionKicker}>Check before you share</p>
              <h2 className={h2}>Good looking is good. Scannable is better.</h2>
              <p className="mb-6 text-[15px] leading-7 text-muted">
                Run the built-in scan test to confirm the generated image decodes
                to the content you entered. Then export with confidence.
              </p>

              <FeatureList items={testingPoints} />

              <a href="/studio" className={`${textLink} mt-7 inline-flex`}>
                Test your first code <span aria-hidden="true">→</span>
              </a>
            </div>

            <ShowcaseVisual>
              <div className="flex w-full max-w-[320px] flex-col items-center gap-[18px] rounded-[18px] border border-line bg-white p-6">
                <div className="flex w-full items-center gap-2 text-[13px] font-medium text-muted">
                  <span className="h-2 w-2 rounded-full bg-[#12b76a]" />
                  Scan test
                </div>

                <div className="rounded-[12px] border border-line p-2.5">
                  <QRVisual size={130} data="https://qraft.studio/check" />
                </div>

                <div className="flex items-center gap-2 text-[14px] text-ink-soft">
                  <span className="grid h-[22px] w-[22px] place-items-center rounded-full bg-[#ecfdf3] text-[12px] text-[#027a48]">
                    ✓
                  </span>
                  Decoded successfully
                </div>
              </div>
            </ShowcaseVisual>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-line py-14 text-center sm:py-[70px]">
        <div className={wrap}>
          <p className="mb-8 text-[18px] font-medium text-ink sm:mb-[40px] sm:text-[20px]">
            Built for real-world use
          </p>

          <div className="grid grid-cols-3 divide-x divide-line">
            {[
              { value: '9', label: 'Content types' },
              { value: '6', label: 'Dot styles' },
              { value: '4', label: 'Export formats' },
            ].map((stat) => (
              <div key={stat.label} className="px-2 py-4 sm:px-3 sm:py-5">
                <span className="block text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-navy">
                  {stat.value}
                </span>
                <span className="mt-2 block text-[11px] text-muted sm:text-[15px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark CTA */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#071228_0%,#0b1a3a_45%,#16306b_100%)] py-20 text-center text-white sm:py-[110px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:52px_52px]"
        />

        <div className={`${wrap} relative z-10`}>
          <h2 className={`${h2} !text-white`}>
            Experience Qraft in action.
          </h2>
          <p className="mx-auto mb-8 mt-0 max-w-[620px] text-[15px] leading-7 text-white/75 sm:mb-[34px] sm:text-[17px]">
            Create a code, shape its look, and test it before you share — all in
            one focused studio.
          </p>
          <a href="/studio" className={buttonLight}>
            Open the studio
          </a>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="bg-off-white py-16 sm:py-[100px]">
        <div className={wrap}>
          {sectionHeadCenter(
            'Simple by nature',
            'Free to use. No meter running.',
            'The full studio is available without an account, subscription, or billing details.'
          )}

          <div className="mx-auto max-w-[880px] rounded-[18px] border border-line bg-white p-6 sm:rounded-[22px] sm:p-[38px]">
            <div className="flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div>
                <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-blue">
                  Qraft Studio
                </span>
                <div className="mt-1.5 text-[38px] font-medium leading-[1.1] tracking-[-0.03em] text-ink sm:text-[42px]">
                  $0{' '}
                  <span className="text-[14px] font-normal tracking-normal text-muted sm:text-[15px]">
                    to get started
                  </span>
                </div>
              </div>

              <a href="/pricing" className={buttonOutline}>
                See pricing
              </a>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                'Unlimited QR codes',
                '9 content types',
                '6 dot styles',
                'Logo upload',
                'Scan testing',
                '4 export formats',
              ].map((item) => (
                <span
                  key={item}
                  className="relative pl-6 text-[14px] text-ink-soft before:absolute before:left-0 before:font-medium before:text-blue before:content-['✓'] sm:text-[14.5px]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 sm:py-[100px]">
        <div className={`${wrap} mx-auto max-w-[840px]`}>
          {sectionHeadCenter(
            'Good questions',
            'Before you get started.',
            'A few things worth knowing before you create your first QR code.'
          )}

          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} {...faq} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <a href="/faq" className={textLink}>
              View all FAQs <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 text-center sm:py-[100px]">
        <div className={wrap}>
          <h2 className={h2}>Ready to make your mark?</h2>
          <p className="mx-auto mb-8 mt-0 max-w-[560px] text-[15px] leading-7 text-muted">
            Start with a link, shape it to your taste, and take it with you.
          </p>
          <a href="/studio" className={buttonPrimary}>
            Create your first code
          </a>
        </div>
      </section>
    </>
  )
}