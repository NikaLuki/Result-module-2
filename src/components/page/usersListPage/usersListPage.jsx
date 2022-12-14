import React, { useState } from "react";
import _ from "lodash";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/userTable";
import Pagination from "../../common/pagination";
import SearchBar from "../../ui/searchBar";
import { useSelector } from "react-redux";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/profession";
import { getCurrentUserId, getUsers } from "../../../store/users";

const UsersListPage = () => {
    const users = useSelector(getUsers());

    const currentUserId = useSelector(getCurrentUserId());
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProfessionId, setSelectedProfessionId] = useState();
    const [selectedSearchName, setSelectedSearchName] = useState("");
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 4;

    const handleToggleBookMark = (id) => {
        console.log(id);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSelectProfession = (itemID) => {
        setSelectedSearchName("");
        setSelectedProfessionId(itemID);
    };
    const handleSelectSearchName = ({ target }) => {
        setSelectedProfessionId();
        setSelectedSearchName(target.value);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const filterUsers = (data) => {
        let filteredUsers = data;
        if (selectedProfessionId || selectedSearchName) {
            if (selectedProfessionId) {
                filteredUsers = data.filter(
                    (user) => user.profession._id === selectedProfessionId
                );
            } else {
                filteredUsers = data.filter((user) =>
                    user.name
                        .toUpperCase()
                        .includes(selectedSearchName.toUpperCase())
                );
            }
        }
        return filteredUsers.filter((u) => u._id !== currentUserId);
    };

    const filteredUsers = filterUsers(users);
    const sortedUser = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUser, currentPage, pageSize);
    const count = filteredUsers.length;
    return (
        <div className="d-flex justify-content-center">
            {professions && !professionsLoading && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        items={professions}
                        onSelectItem={handleSelectProfession}
                        selectedItemId={selectedProfessionId}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={() => setSelectedProfessionId()}
                    >
                        ??????????
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                <SearchBar
                    onChange={handleSelectSearchName}
                    value={selectedSearchName}
                />
                {count > 0 && (
                    <UserTable
                        users={userCrop}
                        onSort={handleSort}
                        selectedSort={sortBy}
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

export default UsersListPage;
