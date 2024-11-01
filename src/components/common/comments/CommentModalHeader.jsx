import { ModalCloseBtn } from "@components/index";
import { ModalHeader } from "@nextui-org/react";

export function CommentModalHeader({ modalTitle, onClose }) {
    return (
      <ModalHeader className="flex justify-evenly gap-[650px] relative">
        <h3 className="flex w-28 flex-row text-2xl">{modalTitle}📄</h3>
        <ModalCloseBtn onClose={onClose} />
      </ModalHeader>
    );
  }