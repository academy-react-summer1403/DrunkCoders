import React, { useEffect, useState } from "react";
import { OtpInput } from "@components";
import toast from "react-hot-toast";
import { loginUser } from "@core/index";
import { useMutation } from "@tanstack/react-query";

export function Verification({
  setCurrentStep,
  nextStep,
  message,
  phoneNumber,
  isLogin,
  data,
  resend
}) {
  const [timeLeft, setTimeLeft] = useState(150); // Timer starts at 2 minutes

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId); // Cleanup timeout
    }
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };
  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data);
      if (data.success) {
        toast.success(' کد ارسال شد ')
      }  else {
        toast.error('رمز‌عبور یا نام کاربری نادرست است')
      }
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  function onSubmit (){
    mutate({ resend })
    console.log(resend);
  }


  return (
    <>
      <p className="text-gray-500">
        {message ? message : "لطفا کد ارسال شده را وارد کنید"}
      </p>


      <div className="mt-10">
        <OtpInput
          isLogin={isLogin}
          loginData={data}
          setCurrentStep={setCurrentStep}
          nextStep={nextStep}
          phoneNumber={phoneNumber}
          registerMutate={data.registerMutate} // Pass the mutation function
        />
      </div>

      <div className="flex gap-2 items-center">
      <div className="mt-4 text-blue-500 font-bold">
        <span className="p-2 bg-primary-100 rounded-3xl"> {formatTime(timeLeft)}</span>
      </div>
          <p
            onClick={() => {
              setTimeLeft(150); // Reset timer for another 2 minutes
              console.log(resend);
              isLogin? mutate( resend ) : null;
            }}
            className="font-bold text-primary-blue mt-3 cursor-pointer"
          >
            ارسال مجدد کد
          </p>
      </div>
    </>
  );
}
