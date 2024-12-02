import React, {useState, useEffect} from "react";
import style from './style.module.scss';
import SearchIcon from '../../../../public/images/icons/search.svg?react';
import Button from "../../atoms/Button/Button.jsx";
import cn from 'classnames';
import PropTypes from "prop-types";
import UserHeader from "@/components/molecules/UserHeader/UserHeader.jsx";
import {useFetchUsersByRole} from "@/hooks/handleUser.js";
import {AppointmentsList} from "@/components/organisms/CustomerAppointments/index.js";

const Search = ({className, role}) => {
    const users = useFetchUsersByRole(role);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        setFilteredUsers(users);
    }, [users]);

    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchTerm(searchValue);
        setIsSearching(searchValue !== "");

        const filtered = users.filter(
            (user) =>
                user.username.toLowerCase().includes(searchValue) ||
                user.email.toLowerCase().includes(searchValue)
        );

        setFilteredUsers(filtered);
    };

    const handleUserClick = (userId) => {
        if (selectedUserId !== userId) {
            setSelectedUserId(userId);
        } else {
            setSelectedUserId(null);
        }
    }

    return (
        <section className={cn(className)}>
            <div className={style.search}>
                <input
                    type="text"
                    name="search"
                    placeholder="Search..."
                    className={style.searchInput}
                    value={searchTerm}
                    onChange={handleSearch}
                />

                <Button
                    className={style.searchButton}
                >
                    <SearchIcon/>
                </Button>
            </div>

            <div className={style.searchResult}>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <Button
                            key={user.id}
                            variant='transparent'
                            onClick={() => handleUserClick(user.id)}
                            className={style.userBtn}
                        >
                            <UserHeader userAvatar={user.userAvatar} username={user.username}/>
                        </Button>
                    ))
                ) : (
                    <p>No users found</p>
                )}
            </div>

            {role === "user" && selectedUserId && (
                <AppointmentsList userId={selectedUserId}/>
            )}
        </section>
    );
};

Search.propTypes = {
    className: PropTypes.string,
    role: PropTypes.oneOf(['user', 'tailor'])
};

export default Search;
