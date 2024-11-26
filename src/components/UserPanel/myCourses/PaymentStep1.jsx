import { coursesFallback } from "@assets/index";
import { BaseInput } from "@components/index";
import { isValidUrl } from "@core/index";
import { coursePaymentFirstStep, getCurrentUserProfile } from "@core/services/api/user.api";
import { paymentStep1 } from "@core/validation/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Image} from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment-jalaali";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export function PaymentStep1({isOpen,onClose, course}) {
    let user = useSelector((state) => state.token.users).find(
        (user) => user.isOnline === true,
      )
      console.log(course);
    const StudentId= user.id;
    const PeymentDate = moment().locale('en').format('YYYY-MM-DDTHH:mm:ss');
    const courseId = course.courseId;
    console.log(courseId);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(paymentStep1),
      })

    const { mutate, isPending, isError} = useMutation({
        mutationFn:(formData)=> coursePaymentFirstStep(formData),
        onSuccess: (response) =>{
          if(response.success){
            toast.success('پرداخت موفق')
          } else {
            toast.error(response.message)
            console.log('response',response);
          }
        }
    })
    const onSubmit = (data) => {
    console.log(data)
    const formData = new FormData();
    formData.append('Paid', data.Paid);
    formData.append('PaymentInvoiceNumber', data.PaymentInvoiceNumber);
    formData.append('CourseId', courseId)
    formData.append('StudentId', StudentId)
    formData.append('PeymentDate', PeymentDate)
    mutate(formData)
    }
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} hideCloseButton size='2xl'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="m-1">پرداخت </ModalHeader>
              <ModalBody className="flex flex-col md:flex-row gap-4 items-center">
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
                  <Button color="primary" type="submit" className="w-[70%]">
                    تایید
                  </Button>
                  <Button color="danger" variant="light" onPress={onClose}>
                    لغو
                  </Button>
                </div>
              </form>

              <div 
                  className="flex-1 max-w-xs md:max-w-sm flex flex-col gap-2"
              >
                <Image
                  src={
                    isValidUrl(course.tumbImageAddress)
                      ? course.tumbImageAddress
                      : coursesFallback
                  }
                  alt="Course Thumbnail"
                />
                <p className="font-bold">{course.courseTitle}</p>
                <p className="font-bold">
                  قیمت دوره:
                  {' '}
                  {course.cost}
                  تومان
                </p>
              </div>
            </ModalBody>

            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}