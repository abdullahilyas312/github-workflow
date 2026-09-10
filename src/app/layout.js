

"use client"

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Header'
import '@/styles/globals.css'
import { Poppins, Afacad } from 'next/font/google'
import { CartProvider } from '@/context/CartContext'
import { CategoryProvider } from '@/context/CategoryContext'
import { UserProvider } from '@/context/UserContext'
import QueryProvider from '@/components/providers/QueryProvider'
import { SnackbarProvider } from 'notistack'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const afacad = Afacad({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-afacad',
  display: 'swap',
})


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>AWC</title>
      </head>
      <body className={`${poppins.variable} ${afacad.variable} font-sans`}>
        <SnackbarProvider 
          maxSnack={3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <QueryProvider>
            <UserProvider>
              <CartProvider>
                <CategoryProvider>
                  <Navbar />
                    <main>{children}</main>
                  <Footer />
                </CategoryProvider>
              </CartProvider>
            </UserProvider>
          </QueryProvider>
        </SnackbarProvider>
      </body>
    </html>
  )
}
