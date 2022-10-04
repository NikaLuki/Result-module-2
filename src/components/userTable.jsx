import React from "react";
import TableHeader from "./tableHeader";
import PropTypes from "prop-types";
import TableBody from "./tableBody";
import BookMark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UserTable = ({
    users,
    onDelete,
    onToggleBookMark,
    onSort,
    selectedSort
}) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else onSort({ path: item, order: "asc" });
    };
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качество",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        onDelete(user._id);
                    }}
                >
                    delete
                </button>
            )
        }
    };
    return (
        <Table>
            <TableHeader {...{ columns, onSort: handleSort, selectedSort }} />

            <TableBody {...{ data: users, columns }} />
        </Table>
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UserTable;
