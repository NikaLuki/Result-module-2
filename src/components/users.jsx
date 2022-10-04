import React, { useState, useEffect } from "react";
import SearchStatus from "./searchStatus.jsx";
import GroupList from "./groupList.jsx";
import api from "../api";
import Pagination from "./pagination.jsx";
import { paginate } from "../utils/paginate";
import UserTable from "./userTable.jsx";
import _ from "lodash";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProprofessions] = useState();
    const [slectedProfessionId, setSelectedProfessionId] = useState();
    const [users, setUsers] = useState([]);
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
    }, []);

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

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProprofessions(data);
        });
    }, []);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSelectProfession = (itemID) => {
        setSelectedProfessionId(itemID);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const filteredUsers = slectedProfessionId
        ? users.filter((user) => user.profession._id === slectedProfessionId)
        : users;
    const sortedUser = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUser, currentPage, pageSize);
    const count = filteredUsers.length;
    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        items={professions}
                        onSelectItem={handleSelectProfession}
                        selectedItemId={slectedProfessionId}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={() => setSelectedProfessionId()}
                    >
                        Сброс
                    </button>
                </div>
            )}
            <div>
                <SearchStatus usersCount={count} />
                {count > 0 && (
                    <UserTable
                        users={userCrop}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        onDelete={handleDelete}
                        onToggleBookMark={handleToggleBookMark}
                    />
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Users;
