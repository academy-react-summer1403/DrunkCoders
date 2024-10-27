import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function App() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [backdrop, setBackdrop] = React.useState('opaque')

  const backdrops = [ "transparent"];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop)
    onOpen();
  }

  return (
    <>
           <div>
      <Button
        onPress={onOpen}
        className="h-5 w-2 rounded-full bg-white transition-none"
      >
        {' '}
        <View className="-left- relative" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="h-screen overflow-scroll max-w-[480px]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between gap-52">
                <p className="text-2xl">رزرو</p>
                <ModalCloseBtn onPress={onClose} />
              </ModalHeader>
              <ModalBody>
                <div className="relative">
                  <img
                    src=""
                    alt=""
                    className="h-[220px] w-[500px] rounded-xl border-2 border-[#D9D9D9] bg-[#D9D9D9]"
                  />
                  <div className="absolute right-3 top-3 flex gap-2">
                    <Button className="h-8 w-28">برنامه نویسی</Button>
                    <Button> مبتدی</Button>
                  </div>
                  <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-xl bg-[#FFD1CB] px-2 py-1 text-xs text-[#FF5454]">
                    <div className="h-2 w-2 rounded-full bg-[#FF5454]" />
                    <span> درحال برگزاری </span>
                  </div>
                </div>
                <div className="flex justify-between gap-52">
                  <Button className="h-12 w-28">
                    <Link to="/user-panel/myCourses"> صفحه دوره</Link>
                  </Button>
                  {/* <LikeAndDislike
                userLikeStatus={{
                  like: course.userIsLiked,
                  dislike: course.currentUserDissLike || course.userIsDissLiked,
                }}
                onLikeAndDislike={handleLikeAndDislike}
                like={course.likeCount}
                dislike={course.dissLikeCount}
                view={view}
              /> */}
                </div>
                <p className="relative top-2 mb-2 text-sm text-[#787878]">
                  نام دوره
                </p>
                <div className={`line-clamp-2 h-14 text-ellipsis`}>
                  <h3 className="inline text-xl font-medium dark:text-white">
                    {reservations.courseName} ریکت جی اس
                  </h3>
                  <span className="relative -top-[6px] mr-[2px] text-sm">
                    ( {/* ({news.currentRate} */}
                    <StarIcon className="-mt-1 mr-[2px] inline" />)
                  </span>
                </div>
                <div className="relative -top-4">
                  <p className="relative top-0 mb-2 text-sm text-[#787878]">
                    وضعیت ثبت نام{' '}
                  </p>

                  <p className="relative top-3 mb-5">
                    <Chip
                      className="capitalize" // بازگرداندن کلاس
                      color={statusColorMap[reservations.accept]}
                      size="sm"
                      variant="flat"
                    >
                      {reservations.accept ? 'تأیید شده' : 'تأیید نشده'}
                    </Chip>{' '}
                  </p>
                </div>
                <div className="relative -top-3">
                  <p className="top- relative mb-2 flex flex-col text-sm text-[#787878]">
                    {' '}
                    توضیح مختصر{' '}
                  </p>
                  <p className="mt-5 text-sm">
                    آموزش صفر تا صد کتابخانه پرطرفدار جی‌اس یعنی ری‌اکت همراه
                    تسک های مفید برای یادگیری بهتر
                  </p>
                </div>
                <div>
                  <p className="relative mb-2 mt-3 flex flex-col text-sm text-[#787878]">
                    {' '}
                    مدرس دوره{' '}
                  </p>
                  <div className="flex items-center gap-2">
                    <Avatar
                      src="https://images.unsplash.com/broken"
                      size="md"
                    />
                    <div className="flex flex-col">
                      <p>محسن اسفندیاری</p>
                      <p className="relative top-1 mb-2 flex flex-col text-sm text-[#787878]">
                        {' '}
                        سنیور فرانت اند{' '}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar
                      src="https://images.unsplash.com/broken"
                      size="md"
                    />
                    <div className="flex flex-col">
                      <p>مهدی اصغری</p>
                      <p className="relative top-1 mb-2 flex flex-col text-sm text-[#787878]">
                        {' '}
                        سنیور فرانت اند
                      </p>
                    </div>
                  </div>{' '}
                </div>{' '}
                <div className="relative top-0 flex gap-3 font-medium">
                  <Student />
                  <p className="relative top-1">
                    {reservations.currentRegistrants || 22} دانشجو
                  </p>
                </div>
              </ModalBody>{' '}
              <ModalFooter >
                <div className="flex w-full justify-between">
                  <div className='flex flex-col gap-4'>
                  <div className="flex gap-3 font-medium">
                    <Calender />
                    <p>
                      <span>شروع</span>
                      <span className="mr-1 text-sm font-light text-[#787878] dark:text-white/60">
                        (شروع)
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-3 font-medium">
                    <Calender />
                    <p>
                      <span>پابان</span>
                      <span className="mr-1 text-sm font-light text-[#787878] dark:text-white/60">
                        (پایان)
                      </span>
                    </p>
                  </div>{' '}</div>
                  <div className='flex gap-2 relative top-10'>
                  <span className="font-bold text-lg">
                  {/* {pirceFormatter(course.cost) ?? '1,880,000'} */}1,880,000
                </span>
                <span className="text-sm text-[#3772FF]">تومان</span>
                </div></div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal></div>
    </>
  );
}
