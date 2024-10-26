// CommentModalFooter.js
import { Sent, Smile } from "@assets/index";
import { Button } from "@components/index";
import { ModalFooter } from "@nextui-org/react";
import { ReplySection } from "./ReplySection";

export function CommentModalFooter({
  isReply,
  addComment,          // Fixed prop name to match the one from CommentModal
  addReply,             // Fixed prop name to match the one from CommentModal
  modalInput,
  setModalInput,
  modalSubject,
  setModalSubject,
  replyToComment
}) {
  return (
    <ModalFooter className="flex justify-start">
      <Button
        type="submit"
        onClick={isReply ? addReply : addComment} // Calls the correct function
        className="relative top-5 h-16 p-0"
      >
        <Sent className="rounded-1xl h-8 w-8" />
      </Button>
      <div>
        {isReply && replyToComment && <ReplySection replyToComment={replyToComment} />}
        <div className="w-[700px] rounded-3xl border p-2 bg-white">
          <input
            className="p-2 outline-none w-full"
            value={modalSubject}
            onChange={(e) => setModalSubject(e.target.value)}
            placeholder="عنوان نظر خود را وارد کنید"
          />
          <hr />
          <input
            className="w-full p-2 outline-none"
            value={modalInput}
            onChange={(e) => setModalInput(e.target.value)}
            placeholder={
              isReply ? 'پاسخ خود را بنویسید' : 'نظر خود را بنویسید'
            }
          />
        </div>
      </div>
      <div className="relative top-8 flex h-16 w-16 justify-center rounded-full border-1 border-gray-300">
        <Smile className="relative top-3.5" />
      </div>
    </ModalFooter>
  );
}
