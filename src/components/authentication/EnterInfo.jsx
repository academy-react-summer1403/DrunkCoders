import React from "react";
import { useForm } from "react-hook-form";
import { BaseInput, Button } from "@components";
import { Mail, Lock } from "@assets";

export function EnterInfo({ currentStep, setCurrentStep }) {
  const { register, handleSubmit, getValues } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
          label="ایمیل یا شماره همراه"
          placeholder="ایمیل یا شماره همراه خود را وارد کنید"
          name="emailOrPhone"
          register={register}
          validation={{ required: "This field is required" }}
          size="lg"
          type="text"
          starIcon={Mail}
          className="mb-16"
        />
        <BaseInput
          label="رمز عبور"
          placeholder="رمز عبور خود را وارد کنید"
          name="password"
          register={register}
          validation={{ required: "Password is required" }}
          size="lg"
          type="password"
          starIcon={Lock}
        />
        <div className="-mt-5 flex justify-between text-[14px] font-[500]">
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="remember"
              {...register("remember")}
              className="h-4 w-4 appearance-none rounded-[6px] border-[3px] border-[#e4e4e4] bg-[#e4e4e4] checked:bg-[#3772FF]"
            />
            <label htmlFor="remember">مرا به خاطر بسپار</label>
          </div>
        </div>
        <Button
          type="submit"
          className="mt-5 w-full bg-primary-blue p-4 text-white"
          disabled={currentStep === 3}
        >
          ثبت اطلاعات
        </Button>
      </form>
    </>
  );
}
