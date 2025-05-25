'use client'


// app/layout.tsx (stay server)
import { ReactNode } from 'react'
import SessionWrapper from './session-wrapper'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  )
}
