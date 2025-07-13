import React, { useEffect, useState } from 'react'
import { X, Clock, MessageCircle, CheckCircle } from 'lucide-react'

type DecleanupShareModalProps = {
  isOpen: boolean
  onClose: () => void
  ipfsUri?: string
}

interface CleanupMetadata {
  userAddress: string
  submissionTimestamp: string
  cleanupDateTime: string
  images: {
    before: {
      hash: string
      ipfsUri: string
      name: string
      size: number
      type: string
    }
    after: {
      hash: string
      ipfsUri: string
      name: string
      size: number
      type: string
    }
  }
  version: string
  platform: string
}

const PreviewPage: React.FC<DecleanupShareModalProps> = ({
  isOpen,
  onClose,
  ipfsUri,
}) => {
  const [metadata, setMetadata] = useState<CleanupMetadata | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch metadata from IPFS when modal opens
  useEffect(() => {
    const fetchMetadata = async () => {
      if (!ipfsUri || !isOpen) return

      setLoading(true)
      setError(null)

      try {
        // Convert ipfs:// URI to HTTP gateway URL
        const gatewayUrl = ipfsUri.replace(
          'ipfs://',
          'https://gateway.pinata.cloud/ipfs/',
        )
        const response = await fetch(gatewayUrl)

        if (!response.ok) {
          throw new Error('Failed to fetch metadata from IPFS')
        }

        const data = await response.json()
        setMetadata(data)
      } catch (err) {
        console.error('Error fetching metadata:', err)
        setError(err instanceof Error ? err.message : 'Failed to load images')
      } finally {
        setLoading(false)
      }
    }

    fetchMetadata()
  }, [ipfsUri, isOpen])

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
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm'>
      <div className='relative mx-4 max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl'>
        {/* Header */}
        <div className='bg-black px-6 py-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold text-[#FAFF00]'>
              Cleanup Submission Preview
            </h2>
            <button
              onClick={onClose}
              className='rounded-full p-2 text-[#FAFF00] transition-colors hover:bg-[#FAFF00] hover:bg-opacity-20'
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Status Banner */}
        <div className='border-b border-gray-200 bg-[#FAFF00] px-6 py-3'>
          <div className='flex items-center gap-3'>
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-black text-[#FAFF00]'>
              <Clock size={18} />
            </div>
            <div>
              <h3 className='font-semibold text-black'>
                Submission Under Review
              </h3>
              <p className='text-sm text-gray-700'>
                Your cleanup photos are being reviewed by our team
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='max-h-[calc(90vh-200px)] overflow-y-auto p-6'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
            {/* Images Section */}
            <div className='lg:col-span-2'>
              <h3 className='mb-6 text-xl font-semibold text-gray-900'>
                Your Cleanup Journey
              </h3>

              {loading ? (
                <div className='flex flex-col items-center justify-center rounded-lg bg-gray-50 py-12'>
                  <div className='mb-4 flex h-16 w-16 animate-spin items-center justify-center rounded-full bg-gray-200'>
                    <Clock size={32} className='text-gray-400' />
                  </div>
                  <h4 className='mb-2 text-lg font-medium text-gray-900'>
                    Loading Images...
                  </h4>
                  <p className='text-center text-gray-600'>
                    Fetching your cleanup photos from IPFS
                  </p>
                </div>
              ) : error ? (
                <div className='flex flex-col items-center justify-center rounded-lg bg-gray-50 py-12'>
                  <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
                    <X size={32} className='text-red-500' />
                  </div>
                  <h4 className='mb-2 text-lg font-medium text-gray-900'>
                    Error Loading Images
                  </h4>
                  <p className='text-center text-gray-600'>{error}</p>
                </div>
              ) : metadata ? (
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  {/* Before Image */}
                  <div className='space-y-4'>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-bold text-[#FAFF00]'>
                        1
                      </div>
                      <h4 className='text-lg font-semibold text-gray-900'>
                        Before
                      </h4>
                    </div>
                    <div className='relative overflow-hidden rounded-lg border-2 border-gray-200'>
                      <img
                        src={metadata.images.before.ipfsUri.replace(
                          'ipfs://',
                          'https://gateway.pinata.cloud/ipfs/',
                        )}
                        alt='Before cleanup'
                        className='h-64 w-full object-cover'
                        onError={e => {
                          console.error('Failed to load before image')
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      <div className='absolute right-2 top-2 rounded bg-black bg-opacity-75 px-2 py-1 text-xs font-medium text-[#FAFF00]'>
                        Before
                      </div>
                    </div>
                  </div>

                  {/* After Image */}
                  <div className='space-y-4'>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-bold text-[#FAFF00]'>
                        2
                      </div>
                      <h4 className='text-lg font-semibold text-gray-900'>
                        After
                      </h4>
                    </div>
                    <div className='relative overflow-hidden rounded-lg border-2 border-gray-200'>
                      <img
                        src={metadata.images.after.ipfsUri.replace(
                          'ipfs://',
                          'https://gateway.pinata.cloud/ipfs/',
                        )}
                        alt='After cleanup'
                        className='h-64 w-full object-cover'
                        onError={e => {
                          console.error('Failed to load after image')
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      <div className='absolute right-2 top-2 rounded bg-black bg-opacity-75 px-2 py-1 text-xs font-medium text-[#FAFF00]'>
                        After
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='flex flex-col items-center justify-center rounded-lg bg-gray-50 py-12'>
                  <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200'>
                    <CheckCircle size={32} className='text-gray-400' />
                  </div>
                  <h4 className='mb-2 text-lg font-medium text-gray-900'>
                    No Images to Preview
                  </h4>
                  <p className='text-center text-gray-600'>
                    Upload your before and after photos to see them here
                  </p>
                </div>
              )}
            </div>

            {/* Status Panel */}
            <div className='lg:col-span-1'>
              <div className='space-y-6 rounded-lg bg-gray-50 p-6'>
                <div>
                  <h3 className='mb-4 text-lg font-semibold text-gray-900'>
                    Review Status
                  </h3>

                  {/* Review Timeline */}
                  <div className='space-y-4'>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-6 w-6 items-center justify-center rounded-full bg-black text-[#FAFF00]'>
                        <CheckCircle size={14} />
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-900'>
                          Submitted
                        </p>
                        <p className='text-xs text-gray-600'>
                          Photos uploaded successfully
                        </p>
                      </div>
                    </div>

                    <div className='flex items-center gap-3'>
                      <div className='flex h-6 w-6 items-center justify-center rounded-full bg-black text-[#FAFF00]'>
                        <Clock size={14} />
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-900'>
                          Under Review
                        </p>
                        <p className='text-xs text-gray-600'>
                          Team is verifying your cleanup
                        </p>
                      </div>
                    </div>

                    <div className='flex items-center gap-3'>
                      <div className='flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-gray-500'>
                        <CheckCircle size={14} />
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          Approved
                        </p>
                        <p className='text-xs text-gray-500'>
                          Rewards will be distributed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='border-t pt-6'>
                  <h4 className='mb-3 font-semibold text-gray-900'>
                    What\'s Next?
                  </h4>
                  <div className='space-y-3 text-sm text-gray-700'>
                    <div className='flex items-start gap-2'>
                      <span className='font-medium'>⏱️</span>
                      <p>Review typically takes 2-12 hours</p>
                    </div>
                    <div className='flex items-start gap-2'>
                      <span className='font-medium'>🏆</span>
                      <p>You&apos;ll receive your new level after approval</p>
                    </div>
                    <div className='flex items-start gap-2'>
                      <span className='font-medium'>💬</span>
                      <p>Contact us on Telegram for questions</p>
                    </div>
                  </div>
                </div>

                <div className='border-t pt-6'>
                  <button className='flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 font-semibold text-[#FAFF00] transition-colors hover:bg-gray-800'>
                    <Clock size={18} />
                    In Review
                  </button>

                  <button className='mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50'>
                    <MessageCircle size={18} />
                    Contact Support
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
