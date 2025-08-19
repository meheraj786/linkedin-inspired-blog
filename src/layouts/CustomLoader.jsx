import React from 'react'
import LogoLarge from './LogoLarge'
import { BarLoader } from 'react-spinners'
import { createPortal } from 'react-dom'

const CustomLoader = () => {
  return createPortal(
    <div className='w-full h-full absolute bg-white top-0 gap-y-4 flex flex-col justify-start pt-40 items-center left-0'>
      <LogoLarge/>
      <BarLoader color="#0A66C2" />
    </div>,
    document.body
  )
}

export default CustomLoader