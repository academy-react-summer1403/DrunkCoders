import React from 'react'
import { Button } from '@components'

export function CourseDContainer() {
  return (
    <>
    <div className='mt-4 border-3 rounded-3xl h-screen gap-[10%]'>
      <div className='mt-12 flex'>
        
        <div className='flex flex-col w-[40%] border-3 rounded-3xl p-3 h-fit'>
            <div className='w-fit flex items-center gap-2 rounded-xl bg-[#FFD1CB] px-2 py-1 text-xs text-[#FF5454]'>
              <div className='h-2 w-2 rounded-full bg-[#FF5454]'></div>
              <span> درحال برگزاری </span>
            </div>
            <h1 className='text-2xl font-bold mt-5'>ری‌اکت جی‌اس</h1>
            <div className='flex gap-2 w-fit'>
            <Button className='font-xs' >برنامه نویسی</Button>
            <Button>مبتدی</Button>
            </div>
        </div>
        <div className='w-[50%] '></div>
      </div>
    </div>
    </>
  )
}
