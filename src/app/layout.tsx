import Header from '@/components/Header'
import Footer from '@/components/Footer'

import { ContextProvider } from '@/context/ContextApi'
import { ThirdwebProvider } from 'thirdweb/react'
import { SessionProvider } from '@/components/SessionProvider'
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
          <ThirdwebProvider>
            <ContextProvider>
              <Providers>
                <Header />
                <main className='md:overflow-y-none flex-1 bg-[#58B12F] xs:overflow-x-hidden xs:overflow-y-scroll md:overflow-y-auto'>
                  {children}
                </main>
                <Footer />
              </Providers>
            </ContextProvider>
          </ThirdwebProvider>
        </div>
      </body>
    </html>
  )
}
