import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center'>
      <h1 className='mb-4 text-4xl font-bold'>Welcome to Decleanup Journey!</h1>
      <p className='mb-8 text-lg'>
        Complete all levels and share your achievement!
      </p>
      <Link href='/game'>
        <span className='rounded-lg bg-green-500 px-6 py-3 text-white transition hover:bg-green-600'>
          Go to Game Completion
        </span>
      </Link>
    </div>
  )
}
