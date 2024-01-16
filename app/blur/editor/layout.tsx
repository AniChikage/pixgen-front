"use client"
import Head from 'next/head';
import '@/styles/globals.css'

import Script from 'next/script';
import PrelineScript from '@/components/PrelineScript'
import Nav from '@/components/header/NavErase';
import { RecoilRoot } from 'recoil';

import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'PIXGEN',
//   description: '智能AI图片处理工具, AI赋能',
//   keywords: '一键, 消除物体, 模糊, 消除背景, 换脸, 人物换脸'
// }

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RecoilRoot>
      <Head>
        <title>一键模糊编辑器</title>
        <meta name="description" content="一键模糊，编辑器" />
        <meta name="keywords" content="一键, 消除物体, 模糊, 消除背景, 换脸, 人物换脸" />
      </Head>

      <html lang="en">
        <body>
          <Nav />
          {children}
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
