"use client";

import React from "react";
import Image from "next/image";
import { Link as LinkIcon, X, Menu } from "lucide-react"; 
import Link from 'next/link'

export default function NavBar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative bg-white shadow-md rounded-xl mx-4  ">
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/devlink_logo.png"
            alt="devlink logo"
            height={32}
            width={32}
            className="object-contain"
          />
          <h1 className="text-2xl font-bold">devlinks</h1>
        </div>
        <ul className="hidden md:flex items-center gap-4">
          <li className="  ">
            <Link href='/mainLayout/linkPage' className="flex items-center  text-xl text-[#633CFF]  gap-2 px-4 py-2 rounded-md font-semibold  hover:bg-[#EFEBFF] hover:text-[#633CFF] cursor-pointer transition-all">
            <LinkIcon size={20} />

            Links
            </Link>
          </li>
          <li className="px-4 py-2 text-xl rounded-md font-semibold text-[#633CFF] hover:bg-[#EFEBFF] hover:text-[#633CFF] cursor-pointer transition-all">
            <Link href='/mainLayout/profilePage'> @ Profile Details</Link>
           
          </li>
        </ul>
        <button className="hidden md:block px-6 py-2 border border-[#633CFF] text-[#633CFF] font-semibold rounded-lg hover:bg-[#EFEBFF] transition-all">
          Preview
        </button>
      
        <div className="md:hidden cursor-pointer" onClick={handleToggle}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white p-6 shadow-xl rounded-xl z-50 md:hidden flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2 px-4 py-3 rounded-md font-bold text-lg text-[#633CFF]  hover:bg-gray-400 cursor-pointer">
              <LinkIcon size={20} />
              Links
            </li>
            <li className="px-4 py-3 rounded-md font-bold text-lg text-[#633CFF]
            hover:bg-gray-400 cursor-pointer">
              Profile Details
            </li>
          </ul>
          <button className="w-full px-5 py-3 bg-[#633CFF] text-white rounded-lg font-bold hover:bg-[#EFEBFF] transition-all">
            Preview
          </button>
        </div>
      )}
    </nav>
  );
}