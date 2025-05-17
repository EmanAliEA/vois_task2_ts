import { useNavigate } from "react-router-dom";
import { addPostApi, queryClient } from "../services/postsApi";
import { useMutation } from "@tanstack/react-query";
import PostForm from "../components/PostForm";
import type { Post } from "../services/postsApi";

const NewPost: React.FC = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (post: Post) => addPostApi(post),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Success creating new post");
      navigate("/");
    },
  });

  return (
    <>
      <h1 className="capitalize text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-sky-800">
        Add New Post
      </h1>
      <PostForm submitFn={(newPost) => mutate(newPost)} />
    </>
  );
};

export default NewPost;
