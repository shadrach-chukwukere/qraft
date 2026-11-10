import { Link } from 'react-router-dom'
import { wrap } from '../ui'

const currentYear = new Date().getFullYear()

const columns = [
  {
    title: 'Product',
    items: [
      ['Overview', '/'],
      ['Pricing', '/pricing'],
      ['Studio', '/studio'],
    ],
  },
  {
    title: 'Legal',
    items: [
      ['Privacy policy', '/privacy'],
      ['Terms of service', '/terms'],
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#071228] pt-20 text-white/72">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:52px_52px]"
      />

      <div className={`${wrap} relative z-[1] grid grid-cols-[1fr_auto] gap-[60px] pb-[60px] max-[900px]:grid-cols-1 max-[900px]:gap-10`}>
        <div>
          <Link
            to="/"
            className="mb-3.5 inline-flex items-center gap-2.5 text-[22px] font-semibold tracking-[-0.02em] text-white"
            aria-label="Qraft home"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect width="22" height="22" x="4" y="4" rx="6" stroke="currentColor" strokeWidth="2" />
              <path d="M8 8h4v4H8zM14 14h4v4h-4zM14 8h4v4h-4zM8 14h4v4H8z" fill="currentColor" />
            </svg>
            <span>qraft</span>
          </Link>
          <p className="max-w-[300px] text-[15px] text-white/60">
            Good design gets noticed. Make yours in a few clicks.
          </p>
        </div>

        <div className="flex gap-20 max-[900px]:gap-14 max-[600px]:flex-col max-[600px]:gap-8">
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-2.5">
              <strong className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-[#9db4e8]">
                {column.title}
              </strong>
              {column.items.map(([label, href]) => (
                <Link
                  key={href}
                  to={href}
                  className="py-[3px] text-[14.5px] text-white/72 transition-colors hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={`${wrap} relative z-[1] flex justify-between gap-4 border-t border-white/10 py-6 text-[13px] text-white/50 max-[900px]:flex-col max-[900px]:items-start`}>
        <span>© {currentYear} Qraft. All rights reserved.</span>
        <div className="flex gap-4">
          <Link to="/terms" className="text-white/60 hover:text-white">
            Terms
          </Link>
          <span aria-hidden="true">•</span>
          <Link to="/privacy" className="text-white/60 hover:text-white">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
