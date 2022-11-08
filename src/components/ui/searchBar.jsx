import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({ onChange, value }) => {
    return (
        <input
            onChange={onChange}
            value={value}
            type="text"
            placeholder="Search"
        ></input>
    );
};

export default SearchBar;

SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};
