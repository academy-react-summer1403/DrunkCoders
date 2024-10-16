import { CoursesAndArticlesMainLayout } from '@components/common/CoursesAndArticlesMainLayout'
import { CoursesAndArticesHeroSection } from '@components/index'

export function Courses() {
  return (
    <div>
      <CoursesAndArticesHeroSection
        title="دوره های متنوع!"
        description="ما به شما تنوعی از دوره‌های آموزشی تخصصی را ارائه می‌دهیم که به شما کمک می‌کند تا مهارت‌های برنامه‌نویسی و کدنویسی خود را به سطح بالاتری برسانید."
        pointerTitle="لیست دوره ها"
      />
      <CoursesAndArticlesMainLayout />
    </div>
  )
}
