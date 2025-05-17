import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { User } from "../services/checkUser";

const UserInfo: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user) as {
    user: User | null;
  };

  if (!user) {
    return <div>No user information available.</div>;
  }

  return (
    <div className="bg-white/60 flex flex-col justify-center items-center sm:items-start sm:justify-start text-sm lg:text-xl gap-5 lg:gap-5 p-5  lg:py-8 lg:px-20 shadow-xl shadow-black">
      <div className="flex flex-col justify-center items-center sm:items-start sm:justify-start sm:flex-row gap-5 lg:gap-8">
        <img
          src="https://clipground.com/images/my-profile-icon-clipart-2.jpg"
          alt=""
          className="rounded-full w-20 h-20 lg:w-28 lg:h-28"
        />
        <div className="flex flex-col gap-1 ">
          <p>
            <b>Name</b>: {user.name}
          </p>
          <p>
            <b>Email</b>: {user.email}
          </p>
          <p>
            <b>Designation</b>: {user.job || "_"}
          </p>
          <p>
            <b>Location</b>: {user.location || "_"}
          </p>
        </div>
      </div>
      <div className="ms-4 w-full lg:p-6">
        <p className="font-semibold text-sm lg:text-xl">Bio</p>
        <textarea
          cols={80}
          defaultValue={user.about || "_"}
          rows={user.about ? 2 : 1}
          className="p-2 resize-none w-3/4 lg:w-full"
          placeholder="Enter your bio here"
          title="User Bio"
        ></textarea>
      </div>
    </div>
  );
};

export default UserInfo;
