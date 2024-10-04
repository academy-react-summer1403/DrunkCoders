import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { BaseInput, Button } from '../../components';
import MobileIcon from '../../assets/icons/smart-phone-01-stroke-rounded 2.svg?react';
import { registerSchema } from '../../core/validation/validationSchemas';

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
        لطفاً برای ثبت نام، شماره همراه خود را وارد کنید تا برای شما کد تایید ارسال شود.
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
          className="p-4 bg-primary-blue text-white w-full -mt-5"
          disabled={currentStep === 2}
        >
          ارسال کد تایید
        </Button>
      </form>
      <p className="mt-4 w-fit m-auto">
        حساب کاربری دارید؟{' '}
        <Link to="/auth" className="text-primary-blue hover:underline">
          ورود به حساب کاربری
        </Link>
      </p>
    </>
  );
}
