'use client';
import { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import questionMark from '@/public/question-mark.svg';
import { Button } from '@/components/ui/button';
import Progress from '@/components/ui/Progress';
import DualUpload from './components/DualUpload';
import InstructionsModal from './components/InstructionsModal';

const Page = () => {
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [shareSocial, setShareSocial] = useState<boolean>(false);
  const [displayInstructions, setDisplayInstructions] = useState(false);

  const closeModal = () => {
    setDisplayInstructions(false);
  };

  const openModal = () => {
    setDisplayInstructions(true);
  };

  useEffect(() => {
    openModal();
  }, []);

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: 'before' | 'after',
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          if (type === 'before') {
            setBeforeImage(reader.result);
          } else {
            setAfterImage(reader.result);
          }
        }
      };
      reader.onerror = () => {
        alert('Failed to read the file. Please try again.');
      };
      reader.readAsDataURL(file);
    } else {
      alert('Invalid file format. Please upload an image.');
    }
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!beforeImage || !afterImage) {
      alert('Please upload both before and after images.');
      return;
    }

    setUploading(true);
    setProgress(10);

    setTimeout(() => setProgress(50), 1000);
    setTimeout(() => setProgress(100), 2000);
    setTimeout(() => {
      setUploading(false);

      alert('Upload successful!');

      setAfterImage(null);
      setBeforeImage(null);
      setShareSocial(false);
    }, 2500);
  };

  return (
    <section
      onSubmit={handleUpload}
      className="font-nunito flex min-h-[90vh] items-center justify-center bg-[#58B12F] px-5 py-[80px] relative"
    >
      <form className="flex w-full max-w-[926px] flex-col items-center justify-center gap-6">
        {/* Submission Requirements Section */}
        <div
          onClick={openModal}
          className="flex w-fit cursor-pointer items-center justify-center gap-[10px] border-b-[1px] border-[#FAFF00] px-3 pb-[10px] text-center transition duration-300 hover:border-[#000000]"
        >
          <h3 className="text-sm font-normal text-[#000000]">
            Submission Requirements
          </h3>
          <span>
            <Image
              src={questionMark}
              height={100}
              width={100}
              alt="question-mark"
              className="h-[21.81px] w-[20px] object-contain"
            />
          </span>
        </div>

        {/* Dual Upload Component */}
        <DualUpload
          beforeImage={beforeImage}
          afterImage={afterImage}
          handleFileChange={handleFileChange}
        />

        {/* Upload Button */}
        <Button
          disabled={uploading}
          size="xl"
          className="font-bebas w-full bg-[#111111] py-[10px] text-[40px] font-normal text-[#FAFF00] transition duration-300 ease-in-out hover:bg-[radial-gradient(68.12%_68.12%_at_50%_50.5%,rgba(30,132,40,0.9)_33.5%,rgba(7,74,13,0.9)_100%),linear-gradient(0deg,#111111,#111111)]"
        >
          {uploading ? 'Uploading...' : 'UPLOAD YOUR ACTIONS'}
        </Button>

        {/* Social Share Checkbox */}
        <div className="flex w-fit cursor-pointer items-center gap-2 px-3">
          <input
            className="h-4 w-4 accent-[#2C2C2C]"
            type="checkbox"
            id="share"
            checked={shareSocial}
            onChange={() => setShareSocial(!shareSocial)}
            required
          />
          <label
            htmlFor="share"
            className="text-base font-medium text-[#000000]"
          >
            Agree if you allow us to post your pictures on social platforms (X,
            Telegram)
          </label>
        </div>

        {/* Progress Bar */}
        {uploading && <Progress value={progress} />}
      </form>

      {/* Instructions Modal */}
      {displayInstructions && <InstructionsModal closeModal={closeModal} />}
    </section>
  );
};

export default Page;
