import React from 'react'
import Image from 'next/image'
import After from '@/public/BEFORE.png'
import Before from '@/public/AFTER.png'

function Page() {
  return (
    <div className="flex flex-col h-screen w-full">
      {/* Top Section */}
      <div className="relative h-1/4 md:h-1/3 w-full bg-transparent">
        <button 
          className="absolute right-4 md:right-8 top-6 text-3xl md:text-4xl font-light text-white hover:opacity-80 transition-opacity"
          aria-label="Close"
        >
          X
        </button>
      </div>
      
      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between h-3/4 md:h-2/3 w-full overflow-hidden bg-[#FAFF00]">
        {/* Before/After Images */}
        <div className="flex flex-row gap-3 md:gap-6  pb-4 max-w-full mt-8 mx-4">
          <div className="flex flex-col">
            <span className="font-bebas text-lg md:text-xl text-black leading-6 tracking-normal">
              1. BEFORE
            </span>
            <div className="mt-5 md:mt-8">
              <Image 
                src={After} 
                alt="Before cleanup" 
                width={335} 
                height={304}
                className="w-[280px] md:w-[335px] object-cover rounded-sm"
              />
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="font-bebas text-lg md:text-xl text-black leading-6 tracking-normal">
              2. AFTER
            </span>
            <div className="mt-5 md:mt-8">
              <Image 
                src={Before} 
                alt="After cleanup" 
                width={335} 
                height={304}
                className="w-[280px] md:w-[335px] object-cover rounded-sm"
              />
            </div>
          </div>
        </div>
        
        {/* Review Status */}
        <div className="  px-4 md:w-1/4 flex flex-col text-left h-full pt-20">
          <div className="font-bebas tracking-normal text-black md:text-lg">
            <span className="block md:mb-4 text-center md:text-left text-xl">
              AFTER THE TEAM REVIEW THE PROOF OF CLEANUP, COME BACK TO CLAIM
              YOUR NEW LEVEL. USUALLY THE PROCESS TAKES FROM 2 TO 12 HOURS.
              CONTACT US IN TELEGRAM GROUP IF YOU HAVE QUESTIONS OR FOR
              TROUBLESHOOTING
            </span>
            
            <div className="mt-6 text-center font-sans text-2xl md:text-3xl font-bold">
              IN REVIEW
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
