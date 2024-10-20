import {
  Badge,
  CircularProgress,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  Textarea,
} from '@nextui-org/react'
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
import { BaseInput, Button, JalaliDatePicker } from '@components/index'

export function ProfilePage() {
  const [selected, setSelected] = useState('personalData')
  const [radioSelected, setRadioSelected] = useState('personalData')
  // console.log(selected)

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
        <section className="flex items-baseline justify-between gap-12">
          <div className="flex flex-col gap-6">
            <div>
              <span className="ml-2 text-3xl font-medium">پارسا آقایی</span>
              <span className="text-basic-gray">( ادمین ، دانشجو ) </span>
            </div>

            <div className="flex items-center gap-2 text-basic-gray">
              <span className="flexC">
                <MobileIcon className="-mt-1 ml-[2px] h-5 w-5 text-basic-gray" />
                09121231234
              </span>

              <div className="-mt-1 h-1 w-1 rounded-full bg-basic-gray opacity-50"></div>

              <span className="flexC gap-1">
                <AccountSetting className="text-b -mt-1" /> 0372235050
              </span>

              <div className="-mt-1 h-1 w-1 rounded-full bg-basic-gray opacity-50"></div>

              <span className="flexC gap-1">
                <Mail className="text-b -mt-[2px] h-5 w-5" /> Example@gmail.com
                <PencilEdit className="-mt-1 mr-5 h-6 w-6 cursor-pointer text-primary-blue" />
              </span>
            </div>
          </div>

          <div className="flex w-2/5 flex-col gap-4">
            <span className="text-basic-gray">درباره من</span>
            <p>
              من پارسا آقایی دانشجوی نوب سگ هستم که اخیرا دارم یاد میگیرم برنامه
              نویسی رو و امیدوارم از نوبیت دربیام و بتونم یه کاری پیدا کنم تو
              دنیای دیجیتال ، ممنون از همه 😊
            </p>
          </div>
        </section>

        <div className="mt-10 flex w-full flex-col">
          <Tabs
            variant="underlined"
            selectedKey={selected}
            onSelectionChange={setSelected}
            className={``}
            classNames={{
              tab: 'text-xl font-medium max-w-fit pb-4 ',
              tabList: 'w-full border-b border-divider overflow-hidden',
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
                <div className="flex justify-between gap-12 pt-5">
                  <div className="flex w-[60%] flex-col gap-6">
                    <div className="flex justify-between gap-6">
                      <BaseInput
                        label="نام"
                        placeholder="نام خود را وارد کنید"
                        classNames={{ label: 'text-base' }}
                        className="mb-0 w-[45%]"
                      />
                      <BaseInput
                        label="نام خانوادگی"
                        placeholder="نام خانوادگی خود را وارد کنید"
                        classNames={{ label: 'text-base' }}
                        className="mb-0 w-[45%]"
                      />
                    </div>

                    <Textarea
                      variant="flat"
                      label="درباره من"
                      labelPlacement="outside"
                      placeholder="یک متن درباره خود را وارد کنید"
                      className=""
                      classNames={{ label: 'font-medium text-base' }}
                    />

                    <div className="flex justify-between gap-6">
                      <BaseInput
                        label="شماره همراه"
                        placeholder="شماره همراه خود را وارد کنید"
                        classNames={{ label: 'text-base' }}
                        className="mb-0 w-[45%]"
                      />
                      <BaseInput
                        label="کد ملی"
                        placeholder="کد ملی خود را وارد کنید"
                        classNames={{ label: 'text-base' }}
                        className="mb-0 w-[45%]"
                      />
                    </div>

                    <div className="flex justify-between gap-6">
                      <div className="w-[45%]">
                        <JalaliDatePicker label="تاریخ تولد" />
                      </div>

                      <div className="flex w-[45%]">
                        <RadioGroup
                          label="جنسیت"
                          size="sm"
                          value={radioSelected}
                          onValueChange={setRadioSelected}
                          orientation="horizontal"
                          classNames={{
                            wrapper: 'ltr flex-row gap-7 flex-nowrap',
                            label:
                              'text-black text-base font-medium dark:text-white mb-2',
                          }}
                        >
                          <Radio
                            value="woman"
                            classNames={{ label: 'text-base ml-2' }}
                          >
                            زن
                          </Radio>
                          <Radio
                            value="man"
                            className="mlg-7"
                            classNames={{ label: 'text-base ml-2' }}
                          >
                            مرد
                          </Radio>
                        </RadioGroup>
                        <p className="relative -bottom-10 -left-7 font-thin text-primary-blue">
                          انتخاب کنید
                        </p>
                      </div>
                    </div>

                    <BaseInput
                      label="ایمیل"
                      placeholder="ایمیل خود را وارد کنید"
                      classNames={{ label: 'text-base' }}
                      className="mb-0"
                    />

                    <Textarea
                      variant="flat"
                      label="آدرس سکونت"
                      labelPlacement="outside"
                      placeholder="آدرس سکونت خود را وارد کنید"
                      className=""
                      classNames={{ label: 'font-medium text-base' }}
                    />

                    <Button className="w-fit px-6 py-3">اعمال تغییرات</Button>
                  </div>

                  <div className="h-fit w-[30%] rounded-2xl border p-4">
                    <p>وضعیت اطلاعات حساب</p>
                    <div className="flex flex-col justify-center">
                      <CircularProgress
                        label="اطلاعات حساب‌کابری شما تکمیل نیست"
                        size="lg"
                        value={60}
                        className="mt-14"
                        showValueLabel={true}
                        classNames={{
                          svg: 'w-36 h-36 text-[#FFC619]',
                          value: 'text-3xl font-thin text-[#FFC619]',
                          label: 'text-sm text-[#FFC619] mt-4',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Tab>
            ))}
          </Tabs>
        </div>
      </main>
    </>
  )
}
