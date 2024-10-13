import { Cancel, Search } from '@assets/index'
import {
  Button,
  CourseFilter,
  CourseGrid,
  CourseSort,
  MobileFilterModal,
  Pagination,
  SearchBox,
} from '@components/index'
import { useDisclosure } from '@nextui-org/react'
import { motion, useAnimate } from 'framer-motion'

export function CoursesLayout() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [scope, animate] = useAnimate()
  const [scope1, animate1] = useAnimate()

  async function handleAnimation() {
    await animate(
      scope.current,
      { opacity: 1, scale: [1, 2, 1, 0], rotate: 1000 },
      { duration: 0.6 },
    )
    await animate1(scope1.current, { right: 50 }, { duration: 0.5 })
    await animate1(scope1.current, { right: 0 }, { duration: 0.5 })
  }

  async function handleRemoveSearchBox() {
    await animate1(scope1.current, { right: 50 }, { duration: 0.5 })
    await animate1(scope1.current, { right: -600 }, { duration: 0.5 })
    await animate(
      scope.current,
      { scale: [0, 1, 2, 1], rotate: 0 },
      { duration: 0.6 },
    )
  }

  return (
    <>
      <MobileFilterModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className="relative flex gap-2 rounded-3xl border-4 p-4 pb-20 lg:-mr-[2.5%] lg:w-[105%]">
        <div className="w-full md:w-[58%] lg:w-[70%] xl:w-3/4">
          <div className="hidden md:block">
            <CourseSort />
          </div>

          <div className="relative flex items-center justify-between md:hidden">
            <div onClick={handleAnimation} ref={scope}>
              <Search className="cursor-pointer" />
            </div>

            <motion.div
              ref={scope1}
              initial={{ right: -600, position: 'absolute' }}
              className="flex items-center justify-center"
            >
              <SearchBox className="ml-3 w-[200px] sm:w-64" />
              <Cancel
                className="cursor-pointer transition-all hover:scale-125"
                onClick={handleRemoveSearchBox}
              />
            </motion.div>

            <Button className="px-4 py-[9px] text-medium" onClick={onOpen}>
              ترتیب و فیلتر
            </Button>
          </div>

          <CourseGrid />
        </div>

        <div className="relative -left-[6px] hidden h-screen md:mt-16 md:block md:w-[42%] lg:mt-0 lg:w-[30%] xl:w-1/4">
          <CourseFilter />
        </div>

        <div className="ltr absolute bottom-0 translate-y-[50%]">
          <Pagination />
        </div>
      </div>
    </>
  )
}
