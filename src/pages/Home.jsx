import {
    NewAndArticle,
    Services,
    PopularCourses,
    WeekTeacher,
    HeroSection,
    Certificates,
} from '../components/index'

export function Home() {
    return (
        <>
            <HeroSection />
            <Services />
            <Certificates />
            <PopularCourses />
            <WeekTeacher />
            <NewAndArticle />
        </>
    )
}
