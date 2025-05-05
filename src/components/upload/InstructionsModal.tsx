import Image from 'next/image'
// import closeIcon from "@/public/close-bold.svg";
import closeIcon from '@/public/closeModal.png'

type InstructionsModalProps = {
  closeModal: () => void
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({
  closeModal,
}) => {
  const instructions = [
    'Upload before and after cleanup photos with geotag',
    'Supported formats: JPEG, JPG, HEIC',
    'Maximum size per image: 10 MB',
  ]

  return (
    <section className='fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70 p-4'>
      {/* Modal Container */}
      <div className='relative flex h-auto w-full min-w-[350px] max-w-[781px] items-center justify-center border-[11px] border-[#FAFF00] bg-[#58B12F] p-6 md:h-[525px]'>
        {/* Close Button */}
        <button
          onClick={closeModal}
          className='group absolute right-4 top-4 flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#000000] transition-transform duration-300 hover:scale-110 md:h-[67px] md:w-[67px]'
        >
          <Image
            src={closeIcon}
            alt='Close'
            height={31.42}
            width={31.42}
            className='transform transition duration-300 ease-in-out group-hover:scale-125'
          />
        </button>

        {/* Instructions Content */}
        <div className='flex w-full flex-col items-center justify-center gap-6'>
          <div className='flex w-full flex-col items-center justify-center gap-8 text-center'>
            {instructions.map((instruction, index) => (
              <div key={index} className='flex flex-col items-center gap-3'>
                {/* Instruction Number */}
                <h2 className='flex h-[52px] w-[37px] items-center justify-center rounded-md bg-[#FAFF00] font-bebas text-[40px] font-normal text-[#000000]'>
                  {index + 1}
                </h2>

                {/* Instruction Text */}
                <p className='font-nunito text-xl font-normal text-[#000000] md:text-2xl'>
                  {instruction}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default InstructionsModal
