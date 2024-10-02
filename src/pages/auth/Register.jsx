import {Link} from 'react-router-dom'
import { AuthLayout } from './AuthLayout'
import { BaseInput, Button } from '../../components'
import { useForm } from 'react-hook-form'
import MobileIcon from '../../assets/icons/smart-phone-01-stroke-rounded 2.svg?react'
import Code from '../../assets/icons/password-validation-stroke-rounded 2.svg?react';
import { Step } from './Step'
import { useState } from 'react'

export function Register() {
    const [currentStep, setCurrentStep] = useState(1);
    const {
        register,
        handleSubmit,
    } = useForm()

    const onSubmit = (data) => {
        console.log('Form Data: ', data)
        // Handle login submission (e.g., API call)
    }
    const steps = [
        { stepNumber: 1, label: 'وارد کردن شماره همراه', icon: Code },
        { stepNumber: 2, label: 'تایید کد ارسال شده به شماره همراه', icon: Code },
        { stepNumber: 3, label: 'وارد کردن اطلاعات حساب کاربری', icon: Code }
      ];
    return (
       <AuthLayout
       sideBar={
        <>
          {steps.map(({ stepNumber, label, icon }) => (
            <Step key={stepNumber} currentStep={currentStep} stepNumber={stepNumber} label={label} icon={icon} />
          ))}
        </>
      }>
            <h1 className="text-2xl font-bold">به آکادمی بحر خوش اومدی!😍</h1>
            <br />
            <p className="text-gray-500">
                لطفاً برای ثبت نام، شماره همراه خود را وارد کنید تا برای شما کد تایید ارسال
                شود.
            </p>
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <BaseInput
                    label='شماره همراه'
                    placeholder='شماره همراه خود را وارد کنید'
                    type='text'
                    name='number'
                    register={register}
                    size="lg"
                    starIcon={MobileIcon}
                    />
                <Button type='submit' className='p-4 bg-primary-blue text-white w-full -mt-5'
                 onClick={() => setCurrentStep(2)}
                 disabled={currentStep === 2}>
                ارسال کد تایید
                </Button>
            </form>
            <p className="mt-4 w-fit m-auto">
                حساب کاربری دارید؟{' '}
                <Link to="/auth" className="text-primary-blue hover:underline">
                    ورود به حساب کاربری
                </Link>
            </p>
       </AuthLayout>
    )
}
