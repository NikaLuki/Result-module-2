import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, onClick }) => {
    return (
        <i
            className={"bi bi-heart" + (status ? "-fill" : "")}
            onClick={onClick}
        ></i>
    );
};
BookMark.propTypes = {
    status: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};
export default BookMark;
