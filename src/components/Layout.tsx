import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../components/Navigation'
import { Footer } from '../components/Footer'
import { GoogleOneTap } from '../components/GoogleOneTap'

export function MarketingLayout() {
  const location = useLocation()

  useEffect(() => {
    document.title = getTitle(location.pathname)
  }, [location.pathname])

  return (
    <div className="overflow-x-clip bg-white text-ink">
      <GoogleOneTap />
      <Header />
      <main>
        <Outlet />
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
