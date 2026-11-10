import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { toast } from 'sonner'
import { h1 } from '../ui'
import { GoogleButton } from '../components/GoogleButton'

export function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!email.trim()) {
      toast.error('Enter an email address.')
      return
    }
    if (!password) {
      toast.error('Enter a password.')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      toast.success('Signed in successfully')
      navigate('/studio', { replace: true })
    } catch (error: any) {
      toast.error(error.message || 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
      // OAuth redirects the page, so we won't reach here normally
    } catch (error: any) {
      setGoogleLoading(false)
      toast.error(error.message || 'Google sign-in failed')
    }
  }

  return (
    <section
      className="min-h-[calc(100vh-86px)] flex items-center justify-center bg-off-white py-[40px] px-[20px]"
    >
      <div className="max-w-[520px] w-full">
        <div className="mb-[40px] text-center">
          <h1 className={h1}>Sign in to Qraft</h1>
          <p className="mt-0 text-muted">QR design studio</p>
        </div>

        <div className="space-y-[20px]">
          {/* Google Button - top, prominent */}
          <GoogleButton
            onGoogleSignIn={handleGoogleSignIn}
            fullWidth
            loading={googleLoading}
          />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-line" />
            </div>
            <div className="relative flex justify-center text-[12px] font-medium text-subtle uppercase tracking-[0.14em]">
              <span className="px-3 bg-off-white text-subtle">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-[16px]">
            <div className="space-y-[12px]">
              <label className="block text-[14px] font-medium text-ink">
                Email address
              </label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full min-h-[50px] px-[14px] py-[11px] rounded-[12px] border border-line-strong bg-white text-ink text-[15px] focus-visible:outline-0 focus-visible:border-blue focus-visible:ring-[3px] focus-visible:ring-blue-soft/60 transition-[border-color,box-shadow] duration-200 ease-out"
              />
            </div>

            <div className="space-y-[12px]">
              <label className="block text-[14px] font-medium text-ink">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full min-h-[50px] px-[14px] py-[11px] rounded-[12px] border border-line-strong bg-white text-ink text-[15px] focus-visible:outline-0 focus-visible:border-blue focus-visible:ring-[3px] focus-visible:ring-blue-soft/60 transition-[border-color,box-shadow] duration-200 ease-out"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full min-h-[50px] rounded-[12px] text-[15px] font-medium transition-[background,opacity] duration-200 ease-out disabled:opacity-60 disabled:cursor-not-allowed ${
                loading
                  ? 'bg-studio-surface-soft text-studio-muted border border-studio-line'
                  : 'bg-navy text-white hover:bg-navy-deep'
              }`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="mt-[32px] text-center text-[14px] text-muted">
          New here?{' '}
          <Link to="/signup" className="text-blue font-medium hover:underline">
            Create an account
          </Link>
        </p>

        <p className="text-center text-[12.5px] leading-[1.6] text-subtle mt-[24px]">
          Sign in with Google to save your QR codes to your account. No password
          needed.
        </p>
      </div>
    </section>
  )
}
