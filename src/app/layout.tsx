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
    <html lang='en'>
      <body>
        <div className='border-8 border-black'>
          <ContextProvider>
            <Providers>
              <Header />
              {children}
              <Footer />
            </Providers>
          </ContextProvider>
        </div>
      </body>
    </html>
  )
}
