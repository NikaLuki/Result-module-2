import React from "react";
import Comment from "./comment";
import { orderBy } from "lodash";
import AddCommentForm from "./addCommentForm";
import { useComments } from "../../../hooks/useComments";

const CommentsList = () => {
    const { comments, createComment, removeComment } = useComments();

    const handleSubmit = (data) => {
        createComment(data);
    };

    const handleRemove = (id) => {
        removeComment(id);
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
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
};

export default CommentsList;
