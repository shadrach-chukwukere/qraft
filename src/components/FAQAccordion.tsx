import { h2 } from '../ui'

export function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group overflow-hidden rounded-[14px] border border-line bg-white transition-all">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-base font-medium text-ink hover:bg-[#fcfcfe] [&::-webkit-details-marker]:hidden">
        <span>{question}</span>
        <span
          className="grid h-7 w-7 flex-none place-items-center rounded-full bg-off-white text-muted transition-[transform,background-color] duration-[250ms] group-open:rotate-180 group-open:bg-blue-soft group-open:text-blue"
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </summary>
      <div className="px-6 pb-[22px] text-[15px] leading-[1.75] text-muted">{answer}</div>
    </details>
  )
}

export function FAQSection({
  id,
  title,
  items,
}: {
  id?: string
  title: string
  items: { question: string; answer: string }[]
}) {
  return (
    <section id={id}>
      <h2 className={h2}>{title}</h2>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <FAQItem key={item.question} {...item} />
        ))}
      </div>
    </section>
  )
}
