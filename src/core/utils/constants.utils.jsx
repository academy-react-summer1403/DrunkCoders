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
  { key: 'myReservation', startIcon: <ReservePanel />, title: 'رزرو من' },
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
