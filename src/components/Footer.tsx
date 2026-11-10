
import { Link } from 'react-router-dom'
import { wrap } from '../ui'
import { Logo } from './Navigation'

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
    <footer className="relative isolate overflow-hidden bg-[#071228] text-white">
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:52px_52px]"
      />

      <div className={`${wrap} relative z-[1]`}>
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 py-16 sm:py-20 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          
          {/* Brand */}
          <div className="max-w-[390px]">
            <Link
              to="/"
              className="mb-5 inline-flex items-center gap-2.5 text-[23px] font-semibold tracking-[-0.04em] text-white"
              aria-label="Qraft home"
            >
              <Logo />
              <span>qraft</span>
            </Link>

            <p className="max-w-[340px] text-[14px] leading-7 text-white/55 sm:text-[15px]">
              Good design gets noticed. Create beautiful, personalized QR
              codes in just a few clicks.
            </p>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col items-start gap-3">
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9db4e8]">
                  {column.title}
                </h3>

                {column.items.map(([label, href]) => (
                  <Link
                    key={href}
                    to={href}
                    className="text-[13.5px] text-white/60 transition-colors hover:text-white sm:text-[14px]"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom footer */}
        <div className="flex flex-col gap-5 py-6 text-[12px] text-white/45 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-[13px]">
          <span>
            © {currentYear} Qraft. All rights reserved.
          </span>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link
              to="/terms"
              className="transition-colors hover:text-white"
            >
              Terms
            </Link>

            <span aria-hidden="true" className="text-white/25">
              ·
            </span>

            <Link
              to="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
