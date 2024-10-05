import { CourseCard, GridLayout } from "@components";
import { useQuery } from "@tanstack/react-query";
import { getTopCourses } from "@core/services/api/course";

export function PopularCourses() {
  const { data } = useQuery({
    queryKey: ["courses", "top-courses"],
    queryFn: ({ signal }) => getTopCourses({ count: 4, signal }),
  });

  return (
    <>
      {data && (
        <GridLayout
          title="محبوب ترین دوره ها"
          description="دوره هایی که بین دانشجو های ما محبوبیت بالایی داشتند"
          card={CourseCard}
          dataArray={data}
        />
      )}
    </>
  );
}
