import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "@/store";
import UserEditDetailsCard from "../../components/molecules/userEditDetailsCard/userEditDetailsCard";
import "./edit.styles.css";

const Edit = () => {
  let { id } = useParams();
  const user = useSelector((state: RootState) =>
    state.users.usersList.find((user) => user.login.uuid === id)
  );
  return (
    <div className="edit-wrapper">
      {user && <UserEditDetailsCard user={user} />}
    </div>
  );
};

export default Edit;
