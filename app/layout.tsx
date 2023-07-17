import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/app/context/StoreModalProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-commerce',
  description: 'A place to sell your items on the internet',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <ModalProvider>
        <html lang='en'>
          <body className={inter.className}>{children}</body>
        </html>
      </ModalProvider>
    </ClerkProvider>
  )
}
