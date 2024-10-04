import { Button } from "@components";
import { MoonIcon, BahrLogo, BahrLogo1, Menu } from "@assets";

export function Header() {
  return (
    <div className="relative top-3.5 flex h-12 justify-around">
      <div className="flex w-72 justify-start gap-4 border-blue-700 max-lg:w-64 max-lg:gap-3">
        <div className="h-12 w-10">
          {" "}
          <BahrLogo1 className="relative right-2 top-1 h-9" />
        </div>{" "}
        <div className="flex h-12 w-44 justify-center pt-3 max-md:hidden">
          {" "}
          <BahrLogo />
        </div>
      </div>

      <div className="flex w-2/5 justify-center gap-10 whitespace-nowrap p-2 font-normal leading-10 max-lg:mx-5 max-lg:gap-5 max-md:hidden">
        <p>خانه</p> <p>دوره ها</p> <p>اخبار و مقالات </p>
        <p>ارتباط باما</p>
      </div>
      <div className="flex w-72 justify-end gap-5 border-black max-lg:gap-3 max-md:gap-3">
        <div className="flex h-12 w-12 justify-center rounded-full border-1 pt-2.5 max-md:hidden">
          <MoonIcon />
        </div>{" "}
        <Button
          color="primary"
          className="h-12 w-40 rounded-full text-lg max-md:relative"
        >
          ورود یا ثبت نام
        </Button>{" "}
        <div className="md:relative md:top-4 md:hidden md:h-10">
          <Menu className="relative top-1 h-10 w-12" />
        </div>
      </div>
    </div>
  );
}
