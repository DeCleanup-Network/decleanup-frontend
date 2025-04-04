// components/ImpactProductModal.tsx
import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronRight } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  //   onNext?: () => void;
}

export const ImpactProductModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex bg-black/80'>
      <button
        onClick={onClose}
        className='absolute right-4 top-4 z-10 text-white hover:opacity-80'
        aria-label='Close modal'
      >
        <X size={24} strokeWidth={3} />
      </button>

      {/* Main modal content with the 2-column layout */}
      <div className='h-full w-[30%] bg-[#FAFF00] p-6'>
        <div className='text-black'>
          <div className='space-y-8'>
            <div className='text-2xl'>
              <div className='mb-2 font-bold'>1</div>

              <div className='mt-2 font-bold uppercase leading-normal'>
                <span className='bg-green-500 p-1 font-bold'>
                  IMPACT PRODUCT CLAIMS
                </span>
                –EARN 10 SOCU PER LEVEL BY SUCCESSFULLY SUBMITTING
                BEFORE-AND-AFTER CLEANUP PHOTOS, WAITING FOR THE VERIFICATION
                AND CLAIMING THE LEVEL. THERE ARE 10 LEVELS AVAILABLE, WITH MORE
                TO COME
              </div>
            </div>

            <div className='text-2xl'>
              <div className='mb-2 font-bold'>2</div>
              <div className='font-bold uppercase leading-normal'>
                <span className='bg-green-500 p-1 font-bold'>REFERRALS</span>
                –GET 1 SOCU FOR EACH USER WHO JOINS VIA YOUR LINK, SUBMITS
                CLEANUP PHOTOS, GETS IT VERIFIED AND CLAIMS AN IMPACT PRODUCT.
              </div>
            </div>

            <div className='text-2xl'>
              <div className='mb-2 font-bold'>3</div>
              <div className='font-bold uppercase leading-normal'>
                <span className='bg-green-500 p-1 font-bold'>STREAKS </span>–
                EARN 3 SOCU PER LEVEL IF YOU SUBMIT CLEANUPS AT LEAST ONCE PER
                WEEK TO MAINTAIN YOUR STREAK.
              </div>
            </div>
          </div>
        </div>

        <div className='mt-16 flex w-full flex-row justify-end'>
          <button 
          onClick={onClose}
          className='flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='feather feather-upload'
            >
              <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
              <polyline points='17 8 12 3 7 8'></polyline>
              <line x1='12' y1='3' x2='12' y2='15'></line>
            </svg>
            Upload Cleanup
          </button>
        </div>
      </div>
    </div>
  )
}
