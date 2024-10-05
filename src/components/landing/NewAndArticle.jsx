import { NewsCard, GridLayout } from "@components";
import { getWeekNews } from "@core";
import { useQuery } from "@tanstack/react-query";

export function NewAndArticle() {
  const params = {
    PageNumber: 1,
    RowsOfPage: 10,
    SortingCol: "InsertDate",
    SortType: "DESC",
  };

  const { data } = useQuery({
    queryKey: ["news", "week-news"],
    queryFn: ({ signal }) => getWeekNews({ params, signal }),
  });

  let newsHasPic = null;
  if (data) {
    newsHasPic = data.filter((news) => news.currentImageAddressTumb);
  }

  return (
    <>
      {data && (
        <GridLayout
          className="mb-20"
          title="اخبار و مقالات هفته"
          description="خبر ها و مقاله هایی که در این هفته منتشر شدند"
          card={NewsCard}
          dataArray={newsHasPic}
        />
      )}
    </>
  );
}
