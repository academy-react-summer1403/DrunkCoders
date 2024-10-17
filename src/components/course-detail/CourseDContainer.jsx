import { Comment } from '@components'
import { MainContent } from './MainContent'
import { OverView } from './OverView'
import { PopularCourses } from '..'

export function CourseDContainer() {
  return (
    <>
      <div className="mt-12 md:flex md:gap-[5%]">
        <aside className="w-full border-2 md:w-[38%]">
          <div className="sticky top-0 flex h-fit flex-col gap-5 rounded-3xl border-3 p-3">
            <OverView />
          </div>
        </aside>

        <main className="flex w-full flex-col gap-6 md:w-[57%]">
          <MainContent />
          <Comment />
        </main>
      </div>
      <div className="my-6">
        <PopularCourses />
      </div>
    </>
  )
}
