'use client'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isConnected, address } = useAccount()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkAdmin = async () => {
      if (!isConnected) {
        router.push('/')
        return
      }

      try {
        // TODO: Replace with actual admin whitelist check
        // For now just let everyone through if connected
        setIsAdmin(true)
      } catch (err) {
        console.log('Admin check failed:', err)
        router.push('/')
      }
      setChecking(false)
    }

    checkAdmin()
  }, [isConnected, address, router])

  // Still checking permissions
  if (checking) {
    return (
      <div className='flex h-full items-center justify-center'>
        <p className='font-bebas text-2xl text-black'>CHECKING ACCESS...</p>
      </div>
    )
  }

  // Not admin, kick them out
  if (!isAdmin) {
    return (
      <div className='flex h-full items-center justify-center'>
        <div className='text-center'>
          <h1 className='mb-4 font-bebas text-5xl font-bold text-black'>
            ACCESS DENIED
          </h1>
          <p className='mb-6 font-bebas text-xl text-black'>
            ADMIN ROLE REQUIRED
          </p>
          <Link href='/'>
            <div className='cursor-pointer rounded bg-black px-6 py-3 font-bebas text-lg text-[#FAFF00] hover:bg-gray-800'>
              BACK TO HOME
            </div>
          </Link>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
