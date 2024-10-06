import { Button } from "@components";
import {
  MoonIcon,
  BahrLogo,
  BahrLogo1,
  Menu1,
  Telegram,
  Instagram,
  Phone,
  News,
  Book,
  Home,
  ShortLine,
} from "@assets";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

export function Header() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="relative top-3.5 flex h-12 justify-around gap-16 max-lg:gap-0">
      <div className="flex w-72 justify-start gap-4 max-lg:w-64 max-lg:gap-3">
        <div className="h-12 w-10">
          {" "}
          <BahrLogo1 className="relative right-2 top-1 h-9" />
        </div>{" "}
        <div className="flex h-12 w-44 justify-center pt-3 max-md:hidden">
          {" "}
          <img src={BahrLogo} className="ml-8 h-8 w-40" />
        </div>
      </div>

      <div className="flex w-2/5 justify-center gap-10 whitespace-nowrap p-2 text-lg font-normal leading-10 max-lg:mx-5 max-lg:gap-5 max-md:hidden">
        <Link to="/">خانه</Link> <Link to="/courses">دوره ها</Link> <Link  to="/article-news">اخبار و مقالات </Link>
        <Link to="/">ارتباط باما</Link>
      </div>

      <div className="flex w-72 justify-end gap-5 border-black max-lg:gap-3 max-md:block max-md:w-fit max-md:gap-2">
        <div className="relative top-1.5 flex h-11 w-11 justify-center rounded-full border-1 pt-3 max-md:hidden">
          <MoonIcon className="h-5" />
        </div>{" "}
        <div className="max-md:relative max-md:right-20 max-md:flex max-sm:right-11">
          <Button 
            color="primary"
            className="h-12 w-40 rounded-full text-lg max-md:relative"
          >
            <Link to="/auth">ورود یا ثبت نام </Link>
          </Button>{" "}
          <div className="md:relative md:top-4 md:hidden md:h-10">
            <Button
              className="bg-white max-lg:hidden max-md:block lg:hidden"
              onPress={onOpen}
            >
              <Menu1 className="relative -top-1 h-10 w-12" />
            </Button>
            <Modal
              backdrop="opaque"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              motionProps={{
                variants: {
                  enter: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  },
                  exit: {
                    y: -20,
                    opacity: 0,
                    transition: {
                      duration: 0.2,
                      ease: "easeIn",
                    },
                  },
                },
              }}
            >
              <ModalContent className="relative bottom-36">
                {() => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      <ShortLine className="relative right-40 -mt-2 mr-3" />
                    </ModalHeader>
                    <ModalBody className="">
                      <div className="h-50 mb-1 mt-3 flex gap-16 rounded-t-3xl bg-white">
                        <div className="flex h-full w-44">
                          <div className="flex h-full w-12 flex-col gap-6 pr-4 pt-3">
                            <Home />
                            <Book />
                            <News />
                            <Phone />
                          </div>
                          <div className="flex h-full w-32 flex-col gap-2 pr-2 pt-1 text-lg leading-10">
                            <Link to="/">خانه</Link> <Link to="/courses">دوره ها</Link>{" "}
                            <Link to="/article-news">اخبار و مقالات </Link>
                            <Link to="/">ارتباط باما</Link>
                          </div>
                        </div>
                        <div className="flex h-full w-44 flex-col gap-2 pt-1 text-base leading-10 text-gray-500">
                          <p className="relative text-left">صفحه اصلی</p>
                          <p>تمامی دوره های برگزا...</p>
                          <p>خبر های پروژهشگاه و ...</p>
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <div className="mx-2 flex h-20 w-full border-t-2 border-gray-200">
                        <BahrLogo1 className="mt-3 h-8 w-8" />
                        <img src={BahrLogo} className="mt-4 h-9 w-40" />
                        <Telegram className="mr-32 mt-3 h-10 w-10" />
                        <Instagram className="mr-3 mt-3 h-10 w-10" />
                      </div>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
