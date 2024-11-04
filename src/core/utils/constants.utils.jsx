import {
  Book,
  Dashboard,
  FavBookmark,
  FileBookmark,
  Froge,
  Hand,
  Hark,
  ImageAdd,
  Lady,
  LogOutPanel,
  PanelPay,
  ProfilePanel,
  ReservePanel,
  Smeed,
} from '@assets/index'

export const userPanelMenuGlobal = [
  { key: 'dashboard', startIcon: <Dashboard />, title: 'داشبرد' },
  { key: 'profile', startIcon: <ProfilePanel />, title: 'پروفایل' },
  { key: 'myCourses', startIcon: <Book />, title: 'دوره من' },
  { key: 'myReservations', startIcon: <ReservePanel />, title: 'رزرو من' },
  {
    key: 'MyFavoriteCourses',
    startIcon: <FavBookmark />,
    title: 'علاقه‌مندی دوره',
  },
  {
    key: 'MyFavoriteArticles',
    startIcon: <FileBookmark />,
    title: 'علاقه‌مندی مقالات',
  },
]

export const userPanelMenuBottom = [
  { key: 'accounts', startIcon: <ProfilePanel />, title: 'حساب‌های کابری' },
  {
    key: 'logout',
    startIcon: <LogOutPanel />,
    title: 'خروج از حساب',
  },
]

export const userPanelMobileDropDown = [
  {
    key: 'MyFavoriteCourses',
    startIcon: <FavBookmark />,
    title: 'علاقه‌مندی دوره',
  },
  {
    key: 'MyFavoriteArticles',
    startIcon: <FileBookmark />,
    title: 'علاقه‌مندی مقاله',
  },
  { key: 'Financials', startIcon: <PanelPay />, title: 'پرداخت ها' },
  { key: 'accounts', startIcon: <ProfilePanel />, title: 'حساب‌های کاربری' },
  { key: 'logout', startIcon: <LogOutPanel />, title: 'خروج از حساب' },
]

export const userPanelProfileTabs = [
  {
    key: 'personalData',
    title: 'اطلاعات شخصی',
  },
  {
    key: 'profilePic',
    title: 'عکس پروفایل',
  },
  {
    key: 'address',
    title: 'آدرس سکونت',
  },
  {
    key: 'links',
    title: 'لینک ها',
  },
  {
    key: 'changePass',
    title: 'تغییر رمز‌عبور',
  },
]
export const moblieMenu = [
  { key: 'dashboard', icon: Dashboard },
  { key: 'myCourses', icon: Book },
  { key: 'myReservations', icon: ReservePanel },
  {
    key: 'profile',
    icon: Hark,
  },
]
export const profilePics = [
  {
    key: 'hand',
    icon: Hand,
    bgColor: 'bg-[#427EFC]',
    isMoreOpen: false,
  },
  {
    key: 'lady',
    icon: Lady,
    bgColor: 'bg-[#FFE75C]',
    isMoreOpen: false,
  },
  {
    key: 'smeed',
    icon: Smeed,
    bgColor: 'bg-[#5865F2]',
    isMoreOpen: false,
  },
  {
    key: 'froge',
    icon: Froge,
    bgColor: 'bg-[#FFE75C]',
    isMoreOpen: false,
  },
  { key: 'morePic', icon: ImageAdd, isConstant: true, isMoreOpen: false },
]
export const myCoursesColumns = [
  { name: '#', uid: 'tumbImageAddress' },

  { name: 'نام دوره', uid: 'courseTitle' },

  { name: 'استاد دوره', uid: 'fullName' },

  { name: 'شروع دوره', uid: 'lastUpdate' },
  { name: 'قیمت دوره', uid: 'cost' },
  { name: 'وضعیت پراختی', uid: 'paymentStatus' },
  { name: '', uid: 'actions' },
]
export const myReservationsColumns = [
  { name: ' #', uid: 'tumbImageAddress' },

  { name: ' نام دوره', uid: 'courseName' },

  { name: ' استاد دوره', uid: 'teacherName' },

  { name: 'شروع دوره', uid: 'lastUpdate' },
  { name: 'قیمت دوره', uid: 'cost' },
  { name: 'وضعیت ثبت‌نام', uid: 'accept' },
  { name: '', uid: 'actions' },
]
export const myFavCoursesColumns = [
  { name: ' #', uid: 'tumbImageAddress' },

  { name: ' نام دوره', uid: 'title' },

  { name: ' استاد دوره', uid: 'teacherName' },

  { name: 'شروع دوره', uid: 'startTime' },
  { name: 'قیمت دوره', uid: 'cost' },

  { name: '', uid: 'actions' },
]
export const myFavArticlesColumns = [
  { name: ' #', uid: 'tumbImageAddress' },

  { name: 'عنوان', uid: 'title' },

  { name: 'درباره مقاله', uid: 'about' },

  { name: 'منتشرکننده', uid: 'userName' },
  { name: 'تاریخ انتشار', uid: 'insertDate' },

  { name: '', uid: 'actions' },
]
