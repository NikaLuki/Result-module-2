import React from "react";
import PropTypes from "prop-types";
const BookMark = ({ status, onToggleBookMark, id }) => {
    return (
        <i
            className={"bi bi-heart" + (status ? "-fill" : "")}
            onClick={() => onToggleBookMark(id)}
        ></i>
    );
};
BookMark.propTypes = {
    status: PropTypes.bool.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};
export default BookMark;
