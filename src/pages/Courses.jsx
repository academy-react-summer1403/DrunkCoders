import { CoursesHeroSection, CoursesLayout } from '@components/index'
import { Outlet } from 'react-router-dom'

export function Courses() {
  return (
    <div>
      <CoursesHeroSection />
      <CoursesLayout />
    </div>
  )
}
