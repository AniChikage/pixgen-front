import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import '@/styles/globals.css'

import Nav from '@/components/header/Nav'
import Footer from '@/components/footer/BasicFooter'
import PrelineScript from '@/components/PrelineScript'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
      <PrelineScript />
    </html>
  )
}
