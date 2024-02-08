import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@/types/users";
import Edit from "../../../assets/Edit.svg";
import "./usersCard.styles.css";

type UserCardProps = {
  user: User;
};

const UserCard = ({ user }: UserCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="user-card-wrapper">
      <div className="user-card-container ">
        <div className="user-card-header">
          <img
            src={Edit}
            alt="edit"
            onClick={() => navigate(`/edit/${user.login.uuid}`)}
          />
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
};

export default React.memo(UserCard);
