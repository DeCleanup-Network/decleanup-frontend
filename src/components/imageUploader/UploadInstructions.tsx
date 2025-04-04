// components/UploadInstructions.tsx
const UploadInstructions = () => (
    <ol className="border-b-2 border-black pb-4">
      <li className="mt-2 font-bebas text-xl font-normal text-black md:text-2xl lg:text-3xl">
        upload before and after cleanup photos with geotag
      </li>
      <li className="mt-3 text-lg font-normal text-black md:text-xl lg:text-3xl">
        supported formats JPEG, JPG, HEIC
      </li>
      <li className="mt-3 text-lg font-normal text-black md:text-xl lg:text-3xl">
        maximum size per image 10 MB
      </li>
    </ol>
  );
  
  export default UploadInstructions;