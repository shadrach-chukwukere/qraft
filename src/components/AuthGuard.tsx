import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { signedIn } = useAuth()
  const location = useLocation()

  useEffect(() => {
    if (!signedIn) {
      // Only redirect if we're on a studio route
      if (location.pathname.startsWith('/studio')) {
        window.dispatchEvent(new Event('qraft-auth'))
      }
    }
  }, [signedIn, location.pathname])

  if (!signedIn) {
    return <Navigate to="/signin" replace state={{ from: location }} />
  }

  return <>{children}</>
}
