import React, { useEffect } from "react";
import { OtpInput } from "@components";

export function Verification({ setCurrentStep, nextStep, message, phoneNumber, isLogin, data }) {
  useEffect(() => {
    console.log('Phone number in Verification:', phoneNumber);
  }, [phoneNumber]);
  return (
    <>
    
      <p className="text-gray-500">
        {message ? message : 'لطفا کد ارسال شده را وارد کنید'}
      </p>
      <div className="mt-10">
        <OtpInput 
        isLogin={isLogin}
        loginData={data}
        setCurrentStep={setCurrentStep} 
        nextStep={nextStep} 
        phoneNumber={phoneNumber}/>
      </div>
    </>
  );
}
