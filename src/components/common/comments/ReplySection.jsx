import { Cancel, Cancel2 } from "@assets/index";

export function ReplySection({ replyToComment,setIsReply }) {
    return (
      <div className="identify p-4 pb-8 -bottom-5 bg-primary-blue text-white rounded-t-3xl flex justify-between w-full absolute z-40">
        <span>پاسخ به {replyToComment.author||replyToComment.autor}</span>
        <span className="cursor-pointer flex items-cente" onClick={()=>setIsReply(false)}>انصراف <Cancel/></span>
      </div>
    );
  }