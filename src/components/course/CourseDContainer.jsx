import { StarInCircle } from "@assets";
import { OverView } from "./OverView";
import { Rating } from "@components";

export function CourseDContainer() {

  
  return (
    <>
    <div className='mt-4 border-3 rounded-3xl h-fit '>
      <div className='mt-12 flex gap-[5%]'>
        <OverView/>

        <div className='w-[57%] border-3 flex flex-col gap-6'>           
            <img src="" alt="" className='bg-[#FF9090] w-full h-96 rounded-3xl'/>
            <p className='text-gray-400'>مدرس</p>
            <div className='flex gap-[10%]'>
              <div className='flex gap-2 items-center'>
                <img src="" alt="" className="rounded-full w-10 h-10 bg-gray-300" />
                <span>
                  محسن اسفندیاری
                  <br />
                <span className='text-sm text-gray-400'>سنیور فرانت اند</span>
                </span>
              </div>
              <div className='flex gap-2 items-center'>
                <img src="" alt="" className="rounded-full w-10 h-10 bg-gray-300" />
                <span>
                  مهدی اصغری
                  <br />
                <span className='text-sm text-gray-400'>سنیور فرانت اند</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-6 mt-4" >
              <span className="text-gray-500">
                توضیحات
              </span>
              <h1 className="font-bold text-xl">ری اکت چیست؟</h1>
              <p>ری‌اکت (React) یک کتابخانه جاوا اسکریپت برای ساخت رابط‌های کاربری 
                (UI) است که توسط فیس‌بوک توسعه داده شده است. این کتابخانه به توسعه‌دهندگان این امکان را می‌دهد 
                که به‌راحتی و به‌صورت مؤثر، کامپوننت‌های تعاملی و پیچیده بسازند. 
              </p>

              <Rating/>
              
            </div>
        </div>
      </div>
    </div>
    </>
  )
}
