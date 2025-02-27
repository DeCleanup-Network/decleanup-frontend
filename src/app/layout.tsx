import { ThemeProvider } from 'next-themes'
import { JetBrains_Mono } from 'next/font/google' 
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import '@/app/globals.css'

const mono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

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
    <html
      lang='en'
    
    >
      <body>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <div className="m-5">
          <Header />
          {children}

          <Footer />

          </div>
          </ThemeProvider>
      </body>
    </html>
  )
}