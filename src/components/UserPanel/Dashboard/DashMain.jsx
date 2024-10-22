import React from 'react'
import {PencilEdit } from '@assets/index'
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { CircularProgress } from '@nextui-org/react'

export function DashMain({data}) {
      const profileCompletion = data.profileCompletionPercentage ;
  return (
    <main className='flex h-[266px] gap-8' >
    <div className='w-[45%] h-full rounded-2xl bg-white p-3 dark:bg-black'> 
      <header className='flex justify-between'>
        <div>نظرات‌ شما</div>
        <div className='text-primary-500 cursor-pointer'>
          مشاهده همه
        </div>
      </header>
    </div>
    <div>
      <Calendar
        className='dark:bg-gray-400'
        calendar={persian}
        locale={persian_fa}
     />
    </div>
    <div className='flex flex-col bg-white dark:bg-black flex-1 rounded-2xl p-2 justify-center items-center'>
      <header className='self-start justify-self-start flex gap-40'>
        <p>وضعیت اطلاعات حساب </p>
        <div className='text-primary'>
          <PencilEdit/>
        </div>
      </header>
      <CircularProgress
        classNames={{
          svg: "w-48 h-48 drop-shadow-md",
          indicator: "stroke-primary",
          track: "stroke-primary/10",
          value: "text-3xl font-semibold text-primary",
        }}
        value={profileCompletion}
        strokeWidth={3}
        showValueLabel={true}
      />
        {profileCompletion === 100 ? (
          <p className="text-primary">اطلاعات حساب‌کابری شما تکمیل است</p>
        ) : (
          <p className="text-warning">اطلاعات حساب‌کابری شما تکمیل نیست</p>
        )}

    </div>
  </main>

  )
}
