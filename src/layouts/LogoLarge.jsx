import React from 'react'
import { FaLinkedin } from 'react-icons/fa'
import Flex from './Flex'
import LinkedinLogo from '../assets/linkedinLogo.svg'

const LogoLarge = ({className}) => {
  return (
    <div className={`w-[141px] ${className}`}>
      <img className='w-full' src={LinkedinLogo} alt="" />

    </div>
  )
}

export default LogoLarge