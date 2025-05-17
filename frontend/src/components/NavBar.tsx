import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import type { RootState, AppDispatch } from "../store/store";
import { checkLogout } from "../services/checkUser";
import { logout } from "../features/userSlice";

function NavBar() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLogin, user } = useSelector((state: RootState) => state.user);

  return (
    <nav
      className={`bg-sky-950 text-white text-center py-3  lg:py-5 w-full ${
        isLogin ? "flex justify-around" : ""
      }`}
    >
      <h1 className="sm:text-2xl lg:text-3xl">Blog Dashboard</h1>
      {isLogin && (
        <Button
          style="!px-3 lg:!px-5"
          onClick={() => {
            checkLogout(user);
            dispatch(logout());
          }}
        >
          Logout
        </Button>
      )}
    </nav>
  );
}

export default NavBar;
