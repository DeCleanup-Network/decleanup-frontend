import React, { ChangeEvent } from 'react'
import { useCleanupContext } from '@/context/ContextApi'
const SocialConsentCheckbox = () => {
  const { checkBox, setCheckBox } = useCleanupContext()

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckBox(e.target.checked)
  }

  return (
    <div className='flex flex-row items-baseline'>
      <input
        type='checkbox'
        className='h-4 w-4'
        checked={checkBox}
        onChange={handleCheckboxChange}
      />
      <p className='ml-2 font-bebas text-lg font-normal md:text-xl lg:text-2xl'>
        Agree if you allow us to post your pictures on social platforms (X,
        Telegram)
      </p>
    </div>
  )
}

export default SocialConsentCheckbox
