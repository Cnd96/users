import React, { SelectHTMLAttributes, forwardRef } from "react";
import "./dropDown.styles.css";

type DropDownProps = {
  placeholder?: string;
  options: { value: string; title: string }[];
} & SelectHTMLAttributes<HTMLSelectElement>;

const DropDown = forwardRef(
  (
    { placeholder, options, ...props }: DropDownProps,
    ref: React.Ref<HTMLSelectElement>
  ) => {
    return (
      <select className="dropDown-Field" {...props} ref={ref}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    );
  }
);
export default DropDown;
