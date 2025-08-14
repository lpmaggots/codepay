import type { Metadata } from 'next'
import '@/styles/globals.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Theme } from '@/providers/Theme'
import { AuthProvider } from '@/providers/AuthContext'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'CodePay',
  description: 'A modern and intuitive platform designed to simplify and streamline digital transactions.',
  icons: {
    icon: '/favicon/favicon-96x96.png',
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png'
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body>
        <Theme>
          <AuthProvider>
            <Navbar />
            {children}
            <ToastContainer position="bottom-center" autoClose={3000} />
          </AuthProvider>
        </Theme>
      </body>
    </html>
  )
}
