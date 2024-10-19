import { Button } from '@components'
import {
  MoonIcon,
  BahrLogo,
  BahrLogo1,
  Menu1,
  Telegram,
  Instagram,
  Phone,
  News,
  Book,
  Home,
  ShortLine,
  Menu2,
  SunIcon,
} from '@assets'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  User,
} from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { darkModeActions } from '@store'
import { isTokenExpired } from '@core/index'

export function Header() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const dispatch = useDispatch()

  function toggleMode() {
    dispatch(darkModeActions.toggleMode())
  }

  let token = useSelector((state) => state.token.token)
  let tokenExpired
  if (token) {
    tokenExpired = isTokenExpired(token)
  } else {
    tokenExpired = true
  }

  return (
    <div className="relative top-3.5 flex h-12 justify-around gap-16 max-lg:gap-0">
      <div className="flex w-72 justify-start gap-4 max-lg:w-64 max-lg:gap-3">
        <div className="h-12 w-10">
          {' '}
          <BahrLogo1 className="relative right-2 top-1 h-9" />
        </div>{' '}
        <div className="flex h-12 w-44 justify-center pt-3 max-md:hidden">
          {' '}
          <img src={BahrLogo} className="ml-8 h-8 w-40" />
        </div>
      </div>

      <div className="flex w-2/5 justify-center gap-10 whitespace-nowrap p-2 text-lg font-normal leading-10 max-lg:mx-5 max-lg:gap-5 max-md:hidden">
        <Link to="/">خانه</Link> <Link to="/courses">دوره ها</Link>{' '}
        <Link to="/articles">اخبار و مقالات </Link>
        <Link to="/">ارتباط باما</Link>
      </div>

      <div className="flex w-72 justify-end gap-5 border-black max-lg:mr-2 max-lg:gap-3 max-md:block max-md:w-fit max-md:gap-2">
        <div
          onClick={toggleMode}
          className="relative top-0.5 flex h-12 w-12 cursor-pointer justify-center rounded-full border-1 pt-3 max-md:hidden"
        >
          <MoonIcon className="absolute z-20 dark:hidden" />
          <SunIcon className="absolute top-2 h-8 w-8" />
        </div>

        <div className="max-md:relative max-md:right-20 max-md:flex max-sm:right-11">
          <div className="relative top-1 max-md:w-12">
            {!tokenExpired ? (
              <Popover showArrow placement="bottom">
                <PopoverTrigger>
                  <User
                    as="button"
                    // name="Zoe Lang"
                    // description="Product Designer"
                    className="relative left-10 top-0.5 w-36 transition-transform max-md:-left-3 max-md:w-12"
                    avatarProps={{}}
                  />
                </PopoverTrigger>
                <PopoverContent className="border-1 border-blue-200 p-1">
                  <div className="flex h-12 w-28 flex-col gap-2 text-center">
                    <Link
                      to="/user-panel"
                      className="w-full rounded-lg hover:bg-slate-200"
                    >
                      پروفایل من
                    </Link>
                    <Link
                      to="/logout"
                      className="w-full rounded-lg hover:bg-slate-200"
                    >
                      خروج
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Button
                as={Link}
                to="/auth"
                color="primary"
                className="h-12 w-40 rounded-full text-lg max-md:relative"
              >
                ورود یا ثبت نام
              </Button>
            )}
          </div>
          <div className="md:relative md:top-4 md:hidden md:h-10">
            <Button
              className="bg-white dark:bg-black max-lg:hidden max-md:block lg:hidden"
              onPress={onOpen}
            >
              <Menu2 className="border-red-500" />
              <Menu1 className="absolute left-7 top-1 h-10 w-12 stroke-white dark:hidden" />
            </Button>
            <Modal
              backdrop="opaque"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              motionProps={{
                variants: {
                  enter: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.3,
                      ease: 'easeOut',
                    },
                  },
                  exit: {
                    y: -20,
                    opacity: 0,
                    transition: {
                      duration: 0.2,
                      ease: 'easeIn',
                    },
                  },
                },
              }}
            >
              <ModalContent className="relative bottom-36">
                {() => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      <ShortLine className="relative right-40 -mt-2 mr-3" />
                    </ModalHeader>
                    <ModalBody className="">
                      <div className="h-50 mb-1 mt-3 flex gap-16 rounded-t-3xl bg-white">
                        <div className="flex h-full w-44">
                          <div className="flex h-full w-12 flex-col gap-6 pr-4 pt-3">
                            <Home />
                            <Book />
                            <News />
                            <Phone />
                          </div>
                          <div className="flex h-full w-32 flex-col gap-2 pr-2 pt-1 text-lg leading-10">
                            <Link>خانه</Link> <Link>دوره ها</Link>{' '}
                            <Link>اخبار و مقالات </Link>
                            <Link>ارتباط باما</Link>
                          </div>
                        </div>
                        <div className="flex h-full w-44 flex-col gap-2 pt-1 text-base leading-10 text-gray-500">
                          <p className="relative text-left">صفحه اصلی</p>
                          <p>تمامی دوره های برگزا...</p>
                          <p>خبر های پروژهشگاه و ...</p>
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <div className="mx-2 flex h-20 w-full border-t-2 border-gray-200">
                        <BahrLogo1 className="mt-3 h-8 w-8" />
                        <img src={BahrLogo} className="mt-4 h-9 w-40" />
                        <Telegram className="mr-32 mt-3 h-10 w-10" />
                        <Instagram className="mr-3 mt-3 h-10 w-10" />
                      </div>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}
