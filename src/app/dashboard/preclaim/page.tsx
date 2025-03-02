import React from 'react'
import Image from 'next/image'
import After from '@/public/BEFORE.png'
import Before from '@/public/AFTER.png'

function Preclaim() {
  return (
    <div className='flex h-screen w-full flex-col'>
      <div className='h-1/4 w-full bg-white bg-opacity-0 md:h-1/3'>
        <button className='absolute right-4 md:right-8 top-4 scale-x-[1.5] font-sans text-4xl font-light text-white'>
          X
        </button>
      </div>
      <div className='relative h-3/4 w-[100%] overflow-hidden bg-[#FAFF00] md:h-2/3'>
        <div className='absolute top-4 ml-4 flex flex-row gap-3 text-xl md:gap-6'>
          <div className='text-black leading-6 tracking-normal md:text-xl md:font-normal'>
            <span className=''>1. BEFORE</span>
            <div className='mt-5 md:mt-8'>
              <Image src={After} alt='Profile' width={335} height={304} />
            </div>
          </div>
          <div className='mr-3 flex-row font-bebas text-black'>
            <span>2. AFTER</span>
            <div className='mt-5 md:mt-8'>
              <Image src={Before} alt='' width={335} height={304} />
            </div>
          </div>
        </div>
        <div className='absolute bottom-56 flex w-full scale-y-150 flex-col text-left font-bebas text-black md:bottom-auto md:right-4 md:top-7 md:w-1/4'>
          <div className='leading-6 tracking-normal md:text-xl md:font-normal absolute left-4 right-2 md:right-6'>
            <span>
              AFTER THE TEAM REVIEW THE PROOF OF CLEANUP, COME BACK TO CLAIM
              YOUR NEW LEVEL. USUALLY THE PROCESS TAKES FROM 2 TO 12 HOURS.
              CONTACT US IN TELEGRAM GROUP IF YOU HAVE QUESTIONS OR FOR
              TROUBLESHOOTING
            </span>
            <div className='mt-3 text-center font-sans text-2xl font-bold md:right-6 md:mt-16 md:text-3xl'>
              IN REVIEW
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preclaim
