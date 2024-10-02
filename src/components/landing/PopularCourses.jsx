import {Card} from '../index'

export function PopularCourses() {
    return (
        <div className=" text-center ">
            <h2 className="text-4xl font-medium mb-3">محبوب ترین دوره ها</h2>
            <p className="text-[#787878] text-lg font-medium">
                دوره هایی که بین دانشجو های ما محبوبیت بالایی داشتند
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
                {Array.from({length: 4}).map((_, index) => (
                    <Card key={index} />
                ))}
            </div>
        </div>
    )
}
