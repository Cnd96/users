import React, { useEffect, useMemo, useState } from "react";
import "./home.styles.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getUsersListAsync } from "../../store/user.slice";
import UsersGrid from "../../components/molecules/usersGrid";
import useDebounce from "../../helpers/useDebounce";

const Home = () => {
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();
  // const [filteredUsers, setFilteredUsers] = useState(users.usersList);
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // debounce searchTerm by 500ms

  useEffect(() => {
    dispatch(getUsersListAsync());
  }, []);

  // Here users list might be big if we requested large no of users. So filtering a big users array can be expensive.
  // Therefore using debouncedSearchTerm (delay 500ms) to filter users to improve performance and avoid unnecessary re-renders
  // useEffect(() => {
  //   const searchValue = debouncedSearchTerm.toLowerCase();
  //   console.log("filterinnnnnn");
  //   const tempUsers = users.usersList.filter(
  //     (user) =>
  //       user.name.first.toLowerCase().includes(searchValue) ||
  //       user.name.last.toLowerCase().includes(searchValue) ||
  //       user.email.toLowerCase().includes(searchValue)
  //   );
  //   setFilteredUsers(tempUsers);
  // }, [debouncedSearchTerm, users.usersList]);

  const handleSearchFieldChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Here users list might be big if we requested large no of users. So filtering a big users array can be expensive.
  // Therefore memoizing the filtered users array and only filtering when debouncedSearchTerm or users changes.
  // And using debouncedSearchTerm (delay 500ms) to filter users to improve performance and avoid unnecessary re-renders
  const filteredUsers = useMemo(() => {
    const searchValue = debouncedSearchTerm.toLowerCase();
    console.log("filterig");
    return users.usersList.filter(
      (user) =>
        user.name.first.toLowerCase().includes(searchValue) ||
        user.name.last.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue)
    );
  }, [debouncedSearchTerm, users.usersList]);

  // sorting only if filteredUsers changed or sort option changed
  const sortedUsers = useMemo(() => {
    console.log("sorting");
    let sortedUsers = [...filteredUsers];
    if (sortBy === "email") {
      sortedUsers.sort((a, b) => a.email.localeCompare(b.email));
    } else if (sortBy === "name") {
      sortedUsers.sort((a, b) => {
        const fullNameA = `${a.name.first} ${a.name.last}`;
        const fullNameB = `${b.name.first} ${b.name.last}`;
        return fullNameA.localeCompare(fullNameB);
      });
    }
    return sortedUsers;
  }, [filteredUsers, sortBy]);

  return (
    <div className="home-wrapper">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          className="searchTerm"
          placeholder="Search User"
          value={searchTerm}
          onChange={handleSearchFieldChange}
        ></input>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option disabled value="">
            Sort by
          </option>
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
      </div>
      <UsersGrid users={sortedUsers} />
    </div>
  );
};

export default Home;
