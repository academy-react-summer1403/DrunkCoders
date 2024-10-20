import { useState } from 'react'
import { userPanelMenuBottom, userPanelMenuGlobal } from '@core/index'
import { LongLogo, PanelPay, ShortLogo } from '@assets/index'
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/react'
import { Link, useNavigate } from 'react-router-dom'

export function SideMenu() {
  const navigate = useNavigate()
  const [selectedKeys, setSelectedKeys] = useState('dashboard')
  const handleSelect = (key) => {
    setSelectedKeys(key)
    navigate('/user-panel/' + key)
  }

  return (
    <aside className="h-fit w-64 rounded-2xl bg-white p-4 pb-1 dark:bg-black">
      <Link to="/">
        <div className="mb-4 flex items-center gap-2">
          <ShortLogo />
          <LongLogo />
        </div>
      </Link>

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
    </aside>
  )
}
