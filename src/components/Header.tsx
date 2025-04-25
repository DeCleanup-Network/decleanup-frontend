"use client"
import React, { useState } from 'react'
interface HeaderProps {
  connectWallet: () => Promise<void>
}

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className='bg-[#58B12F] p-4 flex justify-between items-center border-b-black border-b  font-bebas'>
      <p className="bg-[#FAFF00] text-2xl p-2">DECLEANUP NETWORK</p>

      {/* Added back button with new arrow style */}
      <div className='flex items-center'>
        <button className='md:hidden bg-black p-2 mr-2 rounded'>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 17L5 12L10 7" stroke="#FAFF00" strokeWidth="2" strokeLinecap="round"/>
            <path d="M19 12H5" stroke="#FAFF00" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

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
      <p className="text-[36.82px] hidden md:flex">CLEAN UP, SNAP, EARN</p>
    </div>
  )
}

export default Header;