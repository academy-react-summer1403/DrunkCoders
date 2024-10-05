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

export function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
    // Handle submission (e.g., API call)
  };

  // Array of step components
  const stepComponents = [
    <RegisterForm
      key={1}
      register={register}
      handleSubmit={handleSubmit}
      setCurrentStep={setCurrentStep}
    />,
    <Verification
      key={2}
      register={register}
      handleSubmit={handleSubmit}
      setCurrentStep={setCurrentStep}
      nextStep={3}
    />,
    <EnterInfo
      key={3}
      register={register}
      handleSubmit={handleSubmit}
      setCurrentStep={setCurrentStep}
    />,
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

      {/* Render current step component */}
      {stepComponents[currentStep - 1]}
    </AuthLayout>
  );
}
