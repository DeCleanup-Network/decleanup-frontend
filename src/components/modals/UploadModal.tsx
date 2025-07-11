import { useState } from 'react'
import { X, Send, Camera, Upload, CheckCircle, ArrowRight } from 'lucide-react'

const ImageUploadModal = ({ isOpen, onClose, onSubmit }) => {
  const [beforeImage, setBeforeImage] = useState(null)
  const [afterImage, setAfterImage] = useState(null)
  const [step, setStep] = useState(1)
  const [checkBox, setCheckBox] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  if (!isOpen) return null

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e, type) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (type === 'before') {
        setBeforeImage(file)
      } else {
        setAfterImage(file)
      }
    }
  }

  const handleFileSelect = (e, type) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (type === 'before') {
        setBeforeImage(file)
      } else {
        setAfterImage(file)
      }
    }
  }

  const handleSubmit = () => {
    if (!checkBox) return
    
    const images = []
    if (beforeImage) images.push(beforeImage)
    if (afterImage) images.push(afterImage)
    onSubmit(images)
    
    // Reset form
    setBeforeImage(null)
    setAfterImage(null)
    setCheckBox(false)
    setStep(1)
    onClose()
  }

  const handleClose = () => {
    setStep(1)
    setBeforeImage(null)
    setAfterImage(null)
    setCheckBox(false)
    onClose()
  }

  const ImageUploader = ({ image, onImageChange, label, type, stepNumber }) => (
    <div className="w-full max-w-sm mx-auto">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
            {stepNumber}
          </div>
          <h3 className="font-semibold text-gray-900">{stepNumber === 1 ? 'Before' : 'After'}</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{label}</p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 ${
          isDragging 
            ? 'border-black bg-[#FAFF00] bg-opacity-20' 
            : image 
            ? 'border-black bg-[#FAFF00] bg-opacity-10' 
            : 'border-gray-300 hover:border-gray-400 bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, type)}
      >
        {image ? (
          <div className="text-center">
            <div className="relative mx-auto mb-4 w-32 h-32 rounded-lg overflow-hidden">
              <img
                src={URL.createObjectURL(image)}
                alt={`${type} preview`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => onImageChange(null)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 text-black">
              <CheckCircle size={16} />
              <span className="text-sm font-medium">Image uploaded</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{image.name}</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <Camera size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-600 mb-2">
              <strong>Click to upload</strong> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
        
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileSelect(e, type)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  )

  const ProgressBar = () => (
    <div className="flex items-center justify-center mb-6">
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          step >= 1 ? 'bg-black text-[#FAFF00]' : 'bg-gray-200 text-gray-600'
        }`}>
          {beforeImage ? <CheckCircle size={16} /> : '1'}
        </div>
        <div className={`w-16 h-1 mx-2 ${step >= 2 ? 'bg-black' : 'bg-gray-200'}`} />
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          step >= 2 ? 'bg-black text-[#FAFF00]' : 'bg-gray-200 text-gray-600'
        }`}>
          {afterImage ? <CheckCircle size={16} /> : '2'}
        </div>
        <div className={`w-16 h-1 mx-2 ${beforeImage && afterImage && checkBox ? 'bg-black' : 'bg-gray-200'}`} />
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          beforeImage && afterImage && checkBox ? 'bg-black text-[#FAFF00]' : 'bg-gray-200 text-gray-600'
        }`}>
          <Send size={16} />
        </div>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-black px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#FAFF00]">Share Your Cleanup Impact</h2>
            <button
              onClick={handleClose}
              className="text-[#FAFF00] hover:bg-[#FAFF00] hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <ProgressBar />

          {/* Desktop view */}
          <div className="hidden md:block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <ImageUploader
                image={beforeImage}
                onImageChange={setBeforeImage}
                label="Snap a photo of the area before you start. Show the impact your cleanup will make!"
                type="before"
                stepNumber={1}
              />
              
              <ImageUploader
                image={afterImage}
                onImageChange={setAfterImage}
                label="Capture the transformed space! Upload your after photo to complete your submission and earn rewards."
                type="after"
                stepNumber={2}
              />
            </div>
          </div>

          {/* Mobile view */}
          <div className="md:hidden mb-6">
            {step === 1 ? (
              <ImageUploader
                image={beforeImage}
                onImageChange={setBeforeImage}
                label="Snap a photo of the area before you start. Show the impact your cleanup will make!"
                type="before"
                stepNumber={1}
              />
            ) : (
              <ImageUploader
                image={afterImage}
                onImageChange={setAfterImage}
                label="Capture the transformed space! Upload your after photo to complete your submission and earn rewards."
                type="after"
                stepNumber={2}
              />
            )}
          </div>

          {/* Social consent */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checkBox}
                onChange={(e) => setCheckBox(e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <div className="text-sm text-gray-700">
                <strong>Social media consent:</strong> I agree to let this organization share my cleanup photos on social media to inspire others and showcase community impact.
              </div>
            </label>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            {/* Desktop buttons */}
            <div className="hidden md:flex gap-3 w-full">
              <button
                onClick={handleClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!beforeImage || !afterImage || !checkBox}
                className="flex-1 px-6 py-3 bg-black text-[#FAFF00] rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Submit Cleanup
              </button>
            </div>

            {/* Mobile buttons */}
            <div className="md:hidden w-full">
              {step === 1 ? (
                <button
                  onClick={() => setStep(2)}
                  disabled={!beforeImage}
                  className="w-full px-6 py-4 bg-black text-[#FAFF00] rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  Next Step
                  <ArrowRight size={18} />
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 px-4 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!beforeImage || !afterImage || !checkBox}
                    className="flex-1 px-4 py-4 bg-black text-[#FAFF00] rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    Submit
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