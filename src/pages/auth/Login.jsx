import { useForm } from "react-hook-form";
import Code from "../../assets/icons/password-validation-stroke-rounded 2.svg?react";
import Entering from "../../assets/icons/mail-edit-02-stroke-rounded 1.svg?react";
import { useState } from "react";
import { AuthLayout, Step, LoginForm, Verification } from "../../components";

export function Login() {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
  };

  const steps = [
    { stepNumber: 1, label: "وارد کردن شماره همراه یا ایمیل", icon: Entering },
    { stepNumber: 2, label: "تایید کد ارسال شده", icon: Code },
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
      <h1 className="text-2xl font-bold">!خوش برگشتی👋</h1>
      <br />

      {currentStep === 1 ? (
        <LoginForm
          handleSubmit={handleSubmit}
          register={register}
          onSubmit={onSubmit}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      ) : (
        <Verification
          handleSubmit={handleSubmit}
          register={register}
          onSubmit={onSubmit}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          nextStep={2}
        />
      )}
    </AuthLayout>
  );
}
