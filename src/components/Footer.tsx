import React from "react";
import Image from "next/image";

import StellarIcon from "@/public/stellar.png";


const Footer: React.FC = () => {
    return (
     <div className="bg-[#58B12F] font-bebas border-t border-black  px-5 py-5 flex justify-between items-center text-2xl">
       <p>2025©</p>
       <div className="flex space-x-3">
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
       <div>
          <Image src={StellarIcon} alt="" />
       </div>
     </div>
    );
  };
  
  export default Footer;
  