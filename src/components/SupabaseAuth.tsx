'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { toast } from 'sonner';

type AuthMode = 'signin' | 'signup';

export function SupabaseAuth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) {
      toast.error('Enter an email address.');
      return;
    }
    if (!password) {
      toast.error('Enter a password.');
      return;
    }
    if (mode === 'signup' && password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success('Signed in successfully.');
        navigate('/studio');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: email.split('@')[0],
            },
          },
        });
        if (error) throw error;
        toast.success('Account created. Check your email to confirm.');
        navigate('/signin');
      }
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithProvider = async (provider: 'google' | 'github') => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || 'Social sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-86px)] flex items-center justify-center bg-off-white py-[40px] px-[20px]">
      <div className="max-w-[480px] w-full">
        <div className="mb-[40px] text-center">
          <h1 className="text-[32px] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
            {mode === 'signin' ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="mt-[8px] text-[15px] text-muted">
            {mode === 'signin'
              ? 'Sign in to access your QR codes.'
              : 'Join Qraft to save your designs.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-[16px]">
          <div className="space-y-[12px]">
            <label className="block text-[14px] font-medium text-ink">
              Email address
            </label>
            <input
              type="email"
              autoComplete={mode === 'signin' ? 'email' : 'email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full min-h-[50px] px-[14px] py-[11px] rounded-[12px] border border-line-strong bg-white text-ink text-[15px] focus-visible:outline-0 focus-visible:border-studio-accent focus-visible:ring-[3px] focus-visible:ring-studio-tint/60 transition-[border-color,box-shadow] duration-200 ease-out"
            />
          </div>

          <div className="space-y-[12px]">
            <label className="block text-[14px] font-medium text-ink">
              Password
            </label>
            <input
              type="password"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full min-h-[50px] px-[14px] py-[11px] rounded-[12px] border border-line-strong bg-white text-ink text-[15px] focus-visible:outline-0 focus-visible:border-studio-accent focus-visible:ring-[3px] focus-visible:ring-studio-tint/60 transition-[border-color,box-shadow] duration-200 ease-out"
            />
          </div>

          {mode === 'signup' && (
            <div className="space-y-[12px]">
              <label className="block text-[14px] font-medium text-ink">
                Confirm password
              </label>
              <input
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full min-h-[50px] px-[14px] py-[11px] rounded-[12px] border border-line-strong bg-white text-ink text-[15px] focus-visible:outline-0 focus-visible:border-studio-accent focus-visible:ring-[3px] focus-visible:ring-studio-tint/60 transition-[border-color,box-shadow] duration-200 ease-out"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full min-h-[50px] rounded-[12px] text-[15px] font-medium transition-[background,opacity] duration-200 ease-out disabled:opacity-60 disabled:cursor-not-allowed ${
              loading
                ? 'bg-studio-surface-soft text-studio-muted border border-studio-line'
                : 'bg-navy text-white hover:bg-navy-deep'
            }`}
          >
            {loading ? 'Please wait...' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <p className="mt-[20px] text-center text-[14px] text-muted">
          {mode === 'signin'
            ? "Don't have an account? "
            : 'Already have an account? '}
          <button
            type="button"
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-blue font-medium hover:underline ml-1"
          >
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </button>
        </p>

        <div className="mt-[32px]">
          <hr className="border-t border-line mb-[16px]" />
          <p className="text-[12px] text-subtle text-center mb-[16px]">
            Or continue with
          </p>
          <div className="grid grid-cols-2 gap-[12px]">
            <button
              onClick={() => handleSignInWithProvider('google')}
              className="flex items-center justify-center gap-[10px] min-h-[46px] rounded-[12px] border border-line bg-white text-ink text-[14px] font-medium hover:bg-studio-surface-soft transition-[background] duration-200 ease-out"
              disabled={loading}
            >
              <span className="text-[20px]">G</span>
              Google
            </button>
            <button
              onClick={() => handleSignInWithProvider('github')}
              className="flex items-center justify-center gap-[10px] min-h-[46px] rounded-[12px] border border-line bg-white text-ink text-[14px] font-medium hover:bg-studio-surface-soft transition-[background] duration-200 ease-out"
              disabled={loading}
            >
              <span className="text-[20px]">🐙</span>
              GitHub
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
