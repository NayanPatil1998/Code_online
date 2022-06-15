import Image from 'next/image'
import React from 'react'

interface NavbarProps {}

const Navbar : React.FC<NavbarProps> = ({}) => {
  return (
    <div className='flex h-20 items-center justify-center w-full '>
      <Image width={50} height={50} src="/logo-white.png" />
      <h1 className="font-bold text-xl" >Code Online</h1>
    </div>
  )
}

export default Navbar
