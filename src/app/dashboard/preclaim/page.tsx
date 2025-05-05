import React from 'react'
import Image from 'next/image'
import After from '@/public/BEFORE.png'
import Before from '@/public/AFTER.png'

function Page() {
  return (
    <div className='flex h-screen w-full flex-col'>
      {/* Top Section */}
      <div className='relative h-1/4 w-full bg-transparent md:h-1/3'>
        <button
          className='absolute right-4 top-6 text-3xl font-light text-white transition-opacity hover:opacity-80 md:right-8 md:text-4xl'
          aria-label='Close'
        >
          X
        </button>
      </div>

      {/* Bottom Section */}
      <div className='flex h-3/4 w-full flex-col justify-between overflow-hidden bg-[#FAFF00] md:h-2/3 md:flex-row'>
        {/* Before/After Images */}
        <div className='mx-4 mt-8 flex max-w-full flex-row gap-3 pb-4 md:gap-6'>
          <div className='flex flex-col'>
            <span className='font-bebas text-lg leading-6 tracking-normal text-black md:text-xl'>
              1. BEFORE
            </span>
            <div className='mt-5 md:mt-8'>
              <Image
                src={After}
                alt='Before cleanup'
                width={335}
                height={304}
                className='w-[280px] rounded-sm object-cover md:w-[335px]'
              />
            </div>
          </div>

          <div className='flex flex-col'>
            <span className='font-bebas text-lg leading-6 tracking-normal text-black md:text-xl'>
              2. AFTER
            </span>
            <div className='mt-5 md:mt-8'>
              <Image
                src={Before}
                alt='After cleanup'
                width={335}
                height={304}
                className='w-[280px] rounded-sm object-cover md:w-[335px]'
              />
            </div>
          </div>
        </div>

        {/* Review Status */}
        <div className='flex h-full flex-col px-4 pt-20 text-left md:w-1/4'>
          <div className='font-bebas tracking-normal text-black md:text-lg'>
            <span className='block text-center text-xl md:mb-4 md:text-left'>
              AFTER THE TEAM REVIEW THE PROOF OF CLEANUP, COME BACK TO CLAIM
              YOUR NEW LEVEL. USUALLY THE PROCESS TAKES FROM 2 TO 12 HOURS.
              CONTACT US IN TELEGRAM GROUP IF YOU HAVE QUESTIONS OR FOR
              TROUBLESHOOTING
            </span>

            <div className='mt-6 text-center font-sans text-2xl font-bold md:text-3xl'>
              IN REVIEW
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
