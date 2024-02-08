import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { userSortOption } from "../../helpers/dropDownOptions";
import useDebounce from "../../helpers/useDebounce";
import Input from "../../components/atoms/input";
import DropDown from "../../components/atoms/dropDown/dropDown";
import UsersGrid from "../../components/molecules/usersGrid";
import "./home.styles.css";

const Home = () => {
  const users = useSelector((state: RootState) => state.users);

  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // debounce searchTerm by 500ms

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
    // console.log("sorting");
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
        <Input
          value={searchTerm}
          onChange={handleSearchFieldChange}
          placeholder="Search User"
        />
        <DropDown
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          options={userSortOption}
          placeholder="Sort by"
        />
      </div>
      <UsersGrid users={sortedUsers} />
    </div>
  );
};

export default Home;
