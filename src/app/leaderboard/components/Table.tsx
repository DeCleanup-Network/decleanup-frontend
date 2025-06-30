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
  const itemsPerPage = 10

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

  // Function to truncate user addresses
  const truncateAddress = (address: string) => {
    if (address.length > 15) {
      return `${address.substring(0, 13)}...`
    }
    return address
  }

  return (
    <div className='h-full w-full'>
      <div className='w-full px-0'>
        {loading && <p className='text-center text-white'>Loading...</p>}
        {!loading && (
          <>
            {/* Mobile View with Scrolling - Only visible on small screens */}
            <div className='w-full md:hidden'>
              <div className='max-h-[70vh] overflow-y-auto pb-4'>
                <table className='w-full table-auto border-separate border-spacing-y-3'>
                  <thead className='sticky top-0 z-10 bg-[#ECF9F033]'>
                    <tr className='border-[1px] border-[#ECF9F033] text-black'>
                      <th
                        className='w-[10%] cursor-pointer border-[1px] border-[#ECF9F033] px-1 py-2 text-left text-xs font-normal transition-colors duration-200 hover:bg-[#FAFF00] hover:text-black'
                        onClick={() => handleSort('rank')}
                      >
                        #
                        {sortConfig.key === 'rank'
                          ? sortConfig.direction === 'asc'
                            ? '↑'
                            : '↓'
                          : ''}
                      </th>
                      <th className='w-[30%] px-1 py-2 text-center text-xs'>
                        User
                      </th>
                      <th
                        className='w-[20%] cursor-pointer px-1 py-2 text-center text-xs transition-colors duration-200 hover:bg-[#FAFF00] hover:text-black'
                        onClick={() => handleSort('cleanupsDone')}
                      >
                        Clean
                        {sortConfig.key === 'cleanupsDone'
                          ? sortConfig.direction === 'asc'
                            ? '↑'
                            : '↓'
                          : ''}
                      </th>
                      <th
                        className='w-[20%] cursor-pointer px-1 py-2 text-center text-xs transition-colors duration-200 hover:bg-[#FAFF00] hover:text-black'
                        onClick={() => handleSort('referrals')}
                      >
                        Ref
                        {sortConfig.key === 'referrals'
                          ? sortConfig.direction === 'asc'
                            ? '↑'
                            : '↓'
                          : ''}
                      </th>
                      <th
                        className='w-[20%] cursor-pointer px-1 py-2 text-center text-xs transition-colors duration-200 hover:bg-[#FAFF00] hover:text-black'
                        onClick={() => handleSort('dcuPoints')}
                      >
                        $DCU
                        {sortConfig.key === 'dcuPoints'
                          ? sortConfig.direction === 'asc'
                            ? '↑'
                            : '↓'
                          : ''}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((user, id) => (
                      <tr
                        key={id}
                        className='border-b border-gray-100 bg-[#0000001A] text-xs font-normal'
                      >
                        <td className='w-[10%] bg-[#ECF9F033] px-1 py-2 text-center text-xs font-bold text-black'>
                          {user.rank}
                        </td>
                        <td className='w-[30%] px-1 py-2 text-center text-xs text-[#FAFF00]'>
                          {truncateAddress(user.user)}
                        </td>
                        <td className='w-[20%] px-1 py-2 text-center text-xs text-[#FAFF00]'>
                          {user.cleanupsDone}
                        </td>
                        <td className='w-[20%] px-1 py-2 text-center text-xs font-normal text-[#FAFF00]'>
                          {user.referrals}
                        </td>
                        <td className='w-[20%] px-1 py-2 text-center text-xs font-normal text-[#FAFF00]'>
                          {user.dcuPoints}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Desktop View - Exactly as in original code */}
            <div className='hidden w-full md:block'>
              <table className='w-full table-auto border-separate border-spacing-y-3'>
                <thead className='bg-[#ECF9F033]'>
                  <tr className='border-[1px] border-[#ECF9F033] text-black'>
                    <th
                      className='w-[10%] cursor-pointer border-[1px] border-[#ECF9F033] px-2 py-2 text-left text-xs font-normal transition-colors duration-200 hover:bg-[#FAFF00] hover:text-black md:px-4 md:py-4 md:text-[15px]'
                      onClick={() => handleSort('rank')}
                    >
                      #
                      {sortConfig.key === 'rank'
                        ? sortConfig.direction === 'asc'
                          ? '↑'
                          : '↓'
                        : ''}
                    </th>
                    <th className='w-[30%] px-2 py-2 text-center text-xs md:px-4 md:py-4 md:text-base'>
                      User
                    </th>
                    <th
                      className='w-[20%] cursor-pointer px-2 py-2 text-center text-xs transition-colors duration-200 hover:bg-[#FAFF00] hover:text-black md:px-4 md:py-4 md:text-base'
                      onClick={() => handleSort('cleanupsDone')}
                    >
                      <span className='hidden sm:inline'>Cleanups</span>
                      <span className='sm:hidden'>Clean</span>
                      {sortConfig.key === 'cleanupsDone'
                        ? sortConfig.direction === 'asc'
                          ? '↑'
                          : '↓'
                        : ''}
                    </th>
                    <th
                      className='w-[20%] cursor-pointer px-2 py-2 text-center text-xs transition-colors duration-200 hover:bg-[#FAFF00] hover:text-black md:px-4 md:py-4 md:text-base'
                      onClick={() => handleSort('referrals')}
                    >
                      <span className='hidden sm:inline'>Refs</span>
                      <span className='sm:hidden'>Ref</span>
                      {sortConfig.key === 'referrals'
                        ? sortConfig.direction === 'asc'
                          ? '↑'
                          : '↓'
                        : ''}
                    </th>
                    <th
                      className='w-[20%] cursor-pointer px-2 py-2 text-center text-xs transition-colors duration-200 hover:bg-[#FAFF00] hover:text-black md:px-4 md:py-4 md:text-base'
                      onClick={() => handleSort('dcuPoints')}
                    >
                      <span className='hidden sm:inline'>$DCU</span>
                      <span className='sm:hidden'>$DCU</span>
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
                      className='border-b border-gray-100 bg-[#0000001A] text-xs font-normal md:text-[15px]'
                    >
                      <td className='w-[10%] bg-[#ECF9F033] px-2 py-2 text-center text-xs font-bold text-black md:px-4 md:py-4 md:text-base'>
                        {user.rank}
                      </td>
                      <td className='w-[30%] px-2 py-2 text-center text-xs text-[#FAFF00] md:px-4 md:py-4 md:text-[1.15rem]'>
                        {user.user}
                      </td>
                      <td className='w-[20%] px-2 py-2 text-center text-xs text-[#FAFF00] md:px-4 md:py-4 md:text-[1.1rem]'>
                        {user.cleanupsDone}
                      </td>
                      <td className='w-[20%] px-2 py-2 text-center text-xs font-normal text-[#FAFF00] md:px-4 md:py-4 md:text-[15px]'>
                        {user.referrals}
                      </td>
                      <td className='w-[20%] px-2 py-2 text-center text-xs font-normal text-[#FAFF00] md:px-4 md:py-4 md:text-[15px]'>
                        {user.dcuPoints}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Pagination Controls - Now only visible on desktop */}
      {!loading && (
        <div className='mt-4 hidden w-full items-center justify-center gap-1 sm:gap-2 md:flex md:gap-4'>
          <button
            className='rounded-md border-2 border-transparent bg-[#FAFF00] px-2 py-1 text-xs text-black transition-all duration-200 hover:border-black hover:bg-green-500 disabled:opacity-50 md:px-4 md:py-2 md:text-base'
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className='text-xs text-black md:text-base'>
            {currentPage}/{totalPages}
          </span>
          <button
            className='rounded-md border-2 border-transparent bg-[#FAFF00] px-2 py-1 text-xs text-black transition-all duration-200 hover:border-black hover:bg-green-500 disabled:opacity-50 md:px-4 md:py-2 md:text-base'
            onClick={() =>
              setCurrentPage(prev => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
