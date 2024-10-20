import {
  Accounts,
  Book,
  Dashboard,
  FavBookmark,
  FileBookmark,
  LogOutPanel,
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
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    key: 'profilePic',
    title: 'عکس پروفایل',
    content:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    key: 'address',
    title: 'آدرس سکونت',
    content:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    key: 'links',
    title: 'لینک ها',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
]
