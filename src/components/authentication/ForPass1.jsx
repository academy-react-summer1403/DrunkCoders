import { Code, Entering, Mail } from '@assets'
import { useForm } from 'react-hook-form'
import { BaseInput, Button, Step, AuthLayout } from '@components'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { forgetPassStep1Api } from '@core/index'
import toast from 'react-hot-toast'

export function ForPass1() {
  const { register, handleSubmit } = useForm()

  const { mutate, isPending } = useMutation({
    mutationFn: forgetPassStep1Api,
    onSuccess: (data) => {
      if (data.success) toast.success('ایمیل تغییر رمز عبور ارسال شد.')
      else {
        throw new Error('Something went wrong please try again later.')
      }
    },
  })

  const onSubmit = (data) => {
    const dataWithUrl = {
      ...data,
      baseUrl: window.location.href,
    }

    mutate(dataWithUrl)
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
        <h1 className="text-2xl font-bold">فراموشی رمزعبور؟🔐</h1>
        <br />
        <p className="max-w-[538px] text-gray-500">
          اگر رمزعبور خود را فراموش کرده‌اید ایمیل خود را وارد کنید تا لینک صفحه
          تغییر رمزعبور برای شما ارسال شود
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-20">
          <BaseInput
            label="ایمیل"
            placeholder="ایمیل خود را وارد کنید"
            type="email"
            name="email"
            register={register}
            validation={{ required: 'ایمیل الزامی است' }}
            size="lg"
            starIcon={Mail}
          />
          <Button
            isLoading= {isPending}
            type="submit"
            className="-mt-5 w-full bg-primary-blue p-4 text-white"
            // disabled={currentStep === 2}
          >
            ارسال لینک
          </Button>

          <p className="m-auto mt-4 w-fit">
            رمزعبور خود فراموش نکردید؟{' '}
            <Link to="/auth" className="text-primary-blue hover:underline">
              ورود به حساب کاربری
            </Link>
          </p>
        </form>
      </>
    </AuthLayout>
  )
}

// return (
//   <>
//     <AuthLayout
//       sideBar={
//         <>
//           {steps.map(({ stepNumber, label, icon }) => (
//             <Step
//               key={stepNumber}
//               currentStep={currentStep}
//               stepNumber={stepNumber}
//               label={label}
//               icon={icon}
//             />
//           ))}
//         </>
//       }
//     >
//       {/* Step 1: Enter email */}
//       {currentStep === 1 ? (
//         <>
//           <h1 className="text-2xl font-bold">فراموشی رمزعبور؟🔐</h1>
//           <br />
//           <p className="max-w-[538px] text-gray-500">
//             اگر رمزعبور خود را فراموش کرده‌اید ایمیل خود را وارد کنید تا لینک
//             صفحه تغییر رمزعبور برای شما ارسال شود
//           </p>

//           <form onSubmit={handleSubmit(onSubmit)} className="mt-20">
//             <BaseInput
//               label="ایمیل"
//               placeholder="ایمیل خود را وارد کنید"
//               type="email"
//               name="email"
//               register={register}
//               validation={{ required: 'ایمیل الزامی است' }} // Adding validation
//               size="lg"
//               starIcon={Mail}
//             />
//             <Button
//               type="submit"
//               className="-mt-5 w-full bg-primary-blue p-4 text-white"
//               disabled={currentStep === 2}
//             >
//               ارسال لینک
//             </Button>
//             <p className="m-auto mt-4 w-fit">
//               رمزعبور خود فراموش نکردید؟{' '}
//               <Link to="/auth" className="text-primary-blue hover:underline">
//                 ورود به حساب کاربری
//               </Link>
//             </p>
//           </form>
//         </>
//       ) : (
//         // Step 2: Enter new password
//         <>
//           <h1 className="text-2xl font-bold">رمزعبور جدید🔒</h1>
//           <br />
//           <p className="max-w-[538px] text-gray-500">
//             رمزعبور جدید خود را وارد کنید
//           </p>
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="mt-[70px] flex flex-col"
//           >
//             <BaseInput
//               label="رمزعبور جدید"
//               placeholder="رمزعبور جدید خود را وارد کنید"
//               type="password"
//               name="newPass"
//               register={register}
//               validation={{ required: 'رمزعبور جدید الزامی است' }} // Adding validation
//               size="lg"
//               starIcon={Lock}
//             />
//             <BaseInput
//               label="تکرار رمزعبور"
//               placeholder="رمزعبور جدید خود را دوباره وارد کنید"
//               type="password"
//               name="confirmPass"
//               register={register}
//               validation={{
//                 required: 'تکرار رمزعبور الزامی است',
//                 validate: (value) =>
//                   value === getValues('newPass') || 'رمزعبورها مطابقت ندارند',
//               }} // Validation for password confirmation
//               size="lg"
//               starIcon={Lock}
//             />
//             <Button
//               type="submit"
//               className="-mt-4 w-full bg-primary-blue p-4 text-white"
//             >
//               تایید کد
//             </Button>
//           </form>
//         </>
//       )}
//     </AuthLayout>
//   </>
// )
