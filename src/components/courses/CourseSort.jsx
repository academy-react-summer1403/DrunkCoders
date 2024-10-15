import { Cancel, GridView, ListView } from '@assets/index'
import { Divider } from '@nextui-org/react'
import { Button } from '@components/index'
import { useDispatch, useSelector } from 'react-redux'
import { courseViewModeActions, sortFilterActions } from '@store/index'
import { useEffect, useRef } from 'react'
import { useAnimate } from 'framer-motion'
import {} from '@store/sort-filter-slice'

export function CourseSort() {
  const firstRender = useRef(true)
  const view = useSelector((state) => state.view.view)
  const courseOrder = useSelector((state) => state.sort.order)
  const dispatch = useDispatch()
  // const [buttonState, setButtonState] = useState()
  const [scope, animate] = useAnimate()
  const [scope2, animate2] = useAnimate()
  const [scope3, animate3] = useAnimate()
  const [scope4, animate4] = useAnimate()

  useEffect(() => {
    async function animation() {
      if (view === 'grid') {
        await Promise.all([
          animate3(
            scope3.current,
            { opacity: 0 },
            { duration: 0.04, onComplete: reverseAnimation },
          ),
          animate(scope.current, { opacity: 0 }, { duration: 0.1 }),
          animate2(scope2.current, { opacity: 1, left: 0 }, { duration: 0.3 }),
        ])
        await Promise.all([
          animate(scope.current, { opacity: 1 }, { duration: 0 }),
        ])
      } else {
        await Promise.all([
          animate2(
            scope2.current,
            { left: '-322px', opacity: 0 },
            { duration: 0.3 },
          ),
          animate(
            scope.current,
            { opacity: 0 },
            { duration: 0, onComplete: reverseAnimation2 },
          ),
          animate3(scope3.current, { opacity: 0 }, { duration: 0.2 }),
          animate4(scope4.current, { opacity: 1, left: 0 }, { duration: 0.3 }),
        ])
        await Promise.all([
          animate3(scope3.current, { opacity: 1 }, { duration: 0 }),
          animate4(scope4.current, { opacity: 0 }, { duration: 0 }),
        ])

        animate4(scope4.current, { left: '322px' }, { duration: 0 })
      }
    }

    const reverseAnimation = async () => {
      await animate3(scope3.current, { opacity: 1 }, { duration: 0.04 })
    }
    const reverseAnimation2 = async () => {
      await animate(scope.current, { opacity: 1 }, { duration: 0.1 })
    }

    if (firstRender.current) {
      firstRender.current = false
    } else {
      animation()
    }
  }, [view])

  function handleOrder(orderIdentifier) {
    dispatch(sortFilterActions.setOrder(orderIdentifier))
  }
  async function handleChangeView(identifier) {
    dispatch(courseViewModeActions.toggleView(identifier))
  }

  return (
    <div className="flex w-fit items-center justify-between">
      <div className="hidden gap-3 lg:flex">
        <GridView
          className={`h-6 w-6 cursor-pointer ${view === 'grid' ? 'text-primary-blue' : 'text-basic-gray dark:text-white'}`}
          onClick={() => handleChangeView('grid')}
        />
        <ListView
          className={`h-6 w-6 cursor-pointer ${view === 'list' ? 'text-primary-blue' : 'text-basic-gray dark:text-white'}`}
          onClick={() => handleChangeView('list')}
        />
      </div>

      <Divider
        orientation="vertical"
        className="mx-8 hidden h-8 w-[1px] dark:bg-white lg:block"
      />

      <div className="flex items-center gap-2">
        <p className="ml-2 text-lg text-[#787878] dark:text-white">ترتیب</p>

        <div className="relative">
          <div ref={scope} className="relative z-10">
            <ButtonComp1 identifier={'costDesc'}>بالاترین قیمت </ButtonComp1>
          </div>

          <div ref={scope2} className="absolute -left-[321px] top-0 opacity-0">
            <ButtonComp1 identifier={'costDesc'}>بالاترین قیمت </ButtonComp1>
          </div>
        </div>

        <ButtonComp1 identifier={'costAsc'}> پایین‌ترین قیمت</ButtonComp1>
        <ButtonComp1 identifier={'InsertDate'}> ‌جدیدترین</ButtonComp1>
      </div>

      <Divider orientation="vertical" className="mx-4 h-[22px] dark:bg-white" />

      <div className="relative">
        <div ref={scope3}>
          <ButtonComp2 />
        </div>

        <div ref={scope4} className="absolute left-[321px] top-0 opacity-0">
          <ButtonComp2 />
        </div>
      </div>
    </div>
  )

  function ButtonComp2() {
    return (
      <Button
        onClick={() => handleOrder('Active')}
        variant="bordered"
        startContent={<Cancel />}
        className="border border-[#FF5454] bg-transparent text-[#FF5454]"
      >
        حذف
      </Button>
    )
  }

  function ButtonComp1({ identifier, children }) {
    return (
      <Button
        onClick={() => handleOrder(identifier)}
        className={
          courseOrder === identifier
            ? 'border border-transparent'
            : 'border border-[#E4E4E4] bg-transparent text-black dark:text-white'
        }
      >
        {children}
      </Button>
    )
  }
}
