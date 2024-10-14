import React from 'react'
import { Rating } from "@components";

export function MainContent({course}) {
  return (
    <>
      <img src={course.imageAddress} alt="" className='bg-[#FF9090] w-full h-96 rounded-3xl'/>
      <p className='text-gray-400'>مدرس</p>
      <div className='flex md:flex-row flex-col gap-[10%]'>
        <div className='flex  gap-2 items-center'>
          <img src="" alt="" className="rounded-full w-10 h-10 bg-gray-300" />
          <span>
            {course.teacherName}
            {/* <br />
          <span className='text-sm text-gray-400'>سنیور فرانت اند</span> */}
          </span>
        </div>
        {/* <div className='flex gap-2 items-center'>
          <img src="" alt="" className="rounded-full w-10 h-10 bg-gray-300" />
          <span>
            مهدی اصغری
            <br />
          <span className='text-sm text-gray-400'>سنیور فرانت اند</span>
          </span>
        </div> */}
      </div>
      <div className="flex flex-col gap-6 mt-4" >
        <span className="text-gray-500">
          توضیحات
        </span>
        <h1 className="font-bold text-xl">
          {course.title}
        </h1>
        <p>
          {course.describe}
        </p>

        <Rating/>
        
        
      </div>
    </>
  )
}
