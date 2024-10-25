import { MoreVerticalCircle } from '@assets/index'
import { moblieMenu } from '@core/index'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MobileDropDown, UseIcon } from '@components/index'

export function MobileMenu() {
  const [selectedItem, setSelectedItem] = useState('dashboard')
  const navigate = useNavigate()

  function handleClick(key) {
    if (key !== 'more') {
      setSelectedItem(key)
      navigate('/user-panel/' + key)
    } else {
      setSelectedItem(key)
    }
  }
  return (
    <>
      <div className="fixed bottom-5 right-[50%] z-[450] flex translate-x-[50%] items-center justify-between gap-5 rounded-[47px] bg-white p-[3px] shadow-[0_0_10px_2px_rgba(0,0,0,0.4)] dark:bg-black dark:shadow-[0_0_15px_1px_rgba(255,255,255,0.4)] sm:hidden">
        {moblieMenu.map((menuItem) => (
          <div
            key={menuItem.key}
            onClick={() => handleClick(menuItem.key)}
            className={`flexC h-16 w-16 cursor-pointer rounded-full transition-all hover:bg-primary-blue ${menuItem.key === selectedItem ? 'bg-primary-blue' : ''}`}
          >
            <UseIcon
              icon={menuItem.icon}
              className={`scale-[1.35] ${menuItem.key === selectedItem ? 'text-white' : ''}`}
            />
          </div>
        ))}

        <MobileDropDown>
          <div
            key="more"
            onClick={() => handleClick('more')}
            className={`flexC h-16 w-16 cursor-pointer rounded-full transition-all hover:bg-primary-blue ${'more' === selectedItem ? 'bg-primary-blue' : ''}`}
          >
            <UseIcon
              icon={MoreVerticalCircle}
              className={`rotate-90 scale-[1.35] ${'more' === selectedItem ? 'text-white' : ''}`}
            />
          </div>
        </MobileDropDown>
      </div>
    </>
  )
}
