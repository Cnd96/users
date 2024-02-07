import React from "react";
import "./usersGrid.styles.css";
import { User } from "@/types/users";
import UserCard from "../usersCard/usersCard";

type usersGridProps = {
  users: User[];
};

export default function UsersGrid({ users }: usersGridProps) {
  return (
    <div className="users-grid">
      {users.map((user) => (
        // Here api returns null values for id so using email as key
        <UserCard user={user} key={user.email}></UserCard>
      ))}
    </div>
  );
}
