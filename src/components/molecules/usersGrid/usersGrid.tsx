import React from "react";
import { User } from "@/types/users";
import UserCard from "../usersCard/usersCard";
import "./usersGrid.styles.css";

type usersGridProps = {
  users: User[];
};

export default function UsersGrid({ users }: usersGridProps) {
  return (
    <div className="users-grid">
      {users.map((user) => (
        <UserCard user={user} key={user.login.uuid}></UserCard>
      ))}
    </div>
  );
}
