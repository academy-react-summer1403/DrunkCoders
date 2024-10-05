import React from 'react'
import { useForm } from 'react-hook-form';
import { BaseInput, Button } from "@components";
import { Mail, Lock } from "@assets"
import { zodResolver } from '@hookform/resolvers/zod';
import { infoSchema } from '@validation';

export function EnterInfo({ currentStep, setCurrentStep }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(infoSchema),
  });

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
      <form onSubmit={handleSubmit(onSubmit)} className='mt-14'>
        <BaseInput
          label="ایمیل یا شماره همراه"
          placeholder="ایمیل یا شماره همراه خود را وارد کنید"
          name="emailOrPhone"
          register={register}
          size="lg"
          type="text"
          starIcon={Mail}
          error={errors.emailOrPhone} // Show error
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
          error={errors.password} // Show error
        />
        <div className="flex justify-between -mt-5 text-[14px] font-[500]">
          <div className="gap-1 flex items-center">
            <input
              type="checkbox"
              id="remember"
              {...register('remember')}
              className="appearance-none bg-[#e4e4e4] rounded-[6px] w-4 h-4 checked:bg-[#3772FF] border-[3px] border-[#e4e4e4]"
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