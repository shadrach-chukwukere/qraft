import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { ToastHost } from './ToastHost'
import '../src/index.css'

export const metadata: Metadata = {
  title: 'Qraft | QR design studio',
  description:
    'Create thoughtful, customizable QR codes with a local-first design studio.',
  icons: {
    icon: '/logo.webp',
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta name="google-site-verification" content="-z6Vmxp38nxjZc5y0MaHydjRmhx4o2r1lQWpALRB_bg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="root">
          {children}
          <ToastHost />
        </div>
      </body>
    </html>
  )
}
