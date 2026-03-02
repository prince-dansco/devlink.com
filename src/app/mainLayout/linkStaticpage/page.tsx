import React from "react";
import Image from "next/image";

export default function LinKPage() {
  return (
    <div>
      <div className=" bg-gray-200 flex items-center text-center justify-center  flex-col gap-3 py-9">
        <Image
          src="/devlink_home.svg"
          alt="for static profile"
          quality={75}
          height={100}
          width={100}
          className="object-contain  w-[180px] "
        />

        <div className="">
          <h2 className="text-2xl font-bold mt-2  mb-3">Lets get started</h2>
          <p className="w-[380px] mx-auto  text-xs font-semibold">
            Use the <q>Add new link</q> button to get started. Once you have more
            than one link, you can reorder and edit them. We are here to help you
            share your profiles with everyone!
          </p>
        </div>
      </div>
    </div>
  );
}
