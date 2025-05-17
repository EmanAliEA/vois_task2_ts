import { BiLoaderAlt } from "react-icons/bi";

const Loader: React.FC = () => {
  return (
    <span
      role="img"
      aria-label="loading"
      className="animate-spin text-white text-8xl"
    >
      <BiLoaderAlt />
    </span>
  );
};

export default Loader;
