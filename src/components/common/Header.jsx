import { Button } from '@components'
import { NavLink } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query' // ایمپورت useQuery
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
import { darkModeActions, tokenActions } from '@store/index'
import {
  getCurrentUserProfile,
  isTokenExpired,
  userImgCreator,
} from '@core/index'
import { useQuery } from '@tanstack/react-query'

export function Header() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const dispatch = useDispatch()

  let user = useSelector((state) => state.token.users).find(
    (user) => user.isOnline === true,
  )

  const { data: userInfo } = useQuery({
    queryKey: ['userProfileInfo'],
    queryFn: getCurrentUserProfile,
    enabled: user?.isOnline ? true : false,
  })

  const avatarImg = userImgCreator(user?.defaultProfilePic, userInfo)

  function toggleMode() {
    dispatch(darkModeActions.toggleMode())
  }

  function handleLogout() {
    dispatch(tokenActions.logout())
  }

  let tokenExpired
  if (user && user.token && user.isOnline) {
    tokenExpired = isTokenExpired(user.token)
  } else {
    tokenExpired = true
  }
  const {
    data: userProfile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userProfile'], // کلید کوئری به عنوان آرایه
    queryFn: getCurrentUserProfile, // تابع API برای دریافت اطلاعات
    enabled: !tokenExpired, // تنها وقتی توکن معتبر است، درخواست بفرست
  })

  if (isLoading) return <div>در حال بارگذاری...</div> // نمایش لودینگ هنگام بارگذاری
  if (error) return <div>خطا در بارگذاری اطلاعات کاربر</div> // نمایش خطا در صورت وجود
  return (
    <div className="fixed left-0 z-50 flex w-full items-center justify-between gap-16 bg-white/60 px-5 py-3 backdrop-blur-md dark:bg-black/60 max-lg:gap-0 lg:px-8">
      <div className="flexC">
        <div className="-mt-3">
          <BahrLogo1 className="h-10 w-10 cursor-pointer" />
        </div>

        <div className="lg:flexC hidden cursor-pointer">
          <img src={BahrLogo} className="" />
        </div>
      </div>

      <nav className="flex justify-center gap-10 whitespace-nowrap text-xl font-normal text-black dark:text-white max-md:hidden">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'text-blue-500' : 'text')}
        >
          خانه
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) => (isActive ? 'text-blue-500' : 'text')}
        >
          دوره‌ها
        </NavLink>
        <NavLink
          to="/articles"
          className={({ isActive }) => (isActive ? 'text-blue-500' : 'text')}
        >
          اخبار و مقالات
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? 'text-blue-500' : 'text')}
        >
          ارتباط باما
        </NavLink>
      </nav>

      <div className="bgg-red-800 flex items-center gap-5 border-black">
        <div
          onClick={toggleMode}
          className="flexC h-14 w-14 cursor-pointer rounded-full border"
        >
          <MoonIcon className="absolute z-20 dark:hidden" />
          <SunIcon className="absolute hidden h-8 w-8 dark:block" />
        </div>

        <div className="flex gap-5">
          <div className="flexC bgg-green-500 m-0">
            {!tokenExpired ? (
              <Popover
                showArrow
                placement="bottom"
                classNames={{ trigger: 'gap-0' }}
                backdrop="opaque"
              >
                <PopoverTrigger>
                  <User
                    name={
                      (userInfo?.fName || 'نام') +
                      ' ' +
                      (userInfo?.lName || 'نام خانوادگی')
                    }
                    description={userInfo?.phoneNumber}
                    className="cursor-pointer"
                    classNames={{
                      wrapper: 'mr-3',
                      name: 'mb-2',
                      description: 'text-primary-blue',
                    }}
                    avatarProps={{ size: 'lg', ...avatarImg }}
                  />
                </PopoverTrigger>
                <PopoverContent className="border-1 border-blue-200 p-2">
                  <div className="flex flex-col gap-2 px-2 text-center">
                    <Link
                      to="/user-panel/dashboard"
                      className="w-full rounded-lg p-2 hover:bg-slate-200 dark:hover:text-black"
                    >
                      پنل کاربری
                    </Link>
                    <Link
                      onClick={handleLogout}
                      className="w-full rounded-lg p-2 hover:bg-slate-200 dark:hover:text-black"
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
                className="text-md rounded-full px-4 py-[14px] font-medium lg:px-6 lg:text-xl"
              >
                ورود یا ثبت نام
              </Button>
            )}
          </div>
          <div className="flexC md:hidden">
            <div className="cursor-pointer" onClick={onOpen}>
              <Menu1 className="h-14 w-14 rounded-full p-3 transition-all hover:bg-primary-blue hover:text-white dark:text-white dark:hover:bg-primary-blue" />
            </div>

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
                      <div className="h-50 mb-1 mt-3 flex gap-16 rounded-t-3xl">
                        <div className="flex h-full w-44">
                          <div className="flex h-full w-12 flex-col gap-6 pr-4 pt-3">
                            <Home />
                            <Book />
                            <News />
                            <Phone />
                          </div>
                          <div className="flex h-full w-32 flex-col gap-2 pr-2 pt-1 text-lg leading-10">
                            <Link to="/">خانه</Link>
                            <Link to="/courses">دوره ها</Link>
                            <Link to="/articles">اخبار و مقالات </Link>
                            <Link to="/">ارتباط باما</Link>
                          </div>
                        </div>
                        <div className="flex h-full w-44 flex-col items-end gap-7 pt-1 text-base text-gray-500 dark:text-gray-400">
                          <p className="text-left">صفحه اصلی</p>
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
