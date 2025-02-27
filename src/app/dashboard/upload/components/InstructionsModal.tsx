import Image from "next/image";
import closeIcon from "@/public/close-bold.svg";

type InstructionsModalProps = {
  closeModal: () => void;
};

const InstructionsModal: React.FC<InstructionsModalProps> = ({ closeModal }) => {
  const instructions = [
    "Upload before and after cleanup photos with geotag",
    "Supported formats: JPEG, JPG, HEIC",
    "Maximum size per image: 10 MB",
  ];

  return (
    <section className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70 p-4">
      {/* Modal Container */}
      <div className="relative border-[11px] border-[#FAFF00] bg-[#58B12F] min-w-[350px] w-full max-w-[781px] h-auto md:h-[525px] flex items-center justify-center p-6">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="group absolute top-4 right-4 w-[40px] h-[40px] md:w-[67px] md:h-[67px] bg-[#000000] flex items-center justify-center cursor-pointer rounded-full transition-transform duration-300 hover:scale-110"
        >
          <Image
            src={closeIcon}
            alt="Close"
            height={31.42}
            width={31.42}
            className="transform transition duration-300 ease-in-out group-hover:scale-125"
          />
        </button>

        {/* Instructions Content */}
        <div className="w-full flex flex-col items-center justify-center gap-6">
          <div className="w-full flex flex-col items-center justify-center gap-8 text-center">
            {instructions.map((instruction, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3"
              >
                {/* Instruction Number */}
                <h2 className="font-bebas h-[52px] w-[37px] bg-[#FAFF00] text-[#000000] font-normal text-[40px] flex items-center justify-center rounded-md">
                  {index + 1}
                </h2>

                {/* Instruction Text */}
                <p className="font-nunito font-normal text-xl md:text-2xl text-[#000000]">
                  {instruction}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructionsModal;