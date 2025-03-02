import React from "react";
import Image from "next/image";

import StellarIcon from "@/public/Stellar_Icon.png";


const Footer: React.FC = () => {
    return (
     <div className="bg-[#58B12F] py-3 px-5 flex justify-between items-center font-sans rounded-b-xl">
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
  