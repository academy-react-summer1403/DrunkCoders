import {Link} from 'react-router-dom'
import {BaseInput, OtpInput, Button} from '../../components/index'
import { useForm } from 'react-hook-form'
import { AuthLayout } from './AuthLayout'
import Mail from '../../assets/icons/mail-02-stroke-rounded 1.svg?react'
import Lock from '../../assets/icons/lock-password-stroke-rounded 1.svg?react'

export function Login() {
    const {
        register,
        handleSubmit,
    } = useForm()

    const onSubmit = (data) => {
        console.log('Form Data: ', data)
        // Handle login submission (e.g., API call)
    }

    return (
       <>
            <AuthLayout>
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
                            size="lg"
                            type="text"
                            starIcon={Mail}
                        />

                        {/* BaseInput for Password */}
                        <BaseInput
                            label="رمز عبور"
                            placeholder="رمز عبور خود را وارد کنید"
                            name="password"
                            register={register}
                            size="lg"
                            type="password"
                            starIcon={Lock}
                        />

                        <Button type='submit' className='p-4 bg-primary-blue text-white w-full -mt-5'>
                        ورود به حساب کاربری
                        </Button>
                    </form>

                    <p className="mt-4 w-fit m-auto">
                        حساب کاربری ندارید؟{' '}
                        <Link to="register" className="text-primary-blue hover:underline">
                            ایجاد حساب کاربری
                        </Link>
                    </p>
            </AuthLayout>
       </>
    )
}
