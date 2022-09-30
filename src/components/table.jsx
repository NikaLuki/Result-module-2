import { React, useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import Users from "./users";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api/";
import SearchStatus from "./searchStatus";

const Table = ({ users, onDelete, onToggleBookMark }) => {
    const pageSize = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProprofessions] = useState();
    const [slectedProfessionId, setSelectedProfessionId] = useState();

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

    const filteredUsers = slectedProfessionId
        ? users.filter((user) => user.profession._id === slectedProfessionId)
        : users;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);
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
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качество</th>
                                <th scope="col">Проффессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col"> Избранное</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <Users
                                users={userCrop}
                                onDelete={onDelete}
                                onToggleBookMark={onToggleBookMark}
                            />
                        </tbody>
                    </table>
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
Table.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};
export default Table;
