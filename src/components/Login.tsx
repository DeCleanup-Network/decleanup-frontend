'use client'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'

const Login: React.FC = () => {
  const { address, isConnected } = useAccount()
  const [isConnecting, setIsConnecting] = useState(false)

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <div className='flex h-[730px] flex-col bg-[#58b12f]'>
      {/* Main Content */}
      <div className='flex flex-col items-center'>
        {/* Heading */}
        <h2 className='mb-4 mt-4 max-w-full whitespace-normal p-2 text-center font-nunito text-4xl font-bold leading-3 sm:text-5xl md:text-6xl md:font-extrabold lg:text-8xl xl:text-9xl'>
          DECLEANUP REWARDS
        </h2>

        <hr className='my-4 w-full border-t-2 border-black' />

        {/* Subheading and Description */}
        <div className='flex flex-col items-center py-5 text-center'>
          <p className='mb-4 bg-[#FAFF00] p-2 font-nunito text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl'>
            FIRST DAPP TO SELF-TOKENIZE ENVIRONMENTAL CLEANUP EFFORTS
          </p>
          <p
            className='mb-6 font-bebas text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl'
            style={{ lineHeight: '1.2' }}
          >
            APPLY WITH YOUR CLEANUP RESULTS TO RECEIVE A DECLEANUP IMPACT
            PRODUCT, PROGRESS THROUGH LEVELS AND EARN POINTS, REDEEMABLE IN THE
            FUTURE
          </p>
        </div>

        <hr className='my-4 w-full border-t-2 border-black' />

        {/* Connect Wallet Button or Dashboard Entry */}
        <div className='mt-10 w-full px-4'>
          {!isConnected ? (
            <div className='flex h-[100px] w-full items-center justify-center rounded bg-black py-3 font-bold text-[#FAFF00] transition-all hover:bg-gray-800 md:text-7xl'>
              <ConnectButton.Custom>
                {({ account, openAccountModal, openConnectModal, mounted }) => {
                  const connected = mounted && account

                  return (
                    <div>
                      <button
                        onClick={openConnectModal}
                        className='flex h-full w-full items-center'
                      >
                        <span className='font-medium text-[#FAFF00]'>
                          Connect Wallet
                        </span>
                      </button>
                    </div>
                  )
                }}
              </ConnectButton.Custom>
            </div>
          ) : (
            <div className='w-full space-y-4'>
              <button className='h-[100px] w-full rounded bg-black py-3 font-bold text-[#FAFF00] transition-all hover:bg-gray-800 md:text-7xl'>
                <Link href={'/dashboard'}>START CLEANUP</Link>
              </button>

              <div className='flex items-center justify-center rounded bg-black bg-opacity-80 py-2 text-white'>
                <div className='mr-2 h-3 w-3 rounded-full bg-[#58b12f]'></div>
                <ConnectButton.Custom>
                  {({
                    account,
                    openAccountModal,
                    openConnectModal,
                    mounted,
                  }) => {
                    const connected = mounted && account

                    return (
                      <div>
                        <button
                          onClick={openAccountModal}
                          className='flex items-center w-full'
                        >
                          <span className='font-medium text-white'>
                            {account?.displayName}
                          </span>
                        </button>
                      </div>
                    )
                  }}
                </ConnectButton.Custom>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
