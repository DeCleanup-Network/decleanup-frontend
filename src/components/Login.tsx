'use client'
import { useState } from 'react'
import { useAccount } from 'wagmi'

import { ConnectButton } from 'thirdweb/react'
import { client } from '@/app/client'
import Link from 'next/link'

const Login: React.FC = () => {
  const { address, isConnected } = useAccount()
  const [isConnecting, setIsConnecting] = useState(false)

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <div className='flex flex-1 flex-col'>
      {/* Main Content */}
      <div className='flex h-[calc(95vh-160px)] min-h-[calc(98vh-160px)] flex-col items-center'>
        {/* Heading */}
        <div className='flex w-full items-center justify-center'>
          <h2 className='text-center font-bebas text-[105px] font-normal leading-none md:text-[140px] xl:text-[200px]'>
            DECLEANUP REWARDS
          </h2>
        </div>

        <hr className='my-4 w-full border-t-2 border-black' />

        {/* Subheading and Description */}
        <div className='flex flex-col items-center px-4 py-2 text-center'>
          <p className='mb-4 bg-[#FAFF00] p-2 font-bebas text-lg font-normal sm:text-xl md:text-6xl'>
            FIRST DAPP TO SELF-TOKENIZE ENVIRONMENTAL CLEANUP EFFORTS
          </p>
          <p className='mb-6 font-bebas text-xl font-normal sm:text-2xl md:text-6xl'>
            APPLY WITH YOUR CLEANUP RESULTS TO RECEIVE A DECLEANUP IMPACT
            PRODUCT, PROGRESS THROUGH LEVELS AND EARN POINTS, REDEEMABLE IN THE
            FUTURE
          </p>
        </div>

        <hr className='my-6 w-full border-t-2 border-black' />

        {/* Connect Wallet Button or Dashboard Entry */}
        <div className='w-full px-4 py-4'>
          {!isConnected ? (
            <div className='flex h-24 w-full items-center justify-center rounded bg-black py-3 font-bold text-[#FAFF00] transition-all hover:bg-gray-800'>
                <ConnectButton
                  client={client}
                  appMetadata={{
                    name: 'Example App',
                    url: 'https://example.com',
                  }}
                />
              
            </div>
          ) : (
            <div className='w-full space-y-4'>
              <button className='h-24 w-full rounded bg-black py-3 font-bebas font-bold text-[#FAFF00] transition-all hover:bg-gray-800 md:text-4xl'>
                <Link href={'/dashboard'} className='mt-2 text-7xl'>
                  START CLEANUP
                </Link>
              </button>

              <div className='flex items-center justify-center rounded bg-black bg-opacity-80 text-white'>
                <div className='mr-2 h-3 w-3 rounded-full bg-[#58b12f]'></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
