import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Image, Spinner } from '@nextui-org/react';
import { deletePayment, getPaidCourse, paymentStep2, updatePayment } from '@core/services/api/user.api';
import { BaseInput, Button } from '@components/index';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentStep1 } from '@core/validation/validationSchemas';
import moment from 'moment-jalaali';
import toast from 'react-hot-toast';

export function PaymentModalContent({ paymentId, action }) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['paidItem'],
    queryFn: () => getPaidCourse(paymentId),
    enabled: !!paymentId, // Fetch only when paymentId is provided
  });
  console.log(data);
  const [file, setFile] = useState();
//   function handleChange(e) {
//     setFile(e.target.files[0]); // Save the actual file object
// }
  const {mutate, isPending, isError:updateErr}= useMutation({
    mutationFn: (formData) => updatePayment(formData),
    onSuccess:(response) =>{
      if(response.success){
        toast.success('پرداخت شما بروز شد')
        queryClient.invalidateQueries(['paidList']);
      } else{
        toast.error(response.message)
        console.log(response);
      }
    }
  })
  const {mutate:pay2Mutate, isPending:step2PayPending, isError:pay2Error} =useMutation({
    mutationFn: (formData) => paymentStep2(formData),
    onSuccess:(response) =>{
      if(response.success){
        toast.success('عکس آپلود شد');
        queryClient.invalidateQueries(['paidList']);
      }else{
        toast.error(response.message)
      }
    }
  })
  const {mutate:delPaidCourseMutate, isPending:deletePending, isError:deleteError} =useMutation({
    mutationFn: (formData) => deletePayment(formData),
    onSuccess:(response) =>{
      console.log(response);
      if(response.success){
        toast.success('دوره از پرداختی ها حذف شد')
        queryClient.invalidateQueries(['paidList']);
        queryClient.invalidateQueries(['paidItem']);
      } else {
        toast.error(response.response.data.ErrorMessage[0])
      }
    }
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentStep1),
  })
  useEffect(() => {
    if (data) {
      // Reset the form with the fetched data
      reset({
        Paid: data.paid, // Prefill with the current paid amount
        PaymentInvoiceNumber: data.paymentInvoiceNumber, // Prefill with the current invoice number
      });
    }
  }, [data, reset]);

  if (isLoading) {
    return <Spinner size="lg" label="در حال دریافت جزئیات ..." />;
  }

  if (isError) {
    return <p>خطا در دریافت جزئیات پرداخت</p>;
  }

  if (!data) {
    return <p>جزئیاتی برای این پرداخت موجود نیست</p>;
  }

  const PeymentDate = moment().locale('en').format('YYYY-MM-DDTHH:mm:ss');

  function onSubmit(data) {
    const formData = new FormData();
    formData.append('Id', paymentId);
    formData.append('Paid', data.Paid);
    formData.append('PeymentDate', PeymentDate)
    formData.append('PaymentInvoiceNumber', data.PaymentInvoiceNumber);
    mutate(formData)
    console.log(formData);
  }

  function uploadInvoice(){
    const formData = new FormData();
    formData.append('PaymentId', paymentId);
    formData.append('Image', file)
    pay2Mutate(formData)
  }
  function handleDelete(){
    const formData = new FormData();
    formData.append('PaymentId', paymentId);
    delPaidCourseMutate(formData)
    console.log(formData);
  }

  switch (action) {
    case 'details':
      return (
        <>
          {data.paymentInvoiceImage ? (
            <Image
              src={data.paymentInvoiceImage}
              alt="Payment Invoice"
              className="object-cover"
            />
          ) : (
            <p className="text-lg m-auto font-bold text-basic-gray">عکسی آپلود نشده</p>
          )}
          <div className='p-2'>
            <p> شناسه پرداخت: {paymentId}</p>
            <p>دوره: {data.title}</p>
            <p>پرداختی: {data.paid} تومان</p>
            <p>مانده: {data.currentRemainder} تومان</p>
            <p>شماره فاکتور: {data.paymentInvoiceNumber}</p>
            <p>وضعیت: {data.accept ? 'تایید شده' : 'تایید نشده'}</p>
          </div>
        </>
      );
    case 'edit':
      return <>
                <p>دوره: {data.title}</p>
              <form className="flex flex-col flex-1" onSubmit={handleSubmit(onSubmit)}>
                <BaseInput
                  label="مبلغ مورد نظر را وارد نمایید"
                  placeholder=""
                  register={register}
                  name="Paid"
                />
                {errors.Paid && (
                  <p className="text-red-500 -mt-8 mb-4">{errors.Paid.message}</p>
                )}
                <BaseInput
                  label="شناسه واریزی را وارد نمایید"
                  placeholder=""
                  register={register}
                  name="PaymentInvoiceNumber"
                />
                {errors.PaymentInvoiceNumber && (
                  <p className="text-red-500 -mt-8 mb-4">
                    {errors.PaymentInvoiceNumber.message}
                  </p>
                )}
                <div className="flex justify-between mt-4">
                  <Button type="submit" className="w-full text-lg" isLoading={isPending}> 
                    تایید
                  </Button>
                </div>
              </form>
      </>;
    case 'upload':
      return <>
        <p>دوره: {data.title}</p>
        <div className="App">
            <h2>انتخاب عکس:</h2>
            <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
            <img src={file} />
            <Button onClick={uploadInvoice} isLoading={step2PayPending} className='text-lg w-full mt-5 mb-2'>
                آپلود تصویر
            </Button>
        </div>
      </>;
      case 'delete':
        return <>
          <p> 
            آیا از  <span className='text-red-500 font-bold'>حذف</span>
            {' '}
            دوره {data.title} مطئنید؟
          </p>
          <Button className='bg-red-500 text-lg' onClick={handleDelete} isLoading={deletePending} >
                بله
          </Button>
        </>
    default:
      return null;
  }
}
