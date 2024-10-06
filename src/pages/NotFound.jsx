import { Glassy1, Glassy2 } from "@assets";
import { Button } from "@components";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <>
      <div className="mt-32 flex h-80 w-full justify-center border-black mb-24">
        <div className="relative h-full w-36 border-blue-500">
          <img src={Glassy1} className="absolute bottom-9 left-14 h-16 w-16" />
        </div>
        <div className="flex h-full w-80 flex-col border-red-600">
          <div className="mr-20 mt-9 h-32 w-40 border-purple-700 pt-6 text-center text-8xl font-semibold text-blue-500">
            404
          </div>
          <span className="text-center text-2xl font-medium text-blue-500">
            ما صفحه ای که دنبالش هستی
          </span>
          <span className="text-center text-2xl font-medium text-blue-500">
            رو نتونستیم پیدا کنیم!
          </span>
          <Button className="m-auto mt-7 h-14 w-36 text-lg">
            <Link to="/"> صفحه اصلی</Link>
          </Button>
        </div>

        <div className="relative h-full w-40 border-yellow-500">
          <img src={Glassy2} className="absolute left-10 top-8 w-20" />
        </div>
      </div>
    </>
  );
}
