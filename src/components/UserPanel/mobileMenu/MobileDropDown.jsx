import { userPanelMobileDropDown } from '@core/index'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { useState } from 'react'
import { dashSortFilterActions } from '@store/index'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export function MobileDropDown({ children, onSelect, isSelected }) {
  const [selectedKey, setSelectedKey] = useState(null)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  function handleItemClick(key) {
    setSelectedKey(key)
    if (key === 'accounts') {
      //

      setSelectedKey(key)
    } else if (key === 'logout') {
      //
    } else {
      setSelectedKey(key)
      onSelect('more')
      dispatch(dashSortFilterActions.setUserPanelCurrentpage(key))
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
            className={`${item.key === 'logout' ? 'text-[#FF5454]' : ''} ${item.key === selectedKey && isSelected ? 'bg-primary-blue text-white' : ''}`}
            startContent={item.startIcon}
          >
            {item.title}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  )
}
