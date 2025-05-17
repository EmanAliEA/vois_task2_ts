import PostItem from "../components/PostItem";
import Loader from "../ui/Loader";
import { fetchPosts } from "../services/postsApi";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "./ErrorPage";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { Post } from "../services/postsApi";

const Posts: React.FC = () => {
  const { numPage } = useSelector((state: RootState) => state.user);

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return (
    <div className="flex flex-col text-center items-center gap-4">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sky-800">
        Latest from the blog
      </h1>
      <p className="lg:w-2/3">
        Stay informed and inspired: discover the freshest blog articles, latest
        updates, and breaking news.
      </p>
      <ul className="w-full lg:w-full flex flex-wrap gap-5 justify-center py-5">
        {isLoading && <Loader />}
        {isError && <ErrorPage error={error?.message || "An error occurred"} />}
        {!isLoading &&
          (posts ?? [])
            .slice((numPage - 1) * 6, (numPage - 1) * 6 + 6)
            .map((post) => <PostItem post={post} key={post.title} />)}
      </ul>

      {!isLoading && (posts ?? []).length > 4 && <Pagination />}
    </div>
  );
};

export default Posts;
