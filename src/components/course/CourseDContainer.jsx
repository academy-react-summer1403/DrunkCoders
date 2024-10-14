import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Comment } from "@components";
import { MainContent } from "./MainContent";
import { OverView } from "./OverView";
import { PopularCourses } from "..";
import { getCourseDetails } from "@core/index";

export function CourseDContainer() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["courseDetails", id],
    queryFn: ({ signal }) => getCourseDetails(id, { signal }), // Pass id here
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading course details</div>;

  return (
    <>
      <div className='mt-12 md:flex md:gap-[5%]'>
        <aside className="md:w-[38%] w-full border-2">
          <div className='flex flex-col border-3 rounded-3xl p-3 h-fit gap-5 sticky top-0'>
            <OverView course={data} />
          </div>
        </aside>

        <main className='md:w-[57%] w-full flex flex-col gap-6'>
          <MainContent course={data} />
          <Comment courseId={id} />
        </main>
      </div>
      <div className="my-6">
        <PopularCourses />
      </div>
    </>
  );
}
