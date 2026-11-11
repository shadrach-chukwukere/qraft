import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import '../src/index.css'

export const metadata: Metadata = {
  title: 'Qraft | QR design studio',
  description:
    'Create thoughtful, customizable QR codes with a local-first design studio.',
  icons: {
    icon: '/logo.webp',
  },
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
