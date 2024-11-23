import { useForm, Controller } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { Button } from "@components";
import { useRef } from "react";
import { verifyApi } from '@core/services/api/auth'; // Import your verifyApi function
import { useMutation, useQuery } from "@tanstack/react-query";
import { towStepVerification } from "@core/services/api/user.api";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { tokenActions } from "@store/token-slice";
import { useNavigate } from "react-router-dom";

export const OtpInput = ({ setCurrentStep, nextStep, phoneNumber, isLogin, loginData }) => {
  const { control, handleSubmit, setValue } = useForm();
  const inputsRef = useRef(Array(5).fill(null));
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const handleChange = (value, index) => {
    if (/^\d*$/.test(value)) {
      setValue(`otp[${index}]`, value, { shouldValidate: true });
      if (value && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !event.target.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ code, data }) => await towStepVerification(code, data),
    onSuccess: (data) => {
      console.log(data);
      if(data.success){
        toast.success(data.message);
        dispatch(
          tokenActions.login({
            token: data.token,
            id: data.id,
            roles: data.roles,
          }),
        );
        navigate('/')
      } else{
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Verification failed");
      console.error("Verification failed:", error);
    },
  });

  const {mutate:registerMutate, isPending:registerPend, isError:registerErr} = useMutation({
    mutationFn: (user) => verifyApi(user),
    onSuccess: (data) => {
      toast.success(data.message)
      console.log(data);
      setCurrentStep(nextStep);
    },
    onError: (error) => {
      toast.error(error.message || "Verification failed")
      console.log(error);
    }
  })

  const onSubmit = async (data) => {
    const verifyCode = data.otp?.join("") || "";
    if (!verifyCode || verifyCode.length !== 5) {
      toast.error("Please enter a valid 5-digit code.");
      return;
    }

    const submissionData = isLogin ? loginData : { phoneNumber,verifyCode };
    
    isLogin? mutate({ code: verifyCode, data: submissionData }) :
    registerMutate(submissionData);
  };

  return (
    <>
      <p className="text-xl font-medium">کد تایید</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-7 mt-5">
        <div className="flex justify-between gap-5 [direction:ltr]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Controller
              key={index}
              name={`otp[${index}]`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  ref={(el) => (inputsRef.current[index] = el)}
                  value={field.value}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength={1}
                  classNames={{
                    input: ["text-3xl text-center pt-2"],
                    inputWrapper: ["w-[70px] h-[72px]"],
                  }}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  radius="lg"
                />
              )}
            />
          ))}
        </div>

        <Button
          isLoading={isLogin?isPending:registerPend}
          type="submit"
          className="mt-5 w-full bg-primary-blue py-3 text-xl text-white"
          size="lg"
        >
          تایید
        </Button>
      </form>
      {isError && <p className="text-red-500 mt-2">خطایی رخ داده است.</p>}
    </>
  );
};

