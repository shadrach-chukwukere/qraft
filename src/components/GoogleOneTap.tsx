'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { toast } from 'sonner'

export function GoogleOneTap() {
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)
  const clientIdRef = useRef<string>('')

  const handleCredentialResponse = useCallback(async (response: any) => {
    try {
      const { error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
      })
      if (error) throw error
      toast.success('Signed in with Google')
      navigate('/studio', { replace: true })
    } catch (error: any) {
      toast.error(error.message || 'Google sign-in failed')
    }
  }, [navigate])

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    if (!clientId || loaded) return
    clientIdRef.current = clientId

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => {
      setLoaded(true)
      if (!(window as any).google) return
      ;(window as any).google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
        context: 'signin',
        ux_mode: 'popup',
      })
      ;(window as any).google.accounts.id.prompt((notification: any) => {
        if (notification.getNotDisplayedReason() === 'browser_not_supported') {
          // Silently ignore — browser doesn't support One Tap
        }
      })
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [loaded, handleCredentialResponse])

  return null
}
