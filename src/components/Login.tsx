'use client'

import React, { useState } from 'react'
import Stellar from '@/./public/stellar.png'
import Image from 'next/image'

const Login: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div
      className='flex h-screen flex-col'
      style={{ backgroundColor: '#58b12f' }}
    >
      {/* Header */}
      <header className='mb-4 flex flex-wrap items-center justify-between p-4'>
        {/* Logo/Title */}
        <h1 className=' box-border bg-[#FAFF00] p-[10px] text-right text-lg font-normal leading-[26.51px] tracking-[-0.02em] md:text-2xl lg:text-3xl xl:text-4xl'>
          DECLEANUP NETWORK
        </h1>

        {/* Hamburger Menu Button (Visible on Mobile) */}
        <div className='mr-4 flex items-center justify-end md:hidden'>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='focus:outline-none'
          >
            <div className='mb-1 h-1 w-8 bg-black'></div>
            <div className='mb-1 h-1 w-8 bg-black'></div>
            <div className='h-1 w-8 bg-black'></div>
          </button>
        </div>

        {/* Dropdown Menu (Visible on Mobile) */}
        {menuOpen && (
          <div className='absolute right-0 mt-2 w-full rounded border border-gray-300 bg-[#FAFF00] shadow-lg md:hidden'>
            <a
              href='#'
              className='block px-4 py-2 text-black hover:border-l-4 hover:border-green-500'
            >
              DASHBOARD
            </a>
            <a
              href='#'
              className='block px-4 py-2 text-black hover:border-l-4 hover:border-green-500'
            >
              LEADERBOARD
            </a>
            <a
              href='#'
              className='block px-4 py-2 text-black hover:border-l-4 hover:border-green-500'
            >
              APPLY WITH CLEANUP RESULTS
            </a>
          </div>
        )}
      </header>

      <hr className='my-4 w-full border-t-2 border-black' />

      {/* Main Content */}
      <div className='flex flex-grow flex-col items-center justify-center p-4'>
        <h2
          className='mb-4 px-4 text-center text-2xl font-bold md:text-4xl lg:text-6xl xl:text-8xl'
          style={{
            whiteSpace: 'normal',
            maxWidth: '100%',
            wordBreak: 'break-word',
            lineHeight: '1.2',
          }}
        >
          DECLEANUP REWARDS
        </h2>

        <hr className='my-4 w-full border-t-2 border-black' />

        <div className='flex flex-col gap-4 px-4 text-center'>
          <p className='mb-4 text-base underline md:text-lg lg:text-xl xl:text-2xl'>
            FIRST DAPP TO SELF-TOKENIZE ENVIRONMENTAL CLEANUP EFFORTS
          </p>
          <p
            className='mb-6 text-base md:text-lg lg:text-xl xl:text-2xl'
            style={{ lineHeight: '1' }}
          >
            APPLY WITH YOUR CLEANUP RESULTS TO RECEIVE A DECLEANUP IMPACT
            PRODUCT, PROGRESS THROUGH LEVELS AND EARN POINTS, REDEEMABLE IN THE
            FUTURE
          </p>
        </div>

        <hr className='my-4 w-full border-t-2 border-black' />

        <button
          className='w-full rounded bg-black py-4 font-bold text-yellow-500 hover:bg-gray-800'
          style={{
            fontSize: 'clamp(24px, 5vw, 40px)',
            color: '#FAFF00',
            margin: '20px 0',
          }}
        >
          CONNECT WALLET
        </button>

        <hr className='my-4 w-full border-t-2 border-black' />
      </div>

      {/* Footer */}
      {/* <footer
      className="mt-auto flex flex-col md:flex-row justify-between items-center p-4"
      style={{ width: 'calc(100% - 40px)' }}
    >
      <p className="text-base md:text-lg lg:text-xl xl:text-2xl mb-2 md:mb-0">CLEAN UP, SNAP, EARN</p>
      <span className="mb-2 md:mb-0">
        <Image src={Stellar} alt="stellar logo" width={100} height={50} />
      </span>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-xs md:text-sm lg:text-base xl:text-lg">
        <a href="#" className="hover:underline">Telegram</a>
        <a href="#" className="hover:underline">GitHub</a>
        <a href="#" className="hover:underline">Litepaper</a>
        <a href="#" className="hover:underline">Bug Report</a>
      </div>
    </footer> */}
    </div>
  )
}

export default Login
