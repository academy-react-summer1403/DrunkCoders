import { Button } from "@nextui-org/react";
import MoonIcon from "../assets/icons/moon.svg?react";
import BahrIcon from "../assets/logo/bahrLogo.svg?react";
import BahrIcon1 from "../assets/logo/bahrLogo1.svg?react";
import Menu2 from "../assets/icons/menu2.svg?react";


export function Header() {
  return (
    <div className="flex h-12  justify-around relative top-3.5   max-[890px]:gap-14">
      <div className="w-72 border-blue-700 flex justify-start gap-4 max-[1003px]:w-64 max-[1003px]:text-base">
        <div className="w-10 h-12 ">
          {" "}
          <BahrIcon1 className="relative top-1 right-2 h-9" />
        </div>{" "}
        <div className="w-44 h-12  pt-3 flex justify-center max-md:hidden ">
          {" "}
          <BahrIcon />
        </div>
      </div>

      <div className="w-2/5  flex gap-10 justify-center leading-10 p-2 whitespace-nowrap font-normal max-md:hidden max-lg:text-base  max-[1003px]:text-sm max-[1003px]:whitespace-nowrap max-[890px]:hidden">
        <p>خانه</p> <p>دوره ها</p> <p>اخبار و مقالات </p>
        <p>ارتباط باما</p>
      </div>
      <div className="w-72  border-black flex gap-5 justify-end max-md:gap-3 max-[1003px]:w-64">
        <div className="border-1 h-12 w-12 rounded-full flex justify-center pt-2.5 max-md:hidden ">
          <MoonIcon />
        </div>{" "}
        <Button color="primary" className="h-12 w-40 text-lg  rounded-full max-md:relative ">
          ورود یا ثبت نام
        </Button>{" "}
    <div className="md:hidden md:relative md:top-4 md:h-10">
      <Menu2 className=" w-12 h-10 relative top-1" />
    </div>

      </div>
    </div>
  );
}
