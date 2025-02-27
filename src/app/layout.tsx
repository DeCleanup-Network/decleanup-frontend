import { ThemeProvider } from 'next-themes'
import { JetBrains_Mono, Nunito, Bebas_Neue } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import '@/app/globals.css'

const mono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})
const nunito = Nunito({ subsets: ['latin'], weight: ['300', '400', '700'] })

const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: ['400'] })
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
      className={`${mono.variable} ${nunito.className} ${bebasNeue.className} antialiased`}
      suppressHydrationWarning
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
