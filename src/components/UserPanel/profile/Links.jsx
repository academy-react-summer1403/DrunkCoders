import { Linkedin, Telegram } from '@assets/index'
import { BaseInput, Button } from '@components/index'
import { EditUserProfile, userProfileLinksSchema } from '@core/index'
import { useMutation } from '@tanstack/react-query'
import { tokenActions } from '@store/index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

export function Links({ userInfo }) {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userProfileLinksSchema) })

  const { mutate } = useMutation({
    mutationFn: EditUserProfile,
    onSuccess: (data) => {
      toast.success(data.message)
      if (data.success) {
        if (data.newToken) {
          dispatch(tokenActions.login({ token: data.token, id: data.id }))
        }
      }
    },
  })

  function onSubmit(data) {
    if (!userInfo.fName) {
      toast.error('لطفا ابتدا اطلاعات شخصی را کامل بفرمایید')
      return
    }

    let newObject = {}

    if (userInfo.latitude !== null) {
      newObject.Latitude = userInfo.latitude
      newObject.Longitude = userInfo.longitude
    }

    newObject = {
      ...newObject,
      LName: userInfo.lName,
      FName: userInfo.fName,
      UserAbout: userInfo.userAbout,
      HomeAdderess: userInfo.homeAdderess,
      NationalCode: userInfo.nationalCode,
      Gender: userInfo.gender,
      BirthDay: userInfo.birthDay,
      ...data,
    }

    const fd = new FormData()
    Object.keys(newObject).forEach((key) => {
      fd.append(key, newObject[key])
    })
    mutate(fd)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-14">
      <BaseInput
        label="تلگرام"
        placeholder="لینک تلگرام خود را وارد کنید"
        classNames={{ label: 'text-base', input: 'ltr' }}
        className="mb-14 sm:w-[65%] md:w-[55%] lg:w-[45%]"
        starIcon={Telegram}
        defaultValue={userInfo.telegramLink}
        name="TelegramLink"
        register={register}
        error={errors.TelegramLink}
      />
      <BaseInput
        label="لینکدین "
        placeholder="لینک لینکدین خود را وارد کنید"
        classNames={{ label: 'text-base', input: 'ltr' }}
        className="mb-0 sm:w-[65%] md:w-[55%] lg:w-[45%]"
        starIcon={Linkedin}
        defaultValue={userInfo.linkdinProfile}
        name="LinkdinProfile"
        register={register}
        error={errors.LinkdinProfile}
      />

      <Button type="submit" className="mt-7 w-fit px-6 py-3">
        اعمال تغییرات
      </Button>
    </form>
  )
}
