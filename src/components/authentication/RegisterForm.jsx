import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { registerSchema } from '@validation';
import { BaseInput, Button } from "@components";
import { MobileIcon } from "@assets";

export function RegisterForm({ currentStep, setCurrentStep,setPhoneNumber }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    setPhoneNumber(data.number);
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
          error={errors.number} // pass error to BaseInput
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
