import { Badge, Avatar, User } from '@nextui-org/react'
import {
  Dashboard,
  MoonIcon,
  Notification,
  PencilEdit,
  SunIcon,
  bahrLogoImg,
} from '@assets/index'
import { useDispatch, useSelector } from 'react-redux'
import { darkModeActions } from '@store'
import { Link, useNavigate } from 'react-router-dom'
import { profilePics, roleMapper, userImgCreator } from '@core/index'

export function PanelHeader({ userInfo }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { defaultProfilePic, roles } = useSelector(
    (state) => state.token.users,
  ).find((user) => user.isOnline)

  const avatarImg = userImgCreator(defaultProfilePic, userInfo)

  function toggleMode() {
    dispatch(darkModeActions.toggleMode())
  }

  function handleOpenMenu() {
    dispatch(darkModeActions.toggleUserPanelSideBar())
  }

  return (
    <header className="bgg-white rounded-2xl p-2 sm:bg-white sm:p-4 sm:dark:bg-black">
      <div className="flex justify-between">
        <Link to="/" className="flexC sm:hidden">
          <img src={bahrLogoImg} />
        </Link>

        <div className="hidden items-center sm:flex">
          <span
            onClick={handleOpenMenu}
            className="ml-5 cursor-pointer rounded-lg p-1 transition-all hover:bg-primary-blue xl:hidden"
          >
            <Dashboard className="h-9 w-9 transition-all hover:text-white" />
          </span>

          <Badge
            content={<PencilEdit className="h-[14px] w-[14px]" />}
            color="primary"
            placement="bottom-right"
            showOutline={false}
            className="cursor-pointer p-[2px]"
            shape="circle"
            onClick={() => navigate('/user-panel/profile')}
          >
            <User
              key={defaultProfilePic?.key}
              onClick={() => navigate('/user-panel/profile')}
              className="cursor-pointer"
              name={
                (userInfo?.fName || 'نام') +
                ' ' +
                (userInfo?.lName || 'نام خانوادگی')
              }
              description={roleMapper(roles).join(' ، ')}
              avatarProps={{
                ...avatarImg,
                size: 'lg',
              }}
              classNames={{
                name: 'text-lg mb-1',
                description: 'text-sm font-light',
              }}
            />
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            content="5"
            placement="bottom-right"
            shape="circle"
            className="text mb-[2px] mr-1 bg-[#FF5454] pt-[2px] text-[13px] font-[100] text-white"
            showOutline={false}
          >
            <div className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white dark:bg-black sm:border sm:bg-none sm:dark:bg-none">
              <Notification />
            </div>
          </Badge>
          <div
            className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white dark:bg-black sm:border sm:bg-none sm:dark:bg-none"
            onClick={toggleMode}
          >
            <MoonIcon className="absolute z-20 dark:hidden" />
            <SunIcon className="absolute h-8 w-8" />
          </div>
        </div>
      </div>
    </header>
  )
}
