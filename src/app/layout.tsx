import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ContextProvider } from '@/context/ContextApi'
import { ThirdwebProvider } from 'thirdweb/react'
import { Providers } from './provider'

import '@/app/globals.css'

export const metadata = {
  title: 'Decentralized Clean Up Network',
  description: 'DCU',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='h-full'>
      <body className='h-full'>
        <div className='flex h-screen flex-col border-black md:border-8'>
          <Providers>
            <ContextProvider>
              <Header />
              <main className='md:overflow-y-none flex-1 overflow-x-hidden bg-[#58B12F] md:overflow-hidden'>
                {children}
              </main>
              <Footer />
            </ContextProvider>
          </Providers>
        </div>
      </body>
    </html>
  )
}
