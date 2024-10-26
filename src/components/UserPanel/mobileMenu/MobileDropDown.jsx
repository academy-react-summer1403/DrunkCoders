import { userPanelMobileDropDown } from '@core/index'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

export function MobileDropDown({ children }) {
  const navigate = useNavigate()

  function handleItemClick(key) {
    if (key === 'accounts') {
      //
    } else if (key === 'logout') {
      //
    } else {
      navigate('/user-panel/' + key)
    }
  }

  return (
    <Dropdown>
      <DropdownTrigger>{children}</DropdownTrigger>
      <DropdownMenu items={userPanelMobileDropDown} onAction={handleItemClick}>
        {(item) => (
          <DropdownItem
            key={item.key}
            color={item.key === 'logout' ? 'danger' : 'primary'}
            className={`${item.key === 'logout' ? 'text-[#FF5454]' : ''}`}
            startContent={item.startIcon}
          >
            {item.title}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  )
}
