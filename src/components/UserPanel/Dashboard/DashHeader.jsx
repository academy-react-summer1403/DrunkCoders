import { Calendar2, Clock } from '@assets/index'
import React from 'react'

export function DashHeader({ data }) {
  const currentDate = new Date()
  const currentTime = new Date()

  const formatedDate = currentDate.toLocaleDateString('fa-IR', {
    timeZone: 'Asia/Tehran',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const formattedTime = currentTime.toLocaleTimeString('fa-IR', {
    timeZone: 'Asia/Tehran',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <header className="flex">
      <p className="text-2xl font-bold">سلام، صبح‌ بخیر {data.fName}</p>

      <section className="mx-auto flex w-[30%] justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-white p-3 dark:bg-black">
            <Clock />
          </div>

          <div>
            <p className="text-gray-500">ساعت</p>
            <p>{formattedTime}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-white p-3 dark:bg-black">
            <Calendar2 />
          </div>
          <div>
            <p className="text-gray-500">تاریخ</p>
            <p className="whitespace-nowrap">{formatedDate}</p>
          </div>
        </div>
      </section>
    </header>
  )
}
