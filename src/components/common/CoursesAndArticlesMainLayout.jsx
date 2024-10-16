import { Cancel2, Search } from '@assets/index'
import {
  ArticleFilter,
  ArticleGrid,
  ArticleSort,
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
import { useDispatch, useSelector } from 'react-redux'
import { articleSortFilterActions, sortFilterActions } from '@store/index'

export function CoursesAndArticlesMainLayout({ article }) {
  const dispatch = useDispatch()
  const coursePagination = useSelector((state) => state.sort.pagination)
  const articlePagination = useSelector((state) => state.articleSort.pagination)

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

  function handlePaginationChange(pageNumber) {
    if (article) dispatch(articleSortFilterActions.setCurrentPage(pageNumber))
    else dispatch(sortFilterActions.setCurrentPage(pageNumber))
  }

  return (
    <>
      <MobileFilterModal isOpen={isOpen} onOpenChange={onOpenChange}>
        {article ? <ArticleFilter /> : <CourseFilter />}
      </MobileFilterModal>

      <div className="relative flex gap-2 rounded-3xl border-4 p-4 pb-20 lg:-mr-[2.5%] lg:w-[105%]">
        <main className="w-full md:w-[58%] lg:w-[70%] xl:w-3/4">
          <header className="hidden md:block">
            {article ? <ArticleSort /> : <CourseSort />}
          </header>

          <header className="relative flex items-center justify-between md:hidden">
            <div onClick={handleAnimation} ref={scope}>
              <Search className="cursor-pointer" />
            </div>

            <motion.div
              ref={scope1}
              initial={{ right: -600, position: 'absolute' }}
              className="flex items-center justify-center"
            >
              <SearchBox className="ml-3 w-[200px] sm:w-64" />
              <Cancel2
                className="cursor-pointer transition-all hover:scale-125"
                onClick={handleRemoveSearchBox}
              />
            </motion.div>

            <Button className="px-4 py-[9px] text-medium" onClick={onOpen}>
              ترتیب و فیلتر
            </Button>
          </header>

          {article ? <ArticleGrid /> : <CourseGrid />}
        </main>

        <aside className="relative -left-[6px] hidden h-screen md:mt-16 md:block md:w-[42%] lg:mt-0 lg:w-[30%] xl:w-1/4">
          {article ? <ArticleFilter /> : <CourseFilter />}
        </aside>

        <footer className="ltr absolute bottom-0 translate-y-[50%]">
          <Pagination
            currentPage={
              article
                ? articlePagination.currentPage
                : coursePagination.currentPage
            }
            totalPageCount={
              article
                ? articlePagination.totalPageCount
                : coursePagination.totalPageCount
            }
            onChange={handlePaginationChange}
          />
        </footer>
      </div>
    </>
  )
}
