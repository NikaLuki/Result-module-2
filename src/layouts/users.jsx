import React from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserChangesPage from "../components/page/userChangesPage";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const { userId, edit } = useParams();
    return (
        <UserProvider>
            {userId ? (
                edit ? (
                    <UserChangesPage />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage api={api} />
            )}
        </UserProvider>
    );
};

export default Users;
