import React, { InputHTMLAttributes, forwardRef } from "react";
import "./input.styles.css";

type InputProps = {
  placeholder: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef(
  ({ placeholder, ...props }: InputProps, ref: React.Ref<HTMLInputElement>) => {
    return (
      <input
        className="input-Field"
        ref={ref}
        type="text"
        placeholder={placeholder}
        {...props}
      ></input>
    );
  }
);
export default Input;
