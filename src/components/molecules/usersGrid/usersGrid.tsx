import React from "react";
import { User } from "@/types/users";
import UserCard from "../usersCard/usersCard";
import "./usersGrid.styles.css";

type UsersGridProps = {
  users: User[];
};

export default function UsersGrid({ users }: UsersGridProps) {
  return (
    <div className="users-grid">
      {users.map((user) => (
        <UserCard user={user} key={user.login.uuid}></UserCard>
      ))}
    </div>
  );
}
