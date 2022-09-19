import React from "react";
import BookMark from "./bookmark";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    bookmark,
    onToggleBookMark,
    onDelete
}) => {
    return (
        <tr key={_id}>
            <td>{name} </td>
            <td>
                {qualities.map((qualitie) => {
                    return <Qualitie key={qualitie._id} {...qualitie} />;
                })}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate + "/5"}</td>
            <td>
                <BookMark
                    status={bookmark}
                    id={_id}
                    onToggleBookMark={onToggleBookMark}
                />
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        onDelete(_id);
                    }}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};
User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};
export default User;
