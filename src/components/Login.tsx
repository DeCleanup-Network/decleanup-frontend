'use client'

const Login: React.FC = () => {
  return (
    <div className='flex flex-col h-screen md:h-full bg-[#58b12f]' >
    <hr className='my-4 w-full border-t-2 border-black' />
  
    {/* Main Content */}
    <div className='flex flex-col items-center px-4'>
      {/* Heading */}
      <h2
        className='mb-4 text-center text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl max-w-full leading-3 whitespace-normal p-2'
      >
        DECLEANUP REWARDS
      </h2>
  
      <hr className='my-4 w-full border-t-2 border-black' />
  
      {/* Subheading and Description */}
      <div className='flex flex-col items-center text-center py-5'>
        <p className='mb-4 bg-[#FAFF00] p-2 text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'>
          FIRST DAPP TO SELF-TOKENIZE ENVIRONMENTAL CLEANUP EFFORTS
        </p>
        <p
          className='mb-6 font-bebas text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'
          style={{ lineHeight: '1.2' }}
        >
          APPLY WITH YOUR CLEANUP RESULTS TO RECEIVE A DECLEANUP IMPACT PRODUCT,
          PROGRESS THROUGH LEVELS AND EARN POINTS, REDEEMABLE IN THE FUTURE
        </p>
      </div>
  
      <hr className='my-4 w-full border-t-2 border-black' />
  
      {/* Connect Wallet Button */}
      <div className="w-full  px-4">
        <button
          className='w-full rounded bg-black py-3 font-bold text-yellow-500 hover:bg-gray-800'
          style={{
            fontSize: 'clamp(20px, 5vw, 32px)',
            color: '#FAFF00',
            margin: '10px 0',
          }}
        >
          CONNECT WALLET
        </button>
      </div>
  
      <hr className='my-2 w-full border-t-2 border-black' />
    </div>
  </div>
  )
}

export default Login
