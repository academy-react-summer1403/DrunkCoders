import { Sent, Smile } from "@assets/index";
import { Button, ModalCloseBtn } from "@components/index";
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
  replyToComment,
  setIsReply
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  

  const onEmojiClick = (emojiData) => {
    setModalInput(prevInput => prevInput + emojiData.emoji);
  };
  const handleEmojiClose = () => {
    setShowEmojiPicker(false); // Close the emoji picker
    // Additional logic to handle the modal close can go here, if needed
  };

  return (
    <ModalFooter>
    <div className="flex w-full items-center  ">
      <Button
        type="submit"
        onClick={isReply ? addReply : addComment}
        className=" p-4"
      >
        <Sent  />
      </Button>
      <div className="flex w-full flex-col">
        <div className="relative">
        {isReply && replyToComment && <ReplySection className='-bottom-5' replyToComment={replyToComment} setIsReply={setIsReply} />}
        </div>
        <div className="w-full rounded-3xl border p-2 bg-white dark:bg-zinc-900 z-40">
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
        <div
          onClick={() => setShowEmojiPicker(prev => !prev)}
          className="cursor-pointer rounded-full border-1 border-gray-300 p-2"
        >
          <Smile />
        </div>
          {showEmojiPicker && (
            <div className="absolute bottom-3 bg-white dark:bg-zinc-800 p-3 rounded-3xl">
              <ModalCloseBtn onClose={handleEmojiClose}/>
              <EmojiPicker onEmojiClick={onEmojiClick}
              className="dark:bg-zinc-900" />
            </div>
          )}
    </div>
    </ModalFooter>
  );
}
