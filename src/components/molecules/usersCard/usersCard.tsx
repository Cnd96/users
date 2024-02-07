import React from "react";
import "./usersCard.styles.css";
import { User } from "@/types/users";
import Edit from "../../../assets/Edit.svg";

type userCardProps = {
  user: User;
};

export default function UserCard({ user }: userCardProps) {
  return (
    <div className="user-card-wrapper">
      <div className="user-card-container ">
        <div className="user-card-header">
          <img src={Edit} alt="edit" />
          <h3>{`${user.name.first} ${user.name.last}`}</h3>
        </div>
        <img
          src={user.picture.large}
          alt="User"
          className="user-card-image"
        ></img>
        <div className="user-card-details">
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{`${user.location.city}, ${user.location.country}`}</p>
        </div>
      </div>
    </div>
  );
}
