
import { useState } from 'react'
import { h2 } from '../ui'

export function FAQItem({
  question,
  answer,
}: {
  question: string
  answer: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
        isOpen
          ? 'border-blue/30 bg-[#fbfcff]'
          : 'border-line bg-white hover:border-[#cbd5e1]'
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
      >
        <span
          className={`text-[15px] font-medium leading-6 transition-colors duration-200 sm:text-base ${
            isOpen ? 'text-blue' : 'text-ink'
          }`}
        >
          {question}
        </span>

        <span
          className={`grid h-8 w-8 flex-none place-items-center rounded-full transition-all duration-300 ${
            isOpen
              ? 'rotate-180 bg-blue text-white'
              : 'bg-off-white text-muted'
          }`}
          aria-hidden="true"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
        aria-hidden={!isOpen}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <div className="border-t border-line pt-4 text-[14px] leading-[1.8] text-muted sm:text-[15px]">
              {answer}
            </div>
          </div>
        </div>
      </div>
    </div>
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
    <section id={id} className="w-full">
      <h2 className={h2}>{title}</h2>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <FAQItem key={item.question} {...item} />
        ))}
      </div>
    </section>
  )
}
