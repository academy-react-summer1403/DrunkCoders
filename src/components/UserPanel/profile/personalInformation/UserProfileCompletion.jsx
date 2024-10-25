import { CircularProgress } from '@nextui-org/react'

export function UserProfileCompletion({ userInfo }) {
  return (
    <div className="h-fit min-w-full rounded-2xl p-4 lg:min-w-[30%] lg:max-w-72 lg:border">
      <p className="text-[17px]">وضعیت اطلاعات حساب</p>
      <div className="flex flex-col justify-center">
        <CircularProgress
          label={
            userInfo.profileCompletionPercentage === 100 ? (
              <span className="text-green-700">
                اطلاعات حساب‌ کاربری شما تکمیل است
              </span>
            ) : (
              'اطلاعات حساب‌ کاربری شما تکمیل نیست'
            )
          }
          size="lg"
          value={userInfo.profileCompletionPercentage}
          className="mx-auto mt-14"
          showValueLabel={true}
          classNames={{
            svg: `w-36 h-36 ${userInfo.profileCompletionPercentage === 100 ? 'text-green-700' : 'text-[#FFC619]'}`,
            value: `text-3xl font-thin ${userInfo.profileCompletionPercentage === 100 ? 'text-green-700' : 'text-[#FFC619]'}`,
            label: 'text-sm text-[#FFC619] mt-4 text-center',
          }}
        />
      </div>
    </div>
  )
}
