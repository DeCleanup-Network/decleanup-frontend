import Image from 'next/image'
// import Level from '@/public/level.svg'

import React from 'react'

const SideBar = () => {
  return (
    <div className='flex w-full h-full flex-col px-2 sm:px-5'>
       <div className='relative mb-3  rounded border-2 border-[#ecf110] sm:mb-5 sm:border-4 sm:h-[30rem]'>
        <div className='absolute left-0 right-0 top-0 h-10 bg-black p-2 sm:h-14'>
          <div className='mb-1 flex items-center justify-between sm:mb-2'>
            <span className='text-xs font-bold text-[#548a3b] sm:text-sm'>
              LVL
            </span>
            <div className='h-[1px] w-[60%] bg-[#548a3b] sm:w-[350px]'></div>
            <span className='text-xs font-bold text-[#ecf110] sm:text-sm'>
              NEWBIE
            </span>
          </div>
          <div className='flex space-x-2'>
            <div className='h-1.5 flex-1 rounded bg-[#ecf110] sm:h-2'></div>
            <div className='h-1.5 flex-1 rounded bg-[#ecf110] sm:h-2'></div>
            <div className='h-1.5 flex-1 rounded bg-gray-800 sm:h-2'></div>
          </div>
        </div>

        
        <div className="absolute top-10 bottom-8 left-0 right-0 overflow-hidden sm:top-14 sm:bottom-12">
          <img
               src={"/level.svg"}
            alt="Waterfall scene"
            className='h-full w-full object-cover'
          />
        </div>

        
        <div className='absolute bottom-0 left-0 right-0 flex h-8 items-center bg-black sm:h-12'>
          <div className='flex w-full items-center justify-between px-2 sm:px-4'>
            {/* First section */}
            <div className='flex items-center gap-1 sm:gap-2'>
              <span className='text-sm text-[#ecf110] sm:text-base'>2</span>
              <div className='h-[1px] w-2 bg-[#548a3b] sm:w-4'></div>
              <span className='text-nowrap text-[10px] text-[#548a3b] sm:text-[12px]'>
                IMPACT VALUE
              </span>
            </div>

            {/* Middle section */}
            <div className='flex items-center'>
              <div className='hidden h-[1px] w-6 bg-[#548a3b] sm:block'></div>
              <span className='text-nowrap text-[10px] text-[#ecf110] decoration-[#548a3b] decoration-1 sm:text-[12px] sm:decoration-2'>
                DECLEANUP NETWORK
              </span>
              <div className='hidden h-[1px] w-6 bg-[#548a3b] sm:block'></div>
            </div>

            {/* Last section */}
            <div className='flex items-center gap-1'>
              <span className='text-nowrap text-[10px] text-[#548a3b] sm:text-[12px]'>
                DCU POINTS
              </span>
              <div className='h-[1px] w-1 bg-[#548a3b] sm:w-4'></div>
              <span className='text-sm text-[#ecf110] sm:text-[14px]'>20</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className='space-y-4 sm:space-y-6'>
        <div className='flex justify-between'>
          <span className='text-lg font-bold text-[#101712] sm:text-[24px]'>
            LEVEL
          </span>
          <span className='text-lg font-bold text-[#ecf110] sm:text-[24px]'>
            NEWBIE
          </span>
        </div>

        <div className='flex justify-between'>
          <span className='text-lg font-bold text-[#101712] sm:text-[24px]'>
            IMPACT VALUE
          </span>
          <span className='text-lg font-bold text-[#ecf110] sm:text-[24px]'>
            2
          </span>
        </div>

        <div className='flex justify-between'>
          <span className='text-lg font-bold text-[#101712] sm:text-[24px]'>
            RANK
          </span>
          <span className='text-lg font-bold text-[#ecf110] sm:text-[24px]'>
            7
          </span>
        </div>

        <div className='flex justify-between'>
          <span className='text-lg font-bold text-[#101712] sm:text-[24px]'>
            DCU POINTS
          </span>
          <span className='text-lg font-bold text-[#ecf110] sm:text-[24px]'>
            29
          </span>
        </div>
      </div>
    </div>
  )
}

export default SideBar
