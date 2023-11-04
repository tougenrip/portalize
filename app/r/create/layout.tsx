import Navbar from '@/components/SocialComp/Navbar'
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import Providers from '@/components/SocialComp/Providers'
import { Toaster } from '@/components/SocialComp/ui/Toaster'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Breadit',
  description: 'A Reddit clone built with Next.js and TypeScript.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className={cn(
        'bg-black text-slate-900 antialiased light',
        inter.className
      )}>
      <body className='min-h-screen pt-12 bg-slate-50 antialiased'>
        <Providers>
          <Navbar />

          <div className='container max-w-7xl mx-auto h-full pt-12'>
            {children}
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
