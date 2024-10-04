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
    <div className="relative top-3.5 flex h-12 justify-around gap-16 max-lg:gap-0  ">
      <div className="flex w-72 justify-start gap-4  max-lg:w-64 max-lg:gap-3 ">
        <div className="h-12 w-10 ">
          {" "}
          <BahrLogo1 className="relative right-2 top-1 h-9" />
        </div>{" "}
        <div className="flex h-12 w-44 justify-center pt-3 max-md:hidden ">
          {" "}
          <img src={BahrLogo} className="w-40 h-8 ml-8 " />
          </div>
      </div>

      <div className="flex w-2/5 justify-center gap-10 whitespace-nowrap p-2 font-normal text-lg leading-10 max-lg:mx-5 max-lg:gap-5 max-md:hidden ">
        <Link>خانه</Link> <Link>دوره ها</Link> <Link>اخبار و مقالات </Link>
        <Link>ارتباط باما</Link>
      </div>

      <div className=" flex w-72 justify-end gap-5 border-black max-lg:gap-3 max-md:gap-2 max-md:block  max-md:w-fit ">
        <div className="relative top-1.5 flex h-11 w-11 justify-center rounded-full border-1 pt-3 max-md:hidden">
          <MoonIcon className="h-5 " />
        </div>{" "}
        <div className="max-md:flex max-md:relative max-md:right-20 max-sm:right-11">
          <Button
            color="primary"
            className="h-12 w-40 rounded-full text-lg  max-md:relative "
          >
            ورود یا ثبت نام
          </Button>{" "}
          <div className="md:relative md:top-4 md:hidden md:h-10">
            <Button
              className="max-md:block  max-lg:hidden lg:hidden bg-white"
              onPress={onOpen}
            >
              <Menu1 className=" w-12 h-10 relative -top-1" />
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
                      <ShortLine className="relative right-40 mr-3 -mt-2" />
                    </ModalHeader>
                    <ModalBody className="">
                      <div className="h-50 rounded-t-3xl bg-white flex mt-3 gap-16 mb-1 ">
                        <div className=" w-44 h-full flex  ">
                          <div className=" w-12 h-full  flex flex-col gap-6 pt-3 pr-4">
                            <Home />
                            <Book />
                            <News />
                            <Phone />
                          </div>
                          <div className="w-32 h-full leading-10 flex gap-2 flex-col pt-1 text-lg pr-2">
                            <Link>خانه</Link> <Link>دوره ها</Link>{" "}
                            <Link>اخبار و مقالات </Link>
                            <Link>ارتباط باما</Link>
                          </div>
                        </div>
                        <div className="w-44 h-full text-base text-gray-500 leading-10 pt-1 flex flex-col gap-2">
                          <p className="relative text-left">صفحه اصلی</p>
                          <p>تمامی دوره های برگزا...</p>
                          <p>خبر های پروژهشگاه و ...</p>
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <div className="border-gray-200 border-t-2 h-20 w-full mx-2 flex ">
                        <BahrLogo1 className="h-8 w-8 mt-3" />
                        <img src={BahrLogo} className="w-40 h-9 mt-4" />
                        <Telegram className="h-7 w-7 mt-3 mr-32" />
                        <Instagram className="h-7 w-7 mt-3 mr-3" />
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
