import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@/types/users";
import InputWithLabel from "../inputWithLabel";
import Button from "../../../components/atoms/button";
import "./userEditDetailsCard.styles.css";

type userCardProps = {
  user: User;
};

export default function UserEditDetailsCard({ user }: userCardProps) {
  const navigate = useNavigate();
  return (
    <div className="user-edit-card-wrapper">
      <img
        src={user.picture.large}
        alt="User"
        className="user-edit-card-image"
      ></img>
      <div className="user-edit-card-details-wrapper">
        <InputWithLabel
          title={"First Name"}
          value={user.name.first}
          onChangeValue={() => {}}
        />
        <InputWithLabel
          title={"Last Name"}
          value={user.name.last}
          onChangeValue={() => {}}
        />
        <InputWithLabel
          title={"Email"}
          value={user.email}
          onChangeValue={() => {}}
        />
        <InputWithLabel
          title={"Phone"}
          value={user.phone}
          onChangeValue={() => {}}
        />
        <Button
          text="Save"
          onClick={() => navigate("/")}
          style={{ float: "right" }}
        />
      </div>
    </div>
  );
}
