import { promises } from 'dns'
import Link from 'next/link'
interface HeaderProps {
  connectWallet: () => Promise<void>
}

const Header: React.FC = () => {
  return (
    <div className='bg-[#58B12F] px-2 flex justify-between items-center rounded-t-xl font-bebas'>
      <p className="bg-[#FAFF00] text-[36.82px]">DECLEANUP NETWORK</p>
      <p className="text-[36.82px]">CLEANUP, SNAP, EARN</p>
    </div>
  )
}

export default Header
