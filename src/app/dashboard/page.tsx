import IsolationMode from "@/./public/Isolation_Mode.png";
import Image from "next/image";
export default function Page(){
    return(
        <div className="bg-[#58B12F] my-[1px] p-4 font-bebas">
            <div className="flex justify-between items-start px-2">
                <div className="flex flex-col w-[335px]">
                    <StreakBox />
                    <div className="flex flex-col space-y-1 mt-4">
                        <div className="border-b border-b-black flex justify-between items-center">
                            <p className='text-[24px]'>CLEANUPS DONE</p>
                            <p className="text-[24px] text-[#FAFF00]">10</p>
                        </div>
                        <div className="border-b border-b-black flex justify-between items-center">
                            <p className="text-[24px]">REFERRALS </p>
                            <p className="text-[24px] text-[#FAFF00]">19</p>
                        </div>
                        <div className="border-b  border-b-black flex justify-between items-center">
                            <p className="text-[24px]">STREAK</p>
                            <p className="text-[24px] text-[#FAFF00]">10</p>
                        </div>
                        <div className="border-b  border-b-black flex justify-between items-center">
                            <p className="text-[40px]">TOTAL $DCU</p>
                            <p className="text-[40px] text-[#FAFF00]">39</p>
                        </div>
                            <p className="text-right underline">LEARN HOW TO EARN $DCU</p>
                        
                    </div>
                    <div className="mt-24">
                            <LongButton text="LEADERBOARD" />
                    </div>
                    <div className="mt-24">
                    <p className="text-right underline">EARN MORE $DCU TOGETHER!</p>
                            <LongButton text="LEADERBOARD" />
                    </div>
                </div>
                <div className="w-[454px]">
                    <div className="w-full border-4 border-black py-2 px-12 bg-[#51A12C] h-[402px]">
                        <div className="border-4 border-[#FAFF00] flex flex-col">
                            <div className="bg-black">
                                <div className="flex space-x-1 items-center px-1">
                                    <p className="text-[#58B12F] text-[13.56px]">
                                        LVL
                                    </p>
                                    <div className="w-full h-[3px] bg-[#58B12F] " />
                                    <p className="text-[#FAFF00] text-[21.7px]">NEWBIE</p>
                                </div>
                                <div className="flex space-x-2 w-full mb-2">
                                    <div className="h-[3.55px] w-full bg-[#FAFF00]"></div>
                                    <div className="h-[3.55px] w-full bg-[#FAFF00] opacity-50"></div>
                                    <div className="h-[3.55px] w-full bg-[#FAFF00] opacity-50"></div>
                                </div>
                            </div>
                            <div className="w-full h-[291px]">
                                <Image src={IsolationMode} alt="" className="w-full h-full"/>
                            </div>
                            <div className="flex justify-between items-center px-1 text-[#FAFF00] text-[13.56px] bg-black">
                                <p>DECLEANUP NETWORK</p>
                                <p>CLEANUP, SNAP, EARN</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-4">
                        <div className="flex justify-between items-center w-full text-[24px]">
                            <p className="text-black">LEVEL</p>
                            <p className="text-[#FAFF00]">NEWBIE</p>
                        </div>
                        <div className="flex justify-between items-center w-full text-[24px] mt-[-2px]">
                        <p className="text-black">IMPACT VALUE</p>
                        <p className="text-[#FAFF00]">2</p>
                        </div>
                    </div>
                    <div className="w-full mt-2 flex flex-col space-y-2">
                        <LongButton text="APPLY WITH CLEANUP" />
                        <LongButton text="CLAIM NEXT LEVEL" isNotBlack/>
                    </div>
                </div>
                <div className="flex flex-col space-y-2 w-[337px]">
                <LongButton text="CREATE IMPACT CIRCLE" isNotBlack/>
                <LongButton text="JOIN IMPACT CIRCLE" isNotBlack/>
                <LongButton text="BECOME VERIFIER" isNotBlack/>
                <LongButton text="CLAIM STAKE" isNotBlack/>
                </div>
            </div>
        </div>
    )
}

function StreakBox(){
    return(
        <div className="bg-black p-1 flex w-full h-[61px]">
            <div className="bg-black p-5 flex justify-center items-center">
            <svg width="33" height="36" viewBox="0 0 33 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.4445 21.6724L12.0662 25.8245C10.9151 26.9371 10.2778 28.3873 10.2778 29.9369C10.2778 33.1554 13.0528 35.7778 16.4445 35.7778C19.8361 35.7778 22.6111 33.1554 22.6111 29.9369C22.6111 28.3873 21.9739 26.9172 20.8228 25.8245L16.4445 21.6724Z" fill="#FAFF00"/>
<path d="M24.6666 7.96428L23.7621 9.05696C21.3366 11.9774 16.4444 10.3284 16.4444 6.57361V0.0175781C16.4444 0.0175781 0 7.96428 0 21.871C0 27.6721 3.20665 32.7381 7.99608 35.4996C6.84497 33.9301 6.16664 32.0031 6.16664 29.9369C6.16664 27.3145 7.23553 24.851 9.1883 22.9836L16.4444 16.1097L23.7005 23.0034C25.6532 24.851 26.7221 27.3145 26.7221 29.9568C26.7221 31.9832 26.0849 33.8507 24.9749 35.4202C28.8599 33.1355 31.7377 29.3409 32.601 24.8908C33.9577 17.8381 30.4016 11.1827 24.6666 7.96428Z" fill="#FAFF00"/>
</svg>

            </div>
            <div className="bg-[#58B12F] w-full flex justify-start items-center px-2">
                <p className="text-[40px]">24 WEEKS STREAK</p>
            </div>
        </div>
    )
}

interface LongButtonProps{
    text: string;
    isNotBlack?: boolean;
}   
function LongButton({text, isNotBlack}: LongButtonProps){
    return(
        <button className={isNotBlack ? `block bg-[#1E8428] opacity-50 w-full  text-black text-center text-[40px] h-[60px]` :  `block bg-black w-full text-center text-[#FAFF00] text-center text-[40px] h-[60px]`}>{text}</button>
    )
}
