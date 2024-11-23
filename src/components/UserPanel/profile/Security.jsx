import { BaseInput, Button } from '@components/index';
import React, { useEffect } from 'react';
import { Checkbox, Spinner } from '@nextui-org/react';
import { editSecurity, getSecurityInfo } from '@core/services/api/user.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

export function Security() {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      twoStepAuth: false,
      recoveryEmail: '',
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['secInfo'],
    queryFn: getSecurityInfo,
  });

  const { mutate, isLoading: isPending } = useMutation({
    mutationFn: editSecurity,
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
        queryClient.invalidateQueries(['secInfo']);
      } else {
        toast.error('خطا در به روزرسانی اطلاعات');
      }
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        twoStepAuth: data.twoStepAuth || false,
        recoveryEmail: data.recoveryEmail || '',
      });
    }
  }, [data, reset]);

  async function onSubmit(formValues) {
    const secData = {
      ...formValues,
      baseUrl: 'https://classapi.sepehracademy.ir/api',
    };
    mutate(secData);
  }

  const twoStepAuth = watch('twoStepAuth'); // Watch the checkbox state

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <Spinner size="lg" label="در حال دریافت ..." labelColor="primary" />
      </div>
    );
  }
console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-8">
        <div className="rtl text-right text-lg font-semibold">
          <Checkbox
            checked={twoStepAuth} // Bind the state to the form
            {...register('twoStepAuth')} // Register the checkbox
            className="flex-row-reverse"
          >
            ورود دو مرحله ای
          </Checkbox>
        </div>

        <BaseInput
          label="ایمیل پشتیبان"
          placeholder="example@email.com"
          type="email"
          validation={{
            required: 'ایمیل پشتیبان ضروری است',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'فرمت ایمیل صحیح نیست',
            },
          }}
          register={register}
          name="recoveryEmail"
          error={errors.recoveryEmail}
          className="mb-0 sm:w-[45%]"
        />

        <Button type="submit" className="w-fit text-lg" isDisabled={isPending}>
          {isPending ? 'در حال ارسال...' : 'تایید'}
        </Button>
      </div>
    </form>
  );
}
