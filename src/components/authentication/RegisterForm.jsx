import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BaseInput, Button } from "@components";
import { MobileIcon } from "@assets";

export function RegisterForm({ currentStep, setCurrentStep }) {
  const { register, handleSubmit, getValues } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setCurrentStep(2);
  };

  return (
    <>
      <p className="text-gray-500">
        لطفاً برای ثبت نام، شماره همراه خود را وارد کنید تا برای شما کد تایید
        ارسال شود.
      </p>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          label="شماره همراه"
          placeholder="شماره همراه خود را وارد کنید"
          type="text"
          name="number"
          register={register}
          size="lg"
          starIcon={MobileIcon}
        />
        <Button
          type="submit"
          className="-mt-5 w-full bg-primary-blue p-4 text-white"
          disabled={currentStep === 2}
        >
          ارسال کد تایید
        </Button>
      </form>
      <p className="m-auto mt-4 w-fit">
        حساب کاربری دارید؟{" "}
        <Link to="/auth" className="text-primary-blue hover:underline">
          ورود به حساب کاربری
        </Link>
      </p>
    </>
  );
}
