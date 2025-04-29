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

  const lines = ['FIRST DAPP TO SELF-TOKENIZE ENVIRONMENTAL', 'CLEANUP EFFORTS']
  const linesMd = [
    'FIRST DAPP TO SELF-TOKENIZE',
    'ENVIRONMENTAL CLEANUP EFFORTS',
  ]
  const linesLg = [
    'FIRST DAPP TO SELF-TOKENIZE ENVIRONMENTAL',
    'CLEANUP EFFORTS',
  ]

  return (
    <div className='flex flex-1 flex-col bg-[#58B12F]'>
      {/* Main Content */}
      <div className='flex h-[calc(95vh-160px)] min-h-[calc(98vh-160px)] flex-col items-center'>
        {/* Heading */}
        <h2 className='w-full py-5 text-center font-bebas font-semibold xs:text-[90px] xs:leading-[6rem] sm:text-[120px] md:text-[150px] md:font-normal md:leading-[8rem] lg:text-[200px] lg:leading-[10rem]'>
          DECLEANUP REWARDS
        </h2>

        <hr className='mb-4 w-full border-t-2 border-black' />

        {/* Subheading and Description */}
        <div className='flex flex-col items-center py-2 text-center xs:px-2 sm:px-4'>
          <p className='mb-4 bg-[#FAFF00] p-2 font-bebas text-lg font-normal xs:hidden sm:text-xl md:text-6xl xl:block'>
            FIRST DAPP TO SELF-TOKENIZE ENVIRONMENTAL CLEANUP EFFORTS
          </p>
          <div className='mb-3 md:hidden'>
            <div className='font-bebas leading-none text-black xs:text-xl xs:leading-none sm:text-3xl md:text-[3.1rem] md:leading-snug'>
              {lines.map((line, index) => (
                <div
                  key={index}
                  className='inline-block bg-[#FAFF00] px-2 py-1'
                >
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* Tablet */}
          <div className='mb-5 xs:hidden md:block lg:hidden xl:hidden'>
            <div className='font-bebas text-6xl leading-none text-black'>
              {linesMd.map((line, index) => (
                <div
                  key={index}
                  className='inline-block bg-[#FAFF00] px-2 py-1'
                >
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* Laptop screen */}
          <div className='mb-5 xs:hidden lg:block xl:hidden'>
            <div className='font-bebas text-6xl leading-none text-black'>
              {linesLg.map((line, index) => (
                <div
                  key={index}
                  className='inline-block bg-[#FAFF00] px-2 py-1'
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
          <p className='mb-6 font-bebas text-xl font-normal sm:text-3xl md:text-6xl'>
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
              <ConnectButton.Custom>
                {({ account, openAccountModal, openConnectModal, mounted }) => {
                  const connected = mounted && account

                  return (
                    <div>
                      <button
                        onClick={openConnectModal}
                        className='flex h-full w-full items-center justify-center'
                      >
                        <span className='font-bebas font-medium text-[#FAFF00] xs:text-2xl sm:text-4xl md:text-7xl'>
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
              <button className='h-24 w-full rounded bg-black py-3 font-bebas font-bold text-[#FAFF00] transition-all hover:bg-gray-800 md:text-4xl'>
                <Link href={'/dashboard'} className='mt-2 text-7xl'>
                  START CLEANUP
                </Link>
              </button>

              <div className='flex items-center justify-center rounded bg-black bg-opacity-80 text-white'>
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
                          className='flex w-full items-center justify-center'
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
