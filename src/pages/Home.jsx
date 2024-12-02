import {
  NewAndArticle,
  Services,
  PopularCourses,
  WeekTeacher,
  HeroSection,
  Certificates,
  ServicesDivider,
  BackToTop,
} from '@components/index'

export function Home() {
  return (
    <div className="h-full">
      <HeroSection />
      <Services />
      <ServicesDivider />
      <Certificates />
      <PopularCourses />
      <WeekTeacher />
      <NewAndArticle />
      <BackToTop />
    </div>
  )
}
