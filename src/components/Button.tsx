import React from "react";
import "./Button.scss";

interface ButtonProps {
  type: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  btnText: string;
  onClick: (e: React.MouseEvent) => void;
}

const Button: React.FC<ButtonProps> = ({ type, btnText, onClick }) => {
  return (
    <button className={`btn ${type}`} onClick={onClick}>
      {btnText}
    </button>
  );
};

export default Button;
