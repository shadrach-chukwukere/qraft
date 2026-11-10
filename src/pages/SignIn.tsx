import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '../auth'
import { wrap, h1, buttonPrimary } from '../ui'

export function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!email.trim()) {
      setError('Enter an email address to continue.')
      return
    }
    signIn(email.trim())
    navigate('/studio')
  }

  return (
    <section
      className="relative min-h-[calc(100vh-86px)] pt-[90px] pb-[120px] overflow-hidden bg-white bg-[radial-gradient(ellipse_70%_60%_at_50%_0%_,#edf2ff_0%_,rgba(255,255,255,0)_72%)]"
    >
      <div className={`${wrap} max-w-[520px] mx-auto`}>
        <div className="text-center mb-[30px]">
          <h1 className={h1}>Sign in to Qraft</h1>
          <p className="mt-0 text-muted">QR design studio</p>
        </div>

        <form className="p-[36px] rounded-[22px] border border-line bg-white shadow-card" onSubmit={handleSubmit} noValidate>
          <label className="block mb-2 text-[14px] font-medium" htmlFor="signin-email">
            Email address
          </label>
          <div className="flex items-center gap-2.5 h-[54px] px-4 rounded-[12px] border border-line-strong bg-white text-subtle mb-[20px] focus-within:border-blue focus-within:ring-[3px] focus-within:ring-blue-soft/60">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            <input
              id="signin-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setError('')
              }}
              className="flex-1 border-0 outline-0 bg-transparent text-[15px] text-ink"
            />
          </div>

          <label className="block mb-2 text-[14px] font-medium" htmlFor="signin-password">
            Password
          </label>
          <div className="flex items-center gap-2.5 h-[54px] px-4 rounded-[12px] border border-line-strong bg-white text-subtle mb-[20px] focus-within:border-blue focus-within:ring-[3px] focus-within:ring-blue-soft/60">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <rect x="4" y="10" width="16" height="10" rx="3" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            <input
              id="signin-password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="flex-1 border-0 outline-0 bg-transparent text-[15px] text-ink"
            />
          </div>

          {error && (
            <p className="mt-[-8px] mb-[16px] text-[13.5px] text-danger" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className={`${buttonPrimary} w-full mt-[6px]`}>
            Sign in
          </button>

          <p className="mt-[22px] text-center text-[14.5px] text-muted">
            New here?{' '}
            <Link to="/studio" className="text-blue font-medium hover:underline">
              Get started
            </Link>
          </p>
          <p className="mt-3 text-center text-[12.5px] leading-[1.6] text-subtle">
            Demo sign-in for this local project. No account is created and no
            data leaves your device.
          </p>
        </form>
      </div>
    </section>
  )
}
