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
  { key: 'profile', startIcon: <ProfilePanel />, title: 'پروفایل' },
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
