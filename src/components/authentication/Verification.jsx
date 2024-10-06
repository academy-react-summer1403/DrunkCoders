import React from "react";
import { OtpInput } from "@components";

export function Verification({ setCurrentStep, nextStep }) {
  return (
    <>
      <p className="text-gray-500">لطفا کد ارسال شده را وارد کنید</p>
      <div className="mt-10">
        <OtpInput setCurrentStep={setCurrentStep} nextStep={nextStep} />{" "}
        {/* Pass nextStep to OtpInput */}
      </div>
    </>
  );
}
