'use client'
import React, { useState } from 'react'

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className='relative flex items-center justify-between border-b border-b-black bg-[#58B12F] p-4 font-bebas'>
      <p className='bg-[#FAFF00] p-2 font-bebas font-extrabold md:text-3xl'>
        DECLEANUP NETWORK
      </p>

      {/* Added back button with new arrow style */}
      <div className='flex items-center'>
        <button className='mr-2 rounded bg-black p-2 md:hidden'>
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10 17L5 12L10 7'
              stroke='#FAFF00'
              strokeWidth='2'
              strokeLinecap='round'
            />
            <path
              d='M19 12H5'
              stroke='#FAFF00'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        </button>

        <div className='mr-4 flex items-center justify-end md:hidden'>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='transition-all duration-200 focus:outline-none'
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              // Close (X) icon
              <div className='relative h-8 w-8'>
                <div className='absolute left-0 top-1/2 h-1 w-8 -translate-y-1/2 rotate-45 transform bg-black transition-all duration-200'></div>
                <div className='absolute left-0 top-1/2 h-1 w-8 -translate-y-1/2 -rotate-45 transform bg-black transition-all duration-200'></div>
              </div>
            ) : (
              // Hamburger menu icon
              <div className='space-y-1'>
                <div className='h-1 w-8 bg-black transition-all duration-200'></div>
                <div className='h-1 w-8 bg-black transition-all duration-200'></div>
                <div className='h-1 w-8 bg-black transition-all duration-200'></div>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Dropdown Menu (Visible on Mobile) */}
      {menuOpen && (
        <div className='absolute right-0 top-full z-50 mt-1 w-64 rounded-lg border-2 border-black bg-[#FAFF00] shadow-xl md:hidden'>
          <div className='py-2'>
            <button
              onClick={() => {
                setMenuOpen(false)
                // Add navigation logic here
              }}
              className='block w-full px-6 py-3 text-left font-bebas text-lg font-bold text-black transition-all hover:bg-black hover:text-[#FAFF00]'
            >
              DASHBOARD
            </button>
            <button
              onClick={() => {
                setMenuOpen(false)
                // Add navigation logic here
              }}
              className='block w-full px-6 py-3 text-left font-bebas text-lg font-bold text-black transition-all hover:bg-black hover:text-[#FAFF00]'
            >
              LEADERBOARD
            </button>
            <button
              onClick={() => {
                setMenuOpen(false)
                // Add navigation logic here
              }}
              className='block w-full px-6 py-3 text-left font-bebas text-lg font-bold text-black transition-all hover:bg-black hover:text-[#FAFF00]'
            >
              APPLY WITH CLEANUP RESULTS
            </button>
          </div>
        </div>
      )}
      <p className='hidden text-[36.82px] md:flex'>CLEAN UP, SNAP, EARN</p>
    </div>
  )
}

export default Header
