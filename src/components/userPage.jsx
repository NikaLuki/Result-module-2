import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId, api }) => {
    const [user, setUser] = useState();
    const history = useHistory();
    useEffect(() => {
        if (userId) {
            api.users.getById(userId).then((data) => {
                setUser(data);
            });
        } else setUser();
    }, [userId]);
    const handleSave = () => {
        history.push("/users");
    };
    return (
        <>
            {user ? (
                <>
                    <h1>{user.name}</h1>
                    <h2>{"Профессия:" + user.profession.name}</h2>
                    <>{<QualitiesList qualities={user.qualities} />}</>
                    <p>{"completedMeetings:" + user.completedMeetings}</p>
                    <h2>{"Rate: " + user.rate}</h2>
                </>
            ) : (
                <h1>Loading</h1>
            )}
            <button
                onClick={() => {
                    handleSave();
                }}
            >
                Все пользователи
            </button>
        </>
    );
};
UserPage.propTypes = {
    api: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired
};

export default UserPage;
