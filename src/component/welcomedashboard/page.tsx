import Link from 'next/link'
import React from 'react'

export default function WellCome() {
  return (
    <div>
         <section
          className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/devlink_wallpapper.jfif')",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Content */}
          <div className="relative z-10 text-center text-white max-w-3xl px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to <span className="text-blue-400">Devlink Limited</span>
            </h1>

            <p className="text-lg md:text-xl mb-8 text-gray-200">
              We build modern, scalable, and high-performance digital solutions
              that help businesses grow, stand out, and succeed in the digital
              world.
            </p>

            <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 transition c-pointer rounded-full text-lg font-semibold">
             <Link href='/login'>
              Get Started
             </Link>
            </button>
          </div>
        </section>
    </div>
  )
}
