import { CircularProgressAndLabel } from '@components/UserPanel/CircularProgressAndLabel'

export function UserProfileCompletion({ userInfo }) {
  return (
    <div className="h-fit min-w-full rounded-2xl p-4 lg:min-w-[30%] lg:max-w-72 lg:border dark:lg:border-gray-500">
      <p className="text-[17px]">وضعیت اطلاعات حساب</p>
      <div className="flex flex-col justify-center">
        <CircularProgressAndLabel
          value={userInfo.profileCompletionPercentage}
          label
          className="mx-auto mt-14"
          classNames={{
            label: 'text-sm text-[#FFC619] mt-4 text-center',
            svg: 'w-36 h-36',
            value: 'text-3xl',
          }}
        />
      </div>
    </div>
  )
}
