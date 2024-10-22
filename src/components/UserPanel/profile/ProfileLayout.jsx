import { Badge, Tab, Tabs } from '@nextui-org/react'
import {
  AccountSetting,
  Hand,
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
} from '@components/index'

export function ProfileLayout() {
  const [selected, setSelected] = useState('personalData')

  return (
    <>
      <header className="relative h-28 rounded-t-2xl bg-primary-blue">
        <div className="absolute -bottom-1/2 right-10">
          <Badge
            content={<ImageAdd className="h-[16px] w-[16px]" />}
            color="primary"
            placement="bottom-right"
            className="mb-3 mr-[5px] border-3 border-white p-[4px] dark:border-black"
            shape="circle"
            isDot
          >
            <div className="flexC h-32 w-32 rounded-full border-[6px] border-white bg-primary-blue dark:border-black">
              <Hand className="h-24 w-24" />
            </div>
          </Badge>
        </div>
      </header>

      <main className="mt-12 p-10 pb-0">
        <section className="flex flex-col items-start justify-between gap-12 sm:flex-row">
          <div className="flex min-w-full flex-col gap-6 sm:min-w-fit">
            <div>
              <span className="ml-2 text-3xl font-medium">پارسا آقایی</span>
              <span className="text-basic-gray">( ادمین ، دانشجو ) </span>
            </div>

            <div className="flex flex-col items-start gap-2 text-basic-gray lg:flex-row lg:items-center">
              <span className="flexC">
                <MobileIcon className="-mt-1 ml-[2px] h-5 w-5 text-basic-gray" />
                09121231234
              </span>

              <div className="-mt-1 hidden h-1 w-1 rounded-full bg-basic-gray opacity-50 lg:block"></div>

              <span className="flexC gap-1">
                <AccountSetting className="text-b -mt-1" /> 0372235050
              </span>

              <div className="-mt-1 hidden h-1 w-1 rounded-full bg-basic-gray opacity-50 lg:block"></div>

              <span className="flexC gap-1">
                <Mail className="text-b -mt-[2px] h-5 w-5" /> Example@gmail.com
                <PencilEdit className="-mt-1 mr-5 h-6 w-6 cursor-pointer text-primary-blue" />
              </span>
            </div>
          </div>

          <div className="flex min-w-full flex-col gap-4 sm:w-2/5 sm:min-w-[40%]">
            <span className="text-basic-gray">درباره من</span>
            <p>
              من پارسا آقایی دانشجوی نوب سگ هستم که اخیرا دارم یاد میگیرم برنامه
              نویسی رو و امیدوارم از نوبیت دربیام و بتونم یه کاری پیدا کنم تو
              دنیای دیجیتال ، ممنون از همه 😊
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
                {tab.key === 'personalData' && <PersonalInformations />}
                {tab.key === 'profilePic' && <ProfilePic />}
                {tab.key === 'address' && <Address />}
                {tab.key === 'links' && <Links />}
              </Tab>
            ))}
          </Tabs>
        </div>
      </main>
    </>
  )
}
