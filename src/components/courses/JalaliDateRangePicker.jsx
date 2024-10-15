import React, { useEffect, useRef, useState } from 'react'
import { Calendar } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import persian_en from 'react-date-object/locales/persian_en'
import gregorian_en from 'react-date-object/locales/gregorian_en'
import gregorian from 'react-date-object/calendars/gregorian'
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css'
import { BaseInput, IconLabel } from '@components/index'
import { Calendar2, Cancel } from '@assets/index'
import { useDispatch, useSelector } from 'react-redux'
import { sortFilterActions } from '@store/index'

export function JalaliDateRangePicker({ prevDate }) {
  const dispatch = useDispatch()
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
        dispatch(
          sortFilterActions.setDateRange({
            startDate: values[0].convert(gregorian, gregorian_en).format(),
            endDate: values[1].convert(gregorian, gregorian_en).format(),
          }),
        )
      }

      if (!values) {
        dispatch(
          sortFilterActions.setDateRange({
            startDate: null,
            endDate: null,
          }),
        )
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

/* const [values, setValues] = useState([
    new DateObject().subtract(4, 'days'),
    new DateObject().add(4, 'days'),
  ]) */
