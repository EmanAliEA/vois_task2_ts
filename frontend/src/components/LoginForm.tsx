import clsx from "clsx";
import React from "react";

interface LoginFormProps {
  children: React.ReactNode;
  isSign: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const formStyle = clsx(
  "shadow-xl",
  "shadow-sky-900",
  "bg-white",
  "rounded-xl",
  "m-auto",
  "w-full",
  "lg:w-1/2",
  "p-8",
  "lg:p-5",
  "gap-5",
  "sm:px-10",
  "lg:px-13",
  "flex",
  "flex-col",
  "lg:gap-5"
);

const LoginForm: React.FC<LoginFormProps> = ({
  children,
  isSign,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`${formStyle} ${isSign ? "lg:py-10" : "lg:py-28 mt-5"}`}
    >
      {children}
    </form>
  );
};

export default LoginForm;
