import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movie Buff',
  description: 'Best Place to find the best movies specially for you across different OTTs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen overflow-x-hidden bg-primary md:pb-0 pb-20 first:mt-0 space-y-12")}>
        {children}
      </body>
    </html>
  )
}
