import React from "react";
import "./inputWithLabel.styles.css";
import Input from "../../../components/atoms/input";

type InputWithLabelProps = {
  title: string;
  value: string;
  onChangeValue: React.ChangeEventHandler<HTMLInputElement>;
};

export default function InputWithLabel({
  title,
  value,
  onChangeValue,
}: InputWithLabelProps) {
  return (
    <div className="input-Field-with-label-wrapper">
      <h2>{title}</h2>
      <Input value={value} onChange={onChangeValue} placeholder={title} />
    </div>
  );
}
