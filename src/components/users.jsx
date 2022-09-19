import React from "react";
import User from "./user.jsx";
import PropTypes from "prop-types";

const Users = ({ users, onDelete, onToggleBookMark }) => {
    return (
        <>
            {users.map((user) => {
                return (
                    <User
                        key={user._id}
                        {...user}
                        onDelete={onDelete}
                        onToggleBookMark={onToggleBookMark}
                    />
                );
            })}
        </>
    );
};
Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};
export default Users;
