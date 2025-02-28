import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type DecleanupShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DecleanupShareModal: React.FC<DecleanupShareModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleShare = () => {
    const text = encodeURIComponent("🎉 I've just received the first level of Decleanup Impact Product! Come join me and earn more DCU points! 🌱 #Decleanup #DCUPoints #ImpactProduct");
    const url = encodeURIComponent("https://decleanupgame.com");
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(shareUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-75 z-50"
    >
      <button
        onClick={onClose}
        className="absolute top-0 right-0 m-7 text-white text-7xl"
      >
        &times;
      </button>
      <div className="relative bg-[#FAFF00] text-black w-[95%] rounded-b-2xl p-6 h-[60%] mb-[2%]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <motion.div
            className="w-full max-w-[150px] mx-auto md:max-w-none"
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 0.2, ease: 'easeInOut' }}
          >
            <Image
              src="/decleanup_anim.jpeg"
              alt="Decleanup Impact Product"
              width={150}
              height={110}
              className="w-full h-auto rounded-lg"
            />
          </motion.div>
          <div className="md:col-span-2 text-left">
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl font-semibold leading-tight">
              CONGRATULATIONS, YOU'VE JUST RECEIVED THE FIRST LEVEL OF DECLEANUP 
            </p>
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl font-semibold leading-tight">
             IMPACT PRODUCT. COME BACK FOR MORE!
            </p>
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl mt-10 font-semibold leading-tight">
              SHARE YOUR REFERRAL WITH FRIENDS AND EARN MORE DCU POINTS.
            </p>
          </div>
        </div>
        <div className="absolute bottom-4 right-4">
          <button
            onClick={handleShare}
            className="bg-black text-[#FAFF00] px-6 py-3 text-lg w-60 transition-transform transform hover:scale-105"
          >
            SHARE ON X
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DecleanupShareModal;
