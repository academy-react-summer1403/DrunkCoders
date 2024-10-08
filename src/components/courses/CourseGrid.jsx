import { useState } from 'react'
import { CourseCard } from '..'
import { useSelector } from 'react-redux'

export function CourseGrid() {
  const view = useSelector((state) => state.view.view)
  return (
    <div
      className={`mt-7 grid gap-4 ${view === 'list' ? 'grid-cols-1' : 'grid-cols-3'}`}
    >
      {Array.from({ length: 9 }).map((_, index) => (
        <CourseCard key={index} data="" buttonColor="" view={view} />
      ))}
    </div>
  )
}
