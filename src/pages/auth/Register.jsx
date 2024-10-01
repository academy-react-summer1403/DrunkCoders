import {Link} from 'react-router-dom'
import { AuthLayout } from './AuthLayout'
import { BaseInput, Button } from '../../components'
import { useForm } from 'react-hook-form'
import MobileIcon from '../../assets/icons/smart-phone-01-stroke-rounded 2.svg?react'

export function Register() {
    const {
        register,
        handleSubmit,
    } = useForm()

    const onSubmit = (data) => {
        console.log('Form Data: ', data)
        // Handle login submission (e.g., API call)
    }
    return (
       <AuthLayout>
            <h1 className="text-2xl font-bold">به آکادمی بحر خوش اومدی!😍</h1>
            <br />
            <p className="text-gray-500">
                لطفاً برای ثبت نام، شماره همراه خود را وارد کنید تا برای شما کد تایید ارسال
                شود.
            </p>
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <BaseInput
                    label='شماره همراه'
                    placeholder='شماره همراه خود را وارد کنید'
                    type='text'
                    name='number'
                    register={register}
                    size="lg"
                    starIcon={MobileIcon}
                    />
                <Button type='submit' className='p-4 bg-primary-blue text-white w-full -mt-5'>
                ارسال کد تایید
                </Button>
            </form>
            <p>
                حساب کاربری دارید؟{' '}
                <Link to="/auth/login" className="text-primary-blue hover:underline">
                    ورود به حساب کاربری
                </Link>
            </p>
       </AuthLayout>
    )
}
