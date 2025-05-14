import React from "react";
import "./Button.css";

interface ButtonProps {
  type: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  btnText: string;
  onClick: (e: React.MouseEvent) => void;
}

const Button: React.FC<ButtonProps> = ({
  type,
  size = "medium",
  disabled = false,
  btnText,
  onClick,
}) => {
  return (
    <button
      className={`btn ${type} ${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {btnText}
    </button>
  );
};

export default Button;
