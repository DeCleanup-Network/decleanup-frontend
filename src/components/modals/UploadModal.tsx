import { useState } from 'react'
import {
  X,
  Send,
  Camera,
  Upload,
  CheckCircle,
  ArrowRight,
  AlertCircle,
} from 'lucide-react'
import { useSubmissionOperations } from '@/hooks/useSubmissionOperation'
import { useAccount } from 'wagmi'

interface ImageUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (ipfsUri: string) => void
  userAddress?: string
}

const ImageUploadModal = ({
  isOpen,
  onClose,
  onSubmit,
  userAddress = '',
}: ImageUploadModalProps) => {
  const { address } = useAccount()
  const { createSubmission } = useSubmissionOperations()

  const [beforeImage, setBeforeImage] = useState<File | null>(null)
  const [afterImage, setAfterImage] = useState<File | null>(null)
  const [cleanupDate, setCleanupDate] = useState('')
  const [cleanupTime, setCleanupTime] = useState('')
  const [step, setStep] = useState(1)
  const [checkBox, setCheckBox] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadStatus, setUploadStatus] = useState({
    status: 'idle' as 'idle' | 'uploading' | 'success' | 'error',
    message: '',
    progress: 0,
  })

  // If you have the context, uncomment this:
  // const { checkBox, setCheckBox, setCleanupPicture } = useCleanupContext()

  if (!isOpen) return null

  // Validate image file types
  const validateImageFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!validTypes.includes(file.type)) {
      setUploadStatus({
        status: 'error',
        message: 'Please upload valid image files (JPEG, PNG, WebP)',
        progress: 0,
      })
      return false
    }

    if (file.size > maxSize) {
      setUploadStatus({
        status: 'error',
        message: 'Image files must be smaller than 10MB',
        progress: 0,
      })
      return false
    }

    return true
  }

  // Test Pinata connection
  const testPinataConnection = async () => {
    const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY
    const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY

    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
      console.error('Pinata API keys not configured')
      return false
    }

    try {
      const response = await fetch(
        'https://api.pinata.cloud/data/testAuthentication',
        {
          method: 'GET',
          headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_KEY,
          },
        },
      )

      const result = await response.json()
      console.log('Pinata connection test:', result)
      return response.ok
    } catch (error) {
      console.error('Pinata connection failed:', error)
      return false
    }
  }

  // Upload single file to Pinata
  const uploadSingleFile = async (file: File, filename: string) => {
    const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY
    const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY

    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
      throw new Error('Pinata API keys not configured')
    }

    const formData = new FormData()
    formData.append('file', file, filename)

    const pinataMetadata = {
      name: filename,
      keyvalues: {
        userAddress: userAddress || address,
        type: 'cleanup-image',
        timestamp: new Date().toISOString(),
      },
    }

    formData.append('pinataMetadata', JSON.stringify(pinataMetadata))

    const response = await fetch(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      {
        method: 'POST',
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
        body: formData,
      },
    )

    const responseText = await response.text()

    if (!response.ok) {
      console.error('Pinata response:', responseText)
      throw new Error(
        `Pinata upload failed: ${response.status} ${response.statusText} - ${responseText}`,
      )
    }

    const result = JSON.parse(responseText)
    return result.IpfsHash
  }

  // Create and upload metadata JSON
  const uploadMetadata = async (metadata: Record<string, unknown>) => {
    const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY
    const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY

    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
      throw new Error('Pinata API keys not configured')
    }

    const metadataBlob = new Blob([JSON.stringify(metadata, null, 2)], {
      type: 'application/json',
    })

    const formData = new FormData()
    formData.append('file', metadataBlob, 'cleanup-metadata.json')

    const pinataMetadata = {
      name: 'Cleanup Submission Metadata',
      keyvalues: {
        userAddress: metadata.userAddress,
        type: 'cleanup-metadata',
        timestamp: metadata.submissionTimestamp,
      },
    }

    formData.append('pinataMetadata', JSON.stringify(pinataMetadata))

    const response = await fetch(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      {
        method: 'POST',
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
        body: formData,
      },
    )

    const responseText = await response.text()

    if (!response.ok) {
      console.error('Pinata metadata response:', responseText)
      throw new Error(
        `Metadata upload failed: ${response.status} ${response.statusText}`,
      )
    }

    const result = JSON.parse(responseText)
    return result.IpfsHash
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent, type: 'before' | 'after') => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (validateImageFile(file)) {
        if (type === 'before') {
          setBeforeImage(file)
        } else {
          setAfterImage(file)
        }
      }
    }
  }

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'before' | 'after',
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (validateImageFile(file)) {
        if (type === 'before') {
          setBeforeImage(file)
        } else {
          setAfterImage(file)
        }
      }
    }
  }

  const handleSubmit = async () => {
    // Validation
    if (!checkBox) {
      setUploadStatus({
        status: 'error',
        message: 'Please accept the social consent checkbox',
        progress: 0,
      })
      return
    }

    if (!beforeImage || !afterImage) {
      setUploadStatus({
        status: 'error',
        message: 'Please provide both before and after photos',
        progress: 0,
      })
      return
    }

    if (!cleanupDate || !cleanupTime) {
      setUploadStatus({
        status: 'error',
        message: 'Please provide the cleanup date and time',
        progress: 0,
      })
      return
    }

    setUploadStatus({
      status: 'uploading',
      message: 'Testing connection...',
      progress: 5,
    })

    try {
      // Test Pinata connection first
      const connectionTest = await testPinataConnection()
      if (!connectionTest) {
        throw new Error(
          'Failed to connect to Pinata. Please check your API keys.',
        )
      }

      setUploadStatus({
        status: 'uploading',
        message: 'Uploading before image...',
        progress: 20,
      })

      // Upload before image
      const beforeImageHash = await uploadSingleFile(
        beforeImage,
        `before_${Date.now()}.${beforeImage.name.split('.').pop()}`,
      )

      setUploadStatus({
        status: 'uploading',
        message: 'Uploading after image...',
        progress: 50,
      })

      // Upload after image
      const afterImageHash = await uploadSingleFile(
        afterImage,
        `after_${Date.now()}.${afterImage.name.split('.').pop()}`,
      )

      setUploadStatus({
        status: 'uploading',
        message: 'Creating metadata...',
        progress: 80,
      })

      // Create comprehensive metadata
      const submissionTimestamp = new Date().toISOString()
      const cleanupDateTime = new Date(
        `${cleanupDate}T${cleanupTime}`,
      ).toISOString()

      const metadata = {
        userAddress: userAddress || address,
        submissionTimestamp,
        cleanupDateTime,
        images: {
          before: {
            hash: beforeImageHash,
            ipfsUri: `ipfs://${beforeImageHash}`,
            name: beforeImage.name,
            size: beforeImage.size,
            type: beforeImage.type,
          },
          after: {
            hash: afterImageHash,
            ipfsUri: `ipfs://${afterImageHash}`,
            name: afterImage.name,
            size: afterImage.size,
            type: afterImage.type,
          },
        },
        version: '1.0',
        platform: 'cleanup-app',
      }

      // Upload metadata
      const metadataHash = await uploadMetadata(metadata)
      const ipfsUri = `ipfs://${metadataHash}`

      setUploadStatus({
        status: 'uploading',
        message: 'Submitting to blockchain...',
        progress: 90,
      })

      // Submit to blockchain using the submission hook
      if (createSubmission) {
        const tx = await createSubmission(ipfsUri)
        console.log('Submission transaction:', tx)
      }

      setUploadStatus({
        status: 'success',
        message: 'Upload and submission successful!',
        progress: 100,
      })

      // Submit the metadata IPFS URI (which contains links to both images)
      onSubmit(ipfsUri)

      // Reset form
      setTimeout(() => {
        handleClose()
      }, 1500)
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus({
        status: 'error',
        message: `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        progress: 0,
      })
    }
  }

  const handleClose = () => {
    setStep(1)
    setBeforeImage(null)
    setAfterImage(null)
    setCleanupDate('')
    setCleanupTime('')
    setCheckBox(false)
    setUploadStatus({ status: 'idle', message: '', progress: 0 })
    onClose()
  }

  const ImageUploader = ({
    image,
    onImageChange,
    label,
    type,
    stepNumber,
  }: {
    image: File | null
    onImageChange: (file: File | null) => void
    label: string
    type: 'before' | 'after'
    stepNumber: number
  }) => (
    <div className='mx-auto w-full max-w-sm'>
      <div className='mb-4'>
        <div className='mb-2 flex items-center gap-2'>
          <div className='flex h-6 w-6 items-center justify-center rounded-full bg-black text-sm font-bold text-white'>
            {stepNumber}
          </div>
          <h3 className='font-semibold text-gray-900'>
            {stepNumber === 1 ? 'Before' : 'After'}
          </h3>
        </div>
        <p className='text-sm leading-relaxed text-gray-600'>{label}</p>
      </div>

      <div
        className={`relative rounded-xl border-2 border-dashed p-6 transition-all duration-300 ${
          isDragging
            ? 'border-black bg-[#FAFF00] bg-opacity-20'
            : image
              ? 'border-black bg-[#FAFF00] bg-opacity-10'
              : 'border-gray-300 bg-gray-50 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={e => handleDrop(e, type)}
      >
        {image ? (
          <div className='text-center'>
            <div className='relative mx-auto mb-4 h-32 w-32 overflow-hidden rounded-lg'>
              <img
                src={URL.createObjectURL(image)}
                alt={`${type} preview`}
                className='h-full w-full object-cover'
              />
              <button
                onClick={() => onImageChange(null)}
                className='absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600'
              >
                <X size={12} />
              </button>
            </div>
            <div className='flex items-center justify-center gap-2 text-black'>
              <CheckCircle size={16} />
              <span className='text-sm font-medium'>Image uploaded</span>
            </div>
            <p className='mt-1 text-xs text-gray-500'>{image.name}</p>
          </div>
        ) : (
          <div className='text-center'>
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200'>
              <Camera size={24} className='text-gray-400' />
            </div>
            <p className='mb-2 text-gray-600'>
              <strong>Click to upload</strong> or drag and drop
            </p>
            <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
          </div>
        )}

        <input
          type='file'
          accept='image/*'
          onChange={e => handleFileSelect(e, type)}
          className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
        />
      </div>
    </div>
  )

  const ProgressBar = () => (
    <div className='mb-6 flex items-center justify-center'>
      <div className='flex items-center'>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
            step >= 1 ? 'bg-black text-[#FAFF00]' : 'bg-gray-200 text-gray-600'
          }`}
        >
          {beforeImage ? <CheckCircle size={16} /> : '1'}
        </div>
        <div
          className={`mx-2 h-1 w-16 ${step >= 2 ? 'bg-black' : 'bg-gray-200'}`}
        />
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
            step >= 2 ? 'bg-black text-[#FAFF00]' : 'bg-gray-200 text-gray-600'
          }`}
        >
          {afterImage ? <CheckCircle size={16} /> : '2'}
        </div>
        <div
          className={`mx-2 h-1 w-16 ${beforeImage && afterImage && checkBox ? 'bg-black' : 'bg-gray-200'}`}
        />
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
            beforeImage && afterImage && checkBox
              ? 'bg-black text-[#FAFF00]'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          <Send size={16} />
        </div>
      </div>
    </div>
  )

  const isFormValid =
    beforeImage && afterImage && cleanupDate && cleanupTime && checkBox

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm'>
      <div className='relative mx-4 w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl'>
        {/* Header */}
        <div className='bg-black px-6 py-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold text-[#FAFF00]'>
              Share Your Cleanup Impact
            </h2>
            <button
              onClick={handleClose}
              className='rounded-full p-2 text-[#FAFF00] transition-colors hover:bg-[#FAFF00] hover:bg-opacity-20'
              disabled={uploadStatus.status === 'uploading'}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className='p-6'>
          <ProgressBar />

          {/* Desktop view */}
          <div className='hidden md:block'>
            <div className='mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3'>
              <ImageUploader
                image={beforeImage}
                onImageChange={setBeforeImage}
                label='Snap a photo of the area before you start. Show the impact your cleanup will make!'
                type='before'
                stepNumber={1}
              />

              <ImageUploader
                image={afterImage}
                onImageChange={setAfterImage}
                label='Capture the transformed space! Upload your after photo to complete your submission and earn rewards.'
                type='after'
                stepNumber={2}
              />

              {/* Right sidebar for desktop */}
              <div className='flex flex-col justify-between'>
                {/* Date and Time Fields */}
                <div className='mb-6 space-y-4'>
                  <h3 className='text-lg font-semibold text-black'>
                    Cleanup Details
                  </h3>

                  <div>
                    <label
                      htmlFor='cleanup-date'
                      className='mb-1 block text-sm font-medium text-black'
                    >
                      Cleanup Date *
                    </label>
                    <input
                      id='cleanup-date'
                      type='date'
                      value={cleanupDate}
                      onChange={e => setCleanupDate(e.target.value)}
                      className='w-full rounded border border-gray-300 bg-white p-2 text-black'
                      max={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='cleanup-time'
                      className='mb-1 block text-sm font-medium text-black'
                    >
                      Cleanup Time *
                    </label>
                    <input
                      id='cleanup-time'
                      type='time'
                      value={cleanupTime}
                      onChange={e => setCleanupTime(e.target.value)}
                      className='w-full rounded border border-gray-300 bg-white p-2 text-black'
                      required
                    />
                  </div>
                </div>

                {/* Upload Status */}
                {uploadStatus.status !== 'idle' && (
                  <div className='mb-4 rounded-lg border bg-gray-50 p-3'>
                    <div className='mb-2 flex items-center space-x-2'>
                      {uploadStatus.status === 'uploading' && (
                        <Upload className='h-5 w-5 animate-spin text-blue-600' />
                      )}
                      {uploadStatus.status === 'success' && (
                        <CheckCircle className='h-5 w-5 text-green-600' />
                      )}
                      {uploadStatus.status === 'error' && (
                        <AlertCircle className='h-5 w-5 text-red-600' />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          uploadStatus.status === 'success'
                            ? 'text-green-700'
                            : uploadStatus.status === 'error'
                              ? 'text-red-700'
                              : 'text-blue-700'
                        }`}
                      >
                        {uploadStatus.message}
                      </span>
                    </div>

                    {uploadStatus.status === 'uploading' && (
                      <div className='h-2 w-full rounded-full bg-gray-200'>
                        <div
                          className='h-2 rounded-full bg-blue-600 transition-all duration-300'
                          style={{ width: `${uploadStatus.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile view */}
          <div className='mb-6 md:hidden'>
            {step === 1 ? (
              <div>
                <ImageUploader
                  image={beforeImage}
                  onImageChange={setBeforeImage}
                  label='Snap a photo of the area before you start. Show the impact your cleanup will make!'
                  type='before'
                  stepNumber={1}
                />

                {/* Date and Time Fields for mobile */}
                <div className='mt-6 space-y-4'>
                  <h3 className='text-lg font-semibold text-black'>
                    Cleanup Details
                  </h3>

                  <div>
                    <label
                      htmlFor='cleanup-date-mobile'
                      className='mb-1 block text-sm font-medium text-black'
                    >
                      Cleanup Date *
                    </label>
                    <input
                      id='cleanup-date-mobile'
                      type='date'
                      value={cleanupDate}
                      onChange={e => setCleanupDate(e.target.value)}
                      className='w-full rounded border border-gray-300 bg-white p-2 text-black'
                      max={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='cleanup-time-mobile'
                      className='mb-1 block text-sm font-medium text-black'
                    >
                      Cleanup Time *
                    </label>
                    <input
                      id='cleanup-time-mobile'
                      type='time'
                      value={cleanupTime}
                      onChange={e => setCleanupTime(e.target.value)}
                      className='w-full rounded border border-gray-300 bg-white p-2 text-black'
                      required
                    />
                  </div>
                </div>
              </div>
            ) : (
              <ImageUploader
                image={afterImage}
                onImageChange={setAfterImage}
                label='Capture the transformed space! Upload your after photo to complete your submission and earn rewards.'
                type='after'
                stepNumber={2}
              />
            )}

            {/* Upload Status for mobile */}
            {uploadStatus.status !== 'idle' && (
              <div className='mt-4 rounded-lg border bg-gray-50 p-3'>
                <div className='mb-2 flex items-center space-x-2'>
                  {uploadStatus.status === 'uploading' && (
                    <Upload className='h-5 w-5 animate-spin text-blue-600' />
                  )}
                  {uploadStatus.status === 'success' && (
                    <CheckCircle className='h-5 w-5 text-green-600' />
                  )}
                  {uploadStatus.status === 'error' && (
                    <AlertCircle className='h-5 w-5 text-red-600' />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      uploadStatus.status === 'success'
                        ? 'text-green-700'
                        : uploadStatus.status === 'error'
                          ? 'text-red-700'
                          : 'text-blue-700'
                    }`}
                  >
                    {uploadStatus.message}
                  </span>
                </div>

                {uploadStatus.status === 'uploading' && (
                  <div className='h-2 w-full rounded-full bg-gray-200'>
                    <div
                      className='h-2 rounded-full bg-blue-600 transition-all duration-300'
                      style={{ width: `${uploadStatus.progress}%` }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Social consent */}
          <div className='mb-6 rounded-lg bg-gray-50 p-4'>
            <label className='flex cursor-pointer items-start gap-3'>
              <input
                type='checkbox'
                checked={checkBox}
                onChange={e => setCheckBox(e.target.checked)}
                className='mt-1 h-4 w-4 rounded text-blue-600 focus:ring-blue-500'
              />
              <div className='text-sm text-gray-700'>
                <strong>Social media consent:</strong> I agree to let this
                organization share my cleanup photos on social media to inspire
                others and showcase community impact.
              </div>
            </label>
          </div>

          {/* Action buttons */}
          <div className='flex gap-3'>
            {/* Desktop buttons */}
            <div className='hidden w-full gap-3 md:flex'>
              <button
                onClick={handleClose}
                className='flex-1 rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50'
                disabled={uploadStatus.status === 'uploading'}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isFormValid || uploadStatus.status === 'uploading'}
                className='flex flex-1 items-center justify-center gap-2 rounded-lg bg-black px-6 py-3 text-[#FAFF00] transition-all hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50'
              >
                <Send size={18} />
                {uploadStatus.status === 'uploading'
                  ? 'Uploading...'
                  : 'Submit Cleanup'}
              </button>
            </div>

            {/* Mobile buttons */}
            <div className='w-full md:hidden'>
              {step === 1 ? (
                <button
                  onClick={() => setStep(2)}
                  disabled={!beforeImage || !cleanupDate || !cleanupTime}
                  className='flex w-full items-center justify-center gap-2 rounded-lg bg-black px-6 py-4 text-[#FAFF00] transition-all hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  Next Step
                  <ArrowRight size={18} />
                </button>
              ) : (
                <div className='flex gap-3'>
                  <button
                    onClick={() => setStep(1)}
                    className='flex-1 rounded-lg border border-gray-300 px-4 py-4 text-gray-700 transition-colors hover:bg-gray-50'
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={
                      !isFormValid || uploadStatus.status === 'uploading'
                    }
                    className='flex flex-1 items-center justify-center gap-2 rounded-lg bg-black px-4 py-4 text-[#FAFF00] transition-all hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50'
                  >
                    <Send size={18} />
                    {uploadStatus.status === 'uploading'
                      ? 'Uploading...'
                      : 'Submit'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageUploadModal
