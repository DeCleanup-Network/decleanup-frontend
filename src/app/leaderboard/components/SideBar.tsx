import React from 'react'

const SideBar = () => {
  return (
    <div className='flex h-full w-full flex-col px-2 sm:px-5'>
      <div className='relative mb-3 h-[22rem] rounded border-2 border-[#ecf110] sm:mb-5 sm:h-[30rem] sm:border-4'>
        {/* Top Header Section */}
        <div className='absolute left-0 right-0 top-0 h-10 bg-black p-2 sm:h-14'>
          <div className='mb-1 flex items-center justify-between sm:mb-2'>
            <span className='text-xs font-bold text-[#548a3b] sm:text-sm'>
              LVL
            </span>
            <div className='h-[1px] w-[40%] bg-[#548a3b] sm:w-[350px]'></div>
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

        {/* Image Container - Now with proper responsive sizing */}
        <div className='absolute bottom-8 left-0 right-0 top-10 overflow-hidden sm:bottom-12 sm:top-14'>
          <div className='h-full w-full border-2 border-black p-0.5 sm:border-4 sm:p-1'>
            <img
              src={'/level.svg'}
              alt='Waterfall scene'
              className='h-full w-full object-cover'
            />
          </div>
        </div>

        <div className='absolute bottom-0 left-0 right-0 flex h-8 items-center bg-black sm:h-12'>
          <div className='flex w-full items-center justify-between px-2 sm:px-4'>
            <div className='flex items-center gap-1 sm:gap-2'>
              <span className='text-sm text-[#ecf110] sm:text-base'>2</span>
              <div className='h-[1px] w-2 bg-[#548a3b] sm:w-4'></div>
              <span className='text-nowrap text-[8px] text-[#548a3b] xs:text-[10px] sm:text-[12px]'>
                IMPACT VALUE
              </span>
            </div>

            <div className='flex items-center'>
              <div className='hidden h-[1px] w-4 bg-[#548a3b] xs:block sm:w-6'></div>
              <span className='text-nowrap text-[8px] text-[#ecf110] xs:text-[10px] sm:text-[12px]'>
                DECLEANUP NETWORK
              </span>
              <div className='hidden h-[1px] w-4 bg-[#548a3b] xs:block sm:w-6'></div>
            </div>

            <div className='flex items-center gap-1'>
              <span className='text-nowrap text-[8px] text-[#548a3b] xs:text-[10px] sm:text-[12px]'>
                DCU POINTS
              </span>
              <div className='h-[1px] w-1 bg-[#548a3b] sm:w-4'></div>
              <span className='text-sm text-[#ecf110] sm:text-[14px]'>20</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Improved responsive layout */}
      <div className='space-y-2 xs:space-y-3 sm:space-y-4 md:space-y-6'>
        {[
          { label: 'LEVEL', value: 'NEWBIE' },
          { label: 'IMPACT VALUE', value: '2' },
          { label: 'RANK', value: '7' },
          { label: 'DCU POINTS', value: '29' },
        ].map((item, index) => (
          <div key={index} className='flex justify-between'>
            <span className='text-sm font-bold text-[#101712] xs:text-base sm:text-lg md:text-[24px]'>
              {item.label}
            </span>
            <span className='text-sm font-bold text-[#ecf110] xs:text-base sm:text-lg md:text-[24px]'>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideBar
