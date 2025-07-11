import React, { useEffect } from 'react'
import { X, Clock, MessageCircle, CheckCircle } from 'lucide-react'

type DecleanupShareModalProps = {
  isOpen: boolean
  onClose: () => void
}

const PreviewPage: React.FC<DecleanupShareModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Mock cleanup pictures for demo
  const cleanupPicture = {
    before: null, // Will be populated with actual File objects
    after: null
  }

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
      <div className='relative w-full max-w-6xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh]'>
        {/* Header */}
        <div className='bg-black px-6 py-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold text-[#FAFF00]'>Cleanup Submission Preview</h2>
            <button
              onClick={onClose}
              className='text-[#FAFF00] hover:bg-[#FAFF00] hover:bg-opacity-20 rounded-full p-2 transition-colors'
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Status Banner */}
        <div className='bg-[#FAFF00] px-6 py-3 border-b border-gray-200'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-black text-[#FAFF00] rounded-full flex items-center justify-center'>
              <Clock size={18} />
            </div>
            <div>
              <h3 className='font-semibold text-black'>Submission Under Review</h3>
              <p className='text-sm text-gray-700'>Your cleanup photos are being reviewed by our team</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='p-6 overflow-y-auto max-h-[calc(90vh-200px)]'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Images Section */}
            <div className='lg:col-span-2'>
              <h3 className='text-xl font-semibold mb-6 text-gray-900'>Your Cleanup Journey</h3>
              
              {cleanupPicture.before || cleanupPicture.after ? (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {/* Before Image */}
                  {cleanupPicture.before && (
                    <div className='space-y-4'>
                      <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 bg-black text-[#FAFF00] rounded-full flex items-center justify-center text-sm font-bold'>
                          1
                        </div>
                        <h4 className='text-lg font-semibold text-gray-900'>Before</h4>
                      </div>
                      <div className='relative overflow-hidden rounded-lg border-2 border-gray-200'>
                        <img
                          src={URL.createObjectURL(cleanupPicture.before)}
                          alt='Before cleanup'
                          className='w-full h-64 object-cover'
                        />
                        <div className='absolute top-2 right-2 bg-black bg-opacity-75 text-[#FAFF00] px-2 py-1 rounded text-xs font-medium'>
                          Before
                        </div>
                      </div>
                    </div>
                  )}

                  {/* After Image */}
                  {cleanupPicture.after && (
                    <div className='space-y-4'>
                      <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 bg-black text-[#FAFF00] rounded-full flex items-center justify-center text-sm font-bold'>
                          2
                        </div>
                        <h4 className='text-lg font-semibold text-gray-900'>After</h4>
                      </div>
                      <div className='relative overflow-hidden rounded-lg border-2 border-gray-200'>
                        <img
                          src={URL.createObjectURL(cleanupPicture.after)}
                          alt='After cleanup'
                          className='w-full h-64 object-cover'
                        />
                        <div className='absolute top-2 right-2 bg-black bg-opacity-75 text-[#FAFF00] px-2 py-1 rounded text-xs font-medium'>
                          After
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className='flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg'>
                  <div className='w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4'>
                    <CheckCircle size={32} className='text-gray-400' />
                  </div>
                  <h4 className='text-lg font-medium text-gray-900 mb-2'>No Images to Preview</h4>
                  <p className='text-gray-600 text-center'>Upload your before and after photos to see them here</p>
                </div>
              )}
            </div>

            {/* Status Panel */}
            <div className='lg:col-span-1'>
              <div className='bg-gray-50 rounded-lg p-6 space-y-6'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>Review Status</h3>
                  
                  {/* Review Timeline */}
                  <div className='space-y-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-6 h-6 bg-black text-[#FAFF00] rounded-full flex items-center justify-center'>
                        <CheckCircle size={14} />
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-900'>Submitted</p>
                        <p className='text-xs text-gray-600'>Photos uploaded successfully</p>
                      </div>
                    </div>
                    
                    <div className='flex items-center gap-3'>
                      <div className='w-6 h-6 bg-black text-[#FAFF00] rounded-full flex items-center justify-center'>
                        <Clock size={14} />
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-900'>Under Review</p>
                        <p className='text-xs text-gray-600'>Team is verifying your cleanup</p>
                      </div>
                    </div>
                    
                    <div className='flex items-center gap-3'>
                      <div className='w-6 h-6 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center'>
                        <CheckCircle size={14} />
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>Approved</p>
                        <p className='text-xs text-gray-500'>Rewards will be distributed</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='border-t pt-6'>
                  <h4 className='font-semibold text-gray-900 mb-3'>What's Next?</h4>
                  <div className='space-y-3 text-sm text-gray-700'>
                    <div className='flex items-start gap-2'>
                      <span className='font-medium'>⏱️</span>
                      <p>Review typically takes 2-12 hours</p>
                    </div>
                    <div className='flex items-start gap-2'>
                      <span className='font-medium'>🏆</span>
                      <p>You'll receive your new level after approval</p>
                    </div>
                    <div className='flex items-start gap-2'>
                      <span className='font-medium'>💬</span>
                      <p>Contact us on Telegram for questions</p>
                    </div>
                  </div>
                </div>

                <div className='border-t pt-6'>
                  <button className='w-full bg-black text-[#FAFF00] py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2'>
                    <Clock size={18} />
                    In Review
                  </button>
                  
                  <button className='w-full mt-3 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2'>
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