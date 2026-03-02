import React from 'react'
import Image from 'next/image'

export default function Logo() {
  return (
    <div>
       <div className="flex item-center gap-1 text-center my-10 justify-center">
        <Image 
        src='/devlink_logo.png'
        alt='devlink limited logo'
        quality={100, 75}
        height={40}
        width={40}
        />
        <h1 className='text-4xl font-bold  font-600'>devlinks</h1>
     </div>
    </div>
  )
}
