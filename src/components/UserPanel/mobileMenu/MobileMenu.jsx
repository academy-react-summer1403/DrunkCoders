import { MoreVerticalCircle } from '@assets/index'
import { moblieMenu, profilePics } from '@core/index'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dashSortFilterActions } from '@store/index'
import { MobileDropDown, UseIcon } from '@components/index'
import { useDispatch, useSelector } from 'react-redux'

export function MobileMenu({ userInfo }) {
  const dispatch = useDispatch()
  const { userPanelCurrentpage } = useSelector((state) => state.dashSort)
  const [selectedItem, setSelectedItem] = useState(userPanelCurrentpage)
  const navigate = useNavigate()
  let { defaultProfilePic } = useSelector((state) => state.token.users).find(
    (user) => user.isOnline,
  )

  defaultProfilePic = profilePics.find((pic) => pic.key === defaultProfilePic)

  useEffect(() => {
    setSelectedItem(userPanelCurrentpage)
  }, [userPanelCurrentpage])

  if (defaultProfilePic) {
    defaultProfilePic = (
      <UseIcon icon={defaultProfilePic.icon} className="h-11 w-11" />
    )
  } else {
    defaultProfilePic = (
      <img
        className="h-12 w-12 rounded-full"
        src={userInfo?.currentPictureAddress}
      />
    )
  }

  function handleClick(key) {
    if (key !== 'more') {
      setSelectedItem(key)
      dispatch(dashSortFilterActions.setUserPanelCurrentpage(key))
      navigate('/user-panel/' + key)
    } else {
      setSelectedItem(key)
    }
  }
  return (
    <>
      <div className="fixed bottom-5 right-[50%] z-40 flex translate-x-[50%] items-center justify-between gap-5 rounded-[47px] bg-white p-[3px] shadow-[0_0_10px_2px_rgba(0,0,0,0.4)] dark:bg-black dark:shadow-[0_0_15px_1px_rgba(255,255,255,0.4)] sm:hidden">
        {moblieMenu.map((menuItem, index) => (
          <div
            key={menuItem.key}
            onClick={() => handleClick(menuItem.key)}
            className={`flexC h-16 w-16 cursor-pointer rounded-full transition-all hover:bg-primary-blue ${menuItem.key === selectedItem ? 'bg-primary-blue' : ''}`}
          >
            {index !== 3 && (
              <UseIcon
                icon={menuItem.icon}
                className={`scale-[1.35] ${menuItem.key === selectedItem ? 'text-white' : ''}`}
              />
            )}
            {index === 3 && (
              <div className="overflow-hidden">{defaultProfilePic}</div>
            )}
          </div>
        ))}

        <MobileDropDown
          userInfo={userInfo}
          isSelected={selectedItem === 'more'}
          onSelect={handleClick}
        >
          <div
            key="more"
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
