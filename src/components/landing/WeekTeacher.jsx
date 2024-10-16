import { Button } from '@components'
import { getAllTeachers } from '@core'
import { Avatar } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'

export function WeekTeacher() {
  const { data } = useQuery({
    queryKey: ['teachers'],
    queryFn: getAllTeachers,
  })

  let sortedTeacherByCourseCount = null
  if (data) {
    sortedTeacherByCourseCount = data.sort(
      (a, b) => b.courseCounts - a.courseCounts,
    )
  }

  return (
    <div className="my-20 text-center">
      <h2 className="text-[40px] font-medium">برترین اساتید هفته</h2>
      <p className="mb-20 mt-3 text-xl text-[#787878] lg:mb-40">
        اساتیدی که با نظر سنجی در دوره ها به آنها بیشترین رای مثبت را دادند
      </p>

      <div className="flex flex-wrap justify-between gap-y-16 lg:flex-nowrap lg:gap-24 xl:gap-36">
        {data &&
          sortedTeacherByCourseCount.slice(0, 3).map((teacher, index) => (
            <div
              key={teacher.teacherId}
              className={`relative flex flex-col gap-6 rounded-[32px] border-4 p-4 text-center ${
                index === 0
                  ? 'relative order-[0] border-primary-blue lg:-top-8 lg:order-[1] lg:scale-[1.20]'
                  : index === 1
                    ? 'sm:basis-[45%] lg:order-[0] lg:basis-auto'
                    : 'sm:basis-[45%] lg:order-[2] lg:basis-auto'
              }`}
            >
              <div>
                <h3 className="mt-8 text-2xl font-medium">
                  {teacher.fullName}
                </h3>
                <p className="mt-2 text-sm text-[#787878]">دکتری هوش مصنوعی</p>
              </div>

              <div>
                {index === 1 && <span className="text-4xl">4.1 🥈</span>}
                {index === 0 && <span className="text-4xl">4.2 🥇</span>}
                {index === 2 && <span className="text-4xl">4.0 🥉</span>}
              </div>

              <p className="line-clamp-2 text-ellipsis text-xs font-light leading-5 text-[#787878]">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>

              <Button className="text-lg font-medium">صفحه استاد</Button>

              <Avatar
                className={`absolute right-[50%] top-0 h-16 w-16 translate-x-[50%] translate-y-[-50%] ${
                  index === 0
                    ? 'h-[88px] w-[88px] border-4 border-primary-blue'
                    : ''
                }`}
                src={teacher.pictureAddress}
              />
            </div>
          ))}
      </div>
    </div>
  )
}
