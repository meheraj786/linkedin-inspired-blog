import React from 'react'
import { FaLinkedin } from 'react-icons/fa'

const LogoSmall = ({className}) => {
  return (
    <FaLinkedin  className={`text-primary text-[38px] ${className}`} />
  )
}

export default LogoSmall