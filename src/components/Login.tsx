'use client'

const Login: React.FC = () => {
  return (
    <div className='flex flex-col' style={{ backgroundColor: '#58b12f' }}>
      <hr className='my-4 w-full border-t-2 border-black' />

      {/* Main Content */}
      <div className='flex flex-col items-center'>
        <h2
          className='mb-4 px-4 text-center text-2xl font-bold md:text-4xl lg:text-6xl xl:text-8xl'
          style={{
            whiteSpace: 'normal',
            maxWidth: '100%',
            wordBreak: 'break-word',
            lineHeight: '1.2',
          }}
        >
          DECLEANUP REWARDS
        </h2>

        <hr className='my-4 w-full border-t-2 border-black' />

        <div className='flex flex-col items-center text-center'>
          <p className='mb-4 bg-[#FAFF00] p-2 text-base font-bold md:text-lg lg:text-xl xl:text-2xl'>
            FIRST DAPP TO SELF-TOKENIZE ENVIRONMENTAL CLEANUP EFFORTS
          </p>
          <p
            className='mb-6 font-bebas text-base font-normal md:text-3xl lg:text-3xl xl:text-4xl'
            style={{ lineHeight: '1' }}
          >
            APPLY WITH YOUR CLEANUP RESULTS TO RECEIVE A DECLEANUP IMPACT
            PRODUCT, PROGRESS THROUGH LEVELS AND EARN POINTS, REDEEMABLE IN THE
            FUTURE
          </p>
        </div>

        <hr className='my-4 w-full border-t-2 border-black' />

        <div className="w-full px-4">
          <button
            className='w-full rounded bg-black py-2 font-bold text-yellow-500 hover:bg-gray-800'
            style={{
              fontSize: 'clamp(24px, 5vw, 40px)',
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
