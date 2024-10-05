import { useEffect, useState } from "react";
import { Button } from "@components";
import { Link } from "react-router-dom";

export function GridLayout({
  title,
  description,
  dataArray,
  card: Card,
  className,
}) {
  const [windowWidth, setWindowWidth] = useState(
    window.innerWidth < 640 ? null : "sm",
  );

  // console.log(dataArray);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      if (width < 640) {
        setWindowWidth(null);
      } else {
        setWindowWidth("sm");
      }
    });
  }, []);

  const isPopularCourses = title === "محبوب ترین دوره ها";

  return (
    <div className={`text-center ${className}`}>
      <h2 className="mb-3 text-[40px] font-medium">{title}</h2>
      <p className="font-mediumm mb-10 text-xl text-[#787878]">{description}</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {windowWidth === null &&
          dataArray.slice(0, 2).map((item, index) => {
            const buttonColor = item?.courseId
              ? index % 2 === 0
                ? "#5A7EFF"
                : "#DE59FF"
              : "#5A7EFF";

            return (
              <Card
                key={item?.id ?? index}
                data={item}
                buttonColor={buttonColor}
              />
            );
          })}
        {windowWidth === "sm" &&
          dataArray.map((item, index) => {
            const buttonColor = item?.courseId
              ? index % 2 === 0
                ? "#5A7EFF"
                : "#DE59FF"
              : "#5A7EFF";
            return (
              <Card
                key={item?.id ?? index}
                data={item}
                buttonColor={buttonColor}
              />
            );
          })}
      </div>

      <Link to={isPopularCourses ? "/courses" : "/news-articles"}>
        <Button className="mx-auto mt-6 block bg-primary-blue text-white sm:hidden">
          نمایش بیشتر
        </Button>
      </Link>
    </div>
  );
}
