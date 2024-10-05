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
          input: [
            "mr-2 text-sm bg-transparent",
            "placeholder:text-[#787878]/60 dark:placeholder:text-stone-700 ",
          ],
          label: ["font-medium text-lg"],
          inputWrapper: ["dark:bg-white/60", "dark:focus-within:bg-white/50"],
          innerWrapper: "bg-transparent",
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
