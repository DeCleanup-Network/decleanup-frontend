import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

type DecleanupShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DecleanupShareModal: React.FC<DecleanupShareModalProps> = ({ isOpen, onClose }) => {
  const [isSharing, setIsSharing] = useState(false);

  const shareOnX = async () => {
    setIsSharing(true);
    const text = encodeURIComponent(
      "🎉 I just completed all levels of Decleanup Journey! Stay tuned for new updates! 🌊🌱 #Decleanup #PixelArtGame"
    );
    const url = encodeURIComponent('https://decleanupgame.com');
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;

    window.open(shareUrl, '_blank');
    setIsSharing(false);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 flex items-center justify-center bg-green-600 bg-opacity-90 z-50"
    >
      <div className="border-4 border-yellow-400 p-4 bg-green-500 rounded-2xl relative w-full max-w-3xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-black text-yellow-400 rounded-lg p-1 w-8 h-8 flex items-center justify-center"
        >
          <X size={24} />
        </button>
        <div className="flex items-center">
          <div className="text-left font-bold text-lg mr-8 mt-20">
            <p className="text-yellow-400">CONGRATULATIONS! YOU'VE</p>
            <p className="text-yellow-400">SUCCESSFULLY COMPLETED ALL</p>
            <p className="text-yellow-400">LEVELS OF DECLEANUP JOURNEY <span className="text-black">AT</span></p>
            <p className="text-black">THIS PHASE! STAY UPDATED FOR</p>
            <p className="text-black">NEW LEVELS UPDATES.</p>
          </div>
          <motion.div
            className="border-4 border-yellow-400 rounded-lg bg-blue-300 m-10"
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ repeat: Infinity, duration: 0.2, ease: 'easeInOut' }}
          >
            <img src="/decleanup.webp" alt="Decleanup Journey" className="w-50 h-44 object-cover" />
          </motion.div>
        </div>
        <Button
          onClick={shareOnX}
          disabled={isSharing}
          className="bg-black text-yellow-400 px-8 py-4 rounded-0xl text-lg mt-8 w-full"
        >
          {isSharing ? 'SHARING...' : 'SHARE ON X'}
        </Button>
      </div>
    </motion.div>
  );
};

export default DecleanupShareModal;
