import React from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import UserPage from "../components/userPage.jsx";
import UsersList from "../components/usersList.jsx";

const Users = () => {
    const { userId } = useParams();
    return (
        <>
            {userId ? (
                <UserPage api={api} userId={userId} />
            ) : (
                <UsersList api={api} />
            )}
        </>
    );
};

export default Users;
