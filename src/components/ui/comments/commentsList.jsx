import React, { useEffect, useState } from "react";
import api from "../../../api";
import Comment from "./comment";
import { useParams } from "react-router-dom";
import { orderBy } from "lodash";
import AddCommentForm from "./addCommentForm";

const CommentsList = () => {
    const [comments, setCommets] = useState();
    const { userId } = useParams();
    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then((comments) => {
            setCommets(comments);
        }, []);
    });

    const handleSubmit = (data) => {
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setCommets({ ...comments, data }));
    };

    const handleRemove = (id) => {
        api.comments.remove(id).then((id) => {
            setCommets(comments.filter((c) => c._id !== id));
        });
    };

    const sortedComments = orderBy(comments, ["created_at", ["desc"]]);
    if (comments) {
        return (
            <>
                <div className="card mb-2">
                    {" "}
                    <div className="card-body ">
                        <AddCommentForm onSubmit={handleSubmit} />
                    </div>
                </div>
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {sortedComments.map((comment) => {
                            return (
                                <Comment
                                    key={comment._id}
                                    content={comment.content}
                                    id={comment._id}
                                    userId={comment.userId}
                                    publishedTime={comment.created_at}
                                    onRemove={handleRemove}
                                />
                            );
                        })}
                    </div>
                </div>
            </>
        );
    }
};

export default CommentsList;
