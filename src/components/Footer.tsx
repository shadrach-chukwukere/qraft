import Link from 'next/link'
import { wrap } from '../ui'
import { Logo } from './Navigation'

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="w-full border-t border-line bg-white text-ink">
      <div className={`${wrap} flex flex-col justify-between gap-8 py-10 sm:flex-row sm:items-center`}>
        {/* Left: Logo & Copyright */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-[17px] font-semibold tracking-[-0.02em] text-ink"
            aria-label="Qraft home"
          >
            <Logo />
            <span>qraft</span>
          </Link>

          <span className="text-[13px] text-muted">
            © {currentYear} Qraft. All rights reserved.
          </span>
        </div>

        {/* Center / Right: Clean Inline Navigation Links */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px] text-ink-soft">
          <Link href="/privacy" className="transition-colors hover:text-navy">
            Privacy policy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-navy">
            Terms of service
          </Link>
          <Link href="/contact" className="transition-colors hover:text-navy">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
