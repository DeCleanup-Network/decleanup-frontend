import React, { useEffect } from 'react'
import { X, Send } from 'lucide-react'
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
      <button
        onClick={onClose}
        className='absolute right-2 top-2 mr-3 rounded-full p-1 text-white hover:bg-gray-700'
      >
        <X size={44} />
      </button>
      <div className='relative w-full overflow-hidden rounded-lg md:h-[33rem]'>
        {/* Content */}
        <div className='h-full p-2 md:p-4'>
          <div className='h-full rounded bg-[#FAFF00] p-2 md:p-4'>
            <div className='flex h-full flex-col p-2 md:flex-row md:justify-between md:p-5'>
              {/* Image uploaders */}
              <div className='w-full items-end md:flex md:w-[70%] md:flex-row'>
                {cleanupPicture.before && (
                  <div className='flex w-96 flex-col items-start overflow-hidden rounded'>
                    <h3 className='mb-8 text-2xl font-bold'>
                      <span>1</span>
                      <span className='ml-4'>Before</span>
                    </h3>
                    <img
                      src={URL.createObjectURL(cleanupPicture.before)}
                      alt='Before cleanup'
                      className='mt-4 h-80 w-full object-cover'
                    />
                  </div>
                )}

                {cleanupPicture.after && (
                  <div className='ml-9 flex w-96 flex-col items-start overflow-hidden rounded'>
                    <h3 className='mb-8 text-2xl font-bold'>
                      <span>2</span>
                      <span className='ml-4'>After</span>
                    </h3>
                    <img
                      src={URL.createObjectURL(cleanupPicture.after)}
                      alt='After cleanup'
                      className='mt-4 h-80 w-full object-cover'
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
                <li className='text-2xl'>
                  After the team review the proof  of cleanup, come back to
                  claim your new level. Usually the process takes from 2 to 12
                  hours. Contact us in telegram group if you have questions
                  or for troubleshooting
                </li>
                <div className='mt-4 md:mt-0'>
                  <button className='my-4 h-10 w-full bg-black text-2xl text-[#FAFF00] md:h-12 md:text-3xl lg:h-14 lg:text-4xl'>
                    In Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewPage
