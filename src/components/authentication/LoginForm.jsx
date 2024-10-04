import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { BaseInput, Button } from '..'; // Assuming these are custom components
import Mail from '../../assets/icons/mail-02-stroke-rounded 1.svg?react';
import Lock from '../../assets/icons/lock-password-stroke-rounded 1.svg?react';
import PassRecover from '../../assets/icons/security-password-stroke-rounded 1.svg?react';
import { infoSchema } from '../../core/validation/validationSchemas';
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
        لطفا برای ورود به پنل خود ایمیل یا شماره همراه و رمز عبور خود را وارد کنید
      </p>
      <br />
      <form onSubmit={handleSubmit(onSubmit)} className='mt-14'>
        <BaseInput
          label="ایمیل یا شماره همراه"
          placeholder="ایمیل یا شماره همراه خود را وارد کنید"
          name="emailOrPhone"
          register={register}
          validation={{ required: 'This field is required' }}
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
          validation={{ required: 'Password is required' }}
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
              className="appearance-none bg-[#e4e4e4] rounded-[6px] w-4 h-4 checked:bg-[#3772FF] border-[2px] border-[#e4e4e4]"
            />
            <label htmlFor="remember">مرا به خاطر بسپار</label>
          </div>
          <Link to="forget-pass" className="rounded-3xl bg-[#3772FF3B] p-1 px-3 text-[#3772FF] flex gap-1 items-center">
            <PassRecover />
            فراموشی رمزعبور
          </Link>
        </div>
        <Button
          type="submit"
          className="p-4 bg-primary-blue text-white w-full mt-5"
          disabled={currentStep === 2}
        >
          ورود به حساب کاربری
        </Button>
      </form>
      <p className="mt-4 w-fit m-auto">
        حساب کاربری ندارید؟{' '}
        <Link to="register" className="text-primary-blue hover:underline">
          ایجاد حساب کاربری
        </Link>
      </p>
    </>
  );
}