import { CourseFilter, CourseGrid, CourseSort } from '..'

export function CoursesLayout() {
  return (
    <>
      <div className="-mr-[2.5%] flex w-[105%] gap-2 rounded-3xl border-4 p-4">
        <div className="w-3/4">
          <CourseSort />
          <CourseGrid />
        </div>
        <div className="relative -left-2 h-screen w-1/4 bg-black">
          <CourseFilter />
        </div>
      </div>
    </>
  )
}
