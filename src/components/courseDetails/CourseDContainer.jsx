import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Comment } from "@components";
import { MainContent } from "./MainContent";
import { OverView } from "./CourseSide";
import { getCategory, getCourseDetails } from "@core/index";
import { RelatedCourse } from "./RelatedCourse";
import { DetailsLayout } from "../common/detail/DetailsLayout";
import { Spinner } from "@nextui-org/react";


export function CourseDContainer() {
  
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["courseDetails", id],
    queryFn: ({ signal }) => getCourseDetails(id, { signal }),
  });

  const { data:category }= useQuery({
  queryKey: ["allCategories"],
  queryFn: ()=> getCategory()
  })

  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Spinner size="lg" label="در حال دریافت ..." labelColor="primary" />
      </div>
    );
  }
  if (error) return <div>Error loading course details</div>;

  const getMatchingCategoryIds = () => {
    if (!data || !category) return [];

    return data.techs.map((tech) => {
      const matchingCategory = category.find((cat) => cat.techName === tech);
      return matchingCategory ? matchingCategory.id : null;
    }).filter(Boolean); 
  };

  const matchingCategoryIds = getMatchingCategoryIds();

  return (
    <>
      <DetailsLayout
          asideContent={<OverView course={data} />}
          relatedCourse={<RelatedCourse techId={matchingCategoryIds[0]} />}
      >
          <MainContent course={data} />
          <Comment courseId={id} />
      </DetailsLayout>

    </>
  );
}
