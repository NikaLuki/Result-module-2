import React from "react";
import api from "./api";
import SearchStatus from "./components/searchStatus";
import Table from "./components/table";

const App = () => {
    const [users, setUsers] = React.useState(api.users.fetchAll());
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) =>
                user._id === id
                    ? ((user.bookmark = !user.bookmark), user)
                    : user
            )
        );
    };

    return (
        <>
            <SearchStatus usersCount={users.length} />
            <Table
                users={users}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
            />
        </>
    );
};

export default App;
