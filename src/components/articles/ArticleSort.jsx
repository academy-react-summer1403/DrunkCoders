import { Cancel, GridView, ListView } from '@assets/index'
import { Divider } from '@nextui-org/react'
import { Button } from '@components/index'
import { useDispatch, useSelector } from 'react-redux'
import { articleSortFilterActions } from '@store/index'
import {} from '@store/course-sort-filter-slice'

export function ArticleSort() {
  const articleOrder = useSelector((state) => state.articleSort.order)
  const dispatch = useDispatch()

  function handleOrder(orderIdentifier) {
    dispatch(articleSortFilterActions.setOrder(orderIdentifier))
  }

  return (
    <div className="flex w-fit items-center justify-between">
      <div className="flex items-center gap-2">
        <p className="ml-2 text-lg text-[#787878] dark:text-white">ترتیب</p>

        <div className="relative z-10">
          <ButtonComp1 identifier={'insertDate'}> جدیدترین </ButtonComp1>
        </div>

        <ButtonComp1 identifier={'currentView'}> بیشترین بازدید</ButtonComp1>
        <ButtonComp1 identifier={'currentRate'}> بیشترین امتیاز</ButtonComp1>
      </div>

      <Divider orientation="vertical" className="mx-4 h-[22px] dark:bg-white" />

      <div>
        <Button
          onClick={() => handleOrder(null)}
          variant="bordered"
          startContent={<Cancel />}
          className="border border-[#FF5454] bg-transparent text-[#FF5454]"
        >
          حذف
        </Button>
      </div>
    </div>
  )

  function ButtonComp1({ identifier, children }) {
    return (
      <Button
        onClick={() => handleOrder(identifier)}
        className={
          articleOrder === identifier
            ? 'border border-transparent'
            : 'border border-[#E4E4E4] bg-transparent text-black dark:text-white'
        }
      >
        {children}
      </Button>
    )
  }
}
