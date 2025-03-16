"use client"
import { promises } from 'dns'
import Link from 'next/link'
import React, { useState } from 'react'
interface HeaderProps {
  connectWallet: () => Promise<void>
}

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className='bg-[#58B12F] px-5 flex justify-between items-center rounded-t-xl font-bebas'>
      <p className="bg-[#FAFF00] text-2xl">DECLEANUP NETWORK</p>

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
      <p className="text-[36.82px] hidden md:flex">CLEANUP. SNAP, EARN</p>
    </div>
  )
}

export default Header
