import { useState } from 'react'
import { userPanelMenuBottom, userPanelMenuGlobal } from '@core/index'
import { Cancel, LongLogo, PanelPay, ShortLogo } from '@assets/index'
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { darkModeActions } from '@store/dark-mode-slice'
import { AnimatePresence, motion, useAnimate } from 'framer-motion'

export function SideMenu() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [scope, animate] = useAnimate()
  const [selectedKeys, setSelectedKeys] = useState('dashboard')
  const isMenuOpen = useSelector((state) => state.darkMode.userPanelSidebar)

  function handleSelect(key) {
    setSelectedKeys(key)
    navigate('/user-panel/' + key)
    if (isMenuOpen) {
      dispatch(darkModeActions.toggleUserPanelSideBar())
    }
  }

  function handleCloseMenu() {
    dispatch(darkModeActions.toggleUserPanelSideBar())
  }
  //
  return (
    <>
      <div
        // key="div"
        className={`absolute right-0 top-0 z-30 h-full w-full bg-black/80 ${isMenuOpen ? 'block' : 'hidden'}`}
      ></div>

      <motion.aside
        // exit={{ right: -300 }}
        // ref={scope}
        key="aside"
        className={`absolute right-0 top-0 z-40 h-fit w-64 bg-white p-4 pb-1 shadow shadow-white dark:bg-black xl:static xl:block xl:rounded-2xl xl:shadow-none ${isMenuOpen ? 'block' : 'hidden'}`}
        /* style={{
          display: isMenuOpen ? 'block' : 'none',
          right: -300,
          position: 'absolute',
          zIndex: 30,
        }} */
      >
        <div className="relative">
          <Link to="/" className="mb-4 flex w-fit items-center gap-2">
            <ShortLogo className="h-10" />
            <LongLogo className="-mb-4 -mr-4 hidden xl:block" />
          </Link>

          <Cancel
            className="absolute left-1 top-3 mr-32 block cursor-pointer transition-all hover:scale-125 xl:hidden"
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
