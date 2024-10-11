import { Input } from '@nextui-org/react'
import { HidePassword, ShowPassword } from '@assets'
import { useEffect, useState } from 'react'

export function BaseInput({
  label,
  placeholder = 'شماره همراه یا ایمیل خود را وارد کنید',
  size = 'lg',
  starIcon: StartIcons,
  endIcon: EndIcon,
  type = 'text', // Change default to "text" for general use
  register = () => {},
  validation,
  name,
  error,
  classNames,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (type === 'password') {
      setIsVisible(false)
    }
  }, [type])

  function toggleVisibility() {
    setIsVisible((prevState) => !prevState)
  }

  function handleSearch() {
    // search logic
  }

  if (!EndIcon && type === 'password') {
    EndIcon = isVisible ? ShowPassword : HidePassword
  }

  return (
    <>
      <Input
        className={`mb-10 ${props.className}`}
        classNames={{
          input: `mr-2 text-sm  placeholder:text-basic-gray dark:placeholder:text-stone-400 ${classNames?.input}`,
          label: `font-medium text-lg ${classNames?.label}`,
          // inputWrapper: `dark:bg-white/50 dark:focus-within:bg-white/40 ${classNames?.inputWrapper}`,
          // innerWrapper: `bg-transparent ${classNames?.innerWrapper}`,
        }}
        size={size}
        type={isVisible ? (type === 'password' ? 'text' : type) : 'password'}
        label={label}
        labelPlacement="outside"
        placeholder={placeholder}
        startContent={StartIcons && <StartIcons />}
        endContent={
          EndIcon && (
            <button
              type="button"
              onClick={type === 'password' ? toggleVisibility : handleSearch}
            >
              <EndIcon />
            </button>
          )
        }
        {...register(name, validation)}
        isInvalid={error}
        errorMessage={error?.message}
        {...props}
      />
    </>
  )
}
