import { Input } from "@nextui-org/react";
import { HidePassword, ShowPassword } from "@assets";
import { useEffect, useState } from "react";

export function BaseInput({
  label = "رمز عبور",
  placeholder = "شماره همراه یا ایمیل خود را وارد کنید",
  size = "lg",
  starIcon: StartIcons,
  type = "password",
  register = () => {},
  validation,
  name,
  error,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (type === "password") {
      setIsVisible(false);
    }
  }, []);

  function toggleVisibility() {
    setIsVisible((prevState) => !prevState);
  }

  const EndIcon = isVisible ? ShowPassword : HidePassword;

  return (
    <>
      <Input
        className={`mb-10 ${props.className}`}
        classNames={{
          input: ["mr-2 text-sm font", "placeholder:text-[#787878]/60"],
          label: ["font-medium text-lg"],
          ...props.classNames,
        }}
        size={size}
        type={isVisible ? type : "password"}
        label={label}
        labelPlacement="outside"
        placeholder={placeholder}
        startContent={<StartIcons classNames="" />}
        endContent={
          type === "password" && (
            <button type="button" onClick={toggleVisibility}>
              <EndIcon className="" />
            </button>
          )
        }
        {...register(name, validation)}
        isInvalid={error}
        errorMessage={error?.message}
        {...props}
      />
    </>
  );
}
