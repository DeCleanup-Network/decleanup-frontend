'use client'
import { WagmiProvider } from 'wagmi'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { sepolia, arbitrumSepolia } from 'wagmi/chains'

const queryClient = new QueryClient()
const config = getDefaultConfig({
  appName: 'DeCleanup Network',
  projectId: 'YOUR_PROJECT_ID',
  chains: [sepolia, arbitrumSepolia],
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
