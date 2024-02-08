import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../../store/user.slice";
import { User } from "@/types/users";
import InputWithLabel from "../inputWithLabel";
import Button from "../../../components/atoms/button";
import "./userEditDetailsCard.styles.css";

type userCardProps = {
  user: User;
};

export default function UserEditDetailsCard({ user }: userCardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({ ...user });
  const onChangeUserData = (field: string, value: string) => {
    if (field === "first" || field === "last") {
      setUserData({ ...userData, name: { ...userData.name, [field]: value } });
    } else if (field === "phone" || field === "email") {
      setUserData({ ...userData, [field]: value });
    }
  };

  const onSaveClick = () => {
    dispatch(updateUser({ id: userData.login.uuid, updatedUser: userData }));
    navigate("/");
  };
  return (
    <div className="user-edit-card-wrapper">
      <img
        src={userData.picture.large}
        alt="User"
        className="user-edit-card-image"
      ></img>
      <div className="user-edit-card-details-wrapper">
        <InputWithLabel
          title={"First Name"}
          value={userData.name.first}
          onChangeValue={(e) => onChangeUserData("first", e.target.value)}
        />
        <InputWithLabel
          title={"Last Name"}
          value={userData.name.last}
          onChangeValue={(e) => onChangeUserData("last", e.target.value)}
        />
        <InputWithLabel
          title={"Email"}
          value={userData.email}
          onChangeValue={(e) => onChangeUserData("email", e.target.value)}
        />
        <InputWithLabel
          title={"Phone"}
          value={userData.phone}
          onChangeValue={(e) => onChangeUserData("phone", e.target.value)}
        />
        <Button text="Save" onClick={onSaveClick} style={{ float: "right" }} />
      </div>
    </div>
  );
}
