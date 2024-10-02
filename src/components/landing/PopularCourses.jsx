import {CourseCard, GridLayout} from '../index'

export function PopularCourses() {
    return (
        <GridLayout
            title="محبوب ترین دوره ها"
            description="دوره هایی که بین دانشجو های ما محبوبیت بالایی داشتند"
            card={CourseCard}
            dataArray={Array.from({length: 4})}
        />
    )
}
