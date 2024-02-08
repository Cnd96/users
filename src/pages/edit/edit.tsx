import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UserEditDetailsCard from "../../components/molecules/userEditDetailsCard/userEditDetailsCard";
import { RootState } from "@/store";

const Edit = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const user = useSelector((state: RootState) =>
    state.users.usersList.find((user) => user.login.uuid === id)
  );
  console.log(user);
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "30px 0" }}
      >
        <UserEditDetailsCard user={user} />
      </div>
    </>
  );
};

export default Edit;
