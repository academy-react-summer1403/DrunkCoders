import {useEffect, useState} from 'react'
import {Button, Card} from '../index'

export function PopularCourses() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth < 640 ? null : 'sm')

    useEffect(() => {
        window.addEventListener('resize', () => {
            const width = window.innerWidth
            if (width < 640) {
                setWindowWidth(null)
            } else {
                setWindowWidth('sm')
            }
        })
    }, [])

    return (
        <div className="text-center">
            <h2 className="text-[40px] font-medium mb-3">محبوب ترین دوره ها</h2>
            <p className="text-[#787878] text-xl font-medium">
                دوره هایی که بین دانشجو های ما محبوبیت بالایی داشتند
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
                {windowWidth === null &&
                    Array.from({length: 2}).map((_, index) => <Card key={index} />)}
                {windowWidth === 'sm' &&
                    Array.from({length: 4}).map((_, index) => <Card key={index} />)}
            </div>

            <Button className="block sm:hidden bg-primary-blue mx-auto mt-6 text-white">
                نمایش بیشتر
            </Button>
        </div>
    )
}
