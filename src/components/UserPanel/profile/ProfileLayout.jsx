import { Badge, Tab, Tabs } from '@nextui-org/react'
import {
  AccountSetting,
  ImageAdd,
  Mail,
  MobileIcon,
  PencilEdit,
} from '@assets/index'
import { useState } from 'react'
import { userPanelProfileTabs } from '@core/utils/constants.utils'
import {
  Address,
  Links,
  PersonalInformations,
  ProfilePic,
  UseIcon,
} from '@components/index'
import { profilePics } from '@core/index'
import { useSelector } from 'react-redux'

export function ProfileLayout({ userInfo }) {
  const [selected, setSelected] = useState('personalData')
  let defaultProfilePic = useSelector(
    (state) => state.darkMode.defaultProfilePic,
  )
  defaultProfilePic = profilePics.find((pic) => pic.key === defaultProfilePic)

  return (
    <>
      {userInfo && (
        <>
          <header className="relative h-28 rounded-t-2xl bg-primary-blue">
            <div className="absolute -bottom-1/2 right-10">
              <Badge
                content={<ImageAdd className="h-[16px] w-[16px]" />}
                color="primary"
                placement="bottom-right"
                className="mb-3 mr-[5px] cursor-pointer border-3 border-white p-[4px] dark:border-black"
                onClick={() => setSelected('profilePic')}
                shape="circle"
                isDot
              >
                <div className="flexC h-32 w-32 rounded-full border-[6px] border-white bg-primary-blue dark:border-black">
                  {defaultProfilePic && (
                    <div className="bgg-red-600 overflow-hidden rounded-full">
                      <UseIcon
                        icon={defaultProfilePic.icon}
                        className="h-24 w-24"
                      />
                    </div>
                  )}
                  {!defaultProfilePic && (
                    <div className="h-24 w-24 overflow-hidden rounded-full">
                      <img src={userInfo.currentPictureAddress} />
                    </div>
                  )}
                </div>
              </Badge>
            </div>
          </header>

          <main className="mt-12 p-10 pb-0">
            <section className="flex flex-col items-start justify-between gap-12 sm:flex-row">
              <div className="flex min-w-full flex-col gap-6 sm:min-w-fit">
                <div>
                  <span className="ml-2 text-3xl font-medium">
                    {userInfo.fName || 'نام'} {userInfo.lName || 'نام‌خانوادگی'}
                  </span>
                  <span className="text-basic-gray">( ادمین ، دانشجو ) </span>
                </div>

                <div className="flex flex-col items-start gap-2 text-basic-gray lg:flex-row lg:items-center">
                  <span className="flexC">
                    <MobileIcon className="-mt-1 ml-[2px] h-5 w-5 text-basic-gray" />
                    {userInfo.phoneNumber}
                  </span>

                  <div className="-mt-1 hidden h-1 w-1 rounded-full bg-basic-gray opacity-50 lg:block"></div>

                  <span className="flexC gap-1">
                    <AccountSetting className="text-b -mt-1" />{' '}
                    {userInfo.nationalCode || '0343254333'}
                  </span>

                  <div className="-mt-1 hidden h-1 w-1 rounded-full bg-basic-gray opacity-50 lg:block"></div>

                  <span className="flexC gap-1">
                    <Mail className="text-b -mt-[2px] h-5 w-5" />{' '}
                    {userInfo.email}
                    <PencilEdit className="-mt-1 mr-5 h-6 w-6 cursor-pointer text-primary-blue" />
                  </span>
                </div>
              </div>

              <div className="flex min-w-full flex-col gap-4 sm:w-2/5 sm:min-w-[30%]">
                <span className="text-basic-gray">درباره من</span>
                <p>
                  {userInfo.userAbout || (
                    <span>
                      من پارسا آقایی دانشجوی نوب سگ هستم که اخیرا دارم یاد
                      میگیرم برنامه نویسی رو و امیدوارم از نوبیت دربیام و بتونم
                      یه کاری پیدا کنم تو دنیای دیجیتال ، ممنون از همه 😊
                    </span>
                  )}
                </p>
              </div>
            </section>

            <div className="mt-14 flex w-full flex-col gap-2 sm:mt-10">
              <Tabs
                variant="underlined"
                selectedKey={selected}
                onSelectionChange={setSelected}
                className={``}
                classNames={{
                  tab: 'text-sm xs:text-base sm:text-lg md:text-xl px-0 h-12 max-w-fit pb-4 ',
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
                        className={` ${selected === tab.key ? 'text-black dark:text-white' : 'text-[#272727]/50 hover:text-[#272727]/100 dark:text-white/40'}`}
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
                        <ProfilePic
                          key={userInfo.userImage.length}
                          userInfo={userInfo}
                        />
                      )}
                      {tab.key === 'address' && <Address userInfo={userInfo} />}
                      {tab.key === 'links' && <Links userInfo={userInfo} />}
                    </div>
                  </Tab>
                ))}
              </Tabs>
            </div>
          </main>
        </>
      )}
    </>
  )
}
