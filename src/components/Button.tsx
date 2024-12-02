import React from "react";
import "../styles/Button.css";

type ButtonProps = {
  label: string;
  onClick: () => void;
  extraClass?: string;
};

const Button: React.FC<ButtonProps> = ({ label, onClick, extraClass = "" }) => (
  <button className={`button ${extraClass}`} onClick={onClick}>
    {label}
  </button>
);

export default Button;
