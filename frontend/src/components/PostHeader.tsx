import { FaRegUser } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { formatDate } from "../services/postsApi";

type PostHeaderProps = {
  author: string;
  date: string;
};

function PostHeader({ author, date }: PostHeaderProps) {
  const style = "flex gap-1 items-center text-[.7rem] lg:text-sm";
  const formatData = formatDate(date);

  return (
    <div className="flex gap-2 lg:gap-5 items-center">
      <div className={style}>
        <FaRegUser className="text-[.56rem] lg:text-[.7rem]" />
        <p>{author}</p>
      </div>
      <div className={style}>
        <CiCalendarDate />
        <p>{formatData}</p>
      </div>
    </div>
  );
}

export default PostHeader;
