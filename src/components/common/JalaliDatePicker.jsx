import { BaseInput } from '@components/index'
import { useSelector } from 'react-redux'
import React, { useEffect, useRef, useState } from 'react'
import { Calendar } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import persian_en from 'react-date-object/locales/persian_en'
import gregorian_en from 'react-date-object/locales/gregorian_en'
import gregorian from 'react-date-object/calendars/gregorian'
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css'
import { Cancel, Calender as Ccalendar } from '@assets/index'
import { convertGrigorianDateToJalaali2 } from '@core/index'

export function JalaliDatePicker({
  prevDate,
  label,
  onChange,
  onClear,
  defaultValue,
  register,
  name,
  error,
}) {
  const [value, setValue] = useState(null)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const darkMode = useSelector((state) => state.darkMode.darkMode)

  const persianDate =
    defaultValue !== '0001-01-01T00:00:00'
      ? convertGrigorianDateToJalaali2(defaultValue)
      : ''

  const formattedValue = `${value ? value.convert(persian, persian_en).format() : persianDate}`

  function handleDeleteSelection() {
    setValue(null)
    setIsCalendarOpen(false)
  }
  function handleClose() {
    setIsCalendarOpen((prevState) => !prevState)
  }

  return (
    <div className="relative w-full">
      <BaseInput
        label={label ?? null}
        placeholder="انتخاب کنید"
        value={formattedValue}
        size="lg"
        type="text"
        className="mb-0"
        classNames={{ label: 'text-base' }}
        onFocus={() => setIsCalendarOpen(true)}
        endIcon={DeleteSelection}
        register={register}
        name={name}
        error={error}
      />
      {isCalendarOpen && (
        <div className="-rright-[310px absolute -top-[285px] z-30">
          <Calendar
            value={value}
            onChange={(value) => {
              setValue(value)
              if (value) {
                setIsCalendarOpen(false)
              }
            }}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom"
            monthYearSeparator="،"
            className={`mx-auto mt-3 ${darkMode ? 'bg-dark' : ''}`}
          />
        </div>
      )}
    </div>
  )

  function DeleteSelection() {
    return (
      <div className="rounded-full transition-all">
        {value && (
          <Cancel
            className="h-5 w-5 cursor-pointer hover:scale-105"
            onClick={handleDeleteSelection}
          />
        )}
        {!value && (
          <Ccalendar
            className="cursor-pointer hover:scale-105"
            onClick={handleClose}
          />
        )}
      </div>
    )
  }
}
