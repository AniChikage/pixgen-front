import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import '@/styles/globals.css'

import Script from 'next/script';
import Nav from '@/components/header/Nav'
import PrelineScript from '@/components/PrelineScript'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'PIXGEN',
//   description: '智能AI图片处理工具, AI赋能',
//   keywords: '一键, 消除物体, 模糊, 消除背景, 换脸, 人物换脸'
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          src="https://hm.baidu.com/hm.js?7ca9eaee1837bb42e470f1949560a9fa"
          strategy="beforeInteractive"
        />
      </body>
      <PrelineScript />
    </html>
  )
}
