import SideBar from './components/SideBar'
import Table from './components/Table'

const LeaderBoard = () => {
  return (
    <div className='flex flex-row w-full bg-[#58b12f] '>
      <div className='w-[30%]  py-4 '>
      <SideBar />
      </div>
    
      <div className='w-[70%]'>
        <Table />
      </div>
    </div>
  )
}

export default LeaderBoard
