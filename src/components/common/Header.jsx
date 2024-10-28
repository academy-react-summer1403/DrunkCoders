import { Button } from '@components'
import { NavLink } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'; // ایمپورت useQuery
import { getCurrentUserProfile } from '@core'
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
  const { data: userProfile, isLoading, error } = useQuery({
    queryKey: ['userProfile'], // کلید کوئری به عنوان آرایه
    queryFn: getCurrentUserProfile, // تابع API برای دریافت اطلاعات
    enabled: !tokenExpired, // تنها وقتی توکن معتبر است، درخواست بفرست
  });

  if (isLoading) return <div>در حال بارگذاری...</div>; // نمایش لودینگ هنگام بارگذاری
  if (error) return <div>خطا در بارگذاری اطلاعات کاربر</div>; // نمایش خطا در صورت وجود
  return (
    <div className=" pt-2  mb-2 z-50 fixed left-0 pl-10 pr-8 bg-white dark:bg-black  flex h-16 w-full justify-around gap-16 max-lg:gap-0">
      <div className="flex w-72 relative top-1.5 justify-start gap-4 max-lg:w-64 max-lg:gap-3">
        <div className="h-12 w-10">
          {' '}
          <BahrLogo1 className="relative right-2 top-1 h-9" />
        </div>{' '}
        <div className="flex h-12 w-44 justify-center pt-3 max-md:hidden">
          {' '}
          <img src={BahrLogo} className="ml-8 h-8 w-40" />
        </div>
      </div>

        <nav  className="space-x-4 flex w-2/5 justify-center text-black dark:text-white gap-10 mt-1 whitespace-nowrap p-2 text-lg font-normal leading-10 max-lg:mx-5 max-lg:gap-5 max-md:hidden">
          <NavLink
            exact
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-blue-500' : 'text'
            }
          >
            خانه
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive ? 'text-blue-500' : 'text'
            }
          >
            دوره‌ها
          </NavLink>
          <NavLink
            to="/articles"
            className={({ isActive }) =>
              isActive ? 'text-blue-500' : 'text'
            }
          >
            اخبار و مقالات
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'text-blue-500' : 'text'
            }
          >
            ارتباط باما
          </NavLink>
        </nav>

      <div className="flex w-72 justify-end gap-5 border-black max-lg:mr-2 max-lg:gap-3 max-md:block max-md:w-fit max-md:gap-2">
        <div
          onClick={toggleMode}
          className="relative top-1.5 flex h-12 w-12 cursor-pointer justify-center rounded-full border-1 pt-3 max-md:hidden"
        >
          <MoonIcon className="absolute z-20 dark:hidden" />
          <SunIcon className="absolute top-2 h-8 w-8" />
        </div>

        <div className="max-md:relative max-md:right-20 max-md:flex max-sm:right-11">
          <div className="relative top-1 max-md:w-12">
          {!tokenExpired && userProfile ? (
              <Popover showArrow placement="bottom">
                <PopoverTrigger>
                  <User
                    as="button"
                    name={` ${userProfile?.lName || 'نام‌خانوادگی'}${userProfile?.fName || 'نام'}`}
                    description={userProfile.phoneNumber}
                    className="relative -left-0 top-1.5 w-44 whitespace-normal transition-transform max-md:left-28 max-md:w-44 max-md"
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
                className="h-12 w-40 rounded-full text-lg max-md:relative max-md:left-28"
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
              <ModalContent className="relative bottom-36 " >
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
                            <Link to="/">خانه</Link>{' '}
                            <Link to="/courses">دوره ها</Link>{' '}
                            <Link to="/articles">اخبار و مقالات </Link>
                            <Link to="/">ارتباط باما</Link>
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
