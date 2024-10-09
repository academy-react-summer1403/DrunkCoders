import { Comment } from "./comment/Comment";
import { MainContent } from "./MainContent";
import { OverView } from "./OverView";


export function CourseDContainer() {

  
  return (
    <>
    <div className='mt-4 border-3 rounded-3xl h-fit '>
      <div className='mt-12 md:flex md:gap-[5%]'>
        <div className='flex flex-col md:w-[38%] w-full border-3 rounded-3xl p-3 h-fit gap-5'>
          <OverView/>
        </div>

        <div className='md:w-[57%] w-full border-3 flex flex-col gap-6'>           
          <MainContent/>
          <Comment/>
        </div>
      </div>
    </div>
    </>
  )
}
