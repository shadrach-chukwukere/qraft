import { useEffect, useState } from 'react'
import { getSupabaseClient } from './supabaseClient'

const SESSION_KEY = 'qraft-session'
const EMAIL_KEY = 'qraft-email'

export function isSignedIn() {
  try {
    return localStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function getEmail() {
  try {
    return localStorage.getItem(EMAIL_KEY) || ''
  } catch {
    return ''
  }
}

export function signIn(email: string) {
  try {
    localStorage.setItem(SESSION_KEY, '1')
    localStorage.setItem(EMAIL_KEY, email)
  } catch {
    /* storage may be unavailable */
  }
  window.dispatchEvent(new Event('qraft-auth'))
}

export function signOut() {
  try {
    localStorage.removeItem(SESSION_KEY)
    localStorage.removeItem(EMAIL_KEY)
  } catch {
    /* storage may be unavailable */
  }
  window.dispatchEvent(new Event('qraft-auth'))
}

export function useAuth() {
  const [signedIn, setSignedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let active = true
    const updateFromLocal = () => {
      setSignedIn(isSignedIn())
      setEmail(getEmail())
      setReady(true)
    }

    const updateFromSession = (session: { user: { email?: string } } | null) => {
      if (!active) return
      setSignedIn(Boolean(session))
      setEmail(session?.user.email || getEmail())
      setReady(true)
    }

    window.addEventListener('qraft-auth', updateFromLocal)
    window.addEventListener('storage', updateFromLocal)

    let unsubscribe = () => {}
    try {
      const supabase = getSupabaseClient()
      void supabase.auth.getSession().then(({ data: { session } }) => {
        updateFromSession(session)
      }).catch(updateFromLocal)
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        updateFromSession(session)
      })
      unsubscribe = () => data.subscription.unsubscribe()
    } catch {
      updateFromLocal()
    }

    return () => {
      active = false
      unsubscribe()
      window.removeEventListener('qraft-auth', updateFromLocal)
      window.removeEventListener('storage', updateFromLocal)
    }
  }, [])

  const handleSignOut = () => {
    try {
      void getSupabaseClient().auth.signOut()
    } catch {
      // Local sign-out still works when Supabase is not configured.
    }
    signOut()
  }

  return { signedIn, email, ready, signOut: handleSignOut }
}
