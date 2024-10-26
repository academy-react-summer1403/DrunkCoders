import { ModalHeader } from "@nextui-org/react";

export function CommentModalHeader({ modalTitle, onClose }) {
    return (
      <ModalHeader className="flex justify-evenly gap-[650px] relative">
        <h3 className="flex w-28 flex-row text-2xl">{modalTitle}📄</h3>
        <div className="flex h-10 w-24 rounded-full border-1 border-red-500 p-1 pr-4 text-center text-[14px] font-normal text-red-500 relative"
            onClick={onClose}>
            <p className="absolute left-4">X بستن </p>
        </div>
      </ModalHeader>
    );
  }