export function ServicesDivider() {
    return (
        <div className="bg-primary-blue h-16  rotate-3 md:-rotate-3 my-16 md:mb-0 md:mt-20 relative left-64 flex items-center min-w-max">
            {Array.from({length: 10}).map((_, index) => {
                return (
                    <div key={index} className="flex text-white items-center">
                        <p className="text-lg ">خدماتی که ما به شما ارائه میدیم</p>
                        <div className="w-2 h-2 rounded-full bg-white mx-4 " />
                    </div>
                )
            })}
        </div>
    )
}
