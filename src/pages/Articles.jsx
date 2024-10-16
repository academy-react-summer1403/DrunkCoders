import { CoursesAndArticlesMainLayout } from '@components/common/CoursesAndArticlesMainLayout'
import { CoursesAndArticesHeroSection } from '@components/index'

export function Articles() {
  return (
    <>
      <CoursesAndArticesHeroSection
        title="اخبار و مقالات آکادمی"
        description="اخبار و مقالات که میتوانند برای پیشرفت و یادگیری شما مفید باشند رو ما در اختیار شما قرار میدیم"
        pointerTitle="لیست اخبار و مقالات"
      />
      <CoursesAndArticlesMainLayout article={true} />
    </>
  )
}
