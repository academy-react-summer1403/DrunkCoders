import { Cancel, GridView, ListView } from '@assets/index'
import { Divider } from '@nextui-org/react'
import { Button } from '@components/index'
import { useDispatch, useSelector } from 'react-redux'
import { courseViewModeActions } from '@store/course-view-mode-slice'
import { useState } from 'react'

export function CourseSort() {
  const [buttonState, setButtonState] = useState({
    fisrt: false,
    second: false,
    third: false,
  })
  const view = useSelector((state) => state.view.view)
  const dispatch = useDispatch()

  function handleChangeView(identifier) {
    dispatch(courseViewModeActions.toggleView(identifier))
  }

  function handleButtonState(btnIdentifier) {
    setButtonState((prevState) => ({
      ...prevState,
      [btnIdentifier]: !prevState[btnIdentifier],
    }))
  }
  return (
    <div className="flex w-fit items-center justify-between">
      <div className="flex gap-3">
        <GridView
          className={`h-6 w-6 cursor-pointer ${view === 'grid' ? 'text-primary-blue' : 'text-basic-gray'}`}
          onClick={() => handleChangeView('grid')}
        />
        <ListView
          className={`h-6 w-6 cursor-pointer ${view === 'list' ? 'text-primary-blue' : 'text-basic-gray'}`}
          onClick={() => handleChangeView('list')}
        />
      </div>

      <Divider orientation="vertical" className="mx-8 h-8 w-[2px]" />

      <div className="flex items-center gap-2">
        <p className="ml-2 text-lg text-[#787878]">ترتیب</p>

        <Button
          onClick={() => handleButtonState('first')}
          className={
            buttonState.first
              ? ''
              : 'border border-[#E4E4E4] bg-transparent text-black'
          }
        >
          پرطرفدار ترین
        </Button>

        <Button
          //   variant="bordered"
          className={
            buttonState.second
              ? ''
              : 'border border-[#E4E4E4] bg-transparent text-black'
          }
          onClick={() => handleButtonState('second')}
        >
          محبوب ‌ترین
        </Button>

        <Button
          onClick={() => handleButtonState('third')}
          //   variant="bordered"
          className={
            buttonState.third
              ? ''
              : 'border border-[#E4E4E4] bg-transparent text-black'
          }
        >
          پرامتیاز ترین
        </Button>
      </div>

      <Divider orientation="vertical" className="mx-4 h-[22px]" />

      <Button
        variant="bordered"
        startContent={<Cancel />}
        className="border border-[#FF5454] bg-transparent text-[#FF5454]"
      >
        حذف
      </Button>
    </div>
  )
}
