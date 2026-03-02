import React from 'react'
import Image from "next/image";

export default function StaticImage() {
  return (
    <div>
       <div className="hidden lg:flex max-w-[600px] w-full max-h-[834px] items-center justify-center bg-white rounded-xl shadow-sm">
          <Image 
            src='/devlink_data.png'
            alt='data profile'
            className="w-[450px] h-auto object-contain"
            height={100}
            width={100}
            quality={100}
          />
        </div>
    </div>
  )
}
