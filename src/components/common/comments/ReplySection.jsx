import { Cancel2 } from "@assets/index";

export function ReplySection({ replyToComment,setIsReply }) {
    return (
      <div className="identify p-4 pb-8 -mb-5 bg-primary-blue text-white rounded-t-3xl flex justify-between">
        <span>پاسخ به {replyToComment.author}</span>
        <span className="cursor-pointer flex items-cente" onClick={()=>setIsReply(false)}>انصراف <Cancel2/></span>
      </div>
    );
  }