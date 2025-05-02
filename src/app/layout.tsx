import Header from '@/components/Header'
import Footer from '@/components/Footer'

import { ContextProvider } from '@/context/ContextApi'
import { ThirdwebProvider } from "thirdweb/react";
import {SessionProvider} from "@/components/SessionProvider"
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
        <div className='border-8 border-black h-screen flex flex-col'>
          <ThirdwebProvider>
          <ContextProvider>
            <Providers>
              <Header />
              <main className='flex-1 overflow-y-auto bg-[#58B12F]'>
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