import { useEffect, useRef } from 'react'
import QRCodeStyling from 'qr-code-styling'

export function QRVisual({
  size = 200,
  data = 'https://qraft.studio',
  className = '',
}: {
  size?: number
  data?: string
  className?: string
}) {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!host.current) return
    host.current.replaceChildren()
    const qr = new QRCodeStyling({
      width: size,
      height: size,
      type: 'svg',
      data,
      margin: 2,
      qrOptions: { errorCorrectionLevel: 'H' },
      dotsOptions: { color: '#0b1a3a', type: 'rounded' },
      backgroundOptions: { color: '#ffffff' },
      cornersSquareOptions: { color: '#0b1a3a', type: 'extra-rounded' },
      cornersDotOptions: { color: '#0b1a3a', type: 'dot' },
    })
    qr.append(host.current)
  }, [data, size])

  return (
    <div
      className={`overflow-hidden rounded-xl leading-none [&_svg]:block [&_svg]:h-full [&_svg]:w-full ${className}`}
      ref={host}
      style={{ width: size, height: size }}
      aria-label="Example QR code"
    />
  )
}
