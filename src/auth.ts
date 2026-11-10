import { useEffect, useState } from 'react'

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
  const [signedIn, setSignedIn] = useState(isSignedIn)

  useEffect(() => {
    const update = () => setSignedIn(isSignedIn())
    window.addEventListener('qraft-auth', update)
    window.addEventListener('storage', update)
    return () => {
      window.removeEventListener('qraft-auth', update)
      window.removeEventListener('storage', update)
    }
  }, [])

  return { signedIn, email: getEmail(), signOut }
}
