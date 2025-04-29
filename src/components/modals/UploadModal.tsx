import { useState } from 'react'
import { X, Send } from 'lucide-react'
import ImageUploader from '../imageUploader/ImageUploader'
import UploadInstructions from '../imageUploader/UploadInstructions'
import SocialConsentCheckbox from '../imageUploader/SocialConsentCheckbox'
import { useCleanupContext } from '@/context/ContextApi'

interface ImageUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (images: File[]) => void
}

const ImageUploadModal = ({
  isOpen,
  onClose,
  onSubmit,
}: ImageUploadModalProps) => {
  const [beforeImage, setBeforeImage] = useState<File | null>(null)
  const [afterImage, setAfterImage] = useState<File | null>(null)
  const [step, setStep] = useState(1)
  const { checkBox, setCheckBox, setCleanupPicture } = useCleanupContext()

  if (!isOpen) return null

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleSubmit = () => {
    if (!checkBox) return
    setStep(1)
    // Store images in context
    setCleanupPicture({
      before: beforeImage,
      after: afterImage,
    })

    // Submit the images
    const images = []
    if (beforeImage) images.push(beforeImage)
    if (afterImage) images.push(afterImage)
    onSubmit(images)

    // Reset form but keep images in context for preview
    setBeforeImage(null)
    setAfterImage(null)
    setCheckBox(false)
  }

  const handleClose = () => {
    setStep(1)
    setBeforeImage(null)
    setAfterImage(null)
    onClose()
  }

  return (
    <div className='fixed inset-0 z-50 flex items-end bg-black bg-opacity-80'>
      <div className='w-full overflow-hidden rounded-lg md:relative md:h-[40rem]'>
        {/* Close button */}
        <button
          onClick={handleClose}
          className='absolute right-2 top-2 mr-3 rounded-full p-1 text-white hover:bg-gray-700'
        >
          <X size={44} />
        </button>

        {/* Header */}
        <div className='ml-2 hidden px-4 py-3 md:flex'>
          <h2 className='text-xl font-bold text-white'>Upload Image</h2>
        </div>

        {/* Content */}
        <div className='h-full p-2 md:p-4'>
          <div className='h-full rounded bg-[#FAFF00] p-2 md:p-4'>
            <div className='flex h-full flex-col p-2 md:flex-row md:justify-between md:p-5'>
              {/* Image uploaders */}
              <div className='mb-4 hidden w-full md:mb-0 md:flex md:w-[70%] md:flex-row'>
                <ImageUploader
                  image={beforeImage}
                  onImageChange={setBeforeImage}
                  label='1. Snap a photo of the area before you start. Show the impact your cleanup will make!'
                  onDragOver={handleDragOver}
                  onDrop={e => {
                    e.preventDefault()
                    if (
                      e.dataTransfer.files &&
                      e.dataTransfer.files.length > 0
                    ) {
                      setBeforeImage(e.dataTransfer.files[0])
                      setCleanupPicture(prev => ({
                        ...prev,
                        before: e.dataTransfer.files[0],
                      }))
                    }
                  }}
                />

                <ImageUploader
                  image={afterImage}
                  onImageChange={setAfterImage}
                  label='2. Capture the transformed space! Upload your after photo to complete your submission and earn rewards.'
                  onDragOver={handleDragOver}
                  onDrop={e => {
                    e.preventDefault()
                    if (
                      e.dataTransfer.files &&
                      e.dataTransfer.files.length > 0
                    ) {
                      setAfterImage(e.dataTransfer.files[0])
                      setCleanupPicture(prev => ({
                        ...prev,
                        after: e.dataTransfer.files[0],
                      }))
                    }
                  }}
                />
              </div>

              {/* mobile flow */}
              <div className='flex w-full flex-col md:hidden'>
                <div className='mb-2 flex md:hidden'>
                  <UploadInstructions />
                </div>

                {step === 1 ? (
                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      step === 1
                        ? 'opacity-100'
                        : 'pointer-events-none absolute opacity-0'
                    }`}
                  >
                    <ImageUploader
                      image={beforeImage}
                      onImageChange={setBeforeImage}
                      label='1. Snap a photo of the area before you start. Show the impact your cleanup will make!'
                      onDragOver={handleDragOver}
                      onDrop={e => {
                        e.preventDefault()
                        if (
                          e.dataTransfer.files &&
                          e.dataTransfer.files.length > 0
                        ) {
                          setBeforeImage(e.dataTransfer.files[0])
                          setCleanupPicture(prev => ({
                            ...prev,
                            before: e.dataTransfer.files[0],
                          }))
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      step === 2
                        ? 'opacity-100'
                        : 'pointer-events-none absolute opacity-0'
                    }`}
                  >
                    <ImageUploader
                      image={afterImage}
                      onImageChange={setAfterImage}
                      label='2. Capture the transformed space! Upload your after photo to complete your submission and earn rewards.'
                      onDragOver={handleDragOver}
                      onDrop={e => {
                        e.preventDefault()
                        if (
                          e.dataTransfer.files &&
                          e.dataTransfer.files.length > 0
                        ) {
                          setAfterImage(e.dataTransfer.files[0])
                          setCleanupPicture(prev => ({
                            ...prev,
                            after: e.dataTransfer.files[0],
                          }))
                        }
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Right sidebar */}
              <div className='mb-5 flex w-full flex-col justify-between md:w-[28%] lg:w-[20%]'>
                <div className='hidden md:flex'>
                  <UploadInstructions />
                </div>

                <div className='mt-4 md:mt-0'>
                  <SocialConsentCheckbox />

                  <button
                    className='my-4 hidden h-10 w-full bg-black text-2xl text-[#FAFF00] md:block md:h-12 md:text-3xl lg:h-14 lg:text-4xl'
                    onClick={() => {
                      handleSubmit()
                      handleClose()
                    }}
                  >
                    send
                  </button>

                  <button
                    className='my-5 block h-14 w-full bg-black text-2xl text-[#FAFF00] md:hidden'
                    onClick={() => {
                      if (step === 1) {
                        setStep(2)
                      } else {
                        handleSubmit()
                        handleClose()
                      }
                    }}
                  >
                    {step === 1 ? 'save and next' : 'Submit'}
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

export default ImageUploadModal
