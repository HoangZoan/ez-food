import React, { CSSProperties } from "react";

import classes from "./index.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  size?: "lg" | "md";
  variant?: "contained" | "outlined";
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
}

const Button = ({
  children,
  size = "md",
  variant = "contained",
  style,
  onClick,
  className: cutomClass = "",
}: ButtonProps) => {
  const buttonClass = `${classes.button} ${classes[size]} ${classes[variant]} ${cutomClass} rounded`;

  return (
    <button onClick={onClick} style={style} className={buttonClass}>
      {children}
    </button>
  );
};

export default React.memo(Button);
