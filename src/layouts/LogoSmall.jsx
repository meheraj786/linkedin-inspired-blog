import React from 'react'
import { FaLinkedin } from 'react-icons/fa'
import { Link } from 'react-router'

const LogoSmall = ({className}) => {
  return (
    <Link to="/">
    <FaLinkedin  className={`text-primary text-[38px] ${className}`} />
    </Link>
  )
}

export default LogoSmall