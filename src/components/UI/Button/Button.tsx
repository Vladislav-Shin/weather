import React, { FC } from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(styles.button, className)}>
      {children}
    </button>
  );
};

export default Button;
