import React from "react";
import Image from "next/image";

import StellarIcon from "@/public/stellar.png";


const Footer: React.FC = () => {
    return (
     <div className="bg-[#58B12F] text-[#111111] lg:font-bebas border-t border-black  px-5 py-5 flex flex-col md:flex-row justify-between md:items-center text-sm lg:text-2xl">
       <p>2025©</p>
       <div className="flex flex-col  space-y-2 md:flex-row md:justify-center md:items-center md:space-y-0 md:space-x-3">
        <a href="" className="block">
          TELEGRAM</a>
          <a href="" className="block">
            GITHUB</a>
            <a href="" className="block">
              LITEPAPER
            </a>
            <a href="" className="block">
              BUG REPORT
            </a>
       </div>
       <div className='flex justify-end md:justify-start'>
          <Image src={StellarIcon} alt="" />
       </div>
     </div>
    );
  };
  
  export default Footer;
  