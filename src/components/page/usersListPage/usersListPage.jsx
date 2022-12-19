import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/userTable";
import Pagination from "../../common/pagination";
import SearchBar from "../../ui/searchBar";
import { useUser } from "../../../hooks/useUsers";

const UsersListPage = ({ api }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProprofessions] = useState();
    const [selectedProfessionId, setSelectedProfessionId] = useState();
    const [selectedSearchName, setSelectedSearchName] = useState("");
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 4;

    const { users } = useUser();

    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId));
        console.log(userId);
    };
    const handleToggleBookMark = (id) => {
        //     //setUsers(
        //         users.map((user) =>
        //             user._id === id
        //                 ? ((user.bookmark = !user.bookmark), user)
        //                 : user
        //         )
        //     );
        // };
        console.log(id);
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
    const filterUsers = () => {
        let filteredUsers = users;
        if (selectedProfessionId || selectedSearchName) {
            if (selectedProfessionId) {
                filteredUsers = users.filter(
                    (user) => user.profession._id === selectedProfessionId
                );
            } else {
                filteredUsers = users.filter((user) =>
                    user.name
                        .toUpperCase()
                        .includes(selectedSearchName.toUpperCase())
                );
            }
        }
        return filteredUsers;
    };
    if (users) {
        const filteredUsers = filterUsers();
        const sortedUser = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUser, currentPage, pageSize);
        const count = filteredUsers.length;
        return (
            <div className="d-flex justify-content-center">
                {professions && (
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
                            Сброс
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
    }
    return "loading...";
};
UsersListPage.propTypes = {
    api: PropTypes.object.isRequired
};

export default UsersListPage;
