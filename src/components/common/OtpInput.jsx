import { useForm, Controller } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { Button } from "@components";
import { useRef } from "react";
import { verifyApi } from '@core/services/api/auth'; // Import your verifyApi function

export const OtpInput = ({ setCurrentStep, nextStep, phoneNumber }) => {
  const { control, handleSubmit, setValue } = useForm();
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (/^\d*$/.test(value)) {
      setValue(`otp[${index}]`, value);
      if (value && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !event.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const onSubmit = async (data) => {
    const verifyCode = data.otp.join("");
    const submissionData = {
      phoneNumber,
      verifyCode,
    };

    console.log("Submission Data: ", submissionData);

    // Call the verifyApi to check the OTP
    const response = await verifyApi(submissionData); // Call the verification API

    if (response) {
      console.log("Verification successful:", response);
      setCurrentStep(nextStep); // Move to the next step on successful verification
    } else {
      console.error("Verification failed"); // Handle failure case
      // Optionally, display an error message to the user here
    }
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
          type="submit"
          className="mt-5 w-full bg-primary-blue py-3 text-xl text-white"
          size="lg"
        >
          تایید
        </Button>
      </form>
    </>
  );
};
