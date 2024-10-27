import { useEffect, useState } from 'react'
import { userPanelMenuBottom, userPanelMenuGlobal } from '@core/index'
import { Cancel, LongLogo, PanelPay, ShortLogo } from '@assets/index'
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { darkModeActions } from '@store/dark-mode-slice'
import { AnimatePresence, motion, useAnimate } from 'framer-motion'
import { tokenActions } from '@store/token-slice'
import { dashSortFilterActions } from '@store/index'

export function SideMenu() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [scope, animate] = useAnimate()
  const { userPanelCurrentpage } = useSelector((state) => state.dashSort)
  const isMenuOpen = useSelector((state) => state.darkMode.userPanelSidebar)
  const [selectedKeys, setSelectedKeys] = useState(userPanelCurrentpage)

  useEffect(() => {
    setSelectedKeys(userPanelCurrentpage)
  }, [userPanelCurrentpage])

  function handleSelect(key) {
    setSelectedKeys(key)

    if (key !== 'accounts' && key !== 'logout') {
      dispatch(dashSortFilterActions.setUserPanelCurrentpage(key))
      navigate('/user-panel/' + key)
    } else if (key === 'logout') {
      handleLogout()
    } else {
      //
    }

    handleCloseMenu()
  }

  function handleCloseMenu() {
    if (isMenuOpen) {
      dispatch(darkModeActions.toggleUserPanelSideBar())
    }
  }

  function handleGoToHome() {
    handleCloseMenu()
    dispatch(dashSortFilterActions.setUserPanelCurrentpage('dashboard'))
    navigate('/')
  }

  function handleLogout() {
    dispatch(tokenActions.logout())
    dispatch(dashSortFilterActions.setUserPanelCurrentpage('dashboard'))
    navigate('/')
  }
  //
  return (
    <>
      <div
        className={`absolute right-0 top-0 z-30 h-full w-full bg-black/80 ${isMenuOpen ? 'block' : 'hidden'}`}
      ></div>

      <motion.aside
        // exit={{ right: -300 }}
        // ref={scope}
        key="aside"
        className={`absolute right-0 top-0 z-30 h-fit w-64 rounded-2xl bg-white p-4 pb-1 shadow-[0_0_35px_0px_rgba(255,255,255,0.1)] dark:bg-black xl:static xl:block xl:shadow-none ${isMenuOpen ? 'block' : 'hidden'}`}
        /* style={{
          display: isMenuOpen ? 'block' : 'none',
          right: -300,
          position: 'absolute',
          zIndex: 30,
        }} */
      >
        <div className="relative">
          <Link
            onClick={handleGoToHome}
            className="mb-4 flex w-fit items-center gap-2"
          >
            <ShortLogo className="h-10" />
            <LongLogo className="-mb-4 -mr-4 hidden xl:block" />
          </Link>

          <Cancel
            className="absolute left-1 top-2 mr-32 block cursor-pointer transition-all hover:scale-125 xl:hidden"
            onClick={handleCloseMenu}
          />
        </div>

        <Listbox
          color="none"
          className="h-[90%]"
          selectedKeys={selectedKeys}
          onAction={handleSelect}
          shouldHighlightOnFocus
          classNames={{
            list: 'h-full gap-4',
          }}
        >
          <ListboxSection title="عمومی" classNames={{ heading: 'text-[15px]' }}>
            {userPanelMenuGlobal.map((menuItem) => (
              <ListboxItem
                key={menuItem.key}
                className={`mt-1 rounded-[38px] px-4 py-3 hover:bg-[#006FEE] hover:text-white ${selectedKeys === menuItem.key ? 'bg-primary-blue text-white' : ''}`}
                classNames={{
                  title: 'text-base',
                }}
                startContent={menuItem.startIcon}
              >
                {menuItem.title}
              </ListboxItem>
            ))}
          </ListboxSection>

          <ListboxSection title="مالی" classNames={{ heading: 'text-[15px]' }}>
            <ListboxItem
              key="financial"
              className={`mt-2 rounded-[38px] px-4 py-3 hover:bg-[#006FEE] hover:text-white ${selectedKeys === 'financial' ? 'bg-primary-blue text-white' : ''}`}
              classNames={{
                title: 'text-base',
              }}
              startContent={<PanelPay />}
            >
              پرداخت ها
            </ListboxItem>
          </ListboxSection>

          <ListboxSection className="mt-36">
            {userPanelMenuBottom.map((menuItem) => (
              <ListboxItem
                key={menuItem.key}
                color={menuItem.key === 'logout' ? 'danger' : 'none'}
                className={`mt-2 rounded-[38px] border px-4 py-3 hover:text-white ${selectedKeys === menuItem.key && selectedKeys !== 'logout' ? 'bg-primary-blue text-white' : ''} ${menuItem.key === 'logout' ? 'text-danger' : 'hover:bg-[#006FEE]'}`}
                classNames={{
                  title: 'text-base',
                }}
                startContent={menuItem.startIcon}
              >
                {menuItem.title}
              </ListboxItem>
            ))}
          </ListboxSection>
        </Listbox>
      </motion.aside>
    </>
  )
}
