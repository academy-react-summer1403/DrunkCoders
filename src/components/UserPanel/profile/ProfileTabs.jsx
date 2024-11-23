import {
  Address,
  ChangePass,
  Links,
  PersonalInformations,
  ProfilePic,
} from '@components/index'
import { userPanelProfileTabs } from '@core/utils/constants.utils'
import { Tab, Tabs } from '@nextui-org/react'
import { Security } from './Security'

export function ProfileTabs({ selectedItem, onSelect, userInfo }) {
  return (
    <Tabs
      variant="underlined"
      selectedKey={selectedItem}
      onSelectionChange={onSelect}
      className={``}
      classNames={{
        tab: 'text-xl px-0 h-12 max-w-fit pb-4 ',
        tabList:
          'w-full relative rounded-none border-b border-divider overflow-y-hidden gap-8',
        cursor: 'bg-primary-blue h-2 rounded-lg -mb-2',
      }}
    >
      {userPanelProfileTabs.map((tab) => (
        <Tab
          key={tab.key}
          title={
            <p
              className={` ${selectedItem === tab.key ? 'text-black dark:text-white' : 'text-[#272727]/50 hover:text-[#272727]/100 dark:text-white/40'}`}
            >
              {tab.title}
            </p>
          }
          className={``}
        >
          <div className="mt-5">
            {tab.key === 'personalData' && (
              <PersonalInformations userInfo={userInfo} />
            )}
            {tab.key === 'profilePic' && (
              <ProfilePic key={userInfo.userImage.length} userInfo={userInfo} />
            )}
            {tab.key === 'address' && <Address userInfo={userInfo} />}
            {tab.key === 'links' && <Links userInfo={userInfo} />}
            {tab.key === 'changePass' && <ChangePass userInfo={userInfo} />}
            {tab.key === 'security' && <Security />}
          </div>
        </Tab>
      ))}
    </Tabs>
  )
}
