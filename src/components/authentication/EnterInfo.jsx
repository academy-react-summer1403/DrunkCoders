import React from "react";
import { useForm } from "react-hook-form";
import { BaseInput, Button } from "@components";
import { Mail, Lock } from "@assets";
import { zodResolver } from "@hookform/resolvers/zod";
import { infoSchema } from "@core";

export function EnterInfo({ currentStep, setCurrentStep, phoneNumber }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(infoSchema),
  });

  const onSubmit = (data) => {
    const formData = {
      ...data,
      phoneNumber, // Include phoneNumber in form data
    };
    console.log(formData);
    setCurrentStep(3);
  };

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
          type="submit"
          className="w-full bg-primary-blue p-4 text-white"
          disabled={currentStep === 3}
        >
          ثبت اطلاعات
        </Button>
      </form>
    </>
  );
}
