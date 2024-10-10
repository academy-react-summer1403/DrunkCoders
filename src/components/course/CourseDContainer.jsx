import { Comment } from "@components";
import { MainContent } from "./MainContent";
import { OverView } from "./OverView";
import { PopularCourses } from "..";


export function CourseDContainer() {

  
  return (
    <>
      <div className='mt-12 md:flex md:gap-[5%]'>
        <aside className="md:w-[38%] w-full border-2">
          <div className='flex flex-col  border-3 rounded-3xl p-3 h-fit gap-5 sticky top-0'>
            <OverView/>
          </div>
        </aside>

        <main className='md:w-[57%] w-full flex flex-col gap-6'>           
          <MainContent/>
          <Comment/>
        </main>
      </div>
      <div className="my-6">
      <PopularCourses/>
      </div>
    </>
  )
}
