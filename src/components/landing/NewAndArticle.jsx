import { NewsCard, GridLayout } from "../index";

export function NewAndArticle() {
  return (
    <GridLayout
      className="mb-20"
      title="اخبار و مقالات هفته"
      description="خبر ها و مقاله هایی که در این هفته منتشر شدند"
      card={NewsCard}
      dataArray={Array.from({ length: 4 })}
    />
  );
}
