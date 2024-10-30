import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { registerSchema, registerApi } from '@core'
import { BaseInput, Button } from '@components'
import { MobileIcon } from '@assets'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function RegisterForm({ currentStep, setCurrentStep, setPhoneNumber }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const { mutate:mutateAsync, isPending, error } = useMutation({
    mutationFn: registerApi,
    onSuccess: (response) => {
      if(response.message === "درخواست نامعتبر") {
        toast.error( response.message )
      } else {
        toast.success( ' کد تایید ارسال شد ' )
        setCurrentStep(2)
      }
    },
    onError: () => {
      console.error('Error sending verification code')
    },
  })
  
  const onSubmit = async (data) => {
   /*  try {
      setPhoneNumber(data.phoneNumber)
      const response = await mutateAsync({ phoneNumber: data.phoneNumber })
      if (response) {
        setCurrentStep(2)
      }
    } catch (err) {
      console.error('Error sending verification code', err)
    } */

      mutateAsync({ phoneNumber: data.phoneNumber })
  }

  return (
    <>
      <p className="text-gray-500">
        لطفاً برای ثبت نام، شماره همراه خود را وارد کنید تا برای شما کد تایید
        ارسال شود.
      </p>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          label="شماره همراه"
          placeholder="شماره همراه خود را وارد کنید"
          type="text"
          name="phoneNumber"
          register={register}
          size="lg"
          starIcon={MobileIcon}
          error={errors.phoneNumber} // Pass the correct error to BaseInput
        />
        <Button
          isLoading= {isPending}
          type="submit"
          className="-mt-5 w-full bg-primary-blue p-4 text-white"
          disabled={currentStep === 2}
        >
          ارسال کد تایید
        </Button>
      </form>
      <p className="m-auto mt-4 w-fit">
        حساب کاربری دارید؟{' '}
        <Link to="/auth" className="text-primary-blue hover:underline">
          ورود به حساب کاربری
        </Link>
      </p>
    </>
  )
}
