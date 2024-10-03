export function ServicesDivider() {
  return (
    <div className="relative left-64 my-16 flex h-16 min-w-max rotate-3 items-center bg-primary-blue md:mb-0 md:mt-20 md:-rotate-3">
      {Array.from({ length: 10 }).map((_, index) => {
        return (
          <div key={index} className="flex items-center text-white">
            <p className="text-lg">خدماتی که ما به شما ارائه میدیم</p>
            <div className="mx-4 h-2 w-2 rounded-full bg-white" />
          </div>
        );
      })}
    </div>
  );
}
