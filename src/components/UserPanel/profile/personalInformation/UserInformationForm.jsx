import { BaseInput, Button, JalaliDatePicker } from '@components/index'
import {
  convertPersianDateToGerigorian,
  EditUserProfile,
  userProfileInformationSchema,
} from '@core/index'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@nextui-org/react'
import { tokenActions } from '@store/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import moment from 'moment-jalaali'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

export function UserInformationForm({ userInfo }) {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  moment.loadPersian()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userProfileInformationSchema) })

  const { mutate, isPending } = useMutation({
    mutationFn: EditUserProfile,
    onSuccess: (data) => {
      console.log(data)
      toast.success(' پروفایل با موفقیت ذخیره شد ')
      /* if (data.success) {
        if (data.newToken) {
          // dispatch(tokenActions.login({ token: data.token, id: data.id }))
        }
      } */
      queryClient.invalidateQueries(['userProfileInfo'])
    },
    onError: () => {
      toast.error(' مشکلی پیش آمد ')
    },
  })

  function onSubmit(data) {
    data.BirthDay = userInfo
      ? userInfo.birthDay
      : convertPersianDateToGerigorian(data.BirthDay)
    // convertPersianDateToGerigorian(data.BirthDay) || userInfo?.birthDay

    // console.log(data.BirthDay)

    data.Gender = data.Gender === 'true' ? true : false

    let newDateObj = {}
    if (userInfo.linkdinProfile !== null) {
      newDateObj.LinkdinProfile = userInfo.linkdinProfile
      newDateObj.TelegramLink = userInfo.telegramLink
    }

    if (userInfo.latitude !== null) {
      newDateObj.Latitude = userInfo.latitude
      newDateObj.Longitude = userInfo.longitude
    }

    newDateObj = { ...newDateObj, ...data }

    const fd = new FormData()
    Object.keys(newDateObj).forEach((key) => {
      fd.append(key, newDateObj[key])
    })
    mutate(fd)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="order-1 flex min-w-full flex-col gap-6 lg:order-[0] lg:min-w-[60%]"
    >
      <div className="flex flex-col justify-between gap-6 sm:flex-row">
        <BaseInput
          label="نام"
          placeholder="نام خود را وارد کنید"
          classNames={{ label: 'text-base' }}
          className="mb-0 sm:w-[45%]"
          defaultValue={userInfo.fName}
          name="FName"
          register={register}
          error={errors.FName}
        />
        <BaseInput
          label="نام خانوادگی"
          placeholder="نام خانوادگی خود را وارد کنید"
          classNames={{ label: 'text-base' }}
          className="mb-0 sm:w-[45%]"
          defaultValue={userInfo.lName}
          name="LName"
          register={register}
          error={errors.LName}
        />
      </div>

      <Textarea
        variant="flat"
        maxRows={3}
        label="درباره من"
        labelPlacement="outside"
        placeholder="یک متن درباره خود را وارد کنید"
        classNames={{ label: 'font-medium text-base' }}
        defaultValue={userInfo.userAbout}
        {...register('UserAbout')}
        isInvalid={errors.UserAbout}
        errorMessage={errors?.UserAbout?.message}
      />

      <div className="flex flex-col justify-between gap-6 sm:flex-row">
        <BaseInput
          label="شماره همراه"
          placeholder="شماره همراه خود را وارد کنید"
          classNames={{ label: 'text-base' }}
          className="mb-0 sm:w-[45%]"
          isReadOnly
          defaultValue={userInfo.phoneNumber}
          isDisabled
        />
        <BaseInput
          label="کد ملی"
          placeholder="کد ملی خود را وارد کنید"
          classNames={{ label: 'text-base' }}
          className="mb-0 sm:w-[45%]"
          defaultValue={userInfo.nationalCode}
          name="NationalCode"
          register={register}
          error={errors.NationalCode}
        />
      </div>

      <div className="mb-5 flex flex-col justify-between gap-6 sm:mb-0 sm:flex-row sm:items-center">
        <div className="sm:w-[45%]">
          <JalaliDatePicker
            defaultValue={userInfo.birthDay}
            label="تاریخ تولد"
            name="BirthDay"
            register={register}
            error={errors.BirthDay}
          />
        </div>

        <div className="-bottom- relative flex flex-col justify-center sm:w-[45%]">
          <span className="mb-4 font-medium">جنسیت</span>

          <div className="mb-4 flex items-center">
            <div className="flex">
              <label className="ltr ml-5 cursor-pointer">
                <input
                  type="radio"
                  className="mr-2 cursor-pointer"
                  defaultChecked={userInfo.gender}
                  value={true}
                  {...register('Gender')}
                />
                مرد
              </label>
              <label className="ltr cursor-pointer">
                <input
                  className="mr-2 cursor-pointer"
                  type="radio"
                  defaultChecked={!userInfo.gender}
                  value={false}
                  {...register('Gender')}
                />
                زن
              </label>
            </div>

            <p className="mr-7 font-thin text-primary-blue">انتخاب کنید</p>
          </div>

          {errors?.Gender && (
            <p className="text-xs text-[#f31260]">{errors?.Gender?.message}</p>
          )}
        </div>
      </div>

      <BaseInput
        label="ایمیل"
        placeholder="ایمیل خود را وارد کنید"
        classNames={{ label: 'text-base ' }}
        className="mb-0"
        isReadOnly
        defaultValue={userInfo.email}
        isDisabled
      />

      <Textarea
        variant="flat"
        maxRows={2}
        label="آدرس سکونت"
        labelPlacement="outside"
        placeholder="آدرس سکونت خود را وارد کنید"
        className=""
        classNames={{ label: 'font-medium text-base' }}
        defaultValue={userInfo.homeAdderess}
        {...register('HomeAdderess')}
        isInvalid={errors.HomeAdderess}
        errorMessage={errors?.HomeAdderess?.message}
      />

      <Button type="submit" className="w-fit px-6 py-3" isLoading={isPending}>
        اعمال تغییرات
      </Button>
    </form>
  )
}
