import {
  ArrowDownDouble,
  glassyGradient,
  glassyTwisted,
  Start1,
  Start2,
} from '@assets/index'

export function CoursesAndArticesHeroSection({
  title,
  description,
  pointerTitle,
}) {
  return (
    <div className="mx-auto flex w-[350px] flex-col items-center justify-center gap-8 pb-16 pt-20 text-center sm:w-[538px]">
      <div className="relative w-full text-center">
        <h1 className="text-center text-5xl leading-normal">{title}</h1>
        <Start1 className="absolute -bottom-5 -right-12" />
        <Start2 className="absolute -top-10 left-2" />
      </div>

      <div className="relative">
        <p className="text-xl leading-normal text-[#787878]">{description}</p>
        <img
          src={
            title === 'اخبار و مقالات آکادمی' ? glassyGradient : glassyTwisted
          }
          alt="glassy twisted"
          className="absolute -bottom-2 -left-28 hidden md:block"
        />
      </div>

      <div className="flex flex-col items-center gap-2 text-[#787878]">
        <p> {pointerTitle}</p>
        <ArrowDownDouble />
      </div>
    </div>
  )
}
