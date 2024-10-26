import { Code, Entering, Lock } from '@assets'
import { useForm } from 'react-hook-form'
import { BaseInput, Button, Step, AuthLayout } from '@components'
import { useMutation, useQuery } from '@tanstack/react-query'
import { forgetPassStep2Api, forgetPassStep3Api } from '@core/index'
import { useNavigate, useParams } from 'react-router-dom'

export function ForPass2() {
  const params = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit, getValues } = useForm()

  const { data } = useQuery({
    queryKey: ['resetPassword'],
    queryFn: ({ signal }) =>
      forgetPassStep2Api({ signal, configValue: params.configValue }),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: forgetPassStep3Api,
    onSuccess: (data) => {
      if (data.onSuccess) {
        alert(data.message)
        navigate('/auth')
      } else {
        alert(data.message)
      }
    },
    onError: () => {
      throw new Error('Something went wrong please try again later.')
    },
  })

  const onSubmit = (formData) => {
    if (data.success) {
      const newUserData = {
        newPassword: formData.newPass,
        userId: data.id,
        resetValue: data.message,
      }

      mutate(newUserData)
    } else {
      alert(data.message)
    }
  }

  const steps = [
    { stepNumber: 1, label: 'وارد کردن ایمیل', icon: Entering },
    { stepNumber: 2, label: 'وارد کردن رمزعبور جدید', icon: Code },
  ]

  return (
    <AuthLayout
      sideBar={
        <>
          {steps.map(({ stepNumber, label, icon }) => (
            <Step
              key={stepNumber}
              currentStep={1}
              stepNumber={stepNumber}
              label={label}
              icon={icon}
            />
          ))}
        </>
      }
    >
      <>
        <h1 className="text-2xl font-bold">رمزعبور جدید🔒</h1>
        <br />
        <p className="max-w-[538px] text-gray-500">
          رمزعبور جدید خود را وارد کنید
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-[70px] flex flex-col"
        >
          <BaseInput
            label="رمزعبور جدید"
            placeholder="رمزعبور جدید خود را وارد کنید"
            type="password"
            name="newPass"
            register={register}
            validation={{ required: 'رمزعبور جدید الزامی است' }}
            starIcon={Lock}
          />
          <BaseInput
            label="تکرار رمزعبور"
            placeholder="رمزعبور جدید خود را دوباره وارد کنید"
            type="password"
            name="confirmPass"
            register={register}
            validation={{
              required: 'تکرار رمزعبور الزامی است',
              validate: (value) =>
                value === getValues('newPass') || 'رمزعبورها مطابقت ندارند',
            }} // Validation for password confirmation
            size="lg"
            starIcon={Lock}
          />
          <Button
            isLoading= {isPending}
            type="submit"
            className="-mt-4 w-full bg-primary-blue p-4 text-white"
          >
            تایید کد
          </Button>
        </form>
      </>
    </AuthLayout>
  )
}
