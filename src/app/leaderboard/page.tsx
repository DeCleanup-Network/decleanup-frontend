import SideBar from './components/SideBar'
import Table from './components/Table'

const LeaderBoard = () => {
  return (
    <div className='flex flex-row w-full bg-[#58b12f] h-[calc(98vh-160px)] min-h-[calc(100vh-160px)]'>
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
