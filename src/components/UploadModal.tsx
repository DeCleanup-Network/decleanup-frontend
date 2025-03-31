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
      <div className='relative h-[38rem] w-full overflow-hidden rounded-lg bg-gray-900'>
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
        <div className='h-full p-4'>
          {/* Steps section */}
          <div className='h-full rounded bg-[#FAFF00] p-4'>
            <div className=''>
              {/* Step 1 */}

              {/* Step 2 */}
              {/* <div className='col-span-1'>
                <div className='mb-1 text-2xl font-bold'>
                  2. CAPTURE THE TRANSFORMATION PHASE OR NEXT STAGE OF WORKS
                  (COMPLETED OR IN PROGRESS)
                </div>
              </div> */}

              {/* <div className='col-span-1'>
                <div className='mb-1 text-xs font-bold'>
                  3. UPLOAD BEFORE AND AFTER COLLAGE PHOTOS WITH NOTES
                </div>
              </div> */}

              <div className='w-[70%] h-full  flex flex-row justify-between'>
                <div className='mb-8 flex flex-col justify-between w-[48%]'>
                  <div className='mb-1 text-4xl font-bold'>
                    1. TAKE A PHOTO OF THE AREA BEFORE YOU START. STATE THE
                    PROJECT NAME
                  </div>
                  <div
                    className='flex h-[304px] cursor-pointer items-center justify-center rounded bg-green-600'
                    onClick={triggerFileInput}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <Upload size={36} className='text-black' />
                  </div>
                </div>

                <div className='mb-8 flex flex-col justify-between w-[48%]'>
                  <div className='mb-1 text-4xl font-bold'>
                    2. Capture the transformed space! Upload your after photo to
                    complete your submission and earn rewards.
                  </div>
                  <div
                    className='flex h-[304px] cursor-pointer items-center justify-center rounded bg-green-600'
                    onClick={triggerFileInput}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <Upload size={36} className='text-black' />
                  </div>
                </div>
              </div>

              <div>
                
              </div>

              {/* <div className='col-span-1 flex flex-col'>
                <div className='mb-2 text-xs font-bold'>
                  ENSURE YOU HAVE DETAILS FOR REVIEW AND MAXIMUM SIZE PER IMAGE:
                  10 MB
                </div>
                <div className='mt-auto'>
                  <div className='mb-2 text-xs font-bold'>
                    4. REVIEW AND ALLOW US TO STORE YOUR PICTURES FOR DATA
                    PLATFORM OR STEMMENT
                  </div>
                  <button
                    onClick={handleSubmit}
                    className='flex w-full items-center justify-center rounded bg-gray-900 px-4 py-1 text-white'
                    disabled={selectedImages.length === 0}
                  >
                    <span>SEND</span>
                  </button>
                </div>
              </div> */}
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
              <div className='grid grid-cols-3 gap-2'>
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
