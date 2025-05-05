interface ProgressProps {
  value: number
}

const Progress: React.FC<ProgressProps> = ({ value }) => (
  <div className='h-4 w-full rounded-none bg-[#111111]'>
    <div
      className='h-4 rounded-none bg-[#FAFF00] transition-all'
      style={{ width: `${value}%` }}
    />
  </div>
)

export default Progress
