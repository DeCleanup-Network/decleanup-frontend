// components/ImageUploader.tsx
import { Upload, X } from 'lucide-react'
import { ChangeEvent, DragEvent, useRef } from 'react'

interface ImageUploaderProps {
  image: File | null
  onImageChange: (file: File | null) => void
  label: string
  onDragOver: (e: DragEvent) => void
  onDrop: (e: DragEvent) => void
}

const ImageUploader = ({
  image,
  onImageChange,
  label,
  onDragOver,
  onDrop,
}: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onImageChange(e.target.files[0])
    }
  }

  const triggerFileInput = () => {
    inputRef.current?.click()
  }

  const removeImage = () => {
    onImageChange(null)
  }

  return (
    <div className='mb-4 flex flex-col justify-between md:mb-8 md:ml-7 md:w-80'>
      <div className='mb-1 font-bebas text-xl font-bold md:text-xl lg:text-2xl'>
        {label}
      </div>
      <div
        className='relative mt-1 flex h-[150px] cursor-pointer items-center justify-center rounded bg-[#58B12F] md:mt-0 md:h-[200px] lg:h-[304px]'
        onClick={image ? undefined : triggerFileInput}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        {image ? (
          <>
            <img
              src={URL.createObjectURL(image)}
              alt='Uploaded preview'
              className='h-full w-full rounded object-cover'
            />
            <button
              onClick={e => {
                e.stopPropagation()
                removeImage()
              }}
              className='absolute right-2 top-2 rounded-full bg-red-500 p-1'
            >
              <X size={16} className='text-white' />
            </button>
          </>
        ) : (
          <Upload size={80} className='md:size-100 lg:size-150 text-black' />
        )}
      </div>
      <input
        type='file'
        ref={inputRef}
        onChange={handleFileChange}
        className='hidden'
        accept='image/*'
      />
    </div>
  )
}

export default ImageUploader
