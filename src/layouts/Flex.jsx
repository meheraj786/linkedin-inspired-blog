import React from 'react'

const Flex = ({children, className}) => {
  return (
    <div className={`flex flex-wrap justify-between items-start ${className}`}>{children}</div>
  )
}

export default Flex