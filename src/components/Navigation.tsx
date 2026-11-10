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

  return (
    <header className="sticky top-0 z-[1000] w-full border-b border-white/55 bg-[#f9fafb]/72 backdrop-blur-[20px] backdrop-saturate-180">
      <div className={`${wrap} flex h-[86px] items-center justify-between gap-6`}>
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 text-xl font-semibold tracking-[-0.02em] text-ink [&_svg]:text-navy"
          aria-label="Qraft home"
        >
          <Logo />
          <span>qraft</span>
        </Link>

        <button
          className="hidden h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-[10px] border border-line bg-white max-[900px]:flex"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="h-[1.5px] w-[18px] rounded-sm bg-ink" />
          <span className="h-[1.5px] w-[18px] rounded-sm bg-ink" />
          <span className="h-[1.5px] w-[18px] rounded-sm bg-ink" />
        </button>

        <nav
          className={`ml-12 flex flex-1 items-center justify-between max-[900px]:absolute max-[900px]:inset-x-0 max-[900px]:top-[86px] max-[900px]:ml-0 max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:gap-0 max-[900px]:border-b max-[900px]:border-line max-[900px]:bg-white max-[900px]:px-6 max-[900px]:pb-7 max-[900px]:pt-5 max-[900px]:shadow-card ${
            open ? 'max-[900px]:flex' : 'max-[900px]:hidden'
          }`}
          aria-label="Main navigation"
          ref={navRef}
        >
          <div className="flex items-center gap-[38px] max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:gap-0">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `py-1.5 text-[15.5px] transition-colors hover:text-navy max-[900px]:border-b max-[900px]:border-line max-[900px]:py-3.5 max-[900px]:text-base ${isActive ? 'font-medium text-navy' : 'font-normal text-ink-soft'}`
              }
              aria-current="page"
            >
              Overview
            </NavLink>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `py-1.5 text-[15.5px] transition-colors hover:text-navy max-[900px]:border-b max-[900px]:border-line max-[900px]:py-3.5 max-[900px]:text-base ${isActive ? 'font-medium text-navy' : 'font-normal text-ink-soft'}`
              }
            >
              Pricing
            </NavLink>
            {signedIn && (
              <NavLink
                to="/studio"
                className={({ isActive }) =>
                  `py-1.5 text-[15.5px] transition-colors hover:text-navy max-[900px]:border-b max-[900px]:border-line max-[900px]:py-3.5 max-[900px]:text-base ${isActive ? 'font-medium text-navy' : 'font-normal text-ink-soft'}`
                }
              >
                Studio
              </NavLink>
            )}
          </div>

          <div className="flex items-center gap-3 max-[900px]:mt-[18px] max-[900px]:flex-col max-[900px]:items-stretch">
            {signedIn ? (
              <button className="px-1 py-2 text-[14.5px] text-muted hover:text-navy hover:underline" onClick={signOut}>
                Sign out
              </button>
            ) : (
              <>
                <Link to="/signin" className={`${buttonOutline} min-h-[46px] px-6 text-[14.5px] max-[900px]:w-full`}>
                  Sign In
                </Link>
                <Link to="/studio" className={`${buttonPrimary} min-h-[46px] px-6 text-[14.5px] max-[900px]:w-full`}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
