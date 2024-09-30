import {useForm, Controller} from 'react-hook-form'
import {Input} from '@nextui-org/react'
import {Button} from '../index'
import {useRef} from 'react'

export const OtpInput = () => {
    const {control, handleSubmit, setValue} = useForm()
    const inputsRef = useRef([])

    const handleChange = (value, index) => {
        // Only update the value if it's a number
        if (/^\d*$/.test(value)) {
            setValue(`otp[${index}]`, value)
            // Move focus to the next input if current is filled
            if (value && index < inputsRef.current.length - 1) {
                inputsRef.current[index + 1].focus()
            }
        }
    }

    const handleKeyDown = (event, index) => {
        // Handle backspace to move focus back if input is empty
        if (event.key === 'Backspace' && !event.target.value && index > 0) {
            inputsRef.current[index - 1].focus()
        }
    }

    function onSubmit(data) {
        console.log(data)
    }

    return (
        <>
            <p className="text-xl font-medium">کد تایید</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-7 mt-5">
                <div className="flex justify-between gap-5 [direction:ltr]">
                    {Array.from({length: 6}).map((_, index) => (
                        <Controller
                            key={index}
                            name={`otp[${index}]`}
                            control={control}
                            defaultValue=""
                            render={({field}) => (
                                <Input
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
                    className="bg-primary-blue text-white text-xl mt-5 w-full py-3"
                    size="lg"
                >
                    تایید
                </Button>
            </form>
        </>
    )
}
