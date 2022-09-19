import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ usersCount }) => {
    const renderPhrase = (number) => {
        if (number < 1) {
            return (
                <span className="badge bg-danger fs-3">
                    Никто с тобой не тусанет
                </span>
            );
        } else if (number < 5 && number > 1) {
            return (
                <span className="badge bg-primary fs-3">
                    {number + " человека тусанут с тобой сегодня"}
                </span>
            );
        } else {
            return (
                <span className="badge bg-primary fs-3">
                    {number + " человек тусанет с тобой сегодня"}
                </span>
            );
        }
    };
    return <>{renderPhrase(usersCount)}</>;
};
SearchStatus.propTypes = {
    usersCount: PropTypes.number.isRequired
};
export default SearchStatus;
