import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../../api";
import { displayDate } from "../../../utils/displayDate";

const Comment = ({ content, userId, publishedTime, onRemove, id }) => {
    const [user, setUser] = useState();
    const [isLoading, setIsloadnig] = useState(true);
    useEffect(() => {
        API.users.getById(userId).then((user) => {
            setUser(user);
            setIsloadnig(false);
        });
    }, []);

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    {isLoading ? (
                        "Loading ..."
                    ) : (
                        <div className="d-flex flex-start ">
                            <img
                                src={`https://avatars.dicebear.com/api/avataaars/${user.name}.svg`}
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1 ">
                                            {user.name}
                                            <span className="small">
                                                {" "}
                                                {displayDate(publishedTime)}
                                            </span>
                                        </p>
                                        <button
                                            onClick={() => onRemove(id)}
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                    <p className="small mb-0">{content}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
Comment.propTypes = {
    content: PropTypes.string.isRequired,
    publishedTime: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default Comment;
