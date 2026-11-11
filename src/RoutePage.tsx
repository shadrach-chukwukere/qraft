'use client'

import { usePathname } from 'next/navigation'
import { StudioApp } from './App'
import { AuthGuard } from './components/AuthGuard'
import { MarketingLayout } from './components/Layout'
import { ScrollToTop } from './components/ScollToTop'
import { Contact } from './screens/Contact'
import { Overview } from './screens/Overview'
import { Pricing } from './screens/Pricing'
import { Privacy } from './screens/Privacy'
import { SignIn } from './screens/SignIn'
import { SignUp } from './screens/SignUp'
import { Terms } from './screens/Terms'

export function RoutePage() {
  const pathname = usePathname()

  if (pathname.startsWith('/studio')) {
    return (
      <>
        <ScrollToTop />
        <AuthGuard>
          <StudioApp />
        </AuthGuard>
      </>
    )
  }

  let page
  switch (pathname) {
    case '/':
      page = <Overview />
      break
    case '/pricing':
      page = <Pricing />
      break
    case '/privacy':
      page = <Privacy />
      break
    case '/terms':
      page = <Terms />
      break
    case '/signin':
      page = <SignIn />
      break
    case '/signup':
      page = <SignUp />
      break
    case '/contact':
      page = <Contact />
      break
    default:
      page = <Overview />
  }

  return (
    <>
      <ScrollToTop />
      <MarketingLayout>{page}</MarketingLayout>
    </>
  )
}
