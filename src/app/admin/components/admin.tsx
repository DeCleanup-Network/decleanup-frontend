'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface Submission {
  id: number
  submitter: string
  dataURI: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  timestamp: number
}

const AdminPanel = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [processing, setProcessing] = useState(new Set<number>())
  const [error, setError] = useState('')

  const loadSubmissions = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const allMockData: Submission[] = [
        {
          id: 1,
          submitter: '0x1234567890123456789012345678901234567890',
          dataURI: 'ipfs://QmExample1hash',
          status: 'PENDING',
          timestamp: Date.now() - 86400000,
        },
        {
          id: 2,
          submitter: '0x9876543210987654321098765432109876543210',
          dataURI: 'ipfs://QmExample2hash',
          status: 'PENDING',
          timestamp: Date.now() - 172800000,
        },
        {
          id: 3,
          submitter: '0x5555555555555555555555555555555555555555',
          dataURI: 'ipfs://QmExample3hash',
          status: 'APPROVED',
          timestamp: Date.now() - 259200000,
        },
        {
          id: 4,
          submitter: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          dataURI: 'ipfs://QmExample4hash',
          status: 'REJECTED',
          timestamp: Date.now() - 345600000,
        },
        {
          id: 5,
          submitter: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
          dataURI: 'ipfs://QmExample5hash',
          status: 'PENDING',
          timestamp: Date.now() - 432000000,
        },
        {
          id: 6,
          submitter: '0xcccccccccccccccccccccccccccccccccccccccc',
          dataURI: 'ipfs://QmExample6hash',
          status: 'PENDING',
          timestamp: Date.now() - 518400000,
        },
        {
          id: 7,
          submitter: '0xdddddddddddddddddddddddddddddddddddddddd',
          dataURI: 'ipfs://QmExample7hash',
          status: 'APPROVED',
          timestamp: Date.now() - 604800000,
        },
        {
          id: 8,
          submitter: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
          dataURI: 'ipfs://QmExample8hash',
          status: 'PENDING',
          timestamp: Date.now() - 691200000,
        },
      ]

      // Simulate pagination
      const startIndex = page * 5
      const endIndex = startIndex + 5
      const pageData = allMockData.slice(startIndex, endIndex)

      setSubmissions(pageData)
    } catch (err) {
      console.error('Load failed:', err)
      setError('Failed to load submissions')
    }
    setLoading(false)
  }, [page])

  const approve = async (id: number) => {
    if (processing.has(id)) return

    setProcessing(prev => new Set([...prev, id]))
    setError('')

    try {
      // TODO: Replace with real contract call
      // const signer = // get signer
      // const contract = DCUContracts(Networks.ARBITRUM_SEPOLIA).Submission.connect(signer)
      // const tx = await contract.approveSubmission(id)
      // await tx.wait()

      await new Promise(resolve => setTimeout(resolve, 1500))

      setSubmissions(prev =>
        prev.map(sub => (sub.id === id ? { ...sub, status: 'APPROVED' } : sub)),
      )

      console.log(`Approved submission ${id}`)
    } catch (err: unknown) {
      console.error('Approve failed:', err)

      if (
        typeof err === 'object' &&
        err !== null &&
        'message' in err &&
        typeof (err as { message?: unknown }).message === 'string' &&
        (err as { message: string }).message.includes('AlreadyApproved')
      ) {
        setError('Already approved')
      } else {
        setError('Approval failed')
      }
    }

    setProcessing(prev => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const reject = async (id: number) => {
    if (processing.has(id)) return

    if (!confirm('Reject this submission?')) return

    setProcessing(prev => new Set([...prev, id]))

    try {
      // TODO: Replace with real contract call
      // const contract = DCUContracts(Networks.ARBITRUM_SEPOLIA).Submission.connect(signer)
      // const tx = await contract.rejectSubmission(id)
      // await tx.wait()

      await new Promise(resolve => setTimeout(resolve, 1200))

      setSubmissions(prev =>
        prev.map(sub => (sub.id === id ? { ...sub, status: 'REJECTED' } : sub)),
      )
    } catch (err) {
      console.log('Reject failed:', err)
      setError('Rejection failed')
    }

    setProcessing(prev => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const shortAddr = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  const timeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  useEffect(() => {
    loadSubmissions()
  }, [loadSubmissions])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000)
      return () => clearTimeout(timer)
    }
  }, [error])

  return (
    <div className='h-full overflow-y-auto'>
      <div className='border-b-2 border-black p-6'>
        <div className='flex items-center justify-between'>
          <h1 className='font-bebas text-4xl font-bold text-black'>
            SUBMISSION REVIEW
          </h1>
          <Link href='/dashboard'>
            <div className='cursor-pointer rounded bg-black px-4 py-2 font-bebas text-[#FAFF00] hover:bg-gray-800'>
              DASHBOARD
            </div>
          </Link>
        </div>
      </div>

      {error && (
        <div className='mx-6 mt-4 rounded bg-red-500 px-4 py-2 font-bebas text-white'>
          {error}
        </div>
      )}
      <div className='mx-auto my-8 max-w-7xl px-6'>
        {loading ? (
          <div className='py-12 text-center'>
            <p className='font-bebas text-xl text-black'>LOADING...</p>
          </div>
        ) : (
          <>
            <div className='mb-8 space-y-6'>
              {submissions.map(sub => (
                <div
                  key={sub.id}
                  className='rounded border-2 border-black bg-white p-6'
                >
                  <div className='mb-4 flex items-start justify-between'>
                    <div>
                      <h3 className='font-bebas text-2xl font-bold'>
                        SUBMISSION #{sub.id}
                      </h3>
                      <p className='text-sm text-gray-600'>
                        {shortAddr(sub.submitter)} • {timeAgo(sub.timestamp)}
                      </p>
                    </div>
                    <span
                      className={`rounded px-3 py-1 font-bebas text-sm font-bold ${
                        sub.status === 'PENDING'
                          ? 'bg-[#FAFF00] text-black'
                          : sub.status === 'APPROVED'
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>

                  <div className='mb-6'>
                    <h4 className='mb-2 font-bebas text-lg font-bold text-black'>
                      DATA URI:
                    </h4>
                    <p className='break-all rounded bg-gray-100 p-3 font-mono text-sm'>
                      {sub.dataURI}
                    </p>
                  </div>

                  {/* Photos */}
                  <div className='mb-6'>
                    <h4 className='mb-3 font-bebas text-lg font-bold text-black'>
                      CLEANUP PHOTOS:
                    </h4>
                    {/* TODO: Parse dataURI and render actual IPFS images */}
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div>
                        <p className='mb-2 font-bebas text-sm text-gray-600'>
                          BEFORE
                        </p>
                        <div className='flex h-48 items-center justify-center rounded bg-gray-200 text-gray-500'>
                          Before Photo Placeholder
                        </div>
                      </div>
                      <div>
                        <p className='mb-2 font-bebas text-sm text-gray-600'>
                          AFTER
                        </p>
                        <div className='flex h-48 items-center justify-center rounded bg-gray-200 text-gray-500'>
                          After Photo Placeholder
                        </div>
                      </div>
                    </div>
                  </div>
                  {sub.status === 'PENDING' && (
                    <div className='flex gap-4'>
                      <button
                        onClick={() => approve(sub.id)}
                        disabled={processing.has(sub.id)}
                        className='flex-1 rounded bg-[#58B12F] px-6 py-3 font-bebas text-lg text-white hover:bg-green-600 disabled:opacity-50'
                      >
                        {processing.has(sub.id) ? 'APPROVING...' : 'APPROVE'}
                      </button>
                      <button
                        onClick={() => reject(sub.id)}
                        disabled={processing.has(sub.id)}
                        className='flex-1 rounded bg-red-500 px-6 py-3 font-bebas text-lg text-white hover:bg-red-600 disabled:opacity-50'
                      >
                        {processing.has(sub.id) ? 'REJECTING...' : 'REJECT'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className='flex justify-center gap-4 pb-8'>
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0 || loading}
                className='rounded bg-black px-6 py-3 font-bebas text-[#FAFF00] hover:bg-gray-800 disabled:opacity-50 disabled:hover:bg-black'
              >
                PREVIOUS
              </button>
              <span className='flex items-center rounded bg-black px-6 py-3 font-bebas text-[#FAFF00]'>
                PAGE {page + 1}
              </span>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={submissions.length < 5 || loading}
                className='rounded bg-black px-6 py-3 font-bebas text-[#FAFF00] hover:bg-gray-800 disabled:opacity-50 disabled:hover:bg-black'
              >
                NEXT
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
