import { useEffect, useRef, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../auth'
import { buttonOutline, buttonPrimary, wrap } from '../ui'

export const Logo = () => (
  <img src={`${import.meta.env.BASE_URL}logo.webp`} width="30" height="30" alt="Qraft" />
)

export function Header() {
  const [open, setOpen] = useState(false)
  const { signedIn, signOut } = useAuth()
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (open && navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `py-2 text-[15.5px] transition-colors hover:text-navy max-[900px]:border-b max-[900px]:border-line max-[900px]:py-4 max-[900px]:text-center max-[900px]:text-base ${
      isActive ? 'font-medium text-navy' : 'font-normal text-ink-soft'
    }`

  const closeMenu = () => setOpen(false)

  return (
    <header className="sticky top-0 z-[1000] w-full border-b border-white/55 bg-[#f9fafb]/72 backdrop-blur-[20px] backdrop-saturate-180" ref={navRef}>
      <div className={`${wrap} flex h-[86px] items-center justify-between gap-6`}>
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 text-xl font-semibold tracking-[-0.02em] text-ink [&_svg]:text-navy"
          aria-label="Qraft home"
          onClick={closeMenu}
        >
          <Logo />
          <span>qraft</span>
        </Link>

        {/* Mobile menu toggle button */}
        <button
          className="relative flex h-11 w-11 items-center justify-center rounded-[10px] border border-line bg-white transition-all duration-200 min-[901px]:hidden"
          aria-label={open ? 'Close navigation' : 'Toggle navigation'}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="relative flex h-[18px] w-[18px] items-center justify-center">
            <span
              className={`absolute h-[1.5px] w-[18px] rounded-sm bg-ink transition-transform duration-300 ease-in-out ${
                open ? 'rotate-45 translate-y-0' : '-translate-y-[6px]'
              }`}
            />
            <span
              className={`absolute h-[1.5px] w-[18px] rounded-sm bg-ink transition-opacity duration-200 ease-in-out ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute h-[1.5px] w-[18px] rounded-sm bg-ink transition-transform duration-300 ease-in-out ${
                open ? '-rotate-45 translate-y-0' : 'translate-y-[6px]'
              }`}
            />
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav
          className="ml-12 hidden flex-1 items-center justify-between min-[901px]:flex"
          aria-label="Main navigation"
        >
          <div className="flex items-center gap-[38px]">
            <NavLink to="/" end className={linkClass}>
              Overview
            </NavLink>
            <NavLink to="/pricing" className={linkClass}>
              Pricing
            </NavLink>
            {signedIn && (
              <NavLink to="/studio" className={linkClass}>
                Studio
              </NavLink>
            )}
          </div>

          <div className="flex items-center gap-3">
            {signedIn ? (
              <button
                className="px-1 py-2 text-[14.5px] text-muted hover:text-navy hover:underline"
                onClick={signOut}
              >
                Sign out
              </button>
            ) : (
              <>
                <Link to="/signin" className={`${buttonOutline} min-h-[46px] px-6 text-[14.5px]`}>
                  Sign In
                </Link>
                <Link to="/signup" className={`${buttonPrimary} min-h-[46px] px-6 text-[14.5px]`}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out min-[901px]:hidden ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
        }`}
      >
        <div className="overflow-hidden border-b border-line bg-white shadow-card">
          <nav className="flex flex-col px-6 pb-7 pt-4" aria-label="Mobile navigation">
            <div className="flex flex-col items-center">
              <NavLink to="/" end className={linkClass} onClick={closeMenu}>
                Overview
              </NavLink>
              <NavLink to="/pricing" className={linkClass} onClick={closeMenu}>
                Pricing
              </NavLink>
              {signedIn && (
                <NavLink to="/studio" className={linkClass} onClick={closeMenu}>
                  Studio
                </NavLink>
              )}
            </div>

            <div className="mt-[22px] flex flex-col items-stretch gap-3">
              {signedIn ? (
                <button
                  className="w-full py-3 text-center text-[14.5px] text-muted hover:text-navy"
                  onClick={() => {
                    signOut()
                    closeMenu()
                  }}
                >
                  Sign out
                </button>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className={`${buttonOutline} min-h-[46px] w-full justify-center px-6 text-[14.5px]`}
                    onClick={closeMenu}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className={`${buttonPrimary} min-h-[46px] w-full justify-center px-6 text-[14.5px]`}
                    onClick={closeMenu}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}