import { useState } from "react";
import { useForm } from "react-hook-form";
import { Code, Entering, Acount } from "@assets";
import {
  AuthLayout,
  Step,
  RegisterForm,
  Verification,
  EnterInfo,
} from "@components";

export function RegContainer() {
  const [currentStep, setCurrentStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState(""); 
  const { register, handleSubmit } = useForm();


  const stepComponents = [
    <RegisterForm
      key={1}
      register={register}
      handleSubmit={handleSubmit}
      setCurrentStep={setCurrentStep}
      setPhoneNumber={setPhoneNumber}
    />,
    <Verification
      key={2}
      phoneNumber={phoneNumber}
      setCurrentStep={setCurrentStep}
      nextStep={3}
      message={(
        <>
          لطفا کد ارسال شده به شماره <span className='text-primary-blue'>{phoneNumber}</span> را وارد کنید
        </>
      )}    
      />,
    <EnterInfo 
    key={3} 
    phoneNumber={phoneNumber}
    register={register} 
    handleSubmit={handleSubmit} 
    setCurrentStep={setCurrentStep} />
  ];

  const steps = [
    { stepNumber: 1, label: "وارد کردن شماره همراه", icon: Entering },
    { stepNumber: 2, label: "تایید کد ارسال شده به شماره همراه", icon: Code },
    { stepNumber: 3, label: "وارد کردن اطلاعات حساب کاربری", icon: Acount },
  ];

  return (
    <AuthLayout
      sideBar={
        <>
          {steps.map(({ stepNumber, label, icon }) => (
            <Step
              key={stepNumber}
              currentStep={currentStep}
              stepNumber={stepNumber}
              label={label}
              icon={icon}
            />
          ))}
        </>
      }
    >
      <h1 className="text-2xl font-bold">به آکادمی بحر خوش اومدی!😍</h1>
      <br />
      
      {stepComponents[currentStep - 1]}
    </AuthLayout>
  );
}
