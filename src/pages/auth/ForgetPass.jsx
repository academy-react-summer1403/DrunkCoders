import { useState } from 'react';
import { AuthLayout } from './AuthLayout';
import { Step } from './Step';
import Code from '../../assets/icons/password-validation-stroke-rounded 2.svg?react';
import Entering from '../../assets/icons/mail-edit-02-stroke-rounded 1.svg?react';
import Mail from '../../assets/icons/mail-02-stroke-rounded 1.svg?react';
import Lock from '../../assets/icons/lock-password-stroke-rounded 1.svg?react';
import { useForm } from 'react-hook-form';
import { BaseInput, Button } from '../../components/index';
import { Link } from 'react-router-dom';

export function ForgetPass() {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data: ', data);
    // Handle login submission (e.g., API call)
  };

  const steps = [
    { stepNumber: 1, label: 'وارد کردن شماره همراه یا ایمیل', icon: Entering },
    { stepNumber: 2, label: 'تایید کد ارسال شده', icon: Code }
  ];

  return (
    <>
      <AuthLayout
        sideBar={
          <>
            {steps.map(({ stepNumber, label, icon }) => (
              <Step key={stepNumber} currentStep={currentStep} stepNumber={stepNumber} label={label} icon={icon} />
            ))}
          </>
        }
      >
        {currentStep === 1 ? (
          <>
            <h1 className="text-2xl font-bold">فراموشی رمزعبور؟🔐</h1>
            <br />
            <p className="text-gray-500 max-w-[538px]">
              اگر رمزعبور خود را فراموش کرده‌اید ایمیل خود را وارد کنید تا لینک صفحه تغییر رمزعبور برای شما ارسال شود
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-20">
              <BaseInput
                label="ایمیل"
                placeholder="ایمیل خود را وارد کنید"
                type="email"
                name="email"
                register={register}
                size="lg"
                starIcon={Mail}
              />
              <Button
                type="submit"
                className="p-4 bg-primary-blue text-white w-full -mt-5"
                onClick={() => setCurrentStep(2)}
                disabled={currentStep === 2}
              >
                ارسال لینک
              </Button>
              <p className="mt-4 w-fit m-auto">
                رمزعبور خود فراموش نکردید؟{' '}
                <Link to="/auth" className="text-primary-blue hover:underline">
                  ورود به حساب کاربری
                </Link>
              </p>
            </form>
          </>
        ) : (
          <>
            {/* Render step 2 content here */}
            <h1 className="text-2xl font-bold">رمزعبور جدید🔒</h1>
            <br />
            <p className="text-gray-500 max-w-[538px]">
            رمزعبور جدید خود را وارد کنید
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-[70px]">
              {/* Assuming you have an OtpInput component for OTP verification */}
              <BaseInput
                label='رمزعبور جدید'
                placeholder='رمزعبور جدید خود را وارد کنید'
                type="password"
                name="newPass"
                register={register}
                size="lg"
                starIcon={Lock}
              />
              <BaseInput
                label='تکرار رمزعبور'
                placeholder='رمزعبور جدید خود را دوباره وارد کنید'
                type="password"
                name="newPass"
                register={register}
                size="lg"
                starIcon={Lock}
              />
              <Button
                type="submit"
                className="p-4 bg-primary-blue text-white w-full -mt-5"
              >
                تایید کد
              </Button>
            </form>
          </>
        )}
      </AuthLayout>
    </>
  );
}
