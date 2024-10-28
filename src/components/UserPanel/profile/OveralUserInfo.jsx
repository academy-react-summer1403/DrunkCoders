import { AccountSetting, Mail, MobileIcon, PencilEdit } from '@assets/index'
import { roleMapper } from '@core/index'

export function OveralUserInfo({ userInfo, roles }) {
  return (
    <section className="flex flex-col items-start justify-between gap-12 sm:flex-row">
      <div className="flex min-w-full flex-col gap-6 sm:min-w-fit">
        <div>
          <span className="ml-2 text-3xl font-medium">
            {userInfo.fName || 'نام'} {userInfo.lName || 'نام‌خانوادگی'}
          </span>
          <span className="text-basic-gray">
            ( {roleMapper(roles).join(' ، ')} )
          </span>
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
            <Mail className="text-b -mt-[2px] h-5 w-5" /> {userInfo.email}
            <PencilEdit className="-mt-1 mr-5 h-6 w-6 cursor-pointer text-primary-blue" />
          </span>
        </div>
      </div>

      <div className="flex min-w-full flex-col gap-4 sm:w-2/5 sm:min-w-[30%]">
        <span className="text-basic-gray">درباره من</span>
        <p>
          {userInfo.userAbout || (
            <span>
              من پارسا آقایی دانشجوی نوب سگ هستم که اخیرا دارم یاد میگیرم برنامه
              نویسی رو و امیدوارم از نوبیت دربیام و بتونم یه کاری پیدا کنم تو
              دنیای دیجیتال ، ممنون از همه 😊
            </span>
          )}
        </p>
      </div>
    </section>
  )
}
