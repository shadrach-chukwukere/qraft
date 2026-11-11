import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from '../components/Navigation'
import { Footer } from '../components/Footer'
import { GoogleOneTap } from '../components/GoogleOneTap'

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    document.title = getTitle(pathname)
  }, [pathname])

  return (
    <div className="overflow-x-clip bg-white text-ink">
      <GoogleOneTap />
      <Header />
      <main>
          {children}
      </main>
      <Footer />
    </div>
  )
}

function getTitle(path: string) {
  if (path === '/pricing') return 'Pricing — Qraft'
  if (path === '/privacy') return 'Privacy Policy — Qraft'
  if (path === '/terms') return 'Terms of Service — Qraft'
  if (path === '/signin') return 'Sign In — Qraft'
  if (path === '/signup') return 'Sign Up — Qraft'
  if (path === '/contact') return 'Contact — Qraft'
  return 'Qraft — QR Design Studio'
}
