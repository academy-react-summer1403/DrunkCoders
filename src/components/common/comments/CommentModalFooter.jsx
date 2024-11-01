import { Sent, Smile } from "@assets/index";
import { Button } from "@components/index";
import { ModalFooter } from "@nextui-org/react";
import { ReplySection } from "./ReplySection";
import EmojiPicker from 'emoji-picker-react';
import { useState } from "react";

export function CommentModalFooter({
  isReply,
  addComment,
  addReply,
  modalInput,
  setModalInput,
  modalSubject,
  setModalSubject,
  replyToComment
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onEmojiClick = (emojiData) => {
    setModalInput(prevInput => prevInput + emojiData.emoji);
  };

  return (
    <ModalFooter className="flex justify-start">
      <Button
        type="submit"
        onClick={isReply ? addReply : addComment}
        className="relative top-5 h-16 p-0"
      >
        <Sent className="rounded-1xl h-8 w-8" />
      </Button>
      <div>
        {isReply && replyToComment && <ReplySection replyToComment={replyToComment} />}
        <div className="w-[700px] rounded-3xl border p-2 ">
          <input
            className="p-2 outline-none w-full bg-transparent"
            value={modalSubject}
            onChange={(e) => setModalSubject(e.target.value)}
            placeholder="عنوان نظر خود را وارد کنید"
          />
          <hr />
          <input
            className="w-full p-2 outline-none bg-transparent"
            value={modalInput}
            onChange={(e) => setModalInput(e.target.value)}
            placeholder={
              isReply ? 'پاسخ خود را بنویسید' : 'نظر خود را بنویسید'
            }
          />
        </div>
      </div>
      <div className="relative top-8 flex h-16 w-16 justify-center rounded-full border-1 border-gray-300">
        <div
          onClick={() => setShowEmojiPicker(prev => !prev)}
          className="cursor-pointer"
        >
          <Smile className="relative top-3.5" />
        </div>
        {showEmojiPicker && (
          <div className="absolute -top-72">
            <EmojiPicker onEmojiClick={onEmojiClick}
            theme="dark" />
          </div>
        )}
      </div>
    </ModalFooter>
  );
}
