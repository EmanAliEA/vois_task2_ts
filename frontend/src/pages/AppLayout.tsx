import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import Login from "./Login";
import NavBar from "../components/NavBar";

function AppLayout() {
  const { isLogin } = useSelector((state: RootState) => state.user);
  return (
    <div className="flex flex-col w-full gap-10 min-h-screen bg-gray-300">
      <NavBar />
      <main className="self-center relative flex flex-col w-4/5 sm:w-4/5 p-2 pb-5 sm:px-10 lg:px-20 md:w-2/3 lg:w-[90%]">
        {!isLogin && <Login />}
        {isLogin && <Outlet />}
      </main>
    </div>
  );
}

export default AppLayout;
