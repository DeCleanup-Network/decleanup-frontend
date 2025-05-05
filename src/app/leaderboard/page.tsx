import SideBar from './components/SideBar'
import Table from './components/Table'

const LeaderBoard = () => {
  return (
    <div className='flex h-[calc(95vh-160px)] min-h-[calc(98vh-160px)] w-full flex-col bg-[#58b12f] lg:flex-row lg:px-0'>
      <div className='my-2 border-b border-black px-3 py-4 lg:w-[30%] lg:border-0 lg:px-0'>
        <SideBar />
      </div>

      <div className='px-3 lg:w-[70%] lg:px-0'>
        <Table />
      </div>
    </div>
  )
}

export default LeaderBoard
