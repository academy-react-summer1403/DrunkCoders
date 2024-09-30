import {Link} from 'react-router-dom'
import ShortLogo from '../../assets/logo/short-Logo.svg?react'
import LongLogo from '../../assets/logo/long-Logo.svg?react'
import {BaseInput, OtpInput} from '../../components/index'
import { useForm } from 'react-hook-form'

export function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log('Form Data: ', data)
        // Handle login submission (e.g., API call)
    }

    return (
        <main className="flex">
            <aside className="hidden md:block md:w-6/12 bg-[#E4E4E4] h-screen">
                <div className="flex mt-[25%] items-center">
                    <ShortLogo className="w-[58px] h-[55px]" />
                    <LongLogo className="w-[189px] h-[38px]" />
                </div>
            </aside>

            <div className="w-full h-screen flex justify-center">
                <div className="w-fit mt-[15%] mx-3">
                    <h1 className="text-2xl font-bold">!خوش برگشتی👋</h1>
                    <br />
                    <p className="text-gray-500">
                        لطفا برای ورود به پنل خود ایمیل یا شماره همراه و رمز عبور خود را وارد کنید
                    </p>
                    <br />

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* BaseInput for Email/Phone */}
                        <BaseInput
                            label="ایمیل یا شماره همراه"
                            placeholder="ایمیل یا شماره همراه خود را وارد کنید"
                            name="emailOrPhone"
                            register={register}
                            validation={{
                                required: "وارد کردن ایمیل یا شماره همراه الزامی است",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                                    message: "ایمیل وارد شده معتبر نیست",
                                },
                            }}
                            error={errors.emailOrPhone}
                            size="lg"
                            type="text"
                        />

                        {/* BaseInput for Password */}
                        <BaseInput
                            label="رمز عبور"
                            placeholder="رمز عبور خود را وارد کنید"
                            name="password"
                            register={register}
                            validation={{
                                required: "رمز عبور الزامی است",
                                minLength: {
                                    value: 6,
                                    message: "رمز عبور باید حداقل 6 کاراکتر باشد",
                                },
                            }}
                            error={errors.password}
                            size="lg"
                            type="password"
                        />

                        <button
                            type="submit"
                            className="mt-4 bg-primary-blue text-white px-4 py-2 rounded-3xl w-full"
                        >
                            ورود به حساب کاربری
                        </button>
                    </form>

                    <p className="mt-4">
                        حساب کاربری ندارید؟{' '}
                        <Link to="register" className="text-primary-blue hover:underline">
                            ایجاد حساب کاربری
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}
