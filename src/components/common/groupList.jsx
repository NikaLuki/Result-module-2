import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    onSelectItem,
    selectedItemId,
    valueProperty,
    contentProperty
}) => {
    return (
        <ul className="list-group">
            {Object.keys(items).map((item) => {
                return (
                    <li
                        key={items[item][valueProperty]}
                        onClick={() => onSelectItem(items[item][valueProperty])}
                        className={
                            "list-group-item" +
                            (items[item]._id === selectedItemId
                                ? " active"
                                : "")
                        }
                        role="button"
                    >
                        {items[item][contentProperty]}
                    </li>
                );
            })}
        </ul>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    onSelectItem: PropTypes.func.isRequired,
    selectedItemId: PropTypes.string,
    contentProperty: PropTypes.string.isRequired,
    valueProperty: PropTypes.string.isRequired
};
export default GroupList;
