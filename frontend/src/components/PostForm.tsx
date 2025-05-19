import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Input from "../ui/Input";

type Post = {
  id?: number;
  title: string;
  author: string;
  image?: string;
  date?: string;
  tags?: string[];
  content?: string;
};

type PostFormProps = {
  edit?: boolean;
  submitFn: (data: Post) => void;
  post?: Post;
};

const PostForm: React.FC<PostFormProps> = ({
  edit = false,
  submitFn,
  post = {},
}) => {
  const buttonStyle = "!text-[1rem] !px-6 !self-end !sm:self-end !md:self-end";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as unknown as Post;
    data.tags =
      data.tags
        ?.toString()
        .trim()
        .split(",")
        .map((tag) => tag.trim()) || [];

    submitFn(post.id ? { ...data, id: post.id } : { ...data });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-auto border mt-3 text-sky-700  bg-white font-semibold w-3/4 lg:w-1/2  flex gap-2 md:gap-3 flex-wrap  md:flex-col border-white  p-4 md:p-6 md:pb-8 rounded-2xl shadow-xl shadow-sky-900"
    >
      <Input defaultValue={post.title || ""} isLoginForm={true} name="title">
        Title
      </Input>
      <Input defaultValue={post.author || ""} isLoginForm={true} name="author">
        Author
      </Input>
      <Input
        defaultValue={post.image || ""}
        isRequired={false}
        isLoginForm={true}
        name="image"
      >
        Image
      </Input>
      <Input
        defaultValue={post.date || ""}
        type="date"
        isLoginForm={true}
        name="date"
      >
        Date
      </Input>
      <Input
        defaultValue={post.tags?.join(",") || ""}
        isLoginForm={true}
        name="tags"
        placeholder="Please write tags with comma"
      >
        Tags
      </Input>
      <textarea
        name="content"
        defaultValue={post.content || ""}
        rows={3}
        placeholder="Content"
        className="resize-none text-gray-500 rounded-[.2rem] border-gray-300 border-1 shadow shadow-sky-900/40 p-1 outline-none"
      ></textarea>
      <div className="flex gap-2 self-end">
        <Button style={buttonStyle} type="submit">
          {edit ? "Edit" : "Add Post"}
        </Button>
        <Button style={buttonStyle}>
          <Link to="/">Cancel</Link>
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
