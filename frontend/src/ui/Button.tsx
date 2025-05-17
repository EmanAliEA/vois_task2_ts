import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, style = "" }) => {
  return (
    <button
      className={`bg-sky-600 cursor-pointer hover:bg-sky-800 text-white text-xl rounded-xl lg:py-1 lg:px-10 focus:outline-none capitalize self-center ${style}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
