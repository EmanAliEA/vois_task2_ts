import { FaKey, FaLocationArrow, FaRegUser } from "react-icons/fa";
import { MdWork, MdEmail } from "react-icons/md";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useState } from "react";
import React from "react";

import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { checkUser } from "../services/checkUser";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import type { User } from "../services/checkUser";

interface ErrorState {
  emailError?: string;
  passError?: string;
}

function Login() {
  const inputStyle = "h-10 sm:h-11 lg:h-11";
  const buttonStyle = "!text-[1rem] !px-6 md:!text-[1.2rem] lg:!text-[1.2rem]";
  const [isSign, setIsSign] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSign = () => {
    setError({});
    setIsSign(true);
  };

  const handleLogin = () => {
    setError({});
    setIsSign(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: User = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      name: (formData.get("name") as string) || "",
      location: (formData.get("location") as string) || "",
      about: (formData.get("about") as string) || "",
      job: (formData.get("job") as string) || "",
      isLogin: !isSign,
    };

    const res = checkUser(data, isSign);

    if (!res) {
      setError({
        emailError: "An unexpected error occurred. Please try again.",
      });
      return;
    }

    if (isSign) {
      return typeof res === "string"
        ? setError({ emailError: res })
        : handleLogin();
    }

    if (!("email" in res.user)) {
      setError(res.error || { emailError: "Invalid credentials." });
      return;
    }

    dispatch(login(res.user));
    e.currentTarget.reset();
    navigate("/");
  };

  return (
    <LoginForm onSubmit={handleSubmit} isSign={isSign}>
      <h2 className="text-xl sm:text-3xl lg:text-3xl font-semibold underline text-center text-sky-900">
        {isSign ? "Signup" : "Login"}
      </h2>

      {isSign && (
        <Input placeholder="UserName" name="name" customStyle={inputStyle}>
          <FaRegUser />
        </Input>
      )}

      <Input
        placeholder="Email"
        name="email"
        type="email"
        customStyle={inputStyle}
      >
        <MdEmail />
      </Input>
      {error.emailError && <p className="bg-red-100 p-2">{error.emailError}</p>}

      <Input
        placeholder="Password"
        type="password"
        name="password"
        minLength={6}
        customStyle={inputStyle}
      >
        <FaKey />
      </Input>
      {error.passError && <p className="bg-red-100 p-2">{error.passError}</p>}

      {isSign && (
        <>
          <Input
            placeholder="Location"
            name="location"
            customStyle={inputStyle}
          >
            <FaLocationArrow />
          </Input>
          <Input
            placeholder="Job"
            name="job"
            customStyle={inputStyle}
            isRequired={false}
          >
            <MdWork />
          </Input>
          <textarea
            name="about"
            id="about"
            placeholder="Bio"
            rows={3}
            className="resize-none text-gray-500 rounded-[.2rem] border-gray-300 border-1 shadow shadow-sky-900/40 p-1 outline-none"
          ></textarea>
        </>
      )}

      <div className="flex self-end gap-2 !mt-5 !lg:mt-10 lg:gap-3">
        <Button style={buttonStyle} onClick={handleLogin}>
          Login
        </Button>
        <Button style={buttonStyle} onClick={handleSign}>
          Signup
        </Button>
      </div>
    </LoginForm>
  );
}

export default Login;
