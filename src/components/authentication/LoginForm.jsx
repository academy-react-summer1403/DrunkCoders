import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BaseInput, Button } from "@components";
import { Mail, Lock, PassRecover } from "@assets";
import { infoSchema } from '@validation';
import { zodResolver } from '@hookform/resolvers/zod';

export function LoginForm({ currentStep, setCurrentStep }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(infoSchema),
  });

  const onSubmit = (data) => {
    console.log(data); 
    setCurrentStep(2);
  };

  return (
    <>
      <p className="text-gray-500">
        لطفا برای ورود به پنل خود ایمیل یا شماره همراه و رمز عبور خود را وارد
        کنید
      </p>
      <br />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-14">
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
        <div className="-mt-5 flex justify-between text-[14px] font-[500]">
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="remember"
              {...register("remember")}
              className="h-4 w-4 appearance-none rounded-[6px] border-[2px] border-[#e4e4e4] bg-[#e4e4e4] checked:bg-[#3772FF]"
            />
            <label htmlFor="remember">مرا به خاطر بسپار</label>
          </div>
          <Link
            to="forget-pass"
            className="flex items-center gap-1 rounded-3xl bg-[#3772FF3B] p-1 px-3 text-[#3772FF]"
          >
            <PassRecover />
            فراموشی رمزعبور
          </Link>
        </div>
        <Button
          type="submit"
          className="mt-5 w-full bg-primary-blue p-4 text-white"
          disabled={currentStep === 2}
        >
          ورود به حساب کاربری
        </Button>
      </form>
      <p className="m-auto mt-4 w-fit">
        حساب کاربری ندارید؟{" "}
        <Link to="register" className="text-primary-blue hover:underline">
          ایجاد حساب کاربری
        </Link>
      </p>
    </>
  );
}