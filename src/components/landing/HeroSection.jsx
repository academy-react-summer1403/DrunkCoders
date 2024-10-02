import {CodeCircle} from '../../assets/index'
import {Button} from '../common/Button'

export function HeroSection() {
    return (
        <div className="py-20 mb-5 flex flex-col gap-8 items-center justify-center text-center">
            <h1 className="text-5xl leading-normal lg:leading-none">
                تجربه‌ای بی‌نظیر در یادگیری{' '}
                <span className="shadow-md w-14 h-14 rounded-full mx-4 lg:mr-2 hidden lg:inline-flex items-center justify-center">
                    <CodeCircle className="inline" />
                </span>
                کدنویسی؛
            </h1>

            <p className="text-5xl -mt-3 lg:mt-0">
                از <span className="text-primary-blue">مبتدی</span> تا{' '}
                <span className="text-[#FF4242]">حرفه‌ای</span> !
            </p>

            <p className="text-[#787878] text-xl leading-normal">
                آکادمی فوق تخصصی کد‌نویسی و برنامه‌نویسی از سنین کودکی تا بزرگسالی
            </p>

            <Button size="lg" className="text-xl px-6 py-[14px]">
                شروع یادگیری
            </Button>
        </div>
    )
}
