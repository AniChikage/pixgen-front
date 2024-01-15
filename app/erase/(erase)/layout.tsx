"use client"
import Head from 'next/head';
import '@/styles/globals.css'

import Script from 'next/script';
import Nav from '@/components/header/NavDaisy'
import Footer from '@/components/footer/BasicFooter'
import PrelineScript from '@/components/PrelineScript'

import { RecoilRoot } from 'recoil';

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RecoilRoot>
      <Head>
        <title>消除物体</title>
        <meta name="description" content="一键消除物体" />
        <meta name="keywords" content="一键, 消除物体, 模糊, 消除背景, 换脸, 人物换脸" />
      </Head>

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
    </RecoilRoot>
  )
}
