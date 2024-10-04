<<<<<<< HEAD
import { useForm, Controller } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { Button } from "@components";
import { useRef } from "react";

export const OtpInput = () => {
=======
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@nextui-org/react';
import { Button } from '../index';
import { useRef } from 'react';

export const OtpInput = ({ setCurrentStep, nextStep }) => {
>>>>>>> login
  const { control, handleSubmit, setValue } = useForm();
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
<<<<<<< HEAD
    // Only update the value if it's a number
    if (/^\d*$/.test(value)) {
      setValue(`otp[${index}]`, value);
      // Move focus to the next input if current is filled
=======
    if (/^\d*$/.test(value)) {
      setValue(`otp[${index}]`, value);
>>>>>>> login
      if (value && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (event, index) => {
<<<<<<< HEAD
    // Handle backspace to move focus back if input is empty
    if (event.key === "Backspace" && !event.target.value && index > 0) {
=======
    if (event.key === 'Backspace' && !event.target.value && index > 0) {
>>>>>>> login
      inputsRef.current[index - 1].focus();
    }
  };

<<<<<<< HEAD
  function onSubmit(data) {
    console.log(data);
  }
=======
  const onSubmit = (data) => {
    console.log('OTP Data: ', data);
    setCurrentStep(nextStep);  // Use the passed nextStep to decide what happens next
  };
>>>>>>> login

  return (
    <>
      <p className="text-xl font-medium">کد تایید</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-7 mt-5">
        <div className="flex justify-between gap-5 [direction:ltr]">
          {Array.from({ length: 6 }).map((_, index) => (
            <Controller
              key={index}
              name={`otp[${index}]`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
<<<<<<< HEAD
                  className={`${index === 2 ? "mr-6" : ""}`}
                  radius="lg"
                  ref={(el) => (inputsRef.current[index] = el)}
                  value={field.value}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength={1}
                  classNames={{
                    input: ["text-3xl text-center pt-2"],
                    inputWrapper: ["w-[70px] h-[72px]"],
=======
                  className={`${index === 2 ? 'mr-6' : ''}`}
                  radius="lg"
                  ref={el => (inputsRef.current[index] = el)}
                  value={field.value}
                  onChange={e => handleChange(e.target.value, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  maxLength={1}
                  classNames={{
                    input: ['text-3xl text-center pt-2'],
                    inputWrapper: ['w-[70px] h-[72px]'],
>>>>>>> login
                  }}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              )}
            />
          ))}
        </div>

        <Button
          type="submit"
<<<<<<< HEAD
          className="mt-5 w-full bg-primary-blue py-3 text-xl text-white"
=======
          className="bg-primary-blue text-white text-xl mt-5 w-full py-3"
>>>>>>> login
          size="lg"
        >
          تایید
        </Button>
      </form>
    </>
  );
};
