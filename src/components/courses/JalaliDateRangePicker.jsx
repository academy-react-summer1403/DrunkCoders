// JalaliDateRangePicker
import React, { useState } from 'react'
import { Calendar, DateObject } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import persian_en from 'react-date-object/locales/persian_en'
import { BaseInput, IconLabel } from '@components/index'
import { Calendar2, Cancel } from '@assets/index'
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css'
import { useSelector } from 'react-redux'

export function JalaliDateRangePicker() {
  /* const [values, setValues] = useState([
    new DateObject().subtract(4, 'days'),
    new DateObject().add(4, 'days'),
  ]) */
  const [values, setValues] = useState(null)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const darkMode = useSelector((state) => state.darkMode.darkMode)

  // console.log(values[0].convert(persian, persian_en).format())

  const formattedValue = `${values && values[0] ? values[0].convert(persian, persian_en).format() : 'انتخاب کنید'}  -  ${values && values[1] ? values[1].convert(persian, persian_en).format() : 'انتخاب کنید'}`

  function handleDeleteSelection() {
    setValues(null)
    setIsCalendarOpen(false)
  }

  return (
    <div className="w-full">
      <BaseInput
        label={<IconLabel icon={Calendar2} label="تاریخ برگزاری" />}
        placeholder={formattedValue}
        size="lg"
        type="text"
        className="mb-0"
        classNames={{
          input: 'ltr ',
        }}
        // value={formattedValue}
        onFocus={() => setIsCalendarOpen(true)}
        isReadOnly
        starIcon={DeleteSelection}
      />
      {isCalendarOpen && (
        <div>
          <Calendar
            value={values}
            onChange={(values) => {
              setValues(values)
              if (values[1] && values[0].format() !== values[1].format()) {
                setIsCalendarOpen(false)
              }
            }}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom"
            monthYearSeparator="،"
            className={`mx-auto mt-4 ${darkMode ? 'bg-dark' : ''}`}
            range
            rangeHover
          />
        </div>
      )}
    </div>
  )

  function DeleteSelection() {
    return (
      <div
        onClick={handleDeleteSelection}
        className="rounded-full transition-all hover:scale-125"
      >
        <Cancel className="cursor-pointer" />
      </div>
    )
  }
}
