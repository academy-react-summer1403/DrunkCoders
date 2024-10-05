import { CodeCircle } from "@assets";
import { Button } from "@components";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <div className="mb-5 flex flex-col items-center justify-center gap-8 py-20 text-center">
      <h1 className="text-5xl leading-normal lg:leading-none">
        تجربه‌ای بی‌نظیر در یادگیری{" "}
        <span className="mx-4 hidden h-14 w-14 items-center justify-center rounded-full shadow-md lg:mr-2 lg:inline-flex">
          <CodeCircle className="inline" />
        </span>
        کدنویسی؛
      </h1>

      <p className="-mt-3 text-5xl lg:mt-0">
        از <span className="text-primary-blue">مبتدی</span> تا{" "}
        <span className="text-[#FF4242]">حرفه‌ای</span> !
      </p>

      <p className="text-xl leading-normal text-[#787878]">
        آکادمی فوق تخصصی کد‌نویسی و برنامه‌نویسی از سنین کودکی تا بزرگسالی
      </p>

      <Button
        as={Link}
        to="/courses"
        size="lg"
        className="px-6 py-[14px] text-xl"
      >
        شروع یادگیری
      </Button>
    </div>
  );
}
