'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ContractInfo } from '@/components/features/ContractInfo'
import { useAccount } from 'wagmi'
import Link from 'next/link'

const Login: React.FC = () => {
  const { isConnected } = useAccount()
  const truncateAddress = (addr?: string) => {
    if (!addr) return ''
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const lines = ['FIRST DAPP TO SELF-TOKENIZE ENVIRONMENTAL', 'CLEANUP EFFORTS']
  const linesMd = [
    'FIRST DAPP TO SELF-TOKENIZE',
    'ENVIRONMENTAL CLEANUP EFFORTS',
  ]
  const _linesLg = [
    'FIRST DAPP TO SELF-TOKENIZE ENVIRONMENTAL',
    'CLEANUP EFFORTS',
  ]
  console.log(ContractInfo())
  return (
    <div className='flex flex-1 flex-col bg-[#58B12F]'>
      {/* Main Content */}
      <div className='flex h-[calc(95vh-160px)] min-h-[calc(100vh-160px)] flex-col items-center md:min-h-[calc(100vh-160px)]'>
        {/* Heading */}
        <h2 className='w-full py-3 text-center font-bebas font-extrabold xs:text-[60px] xs:leading-[4rem] sm:text-[120px] md:text-[150px] md:leading-[8rem] lg:text-[170px] lg:leading-[13rem]'>
          DECLEANUP REWARDS
        </h2>

        <hr className='mb-4 w-full border-t-2 border-black' />

        {/* Subheading and Description */}
        <div className='flex flex-col items-center py-2 text-center xs:px-2 sm:px-4'>
          <p className='mb-4 mt-5 inline-block bg-[#FAFF00] px-3 py-1 font-bebas text-lg font-normal leading-tight xs:hidden sm:text-xl md:text-5xl xl:block'>
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

          <p className='mt-3 font-bebas text-xl font-bold sm:text-3xl md:mb-6 md:text-6xl'>
            APPLY WITH YOUR CLEANUP RESULTS TO RECEIVE A DECLEANUP IMPACT
            PRODUCT, PROGRESS THROUGH LEVELS AND EARN POINTS, REDEEMABLE IN THE
            FUTURE
          </p>
        </div>

        <hr className='my-6 w-full border-t-2 border-black' />

        <div className='h-36 w-full px-4 py-4'>
          {isConnected ? (
            <Link href='/dashboard' passHref>
              <div className='flex h-16 w-full cursor-pointer items-center justify-center rounded bg-black py-2 font-bebas text-lg font-bold text-[#FAFF00] transition-all hover:bg-gray-800 xs:h-20 xs:text-xl sm:h-20 sm:text-2xl md:h-24 md:text-3xl lg:h-28 lg:text-4xl'>
                GO TO DASHBOARD
              </div>
            </Link>
          ) : (
            <div className='flex h-full items-center justify-center rounded-lg bg-black px-8 py-3 text-white shadow-lg transition-all hover:bg-emerald-600'>
              <ConnectButton.Custom>
                {({ account, openAccountModal, openConnectModal, mounted }) => {
                  const connected = mounted && account

                  return (
                    <div>
                      {connected ? (
                        <button
                          onClick={openAccountModal}
                          className='flex items-center'
                        >
                          <span className='font-medium text-white'>
                            {truncateAddress(account.address)}
                          </span>
                        </button>
                      ) : (
                        <button
                          onClick={openConnectModal}
                          className='flex items-center'
                        >
                          <span className='font-medium text-white'>
                            Connect Wallet
                          </span>
                        </button>
                      )}
                    </div>
                  )
                }}
              </ConnectButton.Custom>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
