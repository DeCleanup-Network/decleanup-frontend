// components/ImpactProductModal.tsx
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onUploadClick: () => void
}

export const ImpactProductModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onUploadClick,
}) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4'>
      {/* Backdrop click to close */}
      <button
        className='absolute inset-0 bg-black/50'
        onClick={onClose}
        aria-label='Close modal'
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className='absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:right-6 sm:top-6'
        aria-label='Close modal'
      >
        <X size={20} strokeWidth={2.5} />
      </button>

      {/* Modal content */}
      <div className='relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-[#FAFF00] shadow-2xl sm:rounded-3xl'>
        <div className='p-6 sm:p-8 lg:p-10'>
          {/* Header */}
          <div className='mb-8 text-center sm:mb-10'>
            <h2 className='text-2xl font-bold text-black sm:text-3xl lg:text-4xl'>
              How to Earn SOCU Tokens
            </h2>
            <p className='mt-2 text-sm text-black/70 sm:text-base'>
              Complete these activities to earn rewards
            </p>
          </div>

          {/* Content */}
          <div className='space-y-6 sm:space-y-8'>
            {/* Impact Product Claims */}
            <div className='rounded-xl bg-white/50 p-4 sm:p-6'>
              <div className='flex items-start gap-4'>
                <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white sm:h-10 sm:w-10 sm:text-base'>
                  1
                </div>
                <div className='flex-1'>
                  <h3 className='mb-2 text-lg font-bold text-black sm:text-xl'>
                    <span className='inline-block rounded-md bg-green-500 px-2 py-1 text-sm font-bold text-white sm:px-3 sm:text-base'>
                      IMPACT PRODUCT CLAIMS
                    </span>
                  </h3>
                  <p className='text-sm leading-relaxed text-black/80 sm:text-base'>
                    Earn <strong>10 SOCU per level</strong> by successfully
                    submitting before-and-after cleanup photos, waiting for
                    verification, and claiming the level. There are 10 levels
                    available, with more to come.
                  </p>
                </div>
              </div>
            </div>

            {/* Referrals */}
            <div className='rounded-xl bg-white/50 p-4 sm:p-6'>
              <div className='flex items-start gap-4'>
                <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white sm:h-10 sm:w-10 sm:text-base'>
                  2
                </div>
                <div className='flex-1'>
                  <h3 className='mb-2 text-lg font-bold text-black sm:text-xl'>
                    <span className='inline-block rounded-md bg-blue-500 px-2 py-1 text-sm font-bold text-white sm:px-3 sm:text-base'>
                      REFERRALS
                    </span>
                  </h3>
                  <p className='text-sm leading-relaxed text-black/80 sm:text-base'>
                    Get <strong>1 SOCU for each user</strong> who joins via your
                    link, submits cleanup photos, gets it verified and claims an
                    impact product.
                  </p>
                </div>
              </div>
            </div>

            {/* Streaks */}
            <div className='rounded-xl bg-white/50 p-4 sm:p-6'>
              <div className='flex items-start gap-4'>
                <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500 text-sm font-bold text-white sm:h-10 sm:w-10 sm:text-base'>
                  3
                </div>
                <div className='flex-1'>
                  <h3 className='mb-2 text-lg font-bold text-black sm:text-xl'>
                    <span className='inline-block rounded-md bg-purple-500 px-2 py-1 text-sm font-bold text-white sm:px-3 sm:text-base'>
                      STREAKS
                    </span>
                  </h3>
                  <p className='text-sm leading-relaxed text-black/80 sm:text-base'>
                    Earn <strong>3 SOCU per level</strong> if you submit
                    cleanups at least once per week to maintain your streak.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className='mt-8 flex justify-center sm:mt-10'>
            <button
              onClick={onUploadClick}
              className='flex w-full max-w-sm items-center justify-center gap-3 rounded-xl bg-black px-6 py-4 font-semibold text-white transition-all hover:bg-gray-800 active:scale-95 sm:px-8 sm:py-4'
            >
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
                className='shrink-0'
              >
                <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
                <polyline points='17 8 12 3 7 8'></polyline>
                <line x1='12' y1='3' x2='12' y2='15'></line>
              </svg>
              <span className='text-base sm:text-lg'>Upload Cleanup</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
