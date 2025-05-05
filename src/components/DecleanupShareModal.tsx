import React, { useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

type DecleanupShareModalProps = {
  isOpen: boolean
  onClose: () => void
}

const DecleanupShareModal: React.FC<DecleanupShareModalProps> = ({
  isOpen,
  onClose,
}) => {
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

  const handleShare = () => {
    const text = encodeURIComponent(
      "🎉 I've just received the first level of Decleanup Impact Product! Come join me and earn more DCU points! 🌱 #Decleanup #DCUPoints #ImpactProduct",
    )
    const url = encodeURIComponent('https://decleanupgame.com')
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
    window.open(shareUrl, '_blank')
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className='fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-75'
    >
      <button
        onClick={onClose}
        className='absolute right-0 top-0 m-7 text-7xl text-white'
      >
        &times;
      </button>
      <div className='relative mb-[2%] h-[70%] w-[95%] rounded-b-2xl bg-[#FAFF00] p-6 text-black'>
        <div className='grid grid-cols-1 items-start gap-4 md:grid-cols-3'>
          <motion.div
            className='mx-auto w-full max-w-[150px] md:max-w-none'
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 0.2, ease: 'easeInOut' }}
          >
            <Image
              src='/decleanup_anim.jpeg'
              alt='Decleanup Impact Product'
              width={150}
              height={90}
              className='h-auto w-full rounded-lg'
            />
          </motion.div>
          <div className='text-left font-bebas md:col-span-2'>
            <p className='text-base font-semibold leading-tight md:text-lg lg:text-xl xl:text-2xl'>
              CONGRATULATIONS, YOU'VE JUST RECEIVED THE FIRST LEVEL OF DECLEANUP
            </p>
            <p className='text-base font-semibold leading-tight md:text-lg lg:text-xl xl:text-2xl'>
              IMPACT PRODUCT. COME BACK FOR MORE!
            </p>
            <p className='mt-10 text-base font-semibold leading-tight md:text-lg lg:text-xl xl:text-2xl'>
              SHARE YOUR REFERRAL WITH FRIENDS AND EARN MORE DCU POINTS.
            </p>
          </div>
        </div>
        <div className='absolute bottom-4 right-4'>
          <button
            onClick={handleShare}
            className='w-60 transform bg-black px-6 py-3 text-lg text-[#FAFF00] transition-transform hover:scale-105'
          >
            SHARE ON X
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default DecleanupShareModal
