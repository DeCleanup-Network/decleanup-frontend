import React, { useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useCleanupContext } from '@/context/ContextApi'

type DecleanupShareModalProps = {
  isOpen: boolean
  onClose: () => void
}

const PreviewPage: React.FC<DecleanupShareModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { cleanupPicture } = useCleanupContext()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-end bg-black bg-opacity-80'>
      <div className='relative w-full overflow-hidden rounded-lg bg-gray-900 md:h-[40rem]'>
        {/* Close button */}
        <button
          onClick={onClose}
          className='absolute right-0 top-0 m-7 text-7xl text-white'
        >
          &times;
        </button>

        {/* Content */}
        <div className='h-full p-2 md:p-4'>
          <div className='h-full rounded bg-[#FAFF00] p-2 md:p-4'>
            <div className='flex h-full flex-col p-2 md:flex-row md:justify-between md:p-5'>
              {/* Image uploaders */}
              <div className='mb-4 w-full md:mb-0 md:flex md:w-[70%] md:flex-row md:justify-between'>
                {cleanupPicture.before && (
                  <div className='w-full flex-1 overflow-hidden rounded'>
                    <h3 className='mb-2 text-center font-bold'>Before</h3>
                    <img
                      src={URL.createObjectURL(cleanupPicture.before)}
                      alt='Before cleanup'
                      className='h-full w-full object-contain'
                    />
                  </div>
                )}

                {cleanupPicture.after && (
                  <div className='w-full flex-1 overflow-hidden rounded'>
                    <h3 className='mb-2 text-center font-bold'>After</h3>
                    <img
                      src={URL.createObjectURL(cleanupPicture.after)}
                      alt='After cleanup'
                      className='h-full w-full object-contain'
                    />
                  </div>
                )}

                {!cleanupPicture.before && !cleanupPicture.after && (
                  <div className='flex h-full items-center justify-center'>
                    <p>No images to preview</p>
                  </div>
                )}
              </div>

              {/* Right sidebar */}
              <div className='flex w-full flex-col justify-between md:w-[28%] lg:w-[20%]'>

              <div className="mt-4 md:mt-0">
                  
                  
                  <button
                    className="my-4 h-10 w-full bg-black text-2xl text-[#FAFF00] md:h-12 md:text-3xl lg:h-14 lg:text-4xl"
                  >
                    In Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className='fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-75'>
    //
    //   <div className='h-full rounded bg-[rgb(250,255,0)] p-2 md:p-4  text-black'>
    //     <div className="flex   w-[60%] flex-row">
    //       {cleanupPicture.before && (
    //         <div className="w-full flex-1 overflow-hidden rounded">
    //           <h3 className="mb-2 text-center font-bold">Before</h3>
    //           <img
    //             src={URL.createObjectURL(cleanupPicture.before)}
    //             alt="Before cleanup"
    //             className="h-full w-full object-contain"
    //           />
    //         </div>
    //       )}

    //       {cleanupPicture.after && (
    //         <div className="w-full flex-1 overflow-hidden rounded">
    //           <h3 className="mb-2 text-center font-bold">After</h3>
    //           <img
    //             src={URL.createObjectURL(cleanupPicture.after)}
    //             alt="After cleanup"
    //             className="h-full w-full object-contain"
    //           />
    //         </div>
    //       )}

    //       {!cleanupPicture.before && !cleanupPicture.after && (
    //         <div className="flex h-full items-center justify-center">
    //           <p>No images to preview</p>
    //         </div>
    //       )}
    //     </div>

    //     <div className=' '>
    //       <button className='w-60 transform bg-black px-6 py-3 text-lg text-[#FAFF00] transition-transform hover:scale-105'>
    //         In Review
    //       </button>
    //     </div>
    //   </div>
    // </div>
  )
}

export default PreviewPage
