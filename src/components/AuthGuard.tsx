import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '../auth'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { signedIn, ready } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (ready && !signedIn) {
      // Only redirect if we're on a studio route
      if (pathname.startsWith('/studio')) {
        window.dispatchEvent(new Event('qraft-auth'))
        router.replace('/signin')
      }
    }
  }, [signedIn, ready, pathname, router])

  if (!ready || !signedIn) {
    return null
  }

  return <>{children}</>
}
