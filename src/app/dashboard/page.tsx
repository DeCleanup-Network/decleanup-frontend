'use client'
import IsolationMode from '@/./public/Isolation_Mode.png'
import { ImpactProductModal } from '@/components/modals/ImpactProductModal'
import ImageUploadModal from '@/components/modals/UploadModal'
import PreviewPage from '@/components/modals/PreviewModal'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

interface LongButtonProps {
  text: string
  isNotBlack?: boolean
}

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [_uploadedImages, setUploadedImages] = useState<File[]>([])
  const [isShareModal, setIsShareModal] = useState(false)

  const handleSubmit = (images: File[]) => {
    setUploadedImages(images)
    setIsShareModal(true)
    console.log('Uploaded images:', images)
  }
  return (
    <div className='my-4 h-[calc(100vh-160px)] min-h-[calc(98vh-160px)] bg-[#58B12F] font-bebas font-bold md:min-h-[calc(94vh-160px)] lg:p-4'>
      <div className='flex flex-col items-start justify-between lg:flex-row lg:gap-12'>
        <div className='mt-4 flex w-full flex-col bg-[#FAFF00] lg:order-first lg:w-1/3 lg:bg-[#58B12F]'>
          {/* 24 WEEKS STREAK*/}
          <div className='flex h-[61px] w-full items-center justify-between py-8'>
            <div className='mx-3 mt-3 w-full border-4 border-black md:mx-auto'>
              <div className='mx-auto flex w-fit lg:w-full'>
                <div className='hidden items-center justify-center bg-black p-5 lg:flex'>
                  <svg
                    width='30'
                    height='30'
                    viewBox='0 0 33 36'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M16.4445 21.6724L12.0662 25.8245C10.9151 26.9371 10.2778 28.3873 10.2778 29.9369C10.2778 33.1554 13.0528 35.7778 16.4445 35.7778C19.8361 35.7778 22.6111 33.1554 22.6111 29.9369C22.6111 28.3873 21.9739 26.9172 20.8228 25.8245L16.4445 21.6724Z'
                      fill='#FAFF00'
                    />
                    <path
                      d='M24.6666 7.96428L23.7621 9.05696C21.3366 11.9774 16.4444 10.3284 16.4444 6.57361V0.0175781C16.4444 0.0175781 0 7.96428 0 21.871C0 27.6721 3.20665 32.7381 7.99608 35.4996C6.84497 33.9301 6.16664 32.0031 6.16664 29.9369C6.16664 27.3145 7.23553 24.851 9.1883 22.9836L16.4444 16.1097L23.7005 23.0034C25.6532 24.851 26.7221 27.3145 26.7221 29.9568C26.7221 31.9832 26.0849 33.8507 24.9749 35.4202C28.8599 33.1355 31.7377 29.3409 32.601 24.8908C33.9577 17.8381 30.4016 11.1827 24.6666 7.96428Z'
                      fill='#FAFF00'
                    />
                  </svg>
                </div>

                {/* mobile svg */}
                <div className='flex items-center justify-center p-3 lg:hidden'>
                  <svg
                    width='36'
                    height='36'
                    viewBox='0 0 33 36'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M16.4445 21.6724L12.0662 25.8245C10.9151 26.9371 10.2778 28.3873 10.2778 29.9369C10.2778 33.1554 13.0528 35.7778 16.4445 35.7778C19.8361 35.7778 22.6111 33.1554 22.6111 29.9369C22.6111 28.3873 21.9739 26.9172 20.8228 25.8245L16.4445 21.6724Z'
                      fill='#58B12F'
                    />
                    <path
                      d='M24.6666 7.96428L23.7621 9.05696C21.3366 11.9774 16.4444 10.3284 16.4444 6.57361V0.0175781C16.4444 0.0175781 0 7.96428 0 21.871C0 27.6721 3.20665 32.7381 7.99608 35.4996C6.84497 33.9301 6.16664 32.0031 6.16664 29.9369C6.16664 27.3145 7.23553 24.851 9.1883 22.9836L16.4444 16.1097L23.7005 23.0034C25.6532 24.851 26.7221 27.3145 26.7221 29.9568C26.7221 31.9832 26.0849 33.8507 24.9749 35.4202C28.8599 33.1355 31.7377 29.3409 32.601 24.8908C33.9577 17.8381 30.4016 11.1827 24.6666 7.96428Z'
                      fill='#58B12F'
                    />
                  </svg>
                </div>

                <div className='flex w-full items-center justify-start px-2 lg:bg-[#58B12F]'>
                  <p className='text-2xl md:text-4xl'>24 WEEKS STREAK</p>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-6 flex flex-col space-y-1 px-4'>
            <div className='flex items-center justify-between border-b border-b-black'>
              <p className='md:text-[24px]'>CLEANUPS DONE</p>
              <p className='text-[#58B12F] md:text-[24px] md:text-[#FAFF00]'>
                0
              </p>
            </div>
            <div className='flex items-center justify-between border-b border-b-black'>
              <p className='md:text-[24px]'>REFERRALS </p>
              <p className='text-[24px] text-[#58B12F] md:text-[#FAFF00]'>0</p>
            </div>
            <div className='flex items-center justify-between border-b border-b-black'>
              <p className='md:text-[24px]'>STREAK</p>
              <p className='text-[24px] text-[#58B12F] md:text-[#FAFF00]'>0</p>
            </div>
            <div className='flex items-center justify-between border-b border-b-black'>
              <p className='md:text-[40px]'>TOTAL $DCU</p>
              <p className='text-[40px] text-[#58B12F] md:text-[#FAFF00]'>0</p>
            </div>
          </div>

          <div className='space-y-8 bg-[#58B12F] px-4 py-10 md:space-y-16 lg:py-4'>
            <div className='flex flex-col gap-2'>
              <p className='text-center text-2xl underline md:text-right'>
                LEARN HOW TO EARN $DCU
              </p>
              <Link href={'/leaderboard'} className='lg:mt-24'>
                <LongButton text='LEADERBOARD' />
              </Link>
            </div>
            <div className='flex flex-col gap-2 lg:mt-32'>
              <p className='order-last text-center text-2xl underline md:text-left lg:order-first'>
                earn more $DCU together
              </p>
              <LongButton text='Invite friends' />
            </div>
          </div>
        </div>

        <div className='order-first w-full px-4 lg:w-1/3'>
          <div className='flex w-full justify-center border-4 border-black bg-[#51A12C] px-8 py-2 md:px-4'>
            <div className='my-2 flex w-[323.5px] flex-col border-4 border-[#FAFF00]'>
              <div className='bg-black'>
                <div className='flex items-center space-x-1 px-1'>
                  <p className='text-[13.56px] text-[#58B12F]'>LVL</p>
                  <div className='h-[3px] w-full bg-[#58B12F]' />
                  <p className='text-[21.7px] text-[#FAFF00]'>NEWBIE</p>
                </div>
                <div className='mb-2 flex w-full space-x-2'>
                  <div className='h-[3.55px] w-full bg-[#FAFF00]'></div>
                  <div className='h-[3.55px] w-full bg-[#FAFF00] opacity-50'></div>
                  <div className='h-[3.55px] w-full bg-[#FAFF00] opacity-50'></div>
                </div>
              </div>

              {/* nft image */}
              <div className=''>
                <Image
                  src={IsolationMode}
                  alt=''
                  className='h-full w-full object-contain'
                />
              </div>
              <div className='flex items-center justify-between bg-black px-1 text-[13.56px] text-[#FAFF00]'>
                <p>DECLEANUP NETWORK</p>
                <p>CLEANUP, SNAP, EARN</p>
              </div>
            </div>
          </div>
          <div className='mt-4 w-full'>
            <div className='flex w-full items-center justify-between text-[24px]'>
              <p className='text-black'>LEVEL</p>
              <p className='text-[#FAFF00]'>NEWBIE</p>
            </div>
            <div className='mt-[-2px] flex w-full items-center justify-between text-[24px]'>
              <p className='text-black'>IMPACT VALUE</p>
              <p className='text-[#FAFF00]'>0</p>
            </div>
          </div>
          <div className='flex h-full w-full flex-col space-y-2 py-4'>
            <button onClick={() => setIsModalOpen(true)} className='w-full'>
              <LongButton text='APPLY WITH CLEANUP' />
            </button>
            <div className='mt-6'>
              <LongButton text='CLAIM NEXT LEVEL' isNotBlack />
            </div>
          </div>
        </div>

        <div className='flex w-full flex-col space-y-2 px-4 lg:w-1/3'>
          <LongButton text='CREATE IMPACT CIRCLE' isNotBlack />
          <LongButton text='JOIN IMPACT CIRCLE' isNotBlack />
          <LongButton text='BECOME VERIFIER' isNotBlack />
          <LongButton text='CLAIM STAKE' isNotBlack />
        </div>
      </div>

      <ImpactProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUploadClick={() => {
          setIsModalOpen(false)
          setIsUploadModalOpen(true)
        }}
      />

      <ImageUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSubmit={handleSubmit}
      />
      <PreviewPage
        isOpen={isShareModal}
        onClose={() => {
          setIsShareModal(false)
        }}
      />
    </div>
  )
}

function LongButton({ text, isNotBlack }: LongButtonProps) {
  return (
    <button
      className={
        isNotBlack
          ? `block w-full bg-[#1E8428] py-2 text-center text-2xl text-black opacity-50 md:h-[60px] md:text-3xl md:text-[40px]`
          : `block h-[60px] w-full bg-black text-center text-3xl text-[#FAFF00] md:text-[40px]`
      }
    >
      {text}
    </button>
  )
}
