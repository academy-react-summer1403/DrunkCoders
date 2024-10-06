import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { BaseInput, Button } from "@components";
import { Mail, Lock, PassRecover } from "@assets";
import {
  deleteLocalStorage,
  loginSchema,
  loginUser,
  setLocalStorage,
} from "@core/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";

export function LoginForm({ currentStep, setCurrentStep }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const rememberMe = watch("rememberMe", false);

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (!data.success) {
        deleteLocalStorage("token");
      }

      if (data.success) {
        setLocalStorage("token", data.token);
        navigate("/");
        alert(data.message);
      } else {
        alert(data.message);
      }
    },
  });

  const onSubmit = (data) => {
    mutate({ ...data, rememberMe });
    //setCurrentStep(2);
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
          <Checkbox className="gap-2" {...register("rememberMe")}>
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
