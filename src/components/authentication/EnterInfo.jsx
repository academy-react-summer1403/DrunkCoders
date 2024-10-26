import React from 'react'
import { useForm } from 'react-hook-form'
import { BaseInput, Button } from '@components'
import { Mail, Lock } from '@assets'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  deleteLocalStorage,
  infoSchema,
  loginUser,
  registerFinalApi,
  setLocalStorage,
} from '@core/index'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { tokenActions } from '@store/index'

export function EnterInfo({ currentStep, setCurrentStep, phoneNumber }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(infoSchema),
  })

  const { mutate: loginMutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      alert(data.message)
      if (data.success) {
        dispatch(tokenActions.login(data.token))
        navigate('/')
      } else {
        deleteLocalStorage('token')
      }
    },
  })

  const { mutate: registerMutate, isPending } = useMutation({
    mutationFn: registerFinalApi,
    onSuccess: (data, variables) => {
      alert(data.message)
      console.log('variables: ', variables)

      if (data.success) {
        setLocalStorage('defaultProfilePic', 'hand')

        loginMutate({
          phoneOrGmail: variables.gmail,
          password: variables.password,
          rememberMe: false,
        })
      }
    },
    onError: () => {
      alert('Registration failed')
    },
  })

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      phoneNumber, // Include phoneNumber in form data
    }
    console.log('Form Data to be sent:', formData)

    // const response = await registerFinalApi(formData)

    registerMutate(formData)

    /* if (response && response.success) {
      console.log('Registration successful:', response)
      setCurrentStep(3)
    } else {
      console.error('Registration failed')
    } */
  }

  return (
    <>
      <p className="text-gray-500">
        لطفا اطلاعات شخصی حساب کاربری خود را وارد کنید
      </p>
      <br />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-14">
        <BaseInput
          label="ایمیل"
          placeholder="ایمیل خود را وارد کنید"
          name="gmail" // Changed to gmail
          register={register}
          size="lg"
          type="text"
          starIcon={Mail}
          error={errors.gmail} // Changed to gmail for error handling
          className="mb-16"
        />
        <BaseInput
          label="رمز عبور"
          placeholder="رمز عبور خود را وارد کنید"
          name="password"
          register={register}
          size="lg"
          type="password"
          starIcon={Lock}
          error={errors.password} // Show error for password
        />
        <Button
          isLoading={isPending}
          type="submit"
          className="w-full bg-primary-blue p-4 text-white"
          disabled={currentStep === 3}
        >
          ثبت اطلاعات
        </Button>
      </form>
    </>
  )
}
