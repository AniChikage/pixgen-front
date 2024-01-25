
import type { Metadata } from 'next'
import Head from 'next/head'
import Script from 'next/script';
import '@/styles/globals.css'

import Nav from '@/components/header/NavDaisy'
// import Nav from '@/components/header/Nav'
import Footer from '@/components/footer/BasicFooter'
import PrelineScript from '@/components/PrelineScript'

export const metadata: Metadata = {
  title: 'PIXGEN',
  description: '智能AI图片处理工具, AI赋能',
  keywords: '一键, 消除物体, 模糊, 消除背景, 换脸, 人物换脸'
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
          <Script
            src="https://hm.baidu.com/hm.js?7ca9eaee1837bb42e470f1949560a9fa"
            strategy="beforeInteractive"
          />
        </body>
        <PrelineScript />
      </html>
  )
}
