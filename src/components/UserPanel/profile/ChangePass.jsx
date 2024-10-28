import { Lock } from '@assets/index'
import { BaseInput, Button } from '@components/index'
import { changePass, changePassword, loginSchema } from '@core/index'
import { zodResolver } from '@hookform/resolvers/zod'
import { tokenActions } from '@store/token-slice'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

export function ChangePass() {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(changePass) })

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      if (data.success) {
        if (data.token) {
          dispatch(
            tokenActions.login({
              token: data.token,
              id: data.id,
              roles: data.roles,
            }),
          )
        }
        toast.success(data.message)
      } else {
        toast.error(data.response.data.ErrorMessage.join(' ،‌ '))
      }
    },
  })

  function onSubmit(data) {
    mutate({ oldPassword: data.prevPass, newPassword: data.newPass })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-14 w-1/2">
      <BaseInput
        label="رمز عبور قدیمی"
        placeholder="رمز عبور قدیمی خود را وارد کنید"
        name="prevPass"
        register={register}
        size="lg"
        type="password"
        className="mb-14"
        starIcon={Lock}
        error={errors.prevPass}
      />
      <BaseInput
        label="رمز عبور جدید"
        placeholder="رمز عبور جدید خود را وارد کنید"
        name="newPass"
        register={register}
        className="mb-7"
        size="lg"
        type="password"
        starIcon={Lock}
        error={errors.newPass}
      />

      <Button type="submit" className="w-fit px-6 py-3">
        اعمال تغییرات
      </Button>
    </form>
  )
}
