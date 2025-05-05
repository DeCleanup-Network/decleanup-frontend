import React from 'react'
import Image from 'next/image'
import StellarIcon from '@/public/stellar.png'

const Footer: React.FC = () => {
  return (
    <div className='border-t border-black bg-[#58B12F] px-5 py-5 font-bebas text-2xl'>

      {/* Desktop layout */}
      <div className='hidden items-center justify-between sm:flex'>
        <p>2025©</p>
        <div className='flex space-x-3'>
          <a href='' className='block'>TELEGRAM</a>
          <a href='' className='block'>GITHUB</a>
          <a href='' className='block'>LITEPAPER</a>
          <a href='' className='block'>BUG REPORT</a>
        </div>
        <div>
          <Image src={StellarIcon} alt='Logo' />
        </div>
      </div>

      {/* Mobile layout */}
      <div className='flex flex-col sm:hidden'>
        <div className='flex flex-col space-y-2'>
          <a href='' className='block'>TELEGRAM</a>
          <a href='' className='block'>GITHUB</a>
          <a href='' className='block'>LITEPAPER</a>
          <div className='flex items-center justify-between'>
            <a href='' className='block'>BUG REPORT</a>
            <Image src={StellarIcon} alt='Logo' />
          </div>
        </div>
        <p className='mt-4 text-center'>2025©</p>
      </div>
    </div>
  )
}

export default Footer
