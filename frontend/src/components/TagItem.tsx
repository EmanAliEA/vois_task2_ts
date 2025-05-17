type TagItemProps = {
  text: string;
};

const TagItem: React.FC<TagItemProps> = ({ text }) => {
  return (
    <div className="bg-white text-[.4rem] lg:text-[.5rem] font-semibold px-1 py-1 lg:px-2 lg:py-1 text-sky-500 uppercase rounded-xl">
      {text}
    </div>
  );
};

export default TagItem;
