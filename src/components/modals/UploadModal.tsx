import { useState } from 'react'
import { X, Send, Upload, CheckCircle, AlertCircle } from 'lucide-react'
import ImageUploader from '../imageUploader/ImageUploader'
import UploadInstructions from '../imageUploader/UploadInstructions'
import SocialConsentCheckbox from '../imageUploader/SocialConsentCheckbox'
import { useCleanupContext } from '@/context/ContextApi'

interface ImageUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (ipfsUri: string) => void
  userAddress?: string
}

interface UploadStatus {
  status: 'idle' | 'uploading' | 'success' | 'error'
  message: string
  progress: number
}

const ImageUploadModal = ({
  isOpen,
  onClose,
  onSubmit,
  userAddress = '',
}: ImageUploadModalProps) => {
  const [beforeImage, setBeforeImage] = useState<File | null>(null)
  const [afterImage, setAfterImage] = useState<File | null>(null)
  const [cleanupDate, setCleanupDate] = useState('')
  const [cleanupTime, setCleanupTime] = useState('')
  const [step, setStep] = useState(1)
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    status: 'idle',
    message: '',
    progress: 0
  })
  const { checkBox, setCheckBox, setCleanupPicture } = useCleanupContext()

  if (!isOpen) return null

  // Validate image file types
  const validateImageFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const maxSize = 10 * 1024 * 1024 // 10MB
    
    if (!validTypes.includes(file.type)) {
      setUploadStatus({
        status: 'error',
        message: 'Please upload valid image files (JPEG, PNG, WebP)',
        progress: 0
      })
      return false
    }
    
    if (file.size > maxSize) {
      setUploadStatus({
        status: 'error',
        message: 'Image files must be smaller than 10MB',
        progress: 0
      })
      return false
    }
    
    return true
  }

  // Test Pinata connection
  const testPinataConnection = async (): Promise<boolean> => {
    const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY
    const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY
    
    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
      console.error('Pinata API keys not configured')
      return false
    }

    try {
      const response = await fetch('https://api.pinata.cloud/data/testAuthentication', {
        method: 'GET',
        headers: {
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY,
        },
      })
      
      const result = await response.json()
      console.log('Pinata connection test:', result)
      return response.ok
    } catch (error) {
      console.error('Pinata connection failed:', error)
      return false
    }
  }

  // Upload single file to Pinata
  const uploadSingleFile = async (file: File, filename: string): Promise<string> => {
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
        userAddress,
        type: 'cleanup-image',
        timestamp: new Date().toISOString()
      }
    }
    
    formData.append('pinataMetadata', JSON.stringify(pinataMetadata))

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_KEY,
      },
      body: formData,
    })

    const responseText = await response.text()
    
    if (!response.ok) {
      console.error('Pinata response:', responseText)
      throw new Error(`Pinata upload failed: ${response.status} ${response.statusText} - ${responseText}`)
    }

    const result = JSON.parse(responseText)
    return result.IpfsHash
  }

  // Create and upload metadata JSON
  const uploadMetadata = async (metadata: any): Promise<string> => {
    const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY
    const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY
    
    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
      throw new Error('Pinata API keys not configured')
    }

    const metadataBlob = new Blob([JSON.stringify(metadata, null, 2)], {
      type: 'application/json'
    })

    const formData = new FormData()
    formData.append('file', metadataBlob, 'cleanup-metadata.json')
    
    const pinataMetadata = {
      name: 'Cleanup Submission Metadata',
      keyvalues: {
        userAddress: metadata.userAddress,
        type: 'cleanup-metadata',
        timestamp: metadata.submissionTimestamp
      }
    }
    
    formData.append('pinataMetadata', JSON.stringify(pinataMetadata))

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_KEY,
      },
      body: formData,
    })

    const responseText = await response.text()
    
    if (!response.ok) {
      console.error('Pinata metadata response:', responseText)
      throw new Error(`Metadata upload failed: ${response.status} ${response.statusText}`)
    }

    const result = JSON.parse(responseText)
    return result.IpfsHash
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleSubmit = async () => {
    // Validation
    if (!checkBox) {
      setUploadStatus({
        status: 'error',
        message: 'Please accept the social consent checkbox',
        progress: 0
      })
      return
    }

    if (!beforeImage || !afterImage) {
      setUploadStatus({
        status: 'error',
        message: 'Please provide both before and after photos',
        progress: 0
      })
      return
    }

    if (!cleanupDate || !cleanupTime) {
      setUploadStatus({
        status: 'error',
        message: 'Please provide the cleanup date and time',
        progress: 0
      })
      return
    }

    // Validate image files
    if (!validateImageFile(beforeImage) || !validateImageFile(afterImage)) {
      return
    }

    setUploadStatus({
      status: 'uploading',
      message: 'Testing connection...',
      progress: 5
    })

    try {
      // Test Pinata connection first
      const connectionTest = await testPinataConnection()
      if (!connectionTest) {
        throw new Error('Failed to connect to Pinata. Please check your API keys.')
      }

      setUploadStatus({
        status: 'uploading',
        message: 'Uploading before image...',
        progress: 20
      })

      // Upload before image
      const beforeImageHash = await uploadSingleFile(
        beforeImage, 
        `before_${Date.now()}.${beforeImage.name.split('.').pop()}`
      )

      setUploadStatus({
        status: 'uploading',
        message: 'Uploading after image...',
        progress: 50
      })

      // Upload after image
      const afterImageHash = await uploadSingleFile(
        afterImage, 
        `after_${Date.now()}.${afterImage.name.split('.').pop()}`
      )

      setUploadStatus({
        status: 'uploading',
        message: 'Creating metadata...',
        progress: 80
      })

      // Create comprehensive metadata
      const submissionTimestamp = new Date().toISOString()
      const cleanupDateTime = new Date(`${cleanupDate}T${cleanupTime}`).toISOString()
      
      const metadata = {
        userAddress,
        submissionTimestamp,
        cleanupDateTime,
        images: {
          before: {
            hash: beforeImageHash,
            ipfsUri: `ipfs://${beforeImageHash}`,
            name: beforeImage.name,
            size: beforeImage.size,
            type: beforeImage.type
          },
          after: {
            hash: afterImageHash,
            ipfsUri: `ipfs://${afterImageHash}`,
            name: afterImage.name,
            size: afterImage.size,
            type: afterImage.type
          }
        },
        version: '1.0',
        platform: 'cleanup-app'
      }

      // Upload metadata
      const metadataHash = await uploadMetadata(metadata)

      setUploadStatus({
        status: 'success',
        message: 'Upload successful!',
        progress: 100
      })

      // Store images in context
      setCleanupPicture({
        before: beforeImage,
        after: afterImage,
      })

      // Submit the metadata IPFS URI (which contains links to both images)
      onSubmit(`ipfs://${metadataHash}`)

      // Reset form
      setTimeout(() => {
        handleClose()
      }, 1500)

    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus({
        status: 'error',
        message: `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        progress: 0
      })
    }
  }

  const handleClose = () => {
    setStep(1)
    setBeforeImage(null)
    setAfterImage(null)
    setCleanupDate('')
    setCleanupTime('')
    setUploadStatus({ status: 'idle', message: '', progress: 0 })
    onClose()
  }

  const isFormValid = beforeImage && afterImage && cleanupDate && cleanupTime && checkBox

  return (
    <div className='fixed inset-0 z-50 flex items-end bg-black bg-opacity-80'>
      <div className='w-full overflow-hidden rounded-lg md:relative md:h-[45rem]'>
        {/* Close button */}
        <button
          onClick={handleClose}
          className='absolute right-2 top-2 mr-3 rounded-full p-1 text-white hover:bg-gray-700 z-10'
          disabled={uploadStatus.status === 'uploading'}
        >
          <X size={44} />
        </button>

        {/* Header */}
        <div className='ml-2 hidden px-4 py-3 md:flex'>
          <h2 className='text-xl font-bold text-white'>Upload Cleanup Images</h2>
        </div>

        {/* Content */}
        <div className='h-full p-2 md:p-4'>
          <div className='h-full rounded bg-[#FAFF00] p-2 md:p-4'>
            <div className='flex h-full flex-col p-2 md:flex-row md:justify-between md:p-5'>
              {/* Image uploaders */}
              <div className='mb-4 hidden w-full md:mb-0 md:flex md:w-[65%] md:flex-row'>
                <ImageUploader
                  image={beforeImage}
                  onImageChange={(file) => {
                    if (file && validateImageFile(file)) {
                      setBeforeImage(file)
                      setCleanupPicture(prev => ({ ...prev, before: file }))
                    }
                  }}
                  label='1. Snap a photo of the area before you start. Show the impact your cleanup will make!'
                  onDragOver={handleDragOver}
                  onDrop={e => {
                    e.preventDefault()
                    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                      const file = e.dataTransfer.files[0]
                      if (validateImageFile(file)) {
                        setBeforeImage(file)
                        setCleanupPicture(prev => ({ ...prev, before: file }))
                      }
                    }
                  }}
                />

                <ImageUploader
                  image={afterImage}
                  onImageChange={(file) => {
                    if (file && validateImageFile(file)) {
                      setAfterImage(file)
                      setCleanupPicture(prev => ({ ...prev, after: file }))
                    }
                  }}
                  label='2. Capture the transformed space! Upload your after photo to complete your submission and earn rewards.'
                  onDragOver={handleDragOver}
                  onDrop={e => {
                    e.preventDefault()
                    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                      const file = e.dataTransfer.files[0]
                      if (validateImageFile(file)) {
                        setAfterImage(file)
                        setCleanupPicture(prev => ({ ...prev, after: file }))
                      }
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
                  <div className={`transition-all duration-500 ease-in-out ${
                    step === 1 ? 'opacity-100' : 'pointer-events-none absolute opacity-0'
                  }`}>
                    <ImageUploader
                      image={beforeImage}
                      onImageChange={(file) => {
                        if (file && validateImageFile(file)) {
                          setBeforeImage(file)
                          setCleanupPicture(prev => ({ ...prev, before: file }))
                        }
                      }}
                      label='1. Snap a photo of the area before you start. Show the impact your cleanup will make!'
                      onDragOver={handleDragOver}
                      onDrop={e => {
                        e.preventDefault()
                        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                          const file = e.dataTransfer.files[0]
                          if (validateImageFile(file)) {
                            setBeforeImage(file)
                            setCleanupPicture(prev => ({ ...prev, before: file }))
                          }
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className={`transition-all duration-500 ease-in-out ${
                    step === 2 ? 'opacity-100' : 'pointer-events-none absolute opacity-0'
                  }`}>
                    <ImageUploader
                      image={afterImage}
                      onImageChange={(file) => {
                        if (file && validateImageFile(file)) {
                          setAfterImage(file)
                          setCleanupPicture(prev => ({ ...prev, after: file }))
                        }
                      }}
                      label='2. Capture the transformed space! Upload your after photo to complete your submission and earn rewards.'
                      onDragOver={handleDragOver}
                      onDrop={e => {
                        e.preventDefault()
                        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                          const file = e.dataTransfer.files[0]
                          if (validateImageFile(file)) {
                            setAfterImage(file)
                            setCleanupPicture(prev => ({ ...prev, after: file }))
                          }
                        }
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Right sidebar */}
              <div className='mb-8 flex w-full flex-col justify-between md:w-[33%] lg:w-[25%]'>
                <div className='hidden md:flex mb-4'>
                  <UploadInstructions />
                </div>

                {/* Date and Time Fields */}
                <div className='mb-4 space-y-3'>
                  <h3 className='text-lg font-semibold text-black'>Cleanup Details</h3>
                  
                  <div>
                    <label className='block text-sm font-medium text-black mb-1'>
                      Cleanup Date *
                    </label>
                    <input
                      type='date'
                      value={cleanupDate}
                      onChange={(e) => setCleanupDate(e.target.value)}
                      className='w-full p-2 border border-gray-300 rounded bg-white text-black'
                      max={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className='block text-sm font-medium text-black mb-1'>
                      Cleanup Time *
                    </label>
                    <input
                      type='time'
                      value={cleanupTime}
                      onChange={(e) => setCleanupTime(e.target.value)}
                      className='w-full p-2 border border-gray-300 rounded bg-white text-black'
                      required
                    />
                  </div>
                </div>

                {/* Upload Status */}
                {uploadStatus.status !== 'idle' && (
                  <div className='mb-4 p-3 rounded-lg bg-white border-2 border-black'>
                    <div className='flex items-center space-x-2 mb-2'>
                      {uploadStatus.status === 'uploading' && (
                        <Upload className='w-5 h-5 text-blue-600 animate-spin' />
                      )}
                      {uploadStatus.status === 'success' && (
                        <CheckCircle className='w-5 h-5 text-green-600' />
                      )}
                      {uploadStatus.status === 'error' && (
                        <AlertCircle className='w-5 h-5 text-red-600' />
                      )}
                      <span className={`text-sm font-medium ${
                        uploadStatus.status === 'success' ? 'text-green-700' :
                        uploadStatus.status === 'error' ? 'text-red-700' :
                        'text-blue-700'
                      }`}>
                        {uploadStatus.message}
                      </span>
                    </div>
                    
                    {uploadStatus.status === 'uploading' && (
                      <div className='w-full bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-blue-600 h-2 rounded-full transition-all duration-300'
                          style={{ width: `${uploadStatus.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className='mt-4 md:mt-0'>
                  <SocialConsentCheckbox />

                  <button
                    className={`my-4 hidden h-10 w-full text-2xl md:block md:h-12 md:text-3xl lg:h-14 lg:text-4xl transition-colors ${
                      isFormValid && uploadStatus.status !== 'uploading'
                        ? 'bg-black text-[#FAFF00] hover:bg-gray-800'
                        : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    }`}
                    onClick={handleSubmit}
                    disabled={!isFormValid || uploadStatus.status === 'uploading'}
                  >
                    {uploadStatus.status === 'uploading' ? 'Uploading...' : 'Submit'}
                  </button>

                  <button
                    className={`my-5 block mb-8 h-14 w-full text-2xl md:hidden transition-colors ${
                      (step === 1 || (step === 2 && isFormValid)) && uploadStatus.status !== 'uploading'
                        ? 'bg-black text-[#FAFF00] hover:bg-gray-800'
                        : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    }`}
                    onClick={() => {
                      if (step === 1) {
                        setStep(2)
                      } else {
                        handleSubmit()
                      }
                    }}
                    disabled={
                      (step === 1 && !beforeImage) ||
                      (step === 2 && (!isFormValid || uploadStatus.status === 'uploading'))
                    }
                  >
                    {uploadStatus.status === 'uploading' ? 'Uploading...' :
                     step === 1 ? 'Save and Next' : 'Submit'}
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