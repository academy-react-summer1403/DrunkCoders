import { Calendar2, Clock, HidePassword, PencilEdit } from '@assets/index'
import React, { useState } from 'react'
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { CircularProgress, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react'

export function DashboardPage() {
  return (
    <div className='flex flex-col gap-5'>
      <header className="flex justify-between">
        <p className='text-2xl font-bold'>سلام، صبح‌ بخیر پارسا</p>

        <section className='flex justify-between w-[30%]'>
          <div className='flex items-center gap-2'>
            <div className='p-3 bg-white rounded-full'>
              <Clock/>
            </div>

            <div>
            <p className='text-gray-500'>ساعت</p>
            <p>09:21</p> 
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='p-3 bg-white rounded-full'>
              <Calendar2/>
            </div>
            <div>
              <p className='text-gray-500'>تاریخ</p>
              <p>20 اردیبهشت 1403</p> 
            </div>
          </div>
        </section>

        <div></div>
      </header>
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
            <div className='text-primary-600'>
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
            value={70}
            strokeWidth={3}
            showValueLabel={true}
          />
          <p className='text-primary-600'>
          اطلاعات حساب‌کابری شما تکمیل است
          </p>
        </div>
      </main>
      <Table>
        <TableHeader>
          <TableColumn>نام دوره</TableColumn>
          <TableColumn>درباره دوره</TableColumn>
          <TableColumn>اساتید دوره</TableColumn>
          <TableColumn>تاریخ برگزاری</TableColumn>
          <TableColumn>قیمت دوره</TableColumn>
          <TableColumn></TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className='max-w-8 text-lg'>ری‌اکت جی‌اس</TableCell>
            <TableCell className='max-w-8 text-ellipsis whitespace-nowrap overflow-hidden ml-2 text-gray-500'>
              آموزش صفر تا صد کتابخانه پرطرفدار جی‌اس یعنی ری‌اکت همراه تسک های مفید برای یادگیری بهتر</TableCell>
            <TableCell className='max-w-8 text-ellipsis whitespace-nowrap overflow-hidden ml-2'>
            محسن اسفندیاری ، مهدی اصغری
            </TableCell>
            <TableCell className='max-w-8'>
              25 اردیبهشت 1403
            </TableCell>
            <TableCell className='max-w-8 text-xl'>
            1،800،000تومان
            </TableCell>
            <TableCell>
              <Tooltip content='مشاهده'>
                <span>
                  <HidePassword />
                </span>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

    </div>
  )
}
