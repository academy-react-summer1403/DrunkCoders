import {
  NewAndArticle,
  Services,
  PopularCourses,
  WeekTeacher,
  HeroSection,
  Certificates,
  ServicesDivider,
} from "@components";

export function Home() {
  return (
    <>
      <HeroSection />
      <Services />
      <ServicesDivider />
      <Certificates />
      <PopularCourses />
      <WeekTeacher />
      <NewAndArticle />
    </>
  );
}
