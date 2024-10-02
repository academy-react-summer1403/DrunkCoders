import { Link } from 'react-router-dom';
import { BaseInput, OtpInput, Button } from '../../components/index';
import { useForm } from 'react-hook-form';
import { AuthLayout } from './AuthLayout';
import Mail from '../../assets/icons/mail-02-stroke-rounded 1.svg?react';
import Lock from '../../assets/icons/lock-password-stroke-rounded 1.svg?react';
import Code from '../../assets/icons/password-validation-stroke-rounded 2.svg?react';
import { useState } from 'react';
import {Step} from './Step'; // Import the Step component

export function Login() {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data: ', data);
    // Handle login submission (e.g., API call)
  };

  const steps = [
    { stepNumber: 1, label: 'وارد کردن شماره همراه یا ایمیل', icon: Code },
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
        <h1 className="text-2xl font-bold">!خوش برگشتی👋</h1>
        <br />
        <p className="text-gray-500">
          لطفا برای ورود به پنل خود ایمیل یا شماره همراه و رمز عبور خود را وارد کنید
        </p>
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <BaseInput
            label="ایمیل یا شماره همراه"
            placeholder="ایمیل یا شماره همراه خود را وارد کنید"
            name="emailOrPhone"
            register={register}
            size="lg"
            type="text"
            starIcon={Mail}
          />
          <BaseInput
            label="رمز عبور"
            placeholder="رمز عبور خود را وارد کنید"
            name="password"
            register={register}
            size="lg"
            type="password"
            starIcon={Lock}
          />
          <Button
            type="submit"
            className="p-4 bg-primary-blue text-white w-full -mt-5"
            onClick={() => setCurrentStep(2)}
            disabled={currentStep === 2}
          >
            ورود به حساب کاربری
          </Button>
        </form>

        <p className="mt-4 w-fit m-auto">
          حساب کاربری ندارید؟{' '}
          <Link to="register" className="text-primary-blue hover:underline">
            ایجاد حساب کاربری
          </Link>
        </p>
      </AuthLayout>
    </>
  );
}
