import { useForm } from "react-hook-form";
import { Code, Entering } from "@assets";
import { useState } from "react";
import { AuthLayout, Step, LoginForm, Verification } from "@components";

export function LoginContainer() {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit } = useForm();
  const [loginData, setLoginData] = useState()

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
          setLoginData={setLoginData}
        />
      ) : (
        <Verification
          handleSubmit={handleSubmit}
          data={loginData}
          onSubmit={onSubmit}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          isLogin={true}
          nextStep={2}
          message
        />
      )}
    </AuthLayout>
  );
}
