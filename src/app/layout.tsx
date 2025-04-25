import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ContextProvider } from '@/context/ContextApi'
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
          <ContextProvider>
            <Providers>
              <Header />
              <main className='xs:overflow-y-scroll xs:overflow-x-hidden md:overflow-y-none flex-1 bg-[#58B12F] md:overflow-y-auto'>
                {children}
              </main>
              <Footer />
            </Providers>
          </ContextProvider>
        </div>
      </body>
    </html>
  )
}
