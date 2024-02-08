import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { COUNTRY, NAME, userSortOption } from "../../helpers/dropDownOptions";
import useDebounce from "../../helpers/useDebounce";
import Input from "../../components/atoms/input";
import DropDown from "../../components/atoms/dropDown";
import UsersGrid from "../../components/molecules/usersGrid";
import "./home.styles.css";

const Home = () => {
  const users = useSelector((state: RootState) => state.users);
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearchFieldChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Here users list might be big if we requested large no of users. So filtering a big users array can be expensive.
  // Therefore memoizing the filtered users array and only filtering when debouncedSearchTerm or users list changes.
  // And using debouncedSearchTerm (delay 500ms) to filter users to improve performance and avoid unnecessary re-renders
  const filteredUsers = useMemo(() => {
    const searchValue = debouncedSearchTerm.toLowerCase();
    return users.usersList.filter(
      (user) =>
        user.name.first.toLowerCase().includes(searchValue) ||
        user.name.last.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue)
    );
  }, [debouncedSearchTerm, users.usersList]);

  // sorting only if filteredUsers changed or sort option changed
  const sortedUsers = useMemo(() => {
    let tempUsers = [...filteredUsers];
    if (sortBy === COUNTRY) {
      tempUsers.sort((a, b) =>
        a.location.country.localeCompare(b.location.country)
      );
    } else if (sortBy === NAME) {
      tempUsers.sort((a, b) => {
        const fullNameA = `${a.name.first} ${a.name.last}`;
        const fullNameB = `${b.name.first} ${b.name.last}`;
        return fullNameA.localeCompare(fullNameB);
      });
    }
    return tempUsers;
  }, [filteredUsers, sortBy]);

  return (
    <div className="home-wrapper">
      <div className="home-fields-wrapper">
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
      {users.isLoaded ? (
        <UsersGrid users={sortedUsers} />
      ) : (
        <h2>....Loading</h2>
      )}
    </div>
  );
};

export default Home;
