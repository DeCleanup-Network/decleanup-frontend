import { UploadIcon } from 'lucide-react';
import { ChangeEvent } from 'react';

interface DualUploadProps {
  beforeImage: string | null;
  afterImage: string | null;
  handleFileChange: (
    event: ChangeEvent<HTMLInputElement>,
    type: 'before' | 'after',
  ) => void;
}

const DualUpload: React.FC<DualUploadProps> = ({
  beforeImage,
  afterImage,
  handleFileChange,
}) => {
  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:flex-wrap">
      {[
        {
          label: 'Before',
          state: beforeImage,
          type: 'before',
          description:
            'Snap a photo of the area before you start. Show the impact your cleanup will make!',
        },
        {
          label: 'After',
          state: afterImage,
          type: 'after',
          description:
            'Capture the transformed space! Upload your after photo to complete your submission and earn rewards.',
        },
      ].map(({ label, state, type, description }) => (
        <div
          key={label}
          className="flex h-[333px] w-full flex-col items-center justify-center rounded-md bg-[#FAFF00] transition-all duration-300 hover:shadow-lg sm:w-[48%] lg:w-[451px]"
        >
          {state ? (
            <img
              src={state}
              alt={`${label} Preview`}
              className="h-full w-full rounded-md object-cover"
            />
          ) : (
            <label className="flex h-full cursor-pointer flex-col items-center justify-between gap-2 px-3 py-5 pb-7 text-center">
              <span className="text-base font-medium text-[#000000]">
                {description}
              </span>
              <UploadIcon
                className="text-[#000000] transition-transform duration-300 hover:scale-110"
                size={170}
              />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFileChange(e, type)
                }
                required
              />
            </label>
          )}
        </div>
      ))}
    </div>
  );
};

export default DualUpload;
