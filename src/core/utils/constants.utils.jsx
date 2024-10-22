import {
  Book,
  Dashboard,
  FavBookmark,
  FileBookmark,
  Hark,
  LogOutPanel,
  MoreVerticalCircle,
  ProfilePanel,
  ReservePanel,
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
  { key: 'dashboard', icon: <Dashboard /> },
  { key: 'myCourses', icon: <Book /> },
  { key: 'myReservations', icon: <ReservePanel /> },
  {
    key: 'profile',
    icon: <Hark />,
  },
  {
    key: 'more',
    icon: <MoreVerticalCircle className="rotate-90" />,
  },
]
