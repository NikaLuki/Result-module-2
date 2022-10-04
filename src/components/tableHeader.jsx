import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ columns, onSort, selectedSort }) => {
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        onClick={
                            columns[column].path
                                ? () => onSort(columns[column].path)
                                : undefined
                        }
                        role={columns[column].path && "button"}
                        className={
                            columns[column].path === selectedSort.path
                                ? "bi bi-caret-" +
                                  (selectedSort.order === "desc"
                                      ? "down-fill"
                                      : "up-fill")
                                : ""
                        }
                        key={column}
                        scope="col"
                    >
                        {columns[column].name}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    columns: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default TableHeader;
