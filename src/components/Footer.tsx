import React from 'react'
import Image from 'next/image'

import StellarIcon from '@/public/stellar.png'

const Footer: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-between gap-5 border-t border-black bg-[#58B12F] px-5 py-5 font-sans text-2xl xs:text-sm sm:text-lg sm:font-semibold md:flex-row'>
      <p>2025©</p>
      <div className='flex flex-wrap justify-center gap-3 font-normal'>
        <a href='#!' className=''>
          TELEGRAM
        </a>
        <a href='#!' className=''>
          GITHUB
        </a>
        <a href='#!' className=''>
          LITEPAPER
        </a>
        <a href='#!' className='whitespace-nowrap'>
          BUG REPORT
        </a>
      </div>
      <div>
        <Image src={StellarIcon} alt='' className='w-28 md:w-auto' />
      </div>
    </div>
  )
}

export default Footer
