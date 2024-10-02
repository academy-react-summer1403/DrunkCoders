import { AuthLayout } from './AuthLayout';
import { useForm } from 'react-hook-form';
import Code from '../../assets/icons/password-validation-stroke-rounded 2.svg?react';
import Entering from '../../assets/icons/mail-edit-02-stroke-rounded 1.svg?react';
import Acount from '../../assets/icons/user-account-stroke-rounded 2.svg?react';
import { Step } from './Step';
import { useState } from 'react';
import { RegisterForm } from './RegisterForm'; // Import the new RegisterForm component
import { Verification } from './Verification';

export function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data: ', data);
    // Handle login submission (e.g., API call)
  };

  const steps = [
    { stepNumber: 1, label: 'وارد کردن شماره همراه', icon: Entering },
    { stepNumber: 2, label: 'تایید کد ارسال شده به شماره همراه', icon: Code },
    { stepNumber: 3, label: 'وارد کردن اطلاعات حساب کاربری', icon: Acount },
  ];

  return (
    <AuthLayout
      sideBar={
        <>
          {steps.map(({ stepNumber, label, icon }) => (
            <Step key={stepNumber} currentStep={currentStep} stepNumber={stepNumber} label={label} icon={icon} />
          ))}
        </>
      }
    >
      <h1 className="text-2xl font-bold">به آکادمی بحر خوش اومدی!😍</h1>
      <br />

        {currentStep === 1 ?(      
        <RegisterForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        />) : (
        <Verification
        handleSubmit={handleSubmit}
        register={register}
        onSubmit={onSubmit}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        />
        )
        }
    </AuthLayout>
  );
}
