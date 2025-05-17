import { useMutation, useQuery } from "@tanstack/react-query";
import Modal from "../components/Modal";
import PostForm from "../components/PostForm";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, queryClient, updatePost } from "../services/postsApi";
import type { Post } from "../services/postsApi";
import Loader from "../ui/Loader";
import ErrorPage from "./ErrorPage";

interface Params extends Record<string, string | undefined> {
  id: string;
}

const EditPost: React.FC = () => {
  const { id } = useParams<Params>();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(Number(id)),
  });

  const { mutate } = useMutation({
    mutationKey: ["posts", id],
    mutationFn: updatePost,
    onSuccess: () => {
      alert("Success to update post");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("../");
    },
  });

  let content;
  if (isLoading) content = <Loader />;
  if (isError)
    content = <ErrorPage error={error?.message || "An error occurred"} />;
  if (data) {
    const postWithId: Post = {
      ...data,
      id: data.id || 0,
      author: data.author || "Unknown",
    };
    content = (
      <PostForm
        edit={true}
        post={postWithId}
        submitFn={(updatedPost) =>
          mutate({
            ...updatedPost,
            id: updatedPost.id || 0,
            content: updatedPost.content || "",
          })
        }
      />
    );
  }

  return <Modal>{content}</Modal>;
};

export default EditPost;
