'use client'

import { useState, useEffect } from 'react'
import LeaderBoardData from '../data/LeaderboardData'

type LeaderboardEntry = {
  rank: number
  user: string
  cleanupsDone: number
  referrals: number
  dcuPoints: number
}

export default function Table() {
  const [data, setData] = useState<LeaderboardEntry[]>([])
  const [sortConfig, setSortConfig] = useState<{
    key: keyof LeaderboardEntry | null
    direction: 'asc' | 'desc'
  }>({
    key: null,
    direction: 'asc',
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 9

  useEffect(() => {
    setTimeout(() => {
      setData(LeaderBoardData)
      setLoading(false)
    }, 1000)
  }, [])

  const handleSort = (key: keyof LeaderboardEntry) => {
    if (loading) return
    setLoading(true)

    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
      return 0
    })

    setTimeout(() => {
      setData(sortedData)
      setSortConfig({ key, direction })
      setLoading(false)
    }, 500)
  }

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className=' bg-[#58b12f] h-full'>
      <div className='mx-auto w-full  overflow-x-auto px-5'>
        {loading && <p className='text-center text-white'>Loading...</p>}
        {!loading && (
          <>
            <table className='table-auto border-separate border-spacing-y-3'>
              <thead className='bg-[#ECF9F033]'>
                <tr className='border-[1px] border-[#ECF9F033] text-[#31591F]'>
                  <th
                    className='w-14 cursor-pointer border-[1px] border-[#ECF9F033] px-6 py-4 text-left text-[15px] font-normal transition-colors duration-200 hover:bg-[#FAFF00] hover:text-black'
                    onClick={() => handleSort('rank')}
                  >
                    Rank{' '}
                    {sortConfig.key === 'rank'
                      ? sortConfig.direction === 'asc'
                        ? '↑'
                        : '↓'
                      : ''}
                  </th>
                  <th className='w-[323px] px-6 py-4 text-center'>User</th>
                  <th
                    className='w-[222px] cursor-pointer px-6 py-4 text-left transition-colors duration-200 hover:bg-[#FAFF00] hover:text-black'
                    onClick={() => handleSort('cleanupsDone')}
                  >
                    Cleanups Done{' '}
                    {sortConfig.key === 'cleanupsDone'
                      ? sortConfig.direction === 'asc'
                        ? '↑'
                        : '↓'
                      : ''}
                  </th>
                  <th
                    className='w-[222px] cursor-pointer px-6 py-4 text-center transition-colors duration-200 hover:bg-[#FAFF00] hover:text-black'
                    onClick={() => handleSort('referrals')}
                  >
                    Referrals{' '}
                    {sortConfig.key === 'referrals'
                      ? sortConfig.direction === 'asc'
                        ? '↑'
                        : '↓'
                      : ''}
                  </th>
                  <th
                    className='w-[222px] cursor-pointer px-6 py-4 text-center transition-colors duration-200 hover:bg-[#FAFF00] hover:text-black'
                    onClick={() => handleSort('dcuPoints')}
                  >
                    Total $DCU points{' '}
                    {sortConfig.key === 'dcuPoints'
                      ? sortConfig.direction === 'asc'
                        ? '↑'
                        : '↓'
                      : ''}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((user, id) => (
                  <tr
                    key={id}
                    className='border-b border-gray-100 bg-[#0000001A] text-[15px] font-normal'
                  >
                    <td className='w-14 bg-[#ECF9F033] px-6 py-4 text-base text-[#31591F]'>
                      {user.rank}
                    </td>
                    <td className='w-[323px] px-6 py-4 text-center text-[1.15rem] text-[#FAFF00]'>
                      {user.user}
                    </td>
                    <td className='w-[222px] px-6 py-4 text-left text-[1.1rem] text-[#FAFF00]'>
                      {user.cleanupsDone}
                    </td>
                    <td className='w-[222px] px-6 py-4 text-[15px] font-normal text-[#FAFF00]'>
                      {user.referrals}
                    </td>
                    <td className='w-[222px] px-6 py-4 text-[15px] font-normal text-[#FAFF00]'>
                      {user.dcuPoints}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      <div className=' flex w-full items-center justify-center gap-4'>
        <button
          className='rounded-md border-2 border-transparent bg-[#FAFF00] px-4 py-2 text-black transition-all duration-200 hover:border-black hover:bg-green-500 disabled:opacity-50'
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className='text-black'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className='rounded-md border-2 border-transparent bg-[#FAFF00] px-4 py-2 text-black transition-all duration-200 hover:border-black hover:bg-green-500 disabled:opacity-50'
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}
