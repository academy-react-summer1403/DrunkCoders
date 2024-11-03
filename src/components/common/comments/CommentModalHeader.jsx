import { ModalCloseBtn } from "@components/index";
import { ModalHeader } from "@nextui-org/react";

export function CommentModalHeader({ modalTitle, onClose }) {
    return (
      <ModalHeader className="flex justify-between items-center">
        <h3 className="flex text-2xl">{modalTitle}📄</h3>
        <div>

        <ModalCloseBtn onClose={onClose} />
        </div>
      </ModalHeader>
    );
  }