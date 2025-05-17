import UserInfo from "../components/UserInfo";
import { Link } from "react-router-dom";
import PostItem from "../components/PostItem";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import { fetchPosts } from "../services/postsApi";
import type { Post } from "../services/postsApi";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "./ErrorPage";

const Dashboard: React.FC = () => {
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
    <>
      <Button style="mb-10 !px-6 self-end">
        <Link to="/newPost">New Post</Link>
      </Button>
      <UserInfo />
      <div className="flex flex-col gap-5 m-auto lg:px-10 lg:py-8 mt-5">
        <Link
          to="/posts"
          className="self-end text-sky-600 hover:text-sky-700 capitalize text-xl"
        >
          see all
        </Link>
        <ul className="flex flex-wrap  justify-evenly  h-[57rem] overflow-scroll gap-5">
          {isLoading && <Loader />}
          {isError && (
            <ErrorPage error={error?.message || "An error occurred"} />
          )}
          {!isLoading &&
            posts?.map((item: Post) => (
              <PostItem post={item} key={item.id} styleLi="bg-white/70" />
            ))}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
