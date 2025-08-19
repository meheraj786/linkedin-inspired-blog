import React from 'react'
import { FaLinkedin } from 'react-icons/fa'
import Flex from './Flex'
import LinkedinLogo from '../assets/linkedinLogo.svg'
import { Link } from 'react-router'

const LogoLarge = ({className}) => {
  return (
    <Link to="/">
    <div className={`w-[41px] border ${className}`}>
      <img className='w-[41px]' src={LinkedinLogo} alt="" />
    </div>
    </Link>
  )
}

export default LogoLarge