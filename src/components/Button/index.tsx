import React, { CSSProperties } from "react";

import classes from "./index.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  size?: "lg" | "md";
  variant: "contained" | "outlined";
  style?: CSSProperties;
  className?: string;
}

const Button = ({
  children,
  size = "md",
  variant = "contained",
  style,

  className: cutomClass = "",
}: ButtonProps) => {
  const buttonClass = `${classes.button} ${classes[size]} ${classes[variant]} ${cutomClass} rounded`;

  return (
    <button style={style} className={buttonClass}>
      {children}
    </button>
  );
};

export default React.memo(Button);
