//

// ImageUploadModal.tsx
import React, { useState, useRef } from 'react'
import { Upload, X, Send } from 'lucide-react'

interface ImageUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (images: File[]) => void
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files)
      setSelectedImages(prev => [...prev, ...newImages])
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newImages = Array.from(e.dataTransfer.files)
      setSelectedImages(prev => [...prev, ...newImages])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = () => {
    onSubmit(selectedImages)
    setSelectedImages([])
    onClose()
  }

  const handleClose = () => {
    setSelectedImages([])
    onClose()
  }

  return (
    <div className='fixed inset-0 z-50 flex items-end bg-black bg-opacity-80'>
      <div className='relative  w-full overflow-auto rounded-lg bg-gray-900 md:h-[38rem]'>
        {/* Close button */}
        <button
          onClick={handleClose}
          className='absolute right-2 top-2 rounded-full p-1 text-white hover:bg-gray-700'
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className='bg-gray-800 px-4 py-3'>
          <h2 className='font-bold text-white'>Upload Image</h2>
        </div>

        {/* Content */}
        <div className='h-full p-2 md:p-4'>
          {/* Steps section */}
          <div className='h-full rounded bg-[#FAFF00] p-2 md:p-4'>
            <div className='flex h-full flex-col p-2 md:flex-row md:justify-between md:p-5'>
              {/* image uploader - will stack vertically on mobile */}
              <div className='mb-4 w-full md:mb-0 md:flex md:w-[70%] md:flex-row md:justify-between'>
                <div className='mb-4 flex flex-col justify-between md:mb-8 md:w-[48%]'>
                  <div className='mb-1 font-bebas text-2xl font-normal md:text-3xl lg:text-4xl'>
                    1. TAKE A PHOTO OF THE AREA BEFORE YOU START. STATE THE
                    PROJECT NAME
                  </div>
                  <div
                    className='flex h-[150px] cursor-pointer items-center justify-center rounded bg-green-600 md:h-[200px] lg:h-[304px]'
                    onClick={triggerFileInput}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <Upload
                      size={80}
                      className='md:size-100 lg:size-150 text-black'
                    />
                  </div>
                </div>

                <div className='mb-4 flex flex-col justify-between md:mb-8 md:w-[48%]'>
                  <div className='mb-1 font-bebas text-2xl font-normal md:text-3xl lg:text-4xl'>
                    2. Capture the transformed space! Upload your after photo to
                    complete your submission and earn rewards.
                  </div>
                  <div
                    className='flex h-[150px] cursor-pointer items-center justify-center rounded bg-green-600 md:h-[200px] lg:h-[304px]'
                    onClick={triggerFileInput}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <Upload
                      size={80}
                      className='md:size-100 lg:size-150 text-black'
                    />
                  </div>
                </div>
              </div>

              <div className='flex w-full flex-col justify-between md:w-[28%] lg:w-[20%]'>
                <ol className='border-b-2 border-black pb-4'>
                  <li className='mt-2 font-bebas text-xl font-normal text-black md:text-2xl lg:text-3xl'>
                    upload before and after cleanup photos with geotag
                  </li>
                  <li className='mt-3 text-lg font-normal text-black md:text-xl lg:text-3xl'>
                    supported formats JPEG, JPG, HEIC
                  </li>
                  <li className='mt-3 text-lg font-normal text-black md:text-xl lg:text-3xl'>
                    maximum size per image 10 MB
                  </li>
                </ol>
                <div className='mt-4 md:mt-0'>
                  <div className='flex flex-row items-baseline'>
                    <input type='checkbox' className='h-4 w-4' />
                    <p className='ml-2 font-bebas text-lg font-normal md:text-xl lg:text-2xl'>
                      Agree if you allow us to post your pictures on social
                      platforms (X, Telegram)
                    </p>
                  </div>

                  <button className='my-4 h-10 w-full bg-black text-2xl text-[#FAFF00] md:h-12 md:text-3xl lg:h-14 lg:text-4xl'>
                    send
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Hidden file input */}
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleImageChange}
            className='hidden'
            accept='image/*'
            multiple
          />

          {/* Preview selected images */}
          {selectedImages.length > 0 && (
            <div className='mt-4'>
              <h3 className='mb-2 font-bold text-white'>Selected Images:</h3>
              <div className='grid grid-cols-2 gap-2 md:grid-cols-3'>
                {selectedImages.map((img, index) => (
                  <div key={index} className='relative'>
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Selected ${index}`}
                      className='h-24 w-full rounded object-cover'
                    />
                    <button
                      onClick={() =>
                        setSelectedImages(prev =>
                          prev.filter((_, i) => i !== index),
                        )
                      }
                      className='absolute right-1 top-1 rounded-full bg-red-500 p-1'
                    >
                      <X size={12} className='text-white' />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageUploadModal
