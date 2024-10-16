import React, { useEffect, useRef, useState } from 'react'
import { Calendar } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import persian_en from 'react-date-object/locales/persian_en'
import gregorian_en from 'react-date-object/locales/gregorian_en'
import gregorian from 'react-date-object/calendars/gregorian'
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css'
import { BaseInput } from '@components/index'
import { Cancel } from '@assets/index'
import { useDispatch, useSelector } from 'react-redux'
import { sortFilterActions } from '@store/index'

export function JalaliDateRangePicker({ prevDate, label, onChange, onClear }) {
  const firstRender = useRef(true)
  const [values, setValues] = useState(null)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const darkMode = useSelector((state) => state.darkMode.darkMode)

  useEffect(() => {
    setValues(prevDate)
  }, [])

  useEffect(() => {
    if (!firstRender.current) {
      if (values && values[0] && values[1]) {
        const startDate = values[0].convert(gregorian, gregorian_en).format()
        const endDate = values[1].convert(gregorian, gregorian_en).format()
        onChange(startDate, endDate)
      }

      if (!values) {
        onClear()
      }
    }
    firstRender.current = false
  }, [values])

  // console.log(values ? values[0].convert(gregorian, gregorian_en).format() : '')

  const formattedValue = `${values && values[0] ? values[0].convert(persian, persian_en).format() : 'انتخاب کنید'}  -  ${values && values[1] ? values[1].convert(persian, persian_en).format() : 'انتخاب کنید'}`

  function handleDeleteSelection() {
    setValues(null)
    setIsCalendarOpen(false)
  }

  return (
    <div className="w-full">
      <BaseInput
        label={label ?? null}
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

/* const [values, setValues] = useState([
    new DateObject().subtract(4, 'days'),
    new DateObject().add(4, 'days'),
  ]) */
