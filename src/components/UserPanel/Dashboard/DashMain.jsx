import React from 'react'
import {PanelIndicator, PencilEdit } from '@assets/index'
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { CircularProgress } from '@nextui-org/react'
import { useSelector } from 'react-redux'

export function DashMain({data}) {
      const profileCompletion = data.profileCompletionPercentage ;
      const darkMode = useSelector((state) => state.darkMode.darkMode)

  return (
    <main className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8' >
    <div className=' w-full h-full rounded-2xl bg-white p-3 dark:bg-black'> 
      <header className='flex justify-between'>
        <div>نظرات‌ شما</div>
        <div className='text-primary-500 cursor-pointer flex items-center'>
           مشاهده همه
           <PanelIndicator/>
        </div>
      </header>
    </div>
    <div className='-order-1 md:order-none'>
      <Calendar
        calendar={persian}
        locale={persian_fa}
        monthYearSeparator="،"
        className={`mx-auto mt-3 ${darkMode ? 'bg-dark' : ''}`}
     />
    </div>
    <div className='md:flex flex-col bg-white dark:bg-black flex-1 rounded-2xl p-2 justify-center items-center hidden'>
      <header className='self-start justify-self-start flex justify-between'>
        <p>وضعیت اطلاعات حساب </p>
        <div className='text-primary'>
          <PencilEdit/>
        </div>
      </header>
      <CircularProgress
      classNames={{
        svg: "w-48 h-48 drop-shadow-md",
        indicator: profileCompletion === 100 ? 'stroke-primary' : 'stroke-warning',
        track: profileCompletion === 100 ? 'stroke-primary/10' : 'stroke-warning/10',
        value:  profileCompletion === 100 ? "text-3xl font-semibold text-primary": "text-3xl font-semibold text-warning",
      }}
      value={profileCompletion}
      strokeWidth={3}
      showValueLabel={true}
      />
      {profileCompletion === 100 ? (
        <p className="text-primary">اطلاعات حساب‌کاربری شما تکمیل است</p>
      ) : (
        <p className="text-warning">اطلاعات حساب‌کاربری شما تکمیل نیست</p>
      )}


    </div>
  </main>

  )
}
