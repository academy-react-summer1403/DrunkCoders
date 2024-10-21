import {
  Book,
  Dashboard,
  Hark,
  MoreVerticalCircle,
  ReservePanel,
} from '@assets/index'
import { moblieMenu } from '@core/index'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function MobileMenu() {
  const [selectedItem, setSelectedItem] = useState('dashboard')
  const navigate = useNavigate()

  function handleClick(key) {
    if (key !== 'more') {
      setSelectedItem(key)
      navigate('/user-panel/' + key)
    } else {
      setSelectedItem(key)
      console.log('object')
    }
  }
  return (
    <>
      <div className="fixed bottom-5 right-[50%] z-30 flex translate-x-[50%] items-center justify-between gap-5 rounded-[47px] bg-white p-[3px] shadow-[0_0_10px_2px_rgba(0,0,0,0.4)] dark:bg-black dark:shadow-[0_0_15px_1px_rgba(255,255,255,0.4)] sm:hidden">
        {moblieMenu.map((menuItem) => (
          <div
            key={menuItem.key}
            onClick={() => handleClick(menuItem.key)}
            className={`flexC h-16 w-16 cursor-pointer rounded-full transition-all hover:bg-primary-blue ${menuItem.key === selectedItem ? 'bg-primary-blue' : ''}`}
          >
            {menuItem.key === 'dashboard' && (
              <Dashboard
                className={`scale-[1.35] ${menuItem.key === selectedItem ? 'text-white' : ''}`}
              />
            )}
            {menuItem.key === 'myCourses' && (
              <Book
                className={`scale-[1.35] ${menuItem.key === selectedItem ? 'text-white' : ''}`}
              />
            )}
            {menuItem.key === 'myReservations' && (
              <ReservePanel
                className={`scale-[1.35] ${menuItem.key === selectedItem ? 'text-white' : ''}`}
              />
            )}
            {menuItem.key === 'profile' && (
              <Hark
                className={`scale-[1.35] ${menuItem.key === selectedItem ? 'text-white' : ''}`}
              />
            )}
            {menuItem.key === 'more' && (
              <MoreVerticalCircle
                className={`rotate-90 scale-[1.35] ${menuItem.key === selectedItem ? 'text-white' : ''}`}
              />
            )}
          </div>
        ))}
      </div>
    </>
  )
}
