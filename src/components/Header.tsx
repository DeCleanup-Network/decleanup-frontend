'use client'
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
interface HeaderProps {
  connectWallet: () => Promise<void>
}

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className='flex items-center justify-between border-b border-b-black bg-[#58B12F] p-4 font-bebas'>
      <p className='bg-[#FAFF00] font-extrabold font-bebas p-2 md:text-3xl'>DECLEANUP NETWORK</p>

      <div className='mr-2 flex items-center justify-end md:hidden'>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='focus:outline-none'
        >
          {menuOpen ? (
            <X size={24} color='black' />
          ) : (
            <Menu size={24} color='black' />
          )}
        </button>
      </div>

      {/* Dropdown Menu (Visible on Mobile) */}
      <div
        className={`absolute right-0 top-16 mt-2 h-96 w-full overflow-hidden text-2xl transition-all duration-300 ease-in-out md:hidden ${
          menuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
        } rounded border border-gray-300 bg-[#FAFF00] shadow-lg`}
      >
        <a
          href='#!'
          className='block px-4 py-2 text-black transition-all hover:border-l-4 hover:border-green-500'
        >
          DASHBOARD
        </a>
        <a
          href='#!'
          className='block px-4 py-2 text-black transition-all hover:border-l-4 hover:border-green-500'
        >
          LEADERBOARD
        </a>
        <a
          href='#!'
          className='block px-4 py-2 text-black transition-all hover:border-l-4 hover:border-green-500'
        >
          APPLY WITH CLEANUP RESULTS
        </a>
      </div>
      <p className='hidden font-semibold text-[36.82px] md:flex'>CLEAN UP, SNAP, EARN</p>
    </div>
  )
}

export default Header
