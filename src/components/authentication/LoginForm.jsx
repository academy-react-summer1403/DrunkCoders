import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BaseInput, Button } from "@components";
import { Mail, Lock, PassRecover } from "@assets";
import { loginSchema } from '@validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from "@nextui-org/react";
import { useEffect } from "react";

export function LoginForm({ currentStep, setCurrentStep }) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Watch the rememberMe value
  const rememberMe = watch("rememberMe", false); // Default to false

  useEffect(() => {
    register("rememberMe"); // Register the checkbox manually
  }, [register]);

  const onSubmit = (data) => {
    console.log("Form Data:", data); // Logs the checkbox value correctly
    setCurrentStep(2);
  };

  return (
    <>
      <p className="text-gray-500">
        لطفا برای ورود به پنل خود ایمیل یا شماره همراه و رمز عبور خود را وارد کنید
      </p>
      <br />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-14">
        <BaseInput
          label="ایمیل یا شماره همراه"
          placeholder="ایمیل یا شماره همراه خود را وارد کنید"
          name="phoneOrGmail"
          register={register}
          size="lg"
          type="text"
          starIcon={Mail}
          error={errors.phoneOrGmail}
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
          error={errors.password}
        />
        <div className="-mt-5 flex justify-between text-[14px] font-[500]">
          <Checkbox
            className="gap-1"
            isSelected={rememberMe}
            onChange={(e) => setValue("rememberMe", e.target.checked)} // Manually update the form value
          >
            مرا به خاطر بسپار
          </Checkbox>

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
