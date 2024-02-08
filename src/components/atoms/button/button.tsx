import React, { ButtonHTMLAttributes, forwardRef } from "react";
import "./button.styles.css";

type ButtonProps = {
  text: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef(
  ({ text, ...props }: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
    return (
      <button ref={ref} className="button-styles " {...props}>
        {text}
      </button>
    );
  }
);
export default Button;
