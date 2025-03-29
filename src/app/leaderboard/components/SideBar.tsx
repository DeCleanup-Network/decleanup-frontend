import Image from 'next/image';
import Level from "@/public/level.svg"

import React from 'react';

const SideBar = () => {
  return (
    <div className="w-full flex flex-col px-2 sm:px-5 pt-12 sm:pt-24" style={{ backgroundColor: '#58b12f' }}>
      {/* Card Header with Image */}
      <div className="relative mb-3 sm:mb-5 border-2 sm:border-4 border-[#ecf110] rounded">
        {/* Top Black Bar with LVL and Progress */}
        <div className="absolute top-0 left-0 right-0 h-10 sm:h-14 bg-black p-2">
          <div className="flex justify-between items-center mb-1 sm:mb-2">
            <span className="text-xs sm:text-sm font-bold text-[#548a3b]">LVL</span>
            <div className="h-[1px] w-[60%] sm:w-[350px] bg-[#548a3b]"></div>
            <span className="text-xs sm:text-sm font-bold text-[#ecf110]">NEWBIE</span>
          </div>
          <div className="flex space-x-2">
            <div className="h-1.5 sm:h-2 flex-1 bg-[#ecf110] rounded"></div>
            <div className="h-1.5 sm:h-2 flex-1 bg-[#ecf110] rounded"></div>
            <div className="h-1.5 sm:h-2 flex-1 bg-gray-800 rounded"></div>
          </div>
        </div>

        {/* Image */}
        <Image
          src={Level}
          alt="Waterfall scene"
          className="w-full h-[300px] sm:h-[500px] object-cover"
        />

        {/* Bottom Black Bar with Evenly Spaced Elements */}
        <div className=" bottom-0 left-0 right-0 h-8 sm:h-12 bg-black flex items-center">
          <div className="w-full px-2 sm:px-4 flex justify-between items-center">
            {/* First section */}
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-sm sm:text-base text-[#ecf110]">2</span>
              <div className="h-[1px] w-2 sm:w-4 bg-[#548a3b]"></div>
              <span className="text-[10px] sm:text-[12px] text-nowrap text-[#548a3b]">IMPACT VALUE</span>
            </div>

            {/* Middle section */}
            <div className="flex items-center">
              <div className="hidden sm:block h-[1px] w-6 bg-[#548a3b]"></div>
              <span className="text-[10px] sm:text-[12px] text-nowrap text-[#ecf110]  decoration-[#548a3b] decoration-1 sm:decoration-2">DECLEANUP NETWORK</span>
              <div className="hidden sm:block h-[1px] w-6 bg-[#548a3b]"></div>
            </div>

            {/* Last section */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] sm:text-[12px] text-nowrap text-[#548a3b]">DCU POINTS</span>
              <div className="h-[1px] w-1 sm:w-4 bg-[#548a3b]"></div>
              <span className="text-sm sm:text-[14px] text-[#ecf110]">20</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex justify-between">
          <span className="font-bold text-lg sm:text-[24px] text-[#101712]">LEVEL</span>
          <span className="font-bold text-lg sm:text-[24px] text-[#ecf110]">NEWBIE</span>
        </div>

        <div className="flex justify-between">
          <span className="font-bold text-lg sm:text-[24px] text-[#101712]">IMPACT VALUE</span>
          <span className="font-bold text-lg sm:text-[24px] text-[#ecf110]">2</span>
        </div>

        <div className="flex justify-between">
          <span className="font-bold text-lg sm:text-[24px] text-[#101712]">RANK</span>
          <span className="font-bold text-lg sm:text-[24px] text-[#ecf110]">7</span>
        </div>

        <div className="flex justify-between">
          <span className="font-bold text-lg sm:text-[24px] text-[#101712]">DCU POINTS</span>
          <span className="font-bold text-lg sm:text-[24px] text-[#ecf110]">29</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;


