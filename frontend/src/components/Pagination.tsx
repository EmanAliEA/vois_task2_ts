import { changePage } from "../features/userSlice";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { useQuery } from "@tanstack/react-query";
import { getPost, type Post } from "../services/postsApi";

const Pagination: React.FC = () => {
  const { numPage } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const { data: posts = [] } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPost,
  });

  function handlePage(index: number): void {
    dispatch(changePage(index));
  }

  const totalPages = Math.ceil(posts.length / 6);

  return (
    <div className="space-x-1 flex justify-center">
      {posts.length > 0 &&
        Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            onClick={() => handlePage(index)}
            style={`${index + 1 === numPage ? "!bg-sky-800" : ""} !px-3`}
          >
            {index + 1}
          </Button>
        ))}
    </div>
  );
};

export default Pagination;
